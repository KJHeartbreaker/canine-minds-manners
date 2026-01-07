import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { type PortableTextBlock } from 'next-sanity'
import Link from 'next/link'

import SanityImage from '@/app/components/SanityImage'
import ShareButtons from '@/app/components/ShareButtons'
import PortableText from '@/app/components/portableText/PortableText'
import { sanityFetch } from '@/sanity/lib/live'
import { postPagesSlugs, postQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

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
  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(post?.image)

  return {
    authors: post?.author?.name ? [{ name: post.author.name }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function PostPage(props: Props) {
  const params = await props.params
  const [{ data: post }] = await Promise.all([sanityFetch({ query: postQuery, params })])

  if (!post?._id) {
    return notFound()
  }

  // Author and body are required in schema
  const authorSlug = `/our-team#${((post.author as unknown as { slug: { current: string } })?.slug?.current)}`
  const postImage = post.image
  const postBody = (post.body as unknown as { portableTextBlock: PortableTextBlock[] })?.portableTextBlock

  return (
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
  )
}

