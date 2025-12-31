'use client'

import ContentContainer from './ContentContainer'
import PostCard, { PostCardProps } from './PostCard'
import { getStableKey } from './types'

interface PostsGridProps {
    postsArr: PostCardProps[]
}

/**
 * Posts Grid Component
 * Displays blog posts in a responsive grid layout
 */
export default function PostsGrid({ postsArr }: PostsGridProps) {
    if (!postsArr || postsArr.length === 0) {
        return null
    }

    return (
        <ContentContainer className="grid grid-cols-1 gap-2.5 p-5 w-full xs:grid-cols-2 md:grid-cols-3 md:gap-5">
            {postsArr.map((post, i) => (
                <PostCard
                    key={getStableKey({ _id: post.slug?.current, _key: post.slug?.current }, i)}
                    title={post.title}
                    slug={post.slug}
                    author={post.author}
                    image={post.image}
                    excerpt={post.excerpt}
                />
            ))}
        </ContentContainer>
    )
}

