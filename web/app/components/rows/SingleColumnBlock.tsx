'use client'

import { PortableTextBlock } from 'next-sanity'
import { cn } from '@/lib/utils'
import ContentContainer from '../wrappers/ContentContainer'
import CustomPortableText from '../portableText/PortableText'
import FAQ from '../FAQ'

interface SingleColumnContentBlockProps {
    centerContent?: boolean
    content: {
        contentType?: 'mainPortableText' | 'faq'
        portableTextBlock?: {
            portableTextBlock: PortableTextBlock[]
        }
        faq?: {
            items: Array<{
                _key: string
                question: string
                answer: {
                    portableTextBlock: PortableTextBlock[]
                }
            }>
        }
    }
}

/**
 * Single Column Content Block Component
 * Displays portable text content or FAQ in a single column layout
 */
export default function SingleColumnContentBlock({
    centerContent = false,
    content,
}: SingleColumnContentBlockProps) {
    const { contentType = 'mainPortableText', portableTextBlock, faq } = content

    return (
        <ContentContainer data-component="SingleColumnContentBlock" className={cn('flex flex-col w-full', centerContent && 'text-center items-center')}>
            {contentType === 'faq' && faq?.items && faq.items.length > 0 && (
                <FAQ items={faq.items} />
            )}
            {contentType === 'mainPortableText' && portableTextBlock?.portableTextBlock && (
                <CustomPortableText
                    value={portableTextBlock.portableTextBlock}
                    className={centerContent ? 'w-full' : undefined}
                    centered={centerContent}
                />
            )}
        </ContentContainer>
    )
}

