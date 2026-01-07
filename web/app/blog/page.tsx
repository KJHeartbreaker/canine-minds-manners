import type { Metadata } from 'next'

import PageBuilder from '@/app/components/PageBuilder'
import PostsGrid from '@/app/components/grids/PostsGrid'
import { PostCardProps } from '@/app/components/cards/PostCard'
import { sanityFetch } from '@/sanity/lib/live'
import { allPostsQuery, blogLandingPageQuery } from '@/sanity/lib/queries'
import { GetPageQueryResult } from '@/sanity.types'

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: blogLandingPageQuery,
    stega: false,
  })

  return {
    title: (page as any)?.title,
    description: (page as any)?.overview?.[0]?.children?.[0]?.text,
  }
}

export default async function BlogPage() {
  const { data: page } = await sanityFetch({
    query: blogLandingPageQuery,
  })

  // If there's content configured in Sanity, use PageBuilder
  if ((page as any)?.content && (page as any).content.length > 0) {
    return <PageBuilder page={page as GetPageQueryResult} />
  }

  // Otherwise, fetch all posts and display them
  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
  })

  if (!posts || posts.length === 0) {
    return (
      <div className="container py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          No blog posts yet
        </h1>
        <p className="mt-2 text-base text-gray-500">Check back soon for new content!</p>
      </div>
    )
  }

  // Type assertion needed because generated types are overly nullable
  // The actual query returns data matching PostCardProps structure
  return <PostsGrid postsArr={posts as unknown as PostCardProps[]} />
}

