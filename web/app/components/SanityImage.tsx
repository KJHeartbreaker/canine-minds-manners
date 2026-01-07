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
    quality = 75,
    loading,
    aspectRatio,
}: SanityImageProps) {
    // Handle both reference format (_ref) and resolved format (_id or url)
    if (!source) {
        return null
    }

    // If we have a direct URL (resolved format), use it directly
    // Check both source.url and source.asset.url
    const directUrl = source.url || source.asset?.url
    if (directUrl) {
        const imageAlt = alt || source.alt || ''
        const imageWidth = width || source.asset?.metadata?.dimensions?.width || 400
        const imageHeight = height || source.asset?.metadata?.dimensions?.height || 300

        if (fill) {
            const aspectClass = aspectRatio
                ? `aspect-[${aspectRatio.replace('/', '-')}]`
                : undefined
            return (
                <div className={cn('relative', aspectClass, className)}>
                    <Image
                        src={directUrl}
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

        return (
            <Image
                src={directUrl}
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

    // Otherwise, try to use the reference format
    if (!source?.asset?._ref && !source?.asset?._id) {
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

    // If we have explicit dimensions and a hotspot, use fit('crop') to respect the focal point
    const finalUrl = source.hotspot && (width || height)
        ? imageUrl.width(imageWidth).height(imageHeight).fit('crop').url()
        : imageUrl.url()

    return (
        <Image
            src={finalUrl}
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
    // Handle both reference format (_ref) and resolved format (_id or url)
    if (!source?.asset) {
        return null
    }

    // If asset is dereferenced and has a direct URL, use it
    if (source.asset.url) {
        // For SVG files, use a regular img tag as Next.js Image doesn't optimize SVGs
        const isSvg = source.asset.url.includes('.svg') || source.asset._type === 'sanity.imageAsset' && source.asset.url.endsWith('.svg')
        if (isSvg) {
            return (
                <img
                    src={source.asset.url}
                    alt={alt}
                    width={size}
                    height={size}
                    className={className}
                />
            )
        }
        return (
            <Image
                src={source.asset.url}
                alt={alt}
                width={size}
                height={size}
                className={className}
                loading="eager"
            />
        )
    }

    // Otherwise, use urlForImage which handles both _ref and _id formats
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

