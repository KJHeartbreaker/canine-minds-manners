'use client'

import { stegaClean } from '@sanity/client/stega'
import Image from 'next/image'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlForImage } from '@/sanity/lib/utils'
import { cn } from '@/lib/utils'

interface SanityImageProps {
    image: any
    alt?: string
    width?: number
    height?: number
    className?: string
    priority?: boolean
    sizes?: string
    fill?: boolean
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
    quality?: number
    loading?: 'lazy' | 'eager'
    // For responsive images
    aspectRatio?: string
}

/**
 * Optimized Sanity image component using Next.js Image
 * Handles Sanity CDN URLs, cropping, hotspots, and responsive images
 */
export default function SanityImage({
    image: source,
    alt,
    width,
    height,
    className,
    priority = false,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    fill = false,
    objectFit = 'cover',
    quality = 85,
    loading,
    aspectRatio,
}: SanityImageProps) {
    if (!source?.asset?._ref) {
        return null
    }

    const imageUrl = urlForImage(source)
    if (!imageUrl) {
        return null
    }

    const dimensions = getImageDimensions(source)
    const imageAlt = alt || stegaClean(source?.alt) || ''

    // If fill is true, use fill mode
    if (fill) {
        const aspectClass = aspectRatio
            ? `aspect-[${aspectRatio.replace('/', '-')}]`
            : undefined
        return (
            <div className={cn('relative', aspectClass, className)}>
                <Image
                    src={imageUrl.url()}
                    alt={imageAlt}
                    fill
                    className={cn('object-' + objectFit)}
                    priority={priority}
                    quality={quality}
                    sizes={sizes}
                    loading={loading}
                />
            </div>
        )
    }

    // Otherwise use explicit dimensions
    const imageWidth = width || dimensions.width
    const imageHeight = height || dimensions.height

    return (
        <Image
            src={imageUrl.url()}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className={cn('object-' + objectFit, className)}
            priority={priority}
            quality={quality}
            sizes={sizes}
            loading={loading}
        />
    )
}

/**
 * Sanity icon component for small icons/logos
 */
export function SanityIcon({
    image: source,
    alt = '',
    size = 40,
    className,
}: {
    image: any
    alt?: string
    size?: number
    className?: string
}) {
    if (!source?.asset?._ref) {
        return null
    }

    const imageUrl = urlForImage(source)
    if (!imageUrl) {
        return null
    }

    return (
        <Image
            src={imageUrl.width(size).height(size).url()}
            alt={alt}
            width={size}
            height={size}
            className={className}
            loading="eager"
        />
    )
}

