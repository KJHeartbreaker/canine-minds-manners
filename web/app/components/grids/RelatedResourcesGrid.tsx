'use client'

import ContentContainer from '../wrappers/ContentContainer'
import PostCard, { PostCardProps } from '../cards/PostCard'
import DownloadCard, { DownloadCardProps } from '../cards/DownloadCard'
import { getStableKey } from '../types'

interface RelatedResourcesGridProps {
    relatedResourcesArr: (PostCardProps | DownloadCardProps)[]
    title: string
    titleColor?: string
    backgroundColor?: string
}

/**
 * Related Resources Grid Component
 * Displays related posts and downloads in a responsive grid layout
 */
export default function RelatedResourcesGrid({
    title,
    titleColor = 'var(--color-grey-33)',
    backgroundColor,
    relatedResourcesArr,
}: RelatedResourcesGridProps) {
    if (!relatedResourcesArr || relatedResourcesArr.length === 0) {
        return null
    }

    return (
        <ContentContainer
            data-component="RelatedResourcesGrid"
            className="flex flex-col pb-10"
            style={{ backgroundColor: backgroundColor || 'transparent' }}
        >
            <h2 className="mb-5" style={{ color: titleColor }}>
                {title}
            </h2>
            <div className="grid grid-cols-1 gap-2.5 w-full sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                {relatedResourcesArr.map((rr, i) => (
                    <div key={getStableKey(rr as { _id?: string; _key?: string }, i)} className="h-full">
                        {'author' in rr ? (
                            <PostCard
                                title={rr.title}
                                slug={rr.slug}
                                author={rr.author}
                                image={rr.image}
                                excerpt={rr.excerpt}
                            />
                        ) : (
                            <DownloadCard
                                title={rr.title}
                                image={rr.image}
                                excerpt={rr.excerpt}
                                file={rr.file}
                            />
                        )}
                    </div>
                ))}
            </div>
        </ContentContainer>
    )
}

