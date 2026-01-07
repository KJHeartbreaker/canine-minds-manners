'use client'

import { PortableTextBlock } from 'next-sanity'
import { SanityIcon } from '../SanityImage'
import SimplePortableText from '../portableText/SimplePortableText'

export interface TestimonialCardProps {
    heading: string
    copy?: {
        portableTextBlock?: PortableTextBlock[]
    } | PortableTextBlock[] | null
}

/**
 * Testimonial Card Component
 * Displays a testimonial with quotation icon, copy text, and author heading
 */
export default function TestimonialCard({ heading, copy }: TestimonialCardProps) {
    // Handle different data structures - copy might be directly an array or have portableTextBlock
    const portableTextValue = Array.isArray(copy)
        ? copy
        : copy?.portableTextBlock || null

    return (
        <div data-component="TestimonialCard" className="flex flex-col justify-center items-center bg-white p-5 h-full">
            {/* Quotation Icon */}
            <div className="flex items-center justify-center w-[65px] h-[65px] rounded-full bg-yellow md:w-[85px] md:h-[85px]">
                <SanityIcon
                    image={{
                        alt: 'quotation icon',
                        asset: {
                            _id: 'image-1a5362e99c83130e95a5cfc3fe6ca7d9dcc4a75d-32x23-svg',
                        },
                    }}
                    alt="quotation icon"
                    size={40}
                    className="md:w-[50px] md:h-[50px]"
                />
            </div>

            {/* Content */}
            <div className="mt-8 flex flex-col items-center text-center">
                {portableTextValue && portableTextValue.length > 0 && (
                    <SimplePortableText
                        value={portableTextValue}
                        paragraphClasses="text-[0.8rem] text-left"
                    />
                )}
                <h5 className="my-5">{heading}</h5>
            </div>
        </div>
    )
}

