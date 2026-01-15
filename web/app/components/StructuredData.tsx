import { getSiteUrl } from '@/sanity/lib/site-url'
import { urlForImage } from '@/sanity/lib/utils'
import type { SanityImageAsset } from '@/sanity.types'

/**
 * Organization JSON-LD Schema
 * Provides business information to search engines
 */
export async function OrganizationSchema({
  name,
  url,
  logo,
  logoUrl: logoUrlProp,
  phone,
  email,
  address,
}: {
  name: string
  url: string
  logo?: SanityImageAsset | null
  logoUrl?: string
  phone?: string
  email?: string
  address?: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
}) {
  const siteUrl = await getSiteUrl()
  // Use provided logoUrl, or generate from Sanity image, or use default
  const logoUrl = logoUrlProp || (logo ? urlForImage(logo)?.url() : undefined) || `${siteUrl}/images/CMMPDT_Logo-type.png`

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url: url || siteUrl,
  }

  if (logoUrl) {
    // Logo as ImageObject is more robust for validation
    schema.logo = {
      '@type': 'ImageObject',
      url: logoUrl,
    }
  }

  // Build contactPoint array (must be array, not object)
  const contactPoints: any[] = []
  if (phone || email) {
    const contactPoint: any = {
      '@type': 'ContactPoint',
      contactType: 'customer service',
    }
    if (phone) {
      schema.telephone = phone
      contactPoint.telephone = phone
    }
    if (email) {
      schema.email = email
      contactPoint.email = email
    }
    contactPoints.push(contactPoint)
  }

  if (contactPoints.length > 0) {
    schema.contactPoint = contactPoints
  }

  if (address) {
    schema.address = {
      '@type': 'PostalAddress',
      ...(address.streetAddress && { streetAddress: address.streetAddress }),
      ...(address.addressLocality && { addressLocality: address.addressLocality }),
      ...(address.addressRegion && { addressRegion: address.addressRegion }),
      ...(address.postalCode && { postalCode: address.postalCode }),
      ...(address.addressCountry && { addressCountry: address.addressCountry }),
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * LocalBusiness JSON-LD Schema
 * Provides local business information for Google Business Profile and local search
 */
export async function LocalBusinessSchema({
  name,
  url,
  logoUrl,
  phone,
  email,
  address,
  serviceArea,
  priceRange,
}: {
  name: string
  url: string
  logoUrl?: string
  phone?: string
  email?: string
  address?: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  serviceArea?: {
    addressLocality?: string
    addressRegion?: string
    addressCountry?: string
  }
  priceRange?: string
}) {
  const siteUrl = await getSiteUrl()

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    url: url || siteUrl,
  }

  if (logoUrl) {
    // Logo as ImageObject for better validation
    schema.logo = {
      '@type': 'ImageObject',
      url: logoUrl,
    }
  }

  if (address) {
    schema.address = {
      '@type': 'PostalAddress',
      ...(address.streetAddress && { streetAddress: address.streetAddress }),
      ...(address.addressLocality && { addressLocality: address.addressLocality }),
      ...(address.addressRegion && { addressRegion: address.addressRegion }),
      ...(address.postalCode && { postalCode: address.postalCode }),
      ...(address.addressCountry && { addressCountry: address.addressCountry }),
    }
  }

  if (serviceArea) {
    schema.areaServed = {
      '@type': 'City',
      ...(serviceArea.addressLocality && { name: serviceArea.addressLocality }),
      ...(serviceArea.addressRegion && {
        containedIn: {
          '@type': 'State',
          name: serviceArea.addressRegion,
        },
      }),
    }
  }

  if (phone) {
    schema.telephone = phone
  }

  if (email) {
    schema.email = email
  }

  if (priceRange) {
    schema.priceRange = priceRange
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Service JSON-LD Schema
 * Describes services offered by the business
 */
export async function ServiceSchema({
  name,
  description,
  provider,
  serviceType,
  areaServed,
}: {
  name: string
  description?: string
  provider: {
    name: string
    url?: string
  }
  serviceType?: string
  areaServed?: {
    addressLocality?: string
    addressRegion?: string
  }
}) {
  const siteUrl = await getSiteUrl()

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    provider: {
      '@type': 'LocalBusiness',
      name: provider.name,
      url: provider.url || siteUrl,
    },
  }

  if (description) {
    schema.description = description
  }

  if (serviceType) {
    schema.serviceType = serviceType
  }

  if (areaServed) {
    schema.areaServed = {
      '@type': 'City',
      ...(areaServed.addressLocality && { name: areaServed.addressLocality }),
      ...(areaServed.addressRegion && {
        containedIn: {
          '@type': 'State',
          name: areaServed.addressRegion,
        },
      }),
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Article JSON-LD Schema for blog posts
 */
export async function ArticleSchema({
  title,
  description,
  url,
  image,
  author,
  datePublished,
  dateModified,
}: {
  title: string
  description?: string
  url: string
  image?: string
  author?: {
    name: string
    url?: string
  }
  datePublished?: string
  dateModified?: string
}) {
  const siteUrl = await getSiteUrl()
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    url: fullUrl,
  }

  if (description) {
    schema.description = description
  }

  if (image) {
    // Image should be an array of ImageObject or URL strings
    const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`
    schema.image = [
      {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    ]
  }

  if (author) {
    schema.author = {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url.startsWith('http') ? author.url : `${siteUrl}${author.url}` }),
    }
  }

  if (datePublished) {
    schema.datePublished = datePublished
  }

  if (dateModified) {
    schema.dateModified = dateModified
  }

  // Publisher (Organization)
  schema.publisher = {
    '@type': 'Organization',
    name: 'Canine Minds & Manners',
    url: siteUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * BreadcrumbList JSON-LD Schema
 */
export function BreadcrumbListSchema({
  items,
}: {
  items: Array<{
    name: string
    url: string
  }>
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${typeof window !== 'undefined' ? window.location.origin : ''}${item.url}`,
    })),
  }

  // For server components, we need to get the site URL differently
  // This will be handled in the component that uses it
  return schema
}

/**
 * BreadcrumbList component (async version for server components)
 */
export async function BreadcrumbListSchemaComponent({
  items,
}: {
  items: Array<{
    name: string
    url: string
  }>
}) {
  const siteUrl = await getSiteUrl()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
