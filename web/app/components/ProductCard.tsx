'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import SanityImage from './SanityImage'
import CTAButton, { CTAButtonProps } from './CTAButton'

export interface ProductCardProps {
    key: string
    image: any
    heading: string
    price: number
    cta: CTAButtonProps
}

/**
 * Product Card Component
 * Displays product information with image, heading, price, and CTA button
 */
export default function ProductCard({ image, heading, price, cta }: ProductCardProps) {
    const href = cta.landingPageRoute?.slug
        ? cta.landingPageRoute.slug.startsWith('/')
            ? cta.landingPageRoute.slug
            : `/${cta.landingPageRoute.slug}`
        : '#'

    return (
        <div className="flex h-full flex-col items-center bg-white px-20 py-20">
            <Link href={href}>
                <SanityImage image={image} width={300} height={300} className="object-contain" />
            </Link>
            <div className="flex flex-col items-center text-center">
                <h4 className={cn('my-5 font-mono text-blue-33')}>{heading}</h4>
                <p>{`$${price.toFixed(2)}`}</p>
                <CTAButton
                    title={cta.title}
                    kind={cta.kind}
                    landingPageRoute={cta.landingPageRoute}
                    arrow={cta.arrow}
                />
            </div>
        </div>
    )
}

