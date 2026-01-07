'use client'

import { PortableTextBlock } from 'next-sanity'
import { cn } from '@/lib/utils'
import SanityImage from '../SanityImage'
import SimplePortableText from '../portableText/SimplePortableText'

interface HeroBannerBlockProps {
    block: {
        _key: string
        _type: 'Hero Banner'
        size?: 'standard' | 'x-large'
        image?: any
        imageOverlay?: 'noOverlay' | 'darkOverlay' | 'blueOverlay'
        heading?: string
        subheading?: string
        copy?: {
            portableTextBlock: PortableTextBlock[]
        }
        copyColor?: string
        subHeadingColor?: string
        headingColor?: string
    }
    index: number
}

/**
 * Hero Banner Block Component
 * Displays a hero banner with optional background image, heading, subheading, and copy
 */
export default function HeroBannerBlock({ block }: HeroBannerBlockProps) {
    const { size = 'standard', image, imageOverlay = 'noOverlay', heading, subheading, copy, copyColor, subHeadingColor, headingColor } = block

    const bgSize = size === 'standard' ? 'h-[300px] lg:h-[400px]' : size === 'x-large' ? 'h-[500px] lg:h-[600px]' : ''
    const copyBlock = size === 'x-large' ? 'mt-[100px] lg:mt-[300px]' : ''

    // Use CSS custom properties for responsive height
    const heightStyle = size === 'standard'
        ? { '--hero-height-mobile': '300px', '--hero-height-desktop': '400px' } as React.CSSProperties
        : size === 'x-large'
            ? { '--hero-height-mobile': '500px', '--hero-height-desktop': '600px' } as React.CSSProperties
            : undefined

    return (
        <section
            data-component="HeroBannerBlock"
            className={cn('hero-section relative flex w-screen items-center justify-center bg-grey-44 overflow-hidden', bgSize)}
            style={heightStyle}
        >
            {image && (
                <>
                    <div className="hero-image-container absolute inset-0 z-0">
                        <SanityImage
                            image={image}
                            fill
                            className="hero-image h-full w-full"
                            sizes="100vw"
                            priority
                        />
                    </div>
                    {imageOverlay === 'darkOverlay' && <div className="absolute inset-0 z-0 bg-black/50" />}
                    {imageOverlay === 'blueOverlay' && <div className="absolute inset-0 z-0 bg-blue-44/70" />}
                </>
            )}
            <div className={cn('absolute z-10 flex w-8/12 flex-col items-center justify-center text-center', copyBlock)}>
                {subheading && (
                    <h2 className={cn('font-display', subHeadingColor && `text-${subHeadingColor}`)}>
                        {subheading}
                    </h2>
                )}
                {heading && (
                    <h1 className={cn('pb-8 font-display leading-[1] lg:leading-[0.8]', headingColor && `text-${headingColor}`)}>
                        {heading}
                    </h1>
                )}
                {copy && (
                    <SimplePortableText
                        value={copy.portableTextBlock}
                        paragraphClasses={copyColor ? `text-${copyColor}` : undefined}
                    />
                )}
            </div>
        </section>
    )
}

