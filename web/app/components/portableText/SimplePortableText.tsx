import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SimplePortableTextProps {
    value: PortableTextBlock[]
    paragraphClasses?: string
    className?: string
}

/**
 * Simple Portable Text Component
 * Renders portable text with minimal styling, suitable for card content
 */
export default function SimplePortableText({
    value,
    paragraphClasses,
    className,
}: SimplePortableTextProps) {
    const components: PortableTextComponents = {
        types: {
            // @ts-ignore - simplePortableTextBlock type
            simplePortableTextBlock: ({ children }) => (
                <p className={cn(paragraphClasses, className)}>{children}</p>
            ),
        },
        block: {
            normal: ({ children }) => <p className={cn(paragraphClasses, className)}>{children}</p>,
        },
        marks: {
            link: ({ children, value: link }) => (
                <a
                    href={link?.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition hover:opacity-50"
                >
                    {children}
                </a>
            ),
            internalLink: ({ children, value }) => {
                // Handle internal links - item is dereferenced in the query
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

                const slug = item.slug
                const parentSlug = item.parentPage?.parentSlug

                if (!slug) {
                    console.warn('internalLink missing slug:', item)
                    return <span>{children}</span>
                }

                const href = parentSlug ? `/${parentSlug}#${slug}` : `/${slug}`
                return <Link href={href} className="transition hover:opacity-50">{children}</Link>
            },
        },
    }

    return <PortableText components={components} value={value} />
}

