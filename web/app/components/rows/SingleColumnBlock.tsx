'use client'

import { PortableTextBlock } from 'next-sanity'
import { cn } from '@/lib/utils'
import ContentContainer from '../wrappers/ContentContainer'
import CustomPortableText from '../portableText/PortableText'

interface SingleColumnContentBlockProps {
    centerContent?: boolean
    content: {
        portableTextBlock: PortableTextBlock[]
    }
}

/**
 * Single Column Content Block Component
 * Displays portable text content in a single column layout
 */
export default function SingleColumnContentBlock({
    centerContent = false,
    content,
}: SingleColumnContentBlockProps) {
    const { portableTextBlock } = content

    return (
        <ContentContainer data-component="SingleColumnContentBlock" className={cn('flex flex-col w-full', centerContent && 'text-center items-center')}>
            {portableTextBlock && (
                <CustomPortableText
                    value={portableTextBlock}
                    className={centerContent ? 'w-full' : undefined}
                />
            )}
        </ContentContainer>
    )
}

