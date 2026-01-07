import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity'
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
        },
    }

    return <PortableText components={components} value={value} />
}

