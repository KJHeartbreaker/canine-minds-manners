'use client'

import { PortableTextBlock } from 'next-sanity'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import SimplePortableText from '../portableText/SimplePortableText'
import SanityImage from '../SanityImage'
import { SanityIcon } from '../SanityImage'
import AcuityButton from '../AcuityButton'

interface UpcomingClass {
    _key: string
    startDate: string
    startTime: string
    amPm: string
    availability?: 'full' | 'nearlyFull'
}

interface TrainingSession {
    _id: string
    name?: string
    description?: {
        portableTextBlock?: PortableTextBlock[]
    }
    upcoming22?: UpcomingClass[]
    picture?: any
    price?: string
    takeaways?: string[]
    trainingType?: 'group' | 'private' | 'onDemand'
    customTrainingTitle?: string
    slug?: {
        current: string
    }
    cta?: any
}

/**
 * Training Component
 * Displays individual training class information
 */
export default function TrainingComponent({
    name,
    description,
    upcoming22,
    picture,
    price,
    takeaways,
    trainingType,
    customTrainingTitle,
    slug,
    cta,
}: TrainingSession) {
    // Don't render if name is missing
    if (!name) {
        return null
    }

    const type = trainingType === 'group' ? 'Group Class' : 'Private Training'

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
                        'border-2 border-yellow rounded-[20px] flex p-3 w-fit mb-6 md:p-4',
                    )}
                >
                    <div>
                        {upcoming22 && upcoming22.length > 0 ? (
                            <>
                                <h4 className="text-orange mb-2">Book your spot for one of our upcoming classes:</h4>
                                {/* <p className="mb-2"></p> */}
                                {/* {upcoming22.map((uC) => (
                                    <p key={uC._key} className="mb-2">
                                        {formatStartDate(uC.startDate)} at {uC.startTime} {uC.amPm.toUpperCase()}
                                        {uC.availability === 'full' && (
                                            <span className="ml-5 font-bold text-red">FULL</span>
                                        )}
                                        {uC.availability === 'nearlyFull' && (
                                            <span className="ml-5 font-bold text-yellow">FEW SPOTS LEFT</span>
                                        )}
                                    </p>
                                ))} */}
                                <AcuityButton appointmentTypeId="85581228" date="January 8th 2026 at 6:30 PM" />
                                <AcuityButton appointmentTypeId="87062051" date="February 2nd 2026 at 6:30 PM" />
                            </>
                        ) : trainingType === 'group' ? (
                            <h2>Check back for availability</h2>
                        ) : (
                            <Link href="/contact">
                                <h2>Contact for more information</h2>
                            </Link>
                        )}
                    </div>
                </div>
                {description?.portableTextBlock && (
                    <SimplePortableText value={description.portableTextBlock} />
                )}
                {cta && (
                    <>
                        <a
                            href="https://app.acuityscheduling.com/schedule.php?owner=28298110&ref=booking_button"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="acuity-embed-button mt-10"
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
                            }}
                        >
                            See all available classes
                        </a>
                        <link rel="stylesheet" href="https://embed.acuityscheduling.com/embed/button/28298110.css" id="acuity-button-styles" />
                        <script src="https://embed.acuityscheduling.com/embed/button/28298110.js" async />
                    </>
                )}
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

