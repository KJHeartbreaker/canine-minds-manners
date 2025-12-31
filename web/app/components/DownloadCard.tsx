'use client'

import { PortableTextBlock } from 'next-sanity'
import SanityImage from './SanityImage'
import SimplePortableText from './SimplePortableText'
import CTAButton from './CTAButton'

export interface DownloadCardProps {
    title: string
    excerpt: {
        portableTextBlock: PortableTextBlock[]
    }
    image: any
    file: {
        asset: {
            url: string
        }
    }
}

/**
 * Download Card Component
 * Displays downloadable content with image, title, excerpt, and download button
 */
export default function DownloadCard({ title, excerpt, image, file }: DownloadCardProps) {
    return (
        <div className="flex flex-col bg-white rounded-[20px] overflow-hidden">
            <SanityImage
                image={image}
                width={400}
                height={300}
                className="w-full max-h-[200px] object-cover md:max-h-[300px]"
            />
            <div className="flex flex-col justify-start items-start text-left p-5 overflow-hidden copy-block">
                <h4 className="mb-0">{title}</h4>
                <SimplePortableText value={excerpt.portableTextBlock} />
                <CTAButton title="Download PDF" kind="link" arrow={false} fileDownload={file} />
            </div>
        </div>
    )
}

