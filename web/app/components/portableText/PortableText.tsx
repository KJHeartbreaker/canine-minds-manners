/**
 * Custom Portable Text Component
 * Full-featured portable text renderer with support for:
 * - Images, CTAs, YouTube videos, Horizontal rules, Logo rows
 * - Custom color marks (cmmYellow, cmmBlue, cmmOrange, cmmWhite)
 * - Internal and external links
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 */

import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity'
import Link from 'next/link'
import getYouTubeID from 'get-youtube-id'

import ResolvedLink from '@/app/components/ResolvedLink'
import SanityImage from '@/app/components/SanityImage'
import CTAButton from '@/app/components/CTAButton'
import HorizontalRule from '@/app/components/HorizontalRule'
import YouTubePlayer from '@/app/components/YouTubePlayer'
import LogoRow from '../rows/LogoRow'

interface CustomPortableTextProps {
  className?: string
  value: PortableTextBlock[]
  paragraphClasses?: string
}

export default function CustomPortableText({
  className,
  value,
  paragraphClasses,
}: CustomPortableTextProps) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        // Check if children is an array with a single empty string
        if (Array.isArray(children) && children.length === 1 && children[0] === '') {
          return <br />
        }
        return <p className={paragraphClasses || className}>{children}</p>
      },
      h1: ({ children, value }) => (
        <h1 className="group relative">
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h1>
      ),
      h2: ({ children, value }) => (
        <h2 className="group relative">
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h2>
      ),
    },
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
      internalLink: ({ children, value }) => {
        // Handle internal links - item is dereferenced in the query
        // For classes: item.slug is a string, item.parentPage.parentSlug is a string
        // For pages: item.slug is a string
        const item = value?.item

        // If item is still a reference, it means the query didn't dereference it
        if (item?._ref || item?._type === 'reference') {
          console.warn('internalLink item is still a reference - query issue:', item)
          return <span>{children}</span>
        }

        if (!item) {
          console.warn('internalLink missing item:', value)
          return <span>{children}</span>
        }

        const slug = item.slug // Already a string from query (not slug.current)
        const parentSlug = item.parentPage?.parentSlug // Already a string from query

        if (!slug) {
          console.warn('internalLink missing slug:', item)
          return <span>{children}</span>
        }

        const href = parentSlug ? `/${parentSlug}#${slug}` : `/${slug}`
        return <Link href={href}>{children}</Link>
      },
      cmmYellow: ({ children }) => <span className="text-yellow">{children}</span>,
      cmmBlue: ({ children }) => <span className="text-blue-33">{children}</span>,
      cmmOrange: ({ children }) => <span className="text-orange">{children}</span>,
      cmmWhite: ({ children }) => <span className="text-white">{children}</span>,
    },
    types: {
      image: ({ value }: { value: any }) => (
        <div className="my-6 space-y-2">
          <SanityImage image={value} alt={value?.alt} />
        </div>
      ),
      hr: ({ value }: { value: { width?: string; size?: string; align?: 'left' | 'center' | 'right' } }) => (
        <HorizontalRule width={value?.width} size={value?.size} align={value?.align} />
      ),
      cta: ({ value }: { value: any }) => {
        return (
          <div className="my-3">
            <CTAButton
              title={value?.title}
              kind={value?.kind}
              landingPageRoute={value?.landingPageRoute}
              link={value?.link}
              arrow={value?.arrow}
              fileDownload={value?.fileDownload}
            />
          </div>
        )
      },
      youtube: ({ value }: { value: { url?: string } }) => {
        const { url } = value
        if (!url) {
          return <div>Missing YouTube URL</div>
        }

        const id = getYouTubeID(url)
        if (!id) {
          return <div>Invalid YouTube URL</div>
        }

        return <YouTubePlayer videoId={id} />
      },
      logoRow: ({ value }: { value: { logoRow?: any[] } }) => <LogoRow logos={value?.logoRow || []} />,
    },
  }

  return (
    <div className={className}>
      <PortableText components={components} value={value} />
    </div>
  )
}
