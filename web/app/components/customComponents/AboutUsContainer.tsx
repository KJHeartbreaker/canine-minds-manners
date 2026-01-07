'use client'

import { PortableTextBlock } from 'next-sanity'
import IconCard, { IconCardProps } from '../cards/IconCard'
import CustomPortableText from '../portableText/PortableText'
import ContentContainer from '../wrappers/ContentContainer'

export interface IterableIconCardProps extends IconCardProps {
    _key: string
}

interface AboutUsSectionProps {
    iconCards: IterableIconCardProps[]
    copy: { portableTextBlock: PortableTextBlock[] }
}

/**
 * About Us Section Component
 * Displays portable text content alongside icon cards in a grid layout
 */
export default function AboutUsSection({ copy, iconCards }: AboutUsSectionProps) {
    return (
        <div data-component="AboutUsSection" className="flex w-full">
            <ContentContainer className="grid grid-cols-1 pt-0 pb-0 lg:grid-cols-[40%_1fr] sm:gap-5">
                <div className="flex flex-col justify-center w-full">
                    <CustomPortableText value={copy.portableTextBlock} />
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-rows-2 sm:gap-2.5">
                    {iconCards.map((iC, i) => (
                        <div key={`${iC.icon?.asset?._id || i}-${i}`} className="[&_img]:invert">
                            <IconCard icon={iC.icon} heading={iC.heading} copy={iC.copy} backgroundColor="bg-grey-22" />
                        </div>
                    ))}
                </div>
            </ContentContainer>
        </div>
    )
}

