'use client'

import { PortableTextBlock } from 'next-sanity'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAcuityEmbed } from '@/lib/hooks/useAcuityEmbed'
import SimplePortableText from '../portableText/SimplePortableText'
import SanityImage from '../SanityImage'
import { SanityIcon } from '../SanityImage'
import AcuityButton from '../AcuityButton'

interface UpcomingClassV2 {
    _key: string
    dateTime: string // ISO 8601 datetime string
    acuityId?: string
    totalSpots?: number
    bookingsCount?: number
    availability?: 'open' | 'nearlyFull' | 'full'
}

interface TrainingSession {
    _id: string
    name?: string
    description?: {
        portableTextBlock?: PortableTextBlock[]
    }
    upcomingClasses?: UpcomingClassV2[]
    picture?: any
    price?: string
    takeaways?: string[]
    trainingType?: 'group' | 'private' | 'onDemand'
    customTrainingTitle?: string
    slug?: {
        current: string
    }
    acuityCategoryUrl?: string
}

/**
 * Formats a date string to a readable format
 */
function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}

/**
 * Training Component
 * Displays individual training class information
 */
export default function TrainingComponent({
    name,
    description,
    upcomingClasses,
    picture,
    price,
    takeaways,
    trainingType,
    customTrainingTitle,
    slug,
    acuityCategoryUrl,
}: TrainingSession) {
    // Load Acuity embed scripts if needed
    useAcuityEmbed()

    // Don't render if name is missing
    if (!name) {
        return null
    }

    const type = trainingType === 'group' ? 'Group Class' : 'Private Training'
    const hasUpcomingClasses = upcomingClasses && upcomingClasses.length > 0

    return (
        <ContentContainer
            data-component="TrainingComponent"
            id={slug?.current}
            className={cn(
                'grid grid-cols-1 gap-10 pb-10 border-b-2 border-blue-44',
                'first:pt-0 last:border-b-0',
                'md:grid-cols-2 md:grid-rows-1 md:pt-[100px] md:pb-[100px] md:gap-20',
                'md:last:pb-0 md:only:pt-0 md:only:pb-0',
            )}
        >
            {/* First Column */}
            <div className="md:row-start-1 md:col-start-1">
                <h5 className="uppercase text-orange font-bold">{customTrainingTitle || type}</h5>
                <h2>{name}</h2>
                {price ? (
                    <h4 className="text-blue-33 mb-5">${price}</h4>
                ) : (
                    <Link href="/contact">
                        <h4 className="text-blue-33 mb-5 hover:text-blue-22">Contact Us</h4>
                    </Link>
                )}
                <div
                    className={cn(
                        'flex w-fit',
                        hasUpcomingClasses && 'p-3 mb-6 md:p-4 border-2 border-yellow rounded-[20px]',
                    )}
                >
                    <div>
                        {/* New format with Acuity IDs */}
                        {hasUpcomingClasses ? (
                            <>
                                <h4 className="text-orange mb-2">Book your spot for one of our upcoming classes:</h4>
                                {upcomingClasses.map((uC) => {
                                    const formattedDate = uC.dateTime ? formatDate(uC.dateTime) : ''
                                    const isFull = uC.availability === 'full'
                                    const availabilityBadge = isFull ? (
                                        <span className="font-bold text-red">FULL</span>
                                    ) : uC.availability === 'nearlyFull' ? (
                                        <span className="font-bold text-blue">FEW SPOTS LEFT</span>
                                    ) : (
                                        <span className="font-bold text-green">REGISTER NOW</span>
                                    )

                                    // Show booking button (disabled if full)
                                    if (uC.acuityId && formattedDate) {
                                        return (
                                            <div key={uC._key}>
                                                <AcuityButton
                                                    appointmentTypeId={uC.acuityId}
                                                    date={formattedDate}
                                                    disabled={isFull}
                                                    badge={availabilityBadge}
                                                />
                                            </div>
                                        )
                                    } else if (formattedDate) {
                                        // Show date with badge (or just date if open)
                                        return (
                                            <p key={uC._key} className="mb-2">
                                                {formattedDate}
                                                <span className="ml-5">{availabilityBadge}</span>
                                            </p>
                                        )
                                    }
                                    return null
                                })}
                            </>
                        ) : trainingType === 'group' ? (
                            <h4 className="text-bold text-orange mb-6">Check back for availability</h4>
                        ) : (
                            <Link href="/contact">
                                <h4 className="text-bold text-orange hover:text-orange-hover mb-6">Contact for more information</h4>
                            </Link>
                        )}
                    </div>
                </div>
                {description?.portableTextBlock && (
                    <SimplePortableText value={description.portableTextBlock} />
                )}
                {/* Conditional CTA Buttons */}
                <div className={cn('mt-10', trainingType === 'group' && hasUpcomingClasses && acuityCategoryUrl && 'flex gap-4 flex-wrap')}>
                    {/* Private class: "Book an appointment" */}
                    {trainingType === 'private' && (
                        <Link href="/contact" className="button">
                            Book an appointment
                        </Link>
                    )}
                    {/* Group class, no upcoming classes: "Contact Us" */}
                    {trainingType === 'group' && !hasUpcomingClasses && (
                        <Link href="/contact" className="button">
                            Contact Us
                        </Link>
                    )}
                    {/* Group class, with upcoming classes: "See All Upcoming Classes" + "Contact Us" */}
                    {trainingType === 'group' && hasUpcomingClasses && (
                        <>
                            {acuityCategoryUrl && (
                                <a
                                    href={acuityCategoryUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="acuity-embed-button"
                                    style={{
                                        background: 'var(--color-orange) !important',
                                        color: '#fff',
                                        padding: '8px 12px',
                                        border: '0px',
                                        WebkitBoxShadow: '0 -2px 0 rgba(0,0,0,0.15) inset',
                                        MozBoxShadow: '0 -2px 0 rgba(0,0,0,0.15) inset',
                                        boxShadow: '0 -2px 0 rgba(0,0,0,0.15) inset',
                                        borderRadius: '4px',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        margin: '10px 0',
                                    }}
                                >
                                    See All Upcoming Classes
                                </a>
                            )}
                            <Link href="/contact" className="button">
                                Contact Us
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Second Column */}
            <div className="md:row-start-1 md:col-start-2">
                {picture && (
                    <div className="md:col-start-2 md:row-start-1 mb-10">
                        <SanityImage
                            image={picture}
                            alt={picture?.alt}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover rounded-[20px]"
                        />
                    </div>
                )}
                {takeaways && takeaways.length > 0 && (
                    <div
                        className={cn(
                            'flex flex-col justify-start items-center md:row-start-2 md:col-start-2',
                        )}
                    >
                        <h2 className="text-orange mb-5">You&apos;ll Learn</h2>
                        <div className="flex flex-row flex-wrap justify-around">
                            {takeaways.map((tA, i) => (
                                <div key={i} className="flex flex-col justify-start items-center text-center p-5 flex-1">
                                    <div className="mb-5 flex items-center justify-center w-[65px] h-[65px] rounded-full bg-yellow md:w-[85px] md:h-[85px]">
                                        <SanityIcon
                                            image={{
                                                asset: {
                                                    _ref: 'image-aa1c3dc3394745974c4261e5fe59e9f9ea60cd96-63x63-svg',
                                                    _type: 'reference',
                                                },
                                            }}
                                            alt="Paw icon"
                                            size={40}
                                            className="md:w-[50px] md:h-[50px]"
                                        />
                                    </div>
                                    <p>{tA}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ContentContainer>
    )
}

// Import ContentContainer at the end to avoid circular dependency
import ContentContainer from '../wrappers/ContentContainer'

