import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageBuilderPage from '@/app/components/PageBuilder'
import { BreadcrumbListSchemaComponent } from '@/app/components/StructuredData'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery, pagesSlugs, settingsQuery } from '@/sanity/lib/queries'
import { getSiteUrl } from '@/sanity/lib/site-url'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { GetPageQueryResult } from '@/sanity.types'
import type { PageWithSEO } from '@/sanity/lib/types'

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const [{ data: page }, { data: settings }] = await Promise.all([
    sanityFetch({
      query: getPageQuery,
      params,
      // Metadata should never contain stega
      stega: false,
    }),
    sanityFetch({
      query: settingsQuery,
      stega: false,
    }),
  ])

  if (!page) {
    return {}
  }

  // Type assertion to include SEO fields
  const typedPage = page as PageWithSEO

  // Get SEO fields with fallbacks
  const seoTitle = typedPage.seo?.seoTitle || typedPage.title
  const seoDescription = typedPage.seo?.seoDescription || undefined
  const noindex = typedPage.seo?.noindex || false
  const canonicalUrl = typedPage.seo?.canonicalUrl

  // Get site URL for canonical
  const siteUrl = await getSiteUrl()
  const slug = typedPage.slug?.current || params.slug
  const canonical = canonicalUrl || `${siteUrl}/${slug}`

  // Get OpenGraph image with fallback chain: seo.ogImage → hero image → settings ogImage
  const content = typedPage.content as any[] | undefined
  const heroImage = content?.find(
    (block: any) => block._type === 'Hero Banner' && block.image,
  )?.image
  const ogImage = resolveOpenGraphImage(
    typedPage.seo?.ogImage || heroImage || settings?.ogImage,
  )

  return {
    title: seoTitle || 'Page', // Ensure we always have a title
    description: seoDescription,
    robots: noindex ? 'noindex' : undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title: seoTitle || 'Page',
      description: seoDescription,
      type: 'website',
      siteName: settings?.title || 'Canine Minds & Manners',
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle || 'Page',
      description: seoDescription,
      images: ogImage ? [ogImage.url] : [],
    },
  } satisfies Metadata
}

export default async function Page(props: Props) {
  const params = await props.params
  const [{ data: page }] = await Promise.all([sanityFetch({ query: getPageQuery, params })])

  if (!page?._id) {
    return notFound()
  }

  const siteUrl = await getSiteUrl()
  const slug = page.slug?.current || params.slug
  // Use the base title (not seoTitle which may include site name suffix)
  const pageTitle = page.title || 'Page'

  // Build breadcrumbs: Home → Page Name
  const breadcrumbs = [
    { name: 'Home', url: siteUrl },
    { name: pageTitle, url: `${siteUrl}/${slug}` },
  ]

  return (
    <>
      <BreadcrumbListSchemaComponent items={breadcrumbs} />
      <PageBuilderPage page={page as GetPageQueryResult} />
    </>
  )
}
