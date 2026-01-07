'use client'

import { PortableTextBlock } from 'next-sanity'
import SimplePortableText from '../portableText/SimplePortableText'
import ContactForm from '../forms/ContactForm'
import CTAButton from '../CTAButton'
import IconCard, { IconCardProps } from '../cards/IconCard'

interface MapBannerBlockProps {
    block: {
        _key: string
        _type: 'Contact Page Map'
        map?: string
        mapLink?: string
        copy?: {
            portableTextBlock?: PortableTextBlock[]
        }
        iconCards?: IconCardProps[]
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
            <div className="relative w-full h-[450px] md:h-[600px]">
                {mapLink && (
                    <div className="absolute top-5 left-5 z-10">
                        <CTAButton title="Find Us" kind="button" link={mapLink} arrow={false} />
                    </div>
                )}
                {src && (
                    <iframe
                        src={src}
                        style={{ border: 0, width: '100%', height: '100%' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Canine Minds & Manners Google Map"
                        className="border-0"
                    />
                )}
                {/* Form Panel Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white p-5 md:p-10 max-h-[50%] overflow-y-auto">
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
                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {iconCards.map((iC, i) => (
                        <IconCard
                            key={`${iC.icon?.asset?._id || i}-${i}`}
                            icon={iC.icon}
                            heading={iC.heading}
                            copy={iC.copy}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

