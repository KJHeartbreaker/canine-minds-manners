'use client'

import { PortableTextBlock } from 'next-sanity'
import { cn } from '@/lib/utils'
import IconCard from '../cards/IconCard'
import SanityImage from '../SanityImage'
import ImageButtonCard from '../cards/ImageButtonCard'
import CustomPortableText from '../portableText/PortableText'
import Carousel from '../Carousel'
import ContactFormPanel from '../forms/ContactFormPanel'

interface PanelContent {
    _key: string
    _type: string
    title?: string
    icon?: any
    heading?: string
    copy?: {
        portableTextBlock?: PortableTextBlock[]
    }
    portableTextBlock?: PortableTextBlock[]
    asset?: any
    alt?: string
    crop?: any
    hotspot?: any
    cta?: any
    landingPageRoute?: {
        _id: string
        slug: string
        _type: string
    }
    image?: any
    centerCopy?: boolean
    carouselImages?: any[]
}

interface RowColumnProps extends PanelContent {
    condensedCopy?: boolean
}

/**
 * Row Column Component
 * Renders different content types within a row (icon card, image button, portable text, carousel, form, etc.)
 */
export default function RowColumn(panel: RowColumnProps) {
    const {
        _type,
        title,
        icon,
        heading,
        copy,
        portableTextBlock,
        asset,
        cta,
        landingPageRoute,
        image,
        centerCopy,
        carouselImages,
        condensedCopy,
    } = panel

    return (
        <div data-component="RowColumn" className={cn('flex flex-col w-full', condensedCopy ? 'h-fit' : 'h-full', _type === 'carousel' && 'overflow-hidden h-[450px] md:h-[650px]')}>
            {_type === 'acuityForm' && <ContactFormPanel title={title} copy={copy} type="acuityForm" />}
            {_type === 'carousel' && carouselImages && (
                <div className="w-full rounded-lg overflow-hidden">
                    <Carousel carouselImages={carouselImages} />
                </div>
            )}
            {_type === 'form' && <ContactFormPanel title={title} copy={copy} type="form" />}
            {_type === 'iconCard' && icon && heading && copy?.portableTextBlock && (
                <IconCard icon={icon} heading={heading} copy={{ portableTextBlock: copy.portableTextBlock }} cta={cta} />
            )}
            {_type === 'imageButtonCard' && image && heading && copy?.portableTextBlock && landingPageRoute && (
                <ImageButtonCard
                    key={panel._key}
                    image={image}
                    heading={heading}
                    copy={{ portableTextBlock: copy.portableTextBlock }}
                    landingPageRoute={landingPageRoute}
                />
            )}
            {_type === 'mainImage' && asset && (
                <div className="flex w-full max-h-[600px] lg:max-h-[750px]">
                    <SanityImage
                        image={{
                            asset,
                            alt: panel.alt,
                            crop: panel.crop,
                            hotspot: panel.hotspot,
                        }}
                        alt={panel.alt || asset?.alt}
                        width={1200}
                        height={750}
                        className="w-full object-cover"
                    />
                </div>
            )}
            {_type === 'mainPortableText' && portableTextBlock && portableTextBlock.length > 0 && (
                <div className={cn('flex flex-col justify-center w-full', condensedCopy && 'sm:items-center')}>
                    <div className={cn('copy-block', centerCopy && 'text-center')}>
                        <CustomPortableText value={portableTextBlock} />
                    </div>
                </div>
            )}
        </div>
    )
}

