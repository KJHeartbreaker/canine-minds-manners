import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { type PortableTextBlock, toPlainText } from 'next-sanity'
import Link from 'next/link'

import SanityImage from '@/app/components/SanityImage'
import ShareButtons from '@/app/components/ShareButtons'
import PortableText from '@/app/components/portableText/PortableText'
import { ArticleSchema, BreadcrumbListSchemaComponent } from '@/app/components/StructuredData'
import { sanityFetch } from '@/sanity/lib/live'
import { postPagesSlugs, postQuery, settingsQuery } from '@/sanity/lib/queries'
import { getSiteUrl } from '@/sanity/lib/site-url'
import { resolveOpenGraphImage, urlForImage } from '@/sanity/lib/utils'
import type { PostWithSEO } from '@/sanity/lib/types'

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const [{ data: post }, { data: settings }] = await Promise.all([
    sanityFetch({
      query: postQuery,
      params,
      // Metadata should never contain stega
      stega: false,
    }),
    sanityFetch({
      query: settingsQuery,
      stega: false,
    }),
  ])

  if (!post) {
    return {}
  }

  // Type assertion to include SEO fields
  const typedPost = post as PostWithSEO

  // Get SEO fields with fallbacks
  const seoTitle = typedPost.seo?.seoTitle || typedPost.title
  const seoDescription = typedPost.seo?.seoDescription || (typedPost.excerpt ? toPlainText(typedPost.excerpt as any) : '')
  const noindex = typedPost.seo?.noindex || false
  const canonicalUrl = typedPost.seo?.canonicalUrl

  // Get site URL for canonical
  const siteUrl = await getSiteUrl()
  const slug = typedPost.slug?.current || params.slug
  const canonical = canonicalUrl || `${siteUrl}/blog/${slug}`

  // Get OpenGraph image with fallback chain: seo.ogImage → post image → settings ogImage
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(
    typedPost?.seo?.ogImage || typedPost?.image || settings?.ogImage,
  )

  return {
    authors: post?.author?.name ? [{ name: post.author.name }] : [],
    title: seoTitle,
    description: seoDescription,
    robots: noindex ? 'noindex' : undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      siteName: settings?.title || 'Canine Minds & Manners',
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ogImage ? [ogImage.url] : [],
    },
  } satisfies Metadata
}

export default async function PostPage(props: Props) {
  const params = await props.params
  const [{ data: post }] = await Promise.all([sanityFetch({ query: postQuery, params })])

  if (!post?._id) {
    return notFound()
  }

  // Type assertion to include SEO fields
  const typedPost = post as PostWithSEO

  // Get SEO fields with fallbacks (same as generateMetadata)
  const seoTitle = typedPost.seo?.seoTitle || typedPost.title
  const seoDescription = typedPost.seo?.seoDescription || (typedPost.excerpt ? toPlainText(typedPost.excerpt as any) : '')

  // Author and body are required in schema
  const authorSlug = `/our-team#${((typedPost.author as unknown as { slug: { current: string } })?.slug?.current)}`
  const postImage = typedPost.image
  const postBody = (typedPost.body as unknown as { portableTextBlock: PortableTextBlock[] })?.portableTextBlock

  // Get post image URL for structured data
  const postImageUrl = postImage ? urlForImage(postImage)?.url() : undefined

  // Get OG image URL for structured data
  const ogImageForSchema = resolveOpenGraphImage(
    typedPost?.seo?.ogImage || typedPost?.image || undefined,
  )

  // Build breadcrumbs: Home → Blog → Post Title
  const siteUrl = await getSiteUrl()
  const postSlug = post.slug?.current || params.slug
  // Use base title (not seoTitle which may include site name suffix)
  const postTitle = post.title || 'Post'
  const breadcrumbs = [
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: `${siteUrl}/blog` },
    { name: postTitle, url: `${siteUrl}/blog/${postSlug}` },
  ]

  return (
    <>
      {/* Breadcrumb structured data */}
      <BreadcrumbListSchemaComponent items={breadcrumbs} />
      {/* Article structured data for blog posts */}
      <ArticleSchema
        title={seoTitle}
        description={seoDescription}
        url={`/blog/${post.slug?.current || params.slug}`}
        image={ogImageForSchema?.url || postImageUrl}
        author={
          post.author?.name
            ? {
              name: post.author.name,
              url: authorSlug,
            }
            : undefined
        }
        datePublished={post._createdAt}
        dateModified={post._updatedAt}
      />
      <div data-component="PostPage" className="mx-auto px-5 py-5 sm:px-9 sm:py-9 flex flex-col items-start max-w-[720px] md:max-w-[960px]">
        <h1 className="title mb-10">{post.title}</h1>

        {postImage && (
          <SanityImage
            image={postImage}
            width={960}
            height={600}
            className="w-full mb-5 post-image"
            priority
          />
        )}

        {post.subheader && <h3 className="subheader mb-5">{post.subheader}</h3>}

        <div className="flex flex-col sm:flex-row w-full justify-between items-center mb-5 blog-guts">
          {post.author && (
            <div className="flex flex-1 w-full items-center gap-2.5 mb-0">
              {post.author.picture && (
                <SanityImage
                  image={post.author.picture}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <Link href={authorSlug}>
                <h5 className="text-sm text-blue-33 hover:text-blue-22 transition-colors">
                  {post.author.name}
                </h5>
              </Link>
            </div>
          )}
          <ShareButtons shareUrl={`blog/${post.slug.current}`} title={post.title || ''} />
        </div>

        {postBody && postBody.length > 0 && (
          <PortableText value={postBody as PortableTextBlock[]} />
        )}
      </div>
    </>
  )
}

