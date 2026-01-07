'use client'

import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'
import SanityImage from '../SanityImage'
import SimplePortableText from '../portableText/SimplePortableText'

export interface PostCardProps {
    title: string
    slug: {
        current: string
    }
    author: {
        name: string
        slug: {
            current: string
        }
        picture: any
    }
    excerpt: {
        portableTextBlock: PortableTextBlock[]
    }
    image: any
}

/**
 * Post Card Component
 * Displays blog post with image, title, author, and excerpt
 */
export default function PostCard({ title, slug, author, excerpt, image }: PostCardProps) {
    const hrefSlug = `/blog/${slug.current}`
    const authorSlug = `/our-team#${author.slug.current}`

    return (
        <div data-component="PostCard" className="flex flex-col bg-white rounded-[20px] overflow-hidden">
            <Link href={hrefSlug} className="group">
                <SanityImage
                    image={image}
                    fill
                    className="w-full h-[200px] md:h-[300px] overflow-hidden transition-transform duration-200 group-hover:scale-105"
                />
            </Link>
            <div className="flex flex-col justify-start items-start text-left p-5 overflow-hidden copy-block">
                <Link href={hrefSlug} className="group">
                    <h4 className="mb-2.5 group-hover:text-orange-hover transition-colors">{title}</h4>
                </Link>
                {/* Author */}
                <div className="flex flex-row items-center gap-2.5 mb-5">
                    <SanityImage
                        image={author.picture}
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] rounded-full border border-grey-44"
                    />
                    <Link href={authorSlug}>
                        <h5 className="text-sm text-blue-33 hover:text-blue-22 transition-colors">{author.name}</h5>
                    </Link>
                </div>
                <SimplePortableText value={excerpt.portableTextBlock} />
            </div>
        </div>
    )
}

