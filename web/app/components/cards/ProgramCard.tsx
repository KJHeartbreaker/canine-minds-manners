'use client'

import Link from 'next/link'
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
    cardImage?: any
}

/**
 * Program Card Component
 * Displays training program with image and program details
 */
export default function ProgramCard({
    name,
    parentPage,
    slug,
    trainingType,
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

    return (
        <div data-component="ProgramCard" className="flex flex-col bg-white rounded-[20px] overflow-hidden group">
            <Link href={hrefSlug} className="relative">
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
                    <h4 className="mb-0 text-blue-55 group-hover:text-orange transition-colors">{name}</h4>
                </Link>
                {method && <p className="mb-0">{method}</p>}
            </div>
        </div>
    )
}

