'use client'

import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    EmailShareButton,
    EmailIcon,
} from 'next-share'

interface ShareButtonsProps {
    shareUrl: string
    title: string
}

/**
 * ShareButtons Component
 * Provides social media sharing buttons for blog posts
 */
export default function ShareButtons({ shareUrl, title }: ShareButtonsProps) {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.caninemindsandmanners.ca'
    const url = `${baseUrl}/${shareUrl}`

    return (
        <div data-component="ShareButtons" className="flex flex-row items-center gap-2.5">
            <h5 className="text-sm text-grey-33 mb-0">Share via:</h5>
            <FacebookShareButton url={url}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={url}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <EmailShareButton url={url} subject={title} body={`Check out this blog post on Canine Minds & Manners: ${title}`}>
                <EmailIcon size={32} round />
            </EmailShareButton>
        </div>
    )
}

