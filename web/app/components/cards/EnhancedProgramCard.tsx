'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import SanityImage from '../SanityImage'
import Image from 'next/image'
import { useAcuityEmbed } from '@/lib/hooks/useAcuityEmbed'

export interface EnhancedProgramCardProps {
    name: string
    enhancedCardTitle?: string | null
    parentPage?: {
        slug?: {
            current?: string
        }
    } | null
    slug?: {
        current?: string
    }
    cardImage?: any
    cardTakeaways?: string[] | null
    takeaways?: string[] | null
    acuityCategoryUrl?: string | null
    upcomingClasses?: Array<{
        _key?: string
        dateTime?: string
        acuityId?: string
        totalSpots?: number
        bookingsCount?: number
        availability?: string
    }> | null
}

/**
 * Enhanced Program Card Component
 * Displays training program with image, title bar, bullet points, and action buttons
 * No dogName or namePlacement - designed for enhanced programs grid
 */
export default function EnhancedProgramCard({
    name,
    enhancedCardTitle,
    parentPage,
    slug,
    cardImage,
    cardTakeaways,
    takeaways,
    acuityCategoryUrl,
    upcomingClasses,
}: EnhancedProgramCardProps) {
    const hrefSlug = parentPage?.slug?.current
        ? `/${parentPage.slug.current}${slug?.current ? `#${slug.current}` : ''}`
        : slug?.current
            ? `/${slug.current}`
            : '#'

    // Load Acuity embed scripts if needed
    useAcuityEmbed()

    // Use enhancedCardTitle if available, otherwise fall back to name
    const displayTitle = enhancedCardTitle || name

    // Use cardTakeaways if available, otherwise fall back to takeaways
    const displayTakeaways = (cardTakeaways && cardTakeaways.length > 0)
        ? cardTakeaways
        : (takeaways && takeaways.length > 0)
            ? takeaways
            : null

    // Determine orange button text and link based on upcomingClasses and acuityCategoryUrl
    const hasUpcomingClasses = upcomingClasses && upcomingClasses.length > 0
    const isAcuityButton = hasUpcomingClasses && acuityCategoryUrl
    const orangeButtonText = isAcuityButton
        ? 'Ready to start'
        : !hasUpcomingClasses
            ? 'Email for details'
            : null

    const orangeButtonLink = isAcuityButton
        ? acuityCategoryUrl
        : !hasUpcomingClasses
            ? 'mailto:cmm_info@shaw.ca'
            : null

    return (
        <div data-component="EnhancedProgramCard" className="flex flex-col bg-white rounded-[20px] overflow-hidden border border-grey-22">
            {/* Image Section */}
            {cardImage && (
                <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
                    <SanityImage
                        image={cardImage}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Title Bar - Light Blue */}
            <div className="bg-blue-22 px-5 py-3">
                <h4 className="mb-0 text-white text-center font-bold">{displayTitle}</h4>
            </div>
            <div className="bg-blue-55 px-5 py-4 flex-1 flex flex-col">
                {/* Content Body - Dark Blue with Bullet Points */}
                {displayTakeaways && (
                    <div className="mb-4">
                        <ul className="list-none mb-0 space-y-2 mx-0">
                            {displayTakeaways.map((takeaway, index) => (
                                <li key={index} className="text-white flex items-start mx-0">
                                    <span className="mr-2 shrink-0 mt-1">
                                        <Image
                                            src="/images/ListStylePaw.svg"
                                            alt=""
                                            width={16}
                                            height={16}
                                            className="w-4 h-4"
                                        />
                                    </span>
                                    <span className="text-sm">{takeaway}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-6 justify-center mt-auto">
                    {/* Orange Button */}
                    {orangeButtonText && orangeButtonLink && (
                        isAcuityButton ? (
                            <a
                                href={orangeButtonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'acuity-embed-button acuity-embed-rounded flex flex-col items-center justify-center',
                                    'bg-orange text-white font-bold text-sm transition-colors hover:bg-orange-hover p-2',
                                    'rounded-full border-2 border-white aspect-square w-24 h-24',
                                    'text-center'
                                )}
                            >
                                <Image
                                    src="/images/ListStylePaw.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 mb-1"
                                    style={{ filter: 'brightness(0) invert(1)' }}
                                />
                                <span className="text-sm leading-tight font-display">{orangeButtonText}</span>
                            </a>
                        ) : (
                            <a
                                href={orangeButtonLink}
                                className={cn(
                                    'flex flex-col items-center justify-center',
                                    'bg-orange text-white font-bold text-sm transition-colors hover:bg-orange-hover p-2',
                                    'rounded-full border-2 border-white aspect-square w-24 h-24',
                                    'text-center'
                                )}
                            >
                                <Image
                                    src="/images/ListStylePaw.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 mb-1"
                                    style={{ filter: 'brightness(0) invert(1)' }}
                                />
                                <span className="text-sm leading-tight font-display">{orangeButtonText}</span>
                            </a>
                        )
                    )}

                    {/* Blue "More Details" Button */}
                    <Link
                        href={hrefSlug}
                        className={cn(
                            'flex flex-col items-center justify-center',
                            'bg-blue-22 text-white font-bold text-sm transition-colors hover:bg-blue-33 p-2',
                            'rounded-full border-2 border-white aspect-square w-24 h-24',
                            'text-center'
                        )}
                    >
                        <Image
                            src="/images/ListStylePaw.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5 mb-1"
                            style={{ filter: 'brightness(0) invert(1)' }}
                        />
                        <span className="text-sm leading-tight font-display">More details</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
