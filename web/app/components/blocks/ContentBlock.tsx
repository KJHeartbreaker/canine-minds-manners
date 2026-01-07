'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Section from '../wrappers/Section'
import SanityImage from '../SanityImage'

interface ContentBlockProps {
    bgColor?: string
    bgImage?: any | null
    overlay?: 'noOverlay' | 'darkOverlay' | 'blueOverlay'
    removeBottomPadding?: boolean
    skinny?: boolean
    children: ReactNode
    className?: string
    id?: string
}

/**
 * ContentBlock wrapper component
 * Provides consistent section styling with background images, overlays, and padding options
 */
export default function ContentBlock({
    bgColor,
    bgImage,
    overlay = 'noOverlay',
    removeBottomPadding = false,
    skinny = false,
    children,
    className,
    id,
}: ContentBlockProps) {
    // Check for background image in various formats
    // Handle both reference format and resolved format from Sanity
    const hasBg = !!(
        bgImage && (
            bgImage?.asset?._id ||
            bgImage?.asset?._ref ||
            bgImage?.asset?.url ||
            bgImage?.url ||
            (bgImage?.asset && Object.keys(bgImage.asset).length > 0)
        )
    )

    // Determine if text should be white based on background color or image
    // Dark colors that need white text: Dark Blue (#013b63), Blue (#61c8e9)
    // const darkColors = ['#013b63', '#61c8e9']
    // const needsWhiteText = hasBg || (bgColor && darkColors.includes(bgColor))

    return (
        <Section
            data-component="ContentBlock"
            skinny={skinny}
            hasBg={hasBg}
            short={removeBottomPadding}
            className={cn(
                hasBg && 'has-bg',
                className,
            )}
            id={id}
            style={{ backgroundColor: hasBg ? undefined : bgColor }}
        >
            <div className={cn('relative z-10 w-full')}>
                {children}
            </div>
            {hasBg && (
                <>
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <SanityImage
                            image={bgImage}
                            fill
                            className="h-full w-full"
                            sizes="100vw"
                            priority
                            objectFit="cover"
                        />
                    </div>
                    {overlay === 'darkOverlay' && (
                        <div className="absolute inset-0 z-1 bg-black/50" />
                    )}
                    {overlay === 'blueOverlay' && (
                        <div className="absolute inset-0 z-1 bg-blue-44/70" />
                    )}
                </>
            )}
        </Section>
    )
}

