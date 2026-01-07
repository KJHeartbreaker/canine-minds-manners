import {MetadataRoute} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData, homepageSitemap} from '@/sanity/lib/queries'
import {headers} from 'next/headers'

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'https'
  const domain = `${protocol}://${host}`

  let homepage: Array<{_id: string; _updatedAt: string}> = []
  let pagesAndPosts: Array<{slug: string; _type: string; _updatedAt: string; _id?: string}> = []

  try {
    // Fetch homepage and pages/posts in parallel
    const [homepageResult, pagesAndPostsResult] = await Promise.all([
      sanityFetch({query: homepageSitemap}).catch(() => ({data: []})),
      sanityFetch({query: sitemapData}).catch(() => ({data: []})),
    ])

    homepage = homepageResult?.data || []
    pagesAndPosts = pagesAndPostsResult?.data || []
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

  // Filter out drafts from pages and posts
  const filteredPagesAndPosts = pagesAndPosts.filter(
    (item) => !item._id?.startsWith('drafts.') && item.slug,
  )

  // Add pages and posts
  for (const item of filteredPagesAndPosts) {
    let priority: number
    let changeFrequency: ChangeFrequency
    let url: string

    switch (item._type) {
      case 'page':
        priority = 0.8
        changeFrequency = 'monthly'
        url = `${domain}/${item.slug}`
        break
      case 'post':
        priority = 0.5
        changeFrequency = 'never'
        url = `${domain}/blog/${item.slug}`
        break
      default:
        continue // Skip unknown types
    }

    sitemap.push({
      url,
      lastModified: item._updatedAt ? new Date(item._updatedAt).toISOString() : new Date().toISOString(),
      priority,
      changeFrequency,
    })
  }

  return sitemap
}
