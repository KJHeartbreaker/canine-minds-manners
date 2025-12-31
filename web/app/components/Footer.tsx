import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import FooterClient from './FooterClient'

/**
 * Footer Server Component
 * Fetches settings data and passes to client component
 */
export default async function Footer() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <FooterClient
      menuItems={settings?.menuItems || []}
      logos={settings?.footerLogos || []}
    />
  )
}
