/**
 * Type helpers for Sanity query results
 * These types extend the generated types to include proper SEO field types
 */

import type {
  GetPageQueryResult,
  PostQueryResult,
  GetHomePageQueryResult,
  BlogLandingPageQueryResult,
} from '@/sanity.types'

// SEO object type based on the schema
export type SEOObject = {
  seoTitle?: string | null
  seoDescription?: string | null
  noindex?: boolean | null
  canonicalUrl?: string | null
  ogImage?: {
    alt?: string | null
    crop?: any
    hotspot?: any
    asset?: {
      _id: string
      _type: 'sanity.imageAsset'
      url: string | null
      metadata?: {
        dimensions?: {
          width: number | null
          height: number | null
          aspectRatio: number | null
        } | null
        lqip?: string | null
        palette?: {
          dominant?: {
            background?: string | null
          } | null
        } | null
      } | null
    } | null
  } | null
} | null

// Extended types with proper SEO field
export type PageWithSEO = Omit<NonNullable<GetPageQueryResult>, 'seo' | 'title' | 'content'> & {
  seo?: SEOObject
  title?: string | null
  content?: any[] | null
}

export type PostWithSEO = Omit<NonNullable<PostQueryResult>, 'seo'> & {
  seo?: SEOObject
}

export type HomePageWithSEO = Omit<
  NonNullable<GetHomePageQueryResult>,
  'seo' | 'title' | 'content'
> & {
  seo?: SEOObject
  title?: string | null
  content?: any[] | null
}

export type BlogLandingPageWithSEO = Omit<NonNullable<BlogLandingPageQueryResult>, 'seo'> & {
  seo?: SEOObject
}
