'use client'

import { PortableTextBlock } from 'next-sanity'
import { BsChatQuote } from 'react-icons/bs'
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
                <BsChatQuote className="w-10 h-10 text-grey-33 md:w-[50px] md:h-[50px]" aria-label="quotation icon" />
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

