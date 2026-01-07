'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import SanityImage from '../SanityImage'

export interface ProgramCardProps {
    name: string
    parentPage?: {
        slug?: {
            current?: string
        }
    } | null
    slug?: {
        current?: string
    }
    trainingType: 'group' | 'private' | 'onDemand'
    dogName?: string | null
    namePlacement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | null
    cardImage?: any
}

/**
 * Program Card Component
 * Displays training program with image, optional dog name overlay, and program details
 */
export default function ProgramCard({
    name,
    parentPage,
    slug,
    trainingType,
    dogName,
    namePlacement,
    cardImage,
}: ProgramCardProps) {
    const method =
        trainingType === 'group'
            ? 'Group Class'
            : trainingType === 'private'
                ? 'Private One-on-One Training'
                : trainingType === 'onDemand'
                    ? 'On Demand'
                    : null

    const hrefSlug = parentPage?.slug?.current
        ? `/${parentPage.slug.current}${slug?.current ? `#${slug.current}` : ''}`
        : slug?.current
            ? `/${slug.current}`
            : '#'

    const placementClasses = {
        topLeft: 'top-5 left-5',
        topRight: 'top-5 right-5',
        bottomLeft: 'bottom-5 left-5',
        bottomRight: 'bottom-5 right-5',
    }

    return (
        <div data-component="ProgramCard" className="flex flex-col bg-white rounded-[20px] overflow-hidden group">
            <Link href={hrefSlug} className="relative">
                {dogName && namePlacement && (
                    <h4
                        className={cn(
                            'dog-name absolute z-10 mb-0 text-white',
                            placementClasses[namePlacement],
                        )}
                    >
                        {dogName}
                    </h4>
                )}
                {cardImage && (
                    <SanityImage
                        image={cardImage}
                        width={400}
                        height={300}
                        className="w-full max-h-[200px] object-cover transition-transform duration-200 group-hover:scale-105 md:max-h-[300px]"
                    />
                )}
            </Link>
            <div className="flex flex-col justify-start items-center text-center p-5 overflow-hidden copy-block">
                <Link href={hrefSlug} className="group">
                    <h4 className="mb-0 group-hover:text-blue-33 transition-colors">{name}</h4>
                </Link>
                {method && <p className="mb-0">{method}</p>}
            </div>
        </div>
    )
}

