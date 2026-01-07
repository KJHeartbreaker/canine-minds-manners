import type { Metadata } from 'next'

import PageBuilderPage from '@/app/components/PageBuilder'
import { sanityFetch } from '@/sanity/lib/live'
import { getHomePageQuery, settingsQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { GetPageQueryResult } from '@/sanity.types'

/**
 * Generate metadata for the homepage.
 */
export async function generateMetadata(): Promise<Metadata> {
  const [{ data: page }, { data: settings }] = await Promise.all([
    sanityFetch({
      query: getHomePageQuery,
      // Metadata should never contain stega
      stega: false,
    }),
    sanityFetch({
      query: settingsQuery,
      stega: false,
    }),
  ])

  const typedPage = page as GetPageQueryResult | null

  // Get OpenGraph image from settings (fallback) or first hero banner image
  const content = typedPage?.content as any[] | undefined
  const heroImage = content?.find(
    (block: any) => block._type === 'Hero Banner' && block.image,
  )?.image
  const ogImage = resolveOpenGraphImage(heroImage || settings?.ogImage)

  return {
    title: typedPage?.name || typedPage?.heading || undefined,
    description: typedPage?.subheading || undefined,
    openGraph: {
      title: typedPage?.name || typedPage?.heading || undefined,
      description: typedPage?.subheading || undefined,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: typedPage?.name || typedPage?.heading || undefined,
      description: typedPage?.subheading || undefined,
      images: ogImage ? [ogImage.url] : [],
    },
  } satisfies Metadata
}

export default async function Page() {
  const { data: page } = await sanityFetch({
    query: getHomePageQuery,
  })

  return <PageBuilderPage page={page as GetPageQueryResult} />
}
