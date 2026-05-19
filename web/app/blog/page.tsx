import type { Metadata } from 'next'

import PageBuilder from '@/app/components/PageBuilder'
import { BreadcrumbListSchemaComponent } from '@/app/components/StructuredData'
import PostsGrid from '@/app/components/grids/PostsGrid'
import { PostCardProps } from '@/app/components/cards/PostCard'
import { sanityFetch } from '@/sanity/lib/live'
import { allPostsQuery, blogLandingPageQuery, settingsQuery } from '@/sanity/lib/queries'
import { getSiteUrl } from '@/sanity/lib/site-url'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { GetPageQueryResult } from '@/sanity.types'
import type { BlogLandingPageWithSEO } from '@/sanity/lib/types'

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: page }, { data: settings }] = await Promise.all([
    sanityFetch({
      query: blogLandingPageQuery,
      tags: ['blogLandingPage'],
      stega: false,
    }),
    sanityFetch({
      query: settingsQuery,
      tags: ['settings'],
      stega: false,
    }),
  ])

  if (!page) {
    return {}
  }

  // Type assertion to include SEO fields
  const typedPage = page as BlogLandingPageWithSEO

  // Get SEO fields with fallbacks
  const seoTitle = typedPage.seo?.seoTitle || typedPage.title
  const seoDescription = typedPage.seo?.seoDescription || ''
  const noindex = typedPage.seo?.noindex || false
  const canonicalUrl = typedPage.seo?.canonicalUrl

  // Get site URL for canonical
  const siteUrl = await getSiteUrl()
  const canonical = canonicalUrl || `${siteUrl}/blog`

  // Get OpenGraph image with fallback chain: seo.ogImage → hero image → settings ogImage
  const content = typedPage.content as any[] | undefined
  const heroImage = content?.find(
    (block: any) => block._type === 'Hero Banner' && block.image,
  )?.image
  const ogImage = resolveOpenGraphImage(
    typedPage.seo?.ogImage || heroImage || settings?.ogImage,
  )

  return {
    title: seoTitle,
    description: seoDescription,
    robots: noindex ? 'noindex' : undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'website',
      siteName: settings?.title || 'Canine Minds & Manners',
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ogImage ? [ogImage.url] : [],
    },
  } satisfies Metadata
}

export default async function BlogPage() {
  const { data: page } = await sanityFetch({
    query: blogLandingPageQuery,
    tags: ['blogLandingPage'],
  })

  const siteUrl = await getSiteUrl()
  const pageTitle = (page as any)?.title || 'Blog'

  // Build breadcrumbs: Home → Blog
  const breadcrumbs = [
    { name: 'Home', url: siteUrl },
    { name: pageTitle, url: `${siteUrl}/blog` },
  ]

  // If there's content configured in Sanity, use PageBuilder
  if ((page as any)?.content && (page as any).content.length > 0) {
    return (
      <>
        <BreadcrumbListSchemaComponent items={breadcrumbs} />
        <PageBuilder page={page as GetPageQueryResult} />
      </>
    )
  }

  // Otherwise, fetch all posts and display them
  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
    tags: ['post'],
  })

  if (!posts || posts.length === 0) {
    return (
      <>
        <BreadcrumbListSchemaComponent items={breadcrumbs} />
        <div className="container py-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            No blog posts yet
          </h1>
          <p className="mt-2 text-base text-gray-500">Check back soon for new content!</p>
        </div>
      </>
    )
  }

  // Type assertion needed because generated types are overly nullable
  // The actual query returns data matching PostCardProps structure
  return (
    <>
      <BreadcrumbListSchemaComponent items={breadcrumbs} />
      <PostsGrid postsArr={posts as unknown as PostCardProps[]} />
    </>
  )
}

