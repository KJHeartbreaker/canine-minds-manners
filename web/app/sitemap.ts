import {MetadataRoute} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData, homepageSitemap, blogLandingPageQuery} from '@/sanity/lib/queries'
import {getSiteUrl} from '@/sanity/lib/site-url'

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

/**
 * Helper function to join URLs without double slashes
 */
function joinUrl(base: string, path: string): string {
  const baseClean = base.replace(/\/+$/, '') // Remove trailing slashes
  const pathClean = path.replace(/^\/+/, '') // Remove leading slashes
  return `${baseClean}/${pathClean}`
}

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

type SitemapItem = {
  slug: string
  _type: string
  _updatedAt: string
  _id?: string
  seo?: {
    noindex?: boolean
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = await getSiteUrl()

  let homepage: Array<{_id: string; _updatedAt: string}> = []
  let pagesAndPosts: Array<SitemapItem> = []
  let blogLandingPage: {_id?: string; _updatedAt?: string; slug?: {current?: string}} | null = null

  try {
    // Fetch homepage, pages/posts, and blog landing page in parallel
    const [homepageResult, pagesAndPostsResult, blogLandingPageResult] = await Promise.all([
      sanityFetch({query: homepageSitemap}).catch(() => ({data: []})),
      sanityFetch({query: sitemapData}).catch(() => ({data: []})),
      sanityFetch({query: blogLandingPageQuery}).catch(() => ({data: null})),
    ])

    homepage = homepageResult?.data || []
    // Type assertion: seo can be null in generated types, but we handle it as optional object
    pagesAndPosts = (pagesAndPostsResult?.data || []) as SitemapItem[]
    blogLandingPage = blogLandingPageResult?.data || null
  } catch (error) {
    console.error('Error fetching sitemap data:', error)
    // Return minimal sitemap with just homepage if queries fail
    return [
      {
        url: domain,
        lastModified: new Date().toISOString(),
        priority: 1,
        changeFrequency: 'monthly' as ChangeFrequency,
      },
    ]
  }

  const sitemap: MetadataRoute.Sitemap = []

  // Add homepage (filter out drafts)
  const filteredHome = homepage.filter((page) => !page._id.startsWith('drafts.'))
  if (filteredHome.length > 0) {
    filteredHome.forEach((page) => {
      sitemap.push({
        url: domain,
        lastModified: new Date(page._updatedAt).toISOString(),
        priority: 1,
        changeFrequency: 'monthly' as ChangeFrequency,
      })
    })
  } else {
    // Fallback: add homepage even if not found in Sanity
    sitemap.push({
      url: domain,
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: 'monthly' as ChangeFrequency,
    })
  }

  // Filter out drafts and noindex pages from pages and posts
  const filteredPagesAndPosts = pagesAndPosts.filter(
    (item) => !item._id?.startsWith('drafts.') && item.slug && !item.seo?.noindex, // Exclude pages with noindex: true
  )

  // Add blog landing page
  if (blogLandingPage && !blogLandingPage._id?.startsWith('drafts.')) {
    sitemap.push({
      url: joinUrl(domain, 'blog'),
      lastModified: blogLandingPage._updatedAt
        ? new Date(blogLandingPage._updatedAt).toISOString()
        : new Date().toISOString(),
      priority: 0.8,
      changeFrequency: 'weekly' as ChangeFrequency,
    })
  }

  // Add pages and posts
  for (const item of filteredPagesAndPosts) {
    let priority: number
    let changeFrequency: ChangeFrequency
    let url: string

    switch (item._type) {
      case 'page':
        priority = 0.8
        changeFrequency = 'monthly'
        url = joinUrl(domain, item.slug)
        break
      case 'post':
        priority = 0.5
        changeFrequency = 'weekly'
        url = joinUrl(domain, `blog/${item.slug}`)
        break
      default:
        continue // Skip unknown types
    }

    sitemap.push({
      url,
      lastModified: item._updatedAt
        ? new Date(item._updatedAt).toISOString()
        : new Date().toISOString(),
      priority,
      changeFrequency,
    })
  }

  return sitemap
}
