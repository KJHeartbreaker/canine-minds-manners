'use client'

import { PortableTextBlock } from 'next-sanity'
import { cn } from '@/lib/utils'
import SanityImage from '../SanityImage'
import CustomPortableText from '../portableText/PortableText'

interface HeroTwoPanelBlockProps {
    block: {
        _key: string
        _type: 'heroTwoPanel'
        size?: 'standard' | 'x-large'
        image?: any
        backgroundColor?: string
        mainPortableText?: {
            portableTextBlock: PortableTextBlock[]
        }
        centerText?: boolean
        disabled?: boolean
    }
    index: number
}

/**
 * Hero Two Panel Block Component
 * Displays a two-panel hero with an image panel and a copy panel with background color
 */
export default function HeroTwoPanelBlock({ block }: HeroTwoPanelBlockProps) {
    const { size = 'standard', image, backgroundColor = '#057198', mainPortableText, centerText = false, disabled } = block

    if (disabled) {
        return null
    }

    // Set height based on size - dynamic on mobile, fixed on desktop
    const sectionHeight = size === 'x-large'
        ? 'min-h-[500px] lg:h-[600px]'
        : 'min-h-[300px] lg:h-[400px]'

    return (
        <section
            data-component="HeroTwoPanelBlock"
            className={cn('relative flex flex-col lg:flex-row w-screen overflow-hidden', sectionHeight)}
        >
            {/* Copy Panel - Overlaid on mobile, left side on desktop */}
            <div
                className={cn(
                    'relative z-10 flex flex-col justify-center px-6 py-12 lg:py-0 lg:px-12 w-full lg:w-1/2 hero-copy-panel',
                    centerText && 'items-center text-center'
                )}
                style={{ '--hero-bg-color': backgroundColor } as React.CSSProperties}
            >
                {mainPortableText?.portableTextBlock && (
                    <div className={cn('max-w-2xl', centerText && 'w-full')}>
                        <CustomPortableText value={mainPortableText.portableTextBlock} centered={centerText} />
                    </div>
                )}
            </div>

            {/* Image Panel - Full width on mobile, right side on desktop */}
            {image && (
                <div className="absolute inset-0 lg:relative lg:w-1/2 lg:inset-auto lg:h-full lg:order-2">
                    <SanityImage
                        image={image}
                        fill
                        className="h-full w-full object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                    />
                    {/* Dark overlay on mobile only */}
                    <div className="absolute inset-0 bg-black/50 lg:hidden" />
                </div>
            )}
        </section>
    )
}
