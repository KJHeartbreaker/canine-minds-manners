import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'
import { cn } from '@/lib/utils'
import { SanityIcon } from './SanityImage'
import SimplePortableText from './SimplePortableText'
import CTAButton, { CTAButtonProps } from './CTAButton'

export interface IconCardProps {
    icon: {
        alt: string
        asset: {
            _id: string
        }
    }
    heading: string
    copy: {
        portableTextBlock: PortableTextBlock[]
    }
    cta?: CTAButtonProps | null
}

/**
 * Icon Card Component
 * Displays an icon in a yellow circle, heading, copy text, and optional CTA
 */
export default function IconCard({ icon, heading, copy, cta }: IconCardProps) {
    return (
        <div className="flex flex-col justify-start items-center h-full bg-white py-10 px-3 rounded-[20px] md:py-[60px] md:px-5">
            {/* Icon Container */}
            <div className="flex items-center justify-center w-[65px] h-[65px] rounded-full bg-yellow md:w-[85px] md:h-[85px]">
                {cta?.landingPageRoute?.slug ? (
                    <Link href={cta.landingPageRoute.slug}>
                        <SanityIcon image={icon} alt={icon.alt} size={40} className="md:w-[50px] md:h-[50px]" />
                    </Link>
                ) : (
                    <SanityIcon image={icon} alt={icon.alt} size={40} className="md:w-[50px] md:h-[50px]" />
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col items-center text-center">
                <h4 className={cn('my-5 font-mono text-blue-33')}>{heading}</h4>
                <SimplePortableText value={copy.portableTextBlock} />
                {cta?.landingPageRoute?.slug && (
                    <CTAButton
                        title={cta.title}
                        kind={cta.kind}
                        landingPageRoute={cta.landingPageRoute}
                        arrow={cta.arrow}
                    />
                )}
            </div>
        </div>
    )
}

