import Link from 'next/link'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { MdFileDownload } from 'react-icons/md'
import { cn } from '@/lib/utils'

export interface CTAButtonProps {
    title: string
    kind?: 'button' | 'link'
    landingPageRoute?: {
        _id: string
        slug: string
        _type: string
    } | null
    fileDownload?: {
        asset: {
            url: string
        }
    } | null
    link?: string | null
    arrow?: boolean
    className?: string
}

/**
 * CTA Button Component
 * Handles different CTA types: landing page routes, file downloads, and external links
 * Supports both button and link styles
 */
export default function CTAButton({
    title,
    kind = 'link',
    landingPageRoute,
    fileDownload,
    link,
    arrow = false,
    className,
}: CTAButtonProps) {
    // File download handler
    if (fileDownload) {
        if (kind === 'button') {
            return (
                <Link
                    href={fileDownload.asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        'flex flex-row items-center justify-center rounded bg-orange px-4 py-2 font-bold text-white transition-colors hover:bg-grey-33',
                        className,
                    )}
                >
                    {title} <MdFileDownload className="ml-2" />
                </Link>
            )
        }

        return (
            <Link
                href={fileDownload.asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('flex flex-row items-center justify-center', className)}
            >
                {title} <MdFileDownload className="ml-2" />
            </Link>
        )
    }

    // Landing page route handler
    if (landingPageRoute && landingPageRoute.slug) {
        const href = landingPageRoute.slug.startsWith('/')
            ? landingPageRoute.slug
            : `/${landingPageRoute.slug}`

        if (kind === 'button') {
            return (
                <Link
                    href={href}
                    rel="noopener noreferrer"
                    className={cn(
                        'flex flex-row items-center justify-center rounded bg-orange px-4 py-2 font-bold text-white transition-colors hover:bg-grey-33',
                        className,
                    )}
                >
                    {title} {arrow && <HiOutlineArrowNarrowRight className="ml-2" />}
                </Link>
            )
        }

        return (
            <Link
                href={href}
                rel="noopener noreferrer"
                className={cn('flex flex-row items-center justify-center', className)}
            >
                {title} {arrow && <HiOutlineArrowNarrowRight className="ml-2" />}
            </Link>
        )
    }

    // External link handler
    if (kind === 'button') {
        return (
            <Link
                href={link || '#'}
                className={cn(
                    'flex flex-row items-center justify-center rounded bg-orange px-4 py-2 font-bold text-white transition-colors hover:bg-grey-33',
                    className,
                )}
            >
                {title} {arrow && <HiOutlineArrowNarrowRight className="ml-2" />}
            </Link>
        )
    }

    return (
        <Link
            href={link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('flex flex-row items-center justify-center', className)}
        >
            {title} {arrow && <HiOutlineArrowNarrowRight className="ml-2" />}
        </Link>
    )
}

