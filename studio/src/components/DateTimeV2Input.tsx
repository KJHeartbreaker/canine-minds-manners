import React, { useCallback, useEffect, useState } from 'react'
import { set, unset } from 'sanity'
import { Stack, TextArea, Text, Card } from '@sanity/ui'

/**
 * Extracts Acuity appointment type ID from various snippet formats
 */
function extractAcuityId(snippet: string): string | null {
    if (!snippet) return null

    // Try to match data-appointment-type-id="12345678"
    let match = snippet.match(/data-appointment-type-id=["'](\d+)["']/i)
    if (match) return match[1]

    // Try to match appointmentType=12345678 in URL
    match = snippet.match(/appointmentType[=:](\d+)/i)
    if (match) return match[1]

    // Try to match appointmentTypeId=12345678
    match = snippet.match(/appointmentTypeId[=:](\d+)/i)
    if (match) return match[1]

    // Try to match just a number if it's a standalone ID
    match = snippet.match(/^\s*(\d+)\s*$/)
    if (match) return match[1]

    return null
}

/**
 * Custom input component for the acuityId field
 */
export function AcuityIdInput(props: any) {
    const { schemaType, value, onChange } = props
    const [acuitySnippet, setAcuitySnippet] = useState('')
    const [extractedId, setExtractedId] = useState<string | null>(value || null)

    // Initialize extracted ID from existing value
    useEffect(() => {
        if (value && !extractedId) {
            setExtractedId(value)
        }
    }, [value, extractedId])

    // Extract ID when snippet changes
    useEffect(() => {
        if (acuitySnippet) {
            const id = extractAcuityId(acuitySnippet)
            setExtractedId(id)
            if (id && id !== value) {
                onChange(set(id))
            } else if (!id && !acuitySnippet.trim()) {
                // Only clear if we tried to extract but failed
                // Don't clear if snippet is empty
            }
        } else if (!acuitySnippet && value) {
            // If snippet is cleared but value exists, keep the value
            setExtractedId(value)
        }
    }, [acuitySnippet, onChange, value])

    const handleSnippetChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setAcuitySnippet(event.target.value)
        },
        [],
    )

    return (
        <Stack space={2}>
            <TextArea
                value={acuitySnippet}
                onChange={handleSnippetChange}
                placeholder="Paste Acuity embed snippet or button code here..."
                rows={3}
            />
            {extractedId && (
                <Card padding={3} tone="positive" radius={2}>
                    <Text size={1} weight="semibold">
                        Extracted ID: {extractedId}
                    </Text>
                </Card>
            )}
            {acuitySnippet && !extractedId && (
                <Card padding={2} tone="caution" radius={2}>
                    <Text size={1}>
                        Could not extract Acuity ID from snippet. Please check the format.
                    </Text>
                </Card>
            )}
        </Stack>
    )
}

