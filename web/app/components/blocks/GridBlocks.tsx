'use client'

import ContentBlock from './ContentBlock'
import TrainersGrid from '../grids/TrainersGrid'
import ProgramsGrid from '../grids/ProgramsGrid'
import PostsGrid from '../grids/PostsGrid'
import ProductGrid from '../grids/ProductGrid'
import TestimonialsGrid from '../grids/TestimonialsGrid'
import RelatedResourcesGrid from '../grids/RelatedResourcesGrid'

interface BaseGridBlockProps {
    block: {
        _key: string
        _type: string
        backgroundColor?: string
        image?: any
        overlay?: 'noOverlay' | 'darkOverlay' | 'blueOverlay'
        removeBottomPadding?: boolean
        skinny?: boolean
        title?: string
        titleColor?: string
    }
    index: number
}

/**
 * Trainers Grid Block
 */
export function TrainersGridBlock({ block }: BaseGridBlockProps) {
    const { trainers, backgroundColor, removeBottomPadding, skinny } = block as any

    return (
        <ContentBlock
            bgColor={backgroundColor}
            bgImage={null}
            overlay="noOverlay"
            removeBottomPadding={removeBottomPadding}
            skinny={skinny}
        >
            <TrainersGrid trainers={trainers || []} />
        </ContentBlock>
    )
}

/**
 * Programs Grid Block
 */
export function ProgramsGridBlock({ block }: BaseGridBlockProps) {
    const { programs, backgroundColor, removeBottomPadding, skinny } = block as any

    return (
        <ContentBlock
            bgColor={backgroundColor}
            bgImage={null}
            overlay="noOverlay"
            removeBottomPadding={removeBottomPadding}
            skinny={skinny}
        >
            <ProgramsGrid programsArr={programs || []} />
        </ContentBlock>
    )
}

/**
 * Posts Grid Block
 */
export function PostsGridBlock({ block }: BaseGridBlockProps) {
    const { posts, backgroundColor, removeBottomPadding, skinny } = block as any

    return (
        <ContentBlock
            bgColor={backgroundColor}
            bgImage={null}
            overlay="noOverlay"
            removeBottomPadding={removeBottomPadding}
            skinny={skinny}
        >
            <PostsGrid postsArr={posts || []} />
        </ContentBlock>
    )
}

/**
 * Product Grid Block
 */
export function ProductGridBlock({ block }: BaseGridBlockProps) {
    const { productsArr, backgroundColor, image, overlay, removeBottomPadding, skinny } = block as any

    return (
        <ContentBlock
            bgColor={backgroundColor}
            bgImage={image || null}
            overlay={overlay || 'noOverlay'}
            removeBottomPadding={removeBottomPadding}
            skinny={skinny}
        >
            <ProductGrid panels={productsArr || []} />
        </ContentBlock>
    )
}

/**
 * Testimonials Grid Block
 */
export function TestimonialsGridBlock({ block }: BaseGridBlockProps) {
    const { testimonialsArr, backgroundColor, image, overlay, removeBottomPadding, skinny, title, titleColor } = block as any

    return (
        <ContentBlock
            bgColor={backgroundColor}
            bgImage={image || null}
            overlay={overlay || 'noOverlay'}
            removeBottomPadding={removeBottomPadding}
            skinny={skinny}
        >
            <TestimonialsGrid
                panels={testimonialsArr || []}
                title={title}
                titleColor={titleColor}
            />
        </ContentBlock>
    )
}

/**
 * Related Resources Grid Block
 */
export function RelatedResourcesGridBlock({ block }: BaseGridBlockProps) {
    const { relatedResources, backgroundColor, removeBottomPadding, title, titleColor } = block as any

    return (
        <ContentBlock
            bgColor={backgroundColor}
            bgImage={null}
            overlay="noOverlay"
            removeBottomPadding={removeBottomPadding}
            skinny={true}
        >
            <RelatedResourcesGrid
                relatedResourcesArr={relatedResources || []}
                title={title || ''}
                titleColor={titleColor}
                backgroundColor={backgroundColor}
            />
        </ContentBlock>
    )
}

