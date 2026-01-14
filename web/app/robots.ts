import {MetadataRoute} from 'next'
import {getSiteUrl} from '@/sanity/lib/site-url'

/**
 * Generate robots.txt
 * Learn more: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = await getSiteUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
