import React, { useCallback, useEffect, useState } from 'react'
import { set, unset } from 'sanity'
import { Stack, TextArea, Text, Card, Button } from '@sanity/ui'

/**
 * Extracts Acuity category URL from embed snippet
 * Example: appointmentType=category:Puppy%20Training
 * Returns: https://app.acuityscheduling.com/schedule.php?owner=28298110&appointmentType=category:Puppy%20Training&ref=booking_button
 */
function extractAcuityCategoryUrl(snippet: string): string | null {
    if (!snippet) return null

    // Try to match appointmentType=category:... in URL
    const categoryMatch = snippet.match(/appointmentType=category:([^&"'\s]+)/i)
    if (categoryMatch) {
        const category = categoryMatch[1]
        // Construct the full URL
        return `https://app.acuityscheduling.com/schedule.php?owner=28298110&appointmentType=category:${category}&ref=booking_button`
    }

    // Try to match if it's already a full URL
    if (snippet.includes('app.acuityscheduling.com') && snippet.includes('appointmentType=category:')) {
        return snippet.trim()
    }

    return null
}

/**
 * Extracts the category name from a URL
 * Example: https://app.acuityscheduling.com/schedule.php?owner=28298110&appointmentType=category:Outdoor%20and%20Advanced%20Classes&ref=booking_button
 * Returns: "Outdoor and Advanced Classes"
 */
function extractCategoryName(url: string): string {
    const match = url.match(/appointmentType=category:([^&]+)/i)
    if (match) {
        return decodeURIComponent(match[1]).replace(/%20/g, ' ')
    }
    return url
}

/**
 * Custom input component for the acuityCategoryUrl field
 */
export function AcuityCategoryInput(props: any) {
    const { schemaType, value, onChange } = props
    const [acuitySnippet, setAcuitySnippet] = useState('')
    const [extractedUrl, setExtractedUrl] = useState<string | null>(value || null)

    // Initialize extracted URL from existing value
    useEffect(() => {
        if (value && !extractedUrl) {
            setExtractedUrl(value)
        }
    }, [value, extractedUrl])

    // Extract URL when snippet changes
    useEffect(() => {
        if (acuitySnippet) {
            const url = extractAcuityCategoryUrl(acuitySnippet)
            setExtractedUrl(url)
            if (url && url !== value) {
                onChange(set(url))
            } else if (!url && !acuitySnippet.trim()) {
                // Only clear if we tried to extract but failed
                // Don't clear if snippet is empty
            }
        } else if (!acuitySnippet && value) {
            // If snippet is cleared but value exists, keep the value
            setExtractedUrl(value)
        }
    }, [acuitySnippet, onChange, value])

    const handleSnippetChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setAcuitySnippet(event.target.value)
        },
        [],
    )

    const handleUnset = useCallback(() => {
        setAcuitySnippet('')
        setExtractedUrl(null)
        onChange(unset())
    }, [onChange])

    const categoryName = extractedUrl ? extractCategoryName(extractedUrl) : null

    return (
        <Stack space={2}>
            {extractedUrl && (
                <Card padding={3} tone="positive" radius={2}>
                    <Stack space={3}>
                        <Stack space={2}>
                            <Text size={1} weight="semibold">
                                Category: {categoryName}
                            </Text>
                            <Text size={0} style={{ fontFamily: 'monospace', opacity: 0.8, wordBreak: 'break-all' }}>
                                {extractedUrl}
                            </Text>
                        </Stack>
                        <Button
                            text="Change URL"
                            tone="default"
                            mode="ghost"
                            onClick={handleUnset}
                            fontSize={1}
                        />
                    </Stack>
                </Card>
            )}
            {!extractedUrl && (
                <TextArea
                    value={acuitySnippet}
                    onChange={handleSnippetChange}
                    placeholder="Paste Acuity embed snippet or button code with category here..."
                    rows={3}
                />
            )}
            {acuitySnippet && !extractedUrl && (
                <Card padding={2} tone="caution" radius={2}>
                    <Text size={1}>
                        Could not extract Acuity category URL from snippet. Please check the format. Make sure it includes 'appointmentType=category:...'
                    </Text>
                </Card>
            )}
        </Stack>
    )
}
