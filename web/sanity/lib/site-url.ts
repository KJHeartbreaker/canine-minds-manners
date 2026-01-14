import {headers} from 'next/headers'
import {siteUrl as envSiteUrl} from './api'

/**
 * Get the site URL for canonical URLs, sitemaps, and SEO metadata
 *
 * Priority:
 * 1. Environment variable (NEXT_PUBLIC_SITE_URL or SITE_URL) - best for production
 * 2. Headers (x-forwarded-proto + host) - fallback for dynamic generation
 *
 * Using an environment variable is preferred for:
 * - Consistent canonical URLs across environments
 * - Better SEO (search engines prefer stable URLs)
 * - Avoiding issues with different domains (www vs non-www)
 */
export async function getSiteUrl(): Promise<string> {
  // Prefer environment variable for consistency
  if (envSiteUrl) {
    return envSiteUrl
  }

  // Fallback to headers for dynamic generation
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'https'
  return `${protocol}://${host}`
}
