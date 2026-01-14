import type { Metadata } from 'next'

import PageBuilderPage from '@/app/components/PageBuilder'
import { LocalBusinessSchema, ServiceSchema } from '@/app/components/StructuredData'
import { sanityFetch } from '@/sanity/lib/live'
import { getHomePageQuery, settingsQuery } from '@/sanity/lib/queries'
import { getSiteUrl } from '@/sanity/lib/site-url'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { GetPageQueryResult } from '@/sanity.types'
import type { HomePageWithSEO } from '@/sanity/lib/types'

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

  // Type assertion to include SEO fields
  const typedPage = page as HomePageWithSEO | null

  // Get SEO fields with fallbacks
  const seoTitle = typedPage?.seo?.seoTitle || typedPage?.title
  const seoDescription = typedPage?.seo?.seoDescription || undefined
  const noindex = typedPage?.seo?.noindex || false
  const canonicalUrl = typedPage?.seo?.canonicalUrl

  // Get site URL for canonical
  const siteUrl = await getSiteUrl()
  const canonical = canonicalUrl || siteUrl

  // Get OpenGraph image with fallback chain: seo.ogImage → hero image → settings ogImage
  const content = typedPage?.content as any[] | undefined
  const heroImage = content?.find(
    (block: any) => block._type === 'Hero Banner' && block.image,
  )?.image
  const ogImage = resolveOpenGraphImage(
    typedPage?.seo?.ogImage || heroImage || settings?.ogImage,
  )

  return {
    title: seoTitle,
    description: seoDescription,
    robots: noindex ? 'noindex' : undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title: seoTitle || undefined,
      description: seoDescription || undefined,
      type: 'website',
      siteName: settings?.title || 'Canine Minds & Manners',
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle || undefined,
      description: seoDescription || undefined,
      images: ogImage ? [ogImage.url] : [],
    },
  } satisfies Metadata
}

export default async function Page() {
  const { data: page } = await sanityFetch({
    query: getHomePageQuery,
  })

  const siteUrl = await getSiteUrl()

  return (
    <>
      {/* LocalBusiness structured data for local SEO */}
      <LocalBusinessSchema
        name="Canine Minds & Manners"
        url={siteUrl}
        logoUrl={`${siteUrl}/images/CMMPDT_Logo-type.png`}
        phone="+1-403-816-5629"
        email="cmm_info@shaw.ca"
        address={{
          streetAddress: '3131 68 St NW',
          addressLocality: 'Calgary',
          addressRegion: 'AB',
          postalCode: 'T3B 2J4',
          addressCountry: 'CA',
        }}
        serviceArea={{
          addressLocality: 'Calgary',
          addressRegion: 'AB',
          addressCountry: 'CA',
        }}
        priceRange="$$"
      />
      {/* Service schemas for main services */}
      <ServiceSchema
        name="Group Dog Training Classes"
        description="Professional group dog training classes in Calgary for puppies and adult dogs. Learn basic manners, obedience, and advanced skills in a supportive group setting."
        provider={{ name: 'Canine Minds & Manners', url: siteUrl }}
        serviceType="Dog Training Service"
        areaServed={{ addressLocality: 'Calgary', addressRegion: 'AB' }}
      />
      <ServiceSchema
        name="Private Dog Training"
        description="Personalized one-on-one dog training sessions in your home. Customized training plans for puppies and adult dogs, including behavior modification."
        provider={{ name: 'Canine Minds & Manners', url: siteUrl }}
        serviceType="Dog Training Service"
        areaServed={{ addressLocality: 'Calgary', addressRegion: 'AB' }}
      />
      <ServiceSchema
        name="Puppy Training"
        description="Specialized puppy training programs to help your new puppy learn essential skills, socialization, and good manners from an early age."
        provider={{ name: 'Canine Minds & Manners', url: siteUrl }}
        serviceType="Dog Training Service"
        areaServed={{ addressLocality: 'Calgary', addressRegion: 'AB' }}
      />
      <ServiceSchema
        name="Behavior Modification"
        description="Professional behavior modification services for dogs with specific behavioral challenges, including reactivity, anxiety, and aggression."
        provider={{ name: 'Canine Minds & Manners', url: siteUrl }}
        serviceType="Dog Training Service"
        areaServed={{ addressLocality: 'Calgary', addressRegion: 'AB' }}
      />
      <PageBuilderPage page={page as GetPageQueryResult} />
    </>
  )
}
