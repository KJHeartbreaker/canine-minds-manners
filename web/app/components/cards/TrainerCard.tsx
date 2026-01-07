'use client'

import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'
import SanityImage from '../SanityImage'
import SimplePortableText from '../portableText/SimplePortableText'

export interface TrainerCardProps {
    name: string
    slug?: {
        current?: string
    }
    certs?: {
        portableTextBlock: PortableTextBlock[]
    }
    image: any
}

/**
 * Trainer Card Component
 * Displays trainer information with image, name, and certifications
 */
export default function TrainerCard({ name, slug, certs, image }: TrainerCardProps) {
    const href = slug?.current ? `/our-team#${slug.current}` : '/our-team'

    return (
        <div data-component="TrainerCard" className="flex flex-col bg-white rounded-[20px] overflow-hidden">
            <Link href={href} className="group">
                <SanityImage
                    image={image}
                    width={400}
                    height={300}
                    className="w-full max-h-[200px] object-cover transition-transform duration-200 group-hover:scale-105 md:max-h-[300px]"
                />
            </Link>
            <div className="flex flex-col justify-start items-center text-center p-5 overflow-hidden copy-block">
                <Link href={href} className="group">
                    <h4 className="mb-5 group-hover:text-blue-33 transition-colors">{name}</h4>
                </Link>
                {certs && <SimplePortableText value={certs.portableTextBlock} />}
            </div>
        </div>
    )
}

