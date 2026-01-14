'use client'

import { PortableTextBlock } from 'next-sanity'
import ContentBlock from './ContentBlock'
import SingleColumnBlock from '../rows/SingleColumnBlock'
import RowContainer from '../rows/RowContainer'

interface BaseContentBlockProps {
    block: {
        _key: string
        _type: string
        backgroundColor?: string
        image?: any
        overlay?: 'noOverlay' | 'darkOverlay' | 'blueOverlay'
        removeBottomPadding?: boolean
        skinny?: boolean
        centerContent?: boolean
        contentBlock?: {
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
        rowContent?: any[]
        row?: 'twoColumn' | 'threeColumn'
        title?: string
        titleColor?: string
        hideTitle?: boolean
        centerTitle?: boolean
        condensedCopy?: boolean
        centerCopy?: boolean
    }
    index: number
}

/**
 * Single Column Content Block
 */
export function SingleColumnContentBlock({ block }: BaseContentBlockProps) {
    const {
        backgroundColor,
        removeBottomPadding,
        skinny,
        centerContent,
        contentBlock,
        contentType,
    } = block as any

    return (
        <ContentBlock
            bgColor={backgroundColor}
            bgImage={null}
            overlay="noOverlay"
            removeBottomPadding={removeBottomPadding}
            skinny={skinny}
        >
            {contentBlock && (
                <SingleColumnBlock
                    centerContent={centerContent}
                    content={contentBlock}
                />
            )}
        </ContentBlock>
    )
}

/**
 * Content Rows Block
 */
export function ContentRowsBlock({ block }: BaseContentBlockProps) {
    const {
        backgroundColor,
        image,
        overlay,
        removeBottomPadding,
        rowContent,
        row,
        title,
        titleColor,
        hideTitle,
        centerTitle,
        condensedCopy,
        centerCopy,
    } = block as any

    return (
        <ContentBlock
            bgColor={backgroundColor}
            bgImage={image || null}
            overlay={overlay || 'noOverlay'}
            removeBottomPadding={removeBottomPadding}
            skinny={false}
        >
            {rowContent && (
                <RowContainer
                    row={row}
                    content={rowContent}
                    title={title}
                    hideTitle={hideTitle}
                    centerTitle={centerTitle}
                    titleColor={titleColor}
                    condensedCopy={condensedCopy}
                    centerCopy={centerCopy}
                />
            )}
        </ContentBlock>
    )
}

