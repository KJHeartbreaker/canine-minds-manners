import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import HeaderClient from './HeaderClient'

/**
 * Header Server Component
 * Fetches settings data and passes to client component for interactivity
 */
export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  return <HeaderClient menuItems={settings?.menuItems || []} />
}
