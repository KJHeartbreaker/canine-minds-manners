import React, { useCallback, useEffect, useRef, useState } from 'react'
import { set, unset } from 'sanity'
import { Stack, TextArea, Text, Card, Button } from '@sanity/ui'

/**
 * Cleans and extracts bullet points from pasted text
 * Handles various bullet formats from Google Docs, Word, etc.
 * Returns an array of cleaned bullet point strings (max 4)
 */
function extractBulletPoints(text: string): string[] {
    if (!text) return []

    // Split the text by newlines first
    const lines = text.split(/\r?\n/)

    const bullets: string[] = []

    // Patterns to match various bullet formats
    // Handles: •, -, *, ·, →, →, and numbered lists (1., 1), etc.
    const bulletPatterns = [
        /^[\s]*[•\-\*·→→]\s+/,           // Symbol bullets (•, -, *, etc.)
        /^[\s]*\d+[\.\)]\s+/,            // Numbered lists (1., 1), etc.
        /^[\s]*[a-zA-Z][\.\)]\s+/,        // Letter lists (a., a), etc.
    ]

    for (const line of lines) {
        // Skip empty lines
        if (!line.trim()) continue

        // Try to remove bullet markers
        let cleaned = line
        let hasBulletMarker = false

        for (const pattern of bulletPatterns) {
            if (pattern.test(line)) {
                cleaned = line.replace(pattern, '')
                hasBulletMarker = true
                break
            }
        }

        // If no bullet marker found, treat the whole line as content (fallback)
        if (!hasBulletMarker) {
            cleaned = line
        }

        // Clean up whitespace
        cleaned = cleaned
            .replace(/^\s+|\s+$/g, '') // Trim whitespace
            .replace(/\s+/g, ' ') // Normalize multiple spaces to single space

        // Only add non-empty cleaned bullets
        if (cleaned) {
            bullets.push(cleaned)
        }

        // Limit to 4 bullets
        if (bullets.length >= 4) break
    }

    return bullets
}

/**
 * Custom input component for bullet points field
 * Allows pasting text from Google Docs and automatically extracts/cleans bullet points
 */
export function BulletPointsInput(props: any) {
    const { schemaType, value, onChange } = props
    const [pastedText, setPastedText] = useState('')

    // Initialize extracted bullets from existing value
    const getValidBullets = (val: any): string[] => {
        if (val && Array.isArray(val) && val.length > 0) {
            return val.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
        }
        return []
    }

    const [extractedBullets, setExtractedBullets] = useState<string[]>(() => getValidBullets(value))
    const [extractionFailed, setExtractionFailed] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    // Use refs to track updates and prevent loops
    const isInternalUpdateRef = useRef(false)
    const lastProcessedTextRef = useRef<string>('')
    const lastValueRef = useRef<string>(JSON.stringify(value || []))
    const currentValueRef = useRef<any>(value)
    const originalBulletsRef = useRef<string[]>([])

    // Keep currentValueRef in sync with value prop
    useEffect(() => {
        currentValueRef.current = value
    }, [value])

    // Initialize from value on mount
    useEffect(() => {
        const validBullets = getValidBullets(value)
        if (validBullets.length > 0) {
            setExtractedBullets(validBullets)
        }
        lastValueRef.current = JSON.stringify(value || [])
    }, []) // Only run on mount

    // Sync with external value changes (only when changed externally, not by us)
    useEffect(() => {
        const currentValueStr = JSON.stringify(value || [])
        const lastValueStr = lastValueRef.current

        // Only sync if value changed
        if (currentValueStr !== lastValueStr) {
            // Check if this matches what we just set (internal update)
            const wasInternalUpdate = isInternalUpdateRef.current

            if (!wasInternalUpdate) {
                // External change - sync our state
                const validBullets = getValidBullets(value)
                setExtractedBullets(validBullets)
                setExtractionFailed(false)
                setIsEditing(false) // Exit edit mode on external changes
                if (validBullets.length === 0) {
                    setPastedText('')
                    lastProcessedTextRef.current = ''
                }
            }

            // Update ref and reset flag
            lastValueRef.current = currentValueStr
            isInternalUpdateRef.current = false
        }
    }, [value])

    // Extract bullets when pasted text changes (but not when editing)
    useEffect(() => {
        // Don't auto-extract when in edit mode - user will click Save
        if (isEditing) {
            return
        }

        // Only process if text actually changed
        if (pastedText === lastProcessedTextRef.current) {
            return
        }

        lastProcessedTextRef.current = pastedText

        if (pastedText.trim()) {
            const newBullets = extractBulletPoints(pastedText)
            if (newBullets.length > 0) {
                setExtractionFailed(false)
                // Get existing bullets from current value
                const existingBullets = getValidBullets(currentValueRef.current)

                // First, deduplicate within the new bullets
                const deduplicatedNewBullets: string[] = []
                for (const bullet of newBullets) {
                    const normalized = bullet.trim()
                    const exists = deduplicatedNewBullets.some(
                        existing => existing.toLowerCase().trim() === normalized.toLowerCase()
                    )
                    if (!exists && normalized) {
                        deduplicatedNewBullets.push(normalized)
                    }
                }

                // Merge: combine existing with new, removing duplicates, limit to 4
                const mergedBullets: string[] = [...existingBullets]

                for (const newBullet of deduplicatedNewBullets) {
                    // Skip if already exists in merged list (case-insensitive comparison)
                    const exists = mergedBullets.some(
                        existing => existing.toLowerCase().trim() === newBullet.toLowerCase().trim()
                    )
                    if (!exists && mergedBullets.length < 4) {
                        mergedBullets.push(newBullet)
                    }
                }

                // Limit to 4 total
                const finalBullets = mergedBullets.slice(0, 4)
                const bulletsStr = JSON.stringify(finalBullets)
                const currentValueStr = JSON.stringify(currentValueRef.current || [])

                // Only update if bullets are different from current value
                if (bulletsStr !== currentValueStr) {
                    setExtractedBullets(finalBullets)
                    isInternalUpdateRef.current = true
                    onChange(set(finalBullets))
                    lastValueRef.current = bulletsStr
                } else {
                    // If bullets match value, just update local state
                    setExtractedBullets(finalBullets)
                }
            } else {
                // If we have text but no bullets extracted, mark as failed
                setExtractionFailed(true)
                // Keep existing bullets in state
                const existingBullets = getValidBullets(currentValueRef.current)
                setExtractedBullets(existingBullets)
            }
        } else {
            // If text is cleared, reset failure state and keep existing bullets
            setExtractionFailed(false)
            const existingBullets = getValidBullets(currentValueRef.current)
            setExtractedBullets(existingBullets)
        }
    }, [pastedText, onChange, isEditing])

    const handleTextChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setPastedText(event.target.value)
        },
        [],
    )

    const handleUnset = useCallback(() => {
        setPastedText('')
        setExtractedBullets([])
        setExtractionFailed(false)
        setIsEditing(false)
        onChange(unset())
    }, [onChange])

    const handleEdit = useCallback(() => {
        // Store original bullets for cancel
        originalBulletsRef.current = [...extractedBullets]
        // When editing, show the textarea again with the current bullets joined
        // Prepend bullet markers for better UX
        const textWithBullets = extractedBullets.map(bullet => `• ${bullet}`).join('\n')
        setPastedText(textWithBullets)
        setExtractedBullets([])
        setExtractionFailed(false)
        setIsEditing(true)
        // Reset the processed text ref so the new text can be processed
        lastProcessedTextRef.current = ''
        // Don't unset the value immediately - let the user edit first
    }, [extractedBullets])

    const handleSave = useCallback(() => {
        // Exit edit mode and trigger extraction
        setIsEditing(false)
        // Force re-processing by resetting the last processed text
        lastProcessedTextRef.current = ''

        // Manually trigger extraction
        if (pastedText.trim()) {
            const newBullets = extractBulletPoints(pastedText)
            if (newBullets.length > 0) {
                setExtractionFailed(false)

                // When editing, REPLACE the bullets entirely (don't merge)
                // Also deduplicate within the extracted bullets
                const deduplicatedBullets: string[] = []
                for (const bullet of newBullets) {
                    const normalized = bullet.trim()
                    // Check if this bullet already exists (case-insensitive, exact match)
                    const exists = deduplicatedBullets.some(
                        existing => existing.toLowerCase().trim() === normalized.toLowerCase()
                    )
                    if (!exists && normalized) {
                        deduplicatedBullets.push(normalized)
                    }
                }

                // Limit to 4 total
                const finalBullets = deduplicatedBullets.slice(0, 4)
                setExtractedBullets(finalBullets)
                isInternalUpdateRef.current = true
                onChange(set(finalBullets))
                lastValueRef.current = JSON.stringify(finalBullets)
                // Clear the textarea and original bullets ref
                setPastedText('')
                originalBulletsRef.current = []
            } else {
                setExtractionFailed(true)
            }
        } else {
            // If text is empty, clear everything
            setExtractedBullets([])
            setPastedText('')
            isInternalUpdateRef.current = true
            onChange(unset())
            lastValueRef.current = JSON.stringify([])
        }
    }, [pastedText, onChange])

    const handleCancel = useCallback(() => {
        // Cancel editing and restore previous state
        setIsEditing(false)
        setPastedText('')
        setExtractionFailed(false)
        // Restore extracted bullets from the original state before editing
        setExtractedBullets([...originalBulletsRef.current])
        lastProcessedTextRef.current = ''
        originalBulletsRef.current = []
    }, [])

    // Show textarea when editing or when there are no extracted bullets
    const showTextarea = isEditing || extractedBullets.length === 0

    return (
        <Stack space={2}>
            {extractedBullets.length > 0 && !isEditing && (
                <Card padding={3} tone="primary" radius={2}>
                    <Stack space={3}>
                        <Stack space={4}>
                            <Text size={1} weight="semibold">
                                {extractedBullets.length} bullet point{extractedBullets.length !== 1 ? 's' : ''}:
                            </Text>
                            <Stack space={3}>
                                {extractedBullets.map((bullet, index) => (
                                    <Text key={index} size={2} style={{ paddingLeft: '1rem' }}>
                                        • {bullet}
                                    </Text>
                                ))}
                            </Stack>
                            {extractedBullets.length >= 4 && (
                                <Text size={2} style={{ opacity: 0.7, fontStyle: 'italic' }}>
                                    Note: Maximum of 4 bullets reached.
                                </Text>
                            )}
                        </Stack>
                        <Stack space={2}>
                            <Button
                                text="Edit Bullets"
                                tone="positive"
                                mode="ghost"
                                onClick={handleEdit}
                                fontSize={2}
                            />
                            <Button
                                text="Clear All"
                                tone="critical"
                                mode="ghost"
                                onClick={handleUnset}
                                fontSize={2}
                            />
                        </Stack>
                    </Stack>
                </Card>
            )}
            {showTextarea && (
                <>
                    <TextArea
                        value={pastedText}
                        onChange={handleTextChange}
                        placeholder={isEditing
                            ? "Edit your bullet points here... (one per line)"
                            : "Paste your bullet points from Google Docs here... (will be added to existing bullets, max 4 total)"}
                        rows={6}
                    />
                    {isEditing && (
                        <Stack space={2}>
                            <Button
                                text="Save Changes"
                                tone="positive"
                                onClick={handleSave}
                                fontSize={2}
                            />
                            <Button
                                text="Cancel"
                                tone="default"
                                mode="ghost"
                                onClick={handleCancel}
                                fontSize={2}
                            />
                        </Stack>
                    )}
                    {pastedText && extractionFailed && !isEditing && (
                        <Card padding={2} tone="caution" radius={2}>
                            <Text size={1}>
                                No bullet points detected. Make sure your text contains bullet points (•, -, *, etc.) or is formatted as a list.
                            </Text>
                        </Card>
                    )}
                </>
            )}
        </Stack>
    )
}
