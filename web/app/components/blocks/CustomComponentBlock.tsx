'use client'

import CustomComponentContainer from '../customComponents/CustomComponentContainer'

interface CustomComponentBlockProps {
    block: {
        _key: string
        _type: 'Custom Component'
        rows?: any[]
        image?: any
        overlay?: 'noOverlay' | 'darkOverlay' | 'blueOverlay'
        backgroundColor?: string
        removeBottomPadding?: boolean
    }
    index: number
}

/**
 * Custom Component Block
 * Container for custom component types (gallery, trainers, about us, etc.)
 */
export default function CustomComponentBlock({ block }: CustomComponentBlockProps) {
    const { rows, image, overlay, backgroundColor, removeBottomPadding } = block

    return (
        <CustomComponentContainer
            rows={rows || []}
            bgImage={image || null}
            overlay={overlay || 'noOverlay'}
            bgColor={backgroundColor}
            removeBottomPadding={removeBottomPadding || false}
        />
    )
}

