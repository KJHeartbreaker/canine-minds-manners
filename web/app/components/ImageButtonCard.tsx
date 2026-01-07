'use client'

import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'
import SanityImage from './SanityImage'
import SimplePortableText from './portableText/SimplePortableText'

export interface ImageButtonCardProps {
    key: string
    image: any
    heading: string
    copy: {
        portableTextBlock: PortableTextBlock[]
    }
    landingPageRoute?: {
        _id: string
        slug?: string
        _type: string
    } | null
}

/**
 * Image Button Card Component
 * Displays an image with text overlay, linking to a landing page
 */
export default function ImageButtonCard({
    image,
    heading,
    copy,
    landingPageRoute,
}: ImageButtonCardProps) {
    const href = landingPageRoute?.slug
        ? landingPageRoute.slug.startsWith('/')
            ? landingPageRoute.slug
            : `/${landingPageRoute.slug}`
        : '#'

    return (
        <div className="relative w-full h-[220px]">
            <Link href={href} className="h-full text-grey-44">
                <SanityImage
                    image={image}
                    fill
                    className="absolute top-0 bottom-0 left-0 right-0 h-full"
                    objectFit="cover"
                />
                <div className="flex flex-col pl-5 relative w-[60%] z-10">
                    <h3 className="my-5 font-mono text-blue-33 text-title3-mobile md:text-title3">
                        {heading}
                    </h3>
                    <SimplePortableText
                        value={copy.portableTextBlock}
                        paragraphClasses="text-small md:text-base"
                    />
                </div>
            </Link>
        </div>
    )
}

