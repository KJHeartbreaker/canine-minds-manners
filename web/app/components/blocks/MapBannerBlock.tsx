'use client'

import { PortableTextBlock } from 'next-sanity'
import dynamic from 'next/dynamic'
import SimplePortableText from '../portableText/SimplePortableText'
import CTAButton from '../CTAButton'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { cn } from '@/lib/utils'

// Dynamically import ContactForm to reduce initial bundle size (Formik + dependencies)
const ContactForm = dynamic(() => import('../forms/ContactForm'), {
    ssr: false,
    loading: () => <div className="w-full p-5 bg-gray-100 animate-pulse rounded">Loading form...</div>,
})

type ContactIconCardData = {
    _key?: string
    heading: string
    copy?: {
        portableTextBlock?: PortableTextBlock[]
    }
}

function ContactIconCard({
    icon,
    heading,
    copy,
}: {
    icon: React.ComponentType<{ className?: string }>
    heading: string
    copy?: { portableTextBlock?: PortableTextBlock[] }
}) {
    const Icon = icon

    return (
        <div data-component="ContactIconCard" className="flex flex-col justify-start items-center h-full py-10 px-3 md:py-[60px] md:px-5">
            <div className="flex items-center justify-center w-[65px] h-[65px] rounded-full bg-orange md:w-[85px] md:h-[85px]">
                <Icon className="text-white text-3xl md:text-4xl" />
            </div>

            <div className="flex flex-col items-center text-center">
                <h4 className="my-5 text-blue-33">{heading}</h4>
                {copy?.portableTextBlock && <SimplePortableText value={copy.portableTextBlock} />}
            </div>
        </div>
    )
}

interface MapBannerBlockProps {
    block: {
        _key: string
        _type: 'Contact Page Map'
        map?: string
        mapLink?: string
        copy?: {
            portableTextBlock?: PortableTextBlock[]
        }
        iconCards?: ContactIconCardData[]
    }
    index: number
}

/**
 * Map Banner Block Component
 * Displays Google Maps embed with contact form and icon cards
 */
export default function MapBannerBlock({ block }: MapBannerBlockProps) {
    const { map, mapLink, copy, iconCards } = block

    const parseEmbedCode = (embedCode?: string) => {
        if (!embedCode) return { src: '', width: '600', height: '450' }
        const srcMatch = embedCode.match(/src="([^"]*)/)
        const widthMatch = embedCode.match(/width="([^"]*)/)
        const heightMatch = embedCode.match(/height="([^"]*)/)

        return {
            src: srcMatch ? srcMatch[1] : '',
            width: widthMatch ? widthMatch[1] : '600',
            height: heightMatch ? heightMatch[1] : '450',
        }
    }

    const { src } = parseEmbedCode(map)

    return (
        <section data-component="MapBannerBlock" className="flex flex-col w-full">
            {/* Map Container */}
            <div className="relative w-full">
                {/* Find Us Button - Mobile only, centered at top */}
                {mapLink && (
                    <div className="flex justify-center items-center h-[100px] sm:hidden">
                        <CTAButton title="Find Us" kind="button" link={mapLink} arrow={false} />
                    </div>
                )}
                {/* Map iframe - Hidden on mobile, shown on desktop */}
                {src && (
                    <div className="hidden sm:block h-[750px]">
                        <iframe
                            src={src}
                            style={{ border: 0, width: '100%', height: '100%' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Canine Minds & Manners Google Map"
                            className="border-0"
                        />
                    </div>
                )}
                {/* Form Panel Overlay */}
                <div className="w-full bg-white p-2.5 opacity-90 z-10 sm:absolute sm:w-[320px] sm:top-[125px] sm:left-5 sm:rounded-md sm:border-2 sm:border-blue-22 md:w-[450px] lg:w-[600px] lg:p-5 xl:left-[10%]">
                    {copy?.portableTextBlock && (
                        <div className="copyBlock mb-5">
                            <SimplePortableText value={copy.portableTextBlock} />
                        </div>
                    )}
                    <ContactForm />
                </div>
            </div>

            {/* Icon Cards */}
            {iconCards && iconCards.length > 0 && (
                <div className="flex flex-col w-full justify-around p-5 sm:flex-row">
                    {iconCards.map((iC, i) => (
                        <div
                            key={`${iC._key || i}-${i}`}
                            className={cn(
                                'flex-1 h-full sm:border-r sm:border-grey-22 last:sm:border-r-0 [&>div]:rounded-none [&>div>p]:m-0',
                            )}
                        >
                            <ContactIconCard
                                icon={i === 0 ? FaMapMarkerAlt : i === 1 ? FaPhoneAlt : FaEnvelope}
                                heading={iC.heading}
                                copy={iC.copy}
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

