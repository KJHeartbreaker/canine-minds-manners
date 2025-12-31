'use client'

import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import SanityImage from './SanityImage'
import { FooterLogo } from './types'

interface LogoRowProps {
    logos: FooterLogo[]
}

/**
 * Logo row component for footer
 * Displays partner/client logos
 */
export default function LogoRow({ logos }: LogoRowProps) {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const width = isMobile ? 75 : 100
    const height = isMobile ? 50 : 70

    if (!logos || logos.length === 0) {
        return null
    }

    return (
        <div className="flex flex-wrap justify-center items-center gap-4 w-full my-6">
            {logos.map((logo) => {
                if (!logo.asset?._id) return null

                // Construct image reference for SanityImage
                // The query returns asset._id which is the full asset ID
                // SanityImage expects asset._ref format
                const assetId = logo.asset._id
                // Sanity asset IDs are in format "image-{hash}-{width}x{height}-{format}"
                // We use the _id directly as _ref
                const imageRef = {
                    asset: {
                        _ref: assetId,
                        _type: 'reference' as const,
                    },
                    alt: logo.alt || '',
                    _type: 'image' as const,
                }

                return (
                    <div key={logo._key} className="flex items-center justify-center">
                        <SanityImage
                            image={imageRef}
                            width={width}
                            height={height}
                            objectFit="contain"
                            className="object-contain"
                        />
                    </div>
                )
            })}
        </div>
    )
}

