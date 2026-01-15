import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import HeaderClient from './HeaderClient'
import { type MenuItem } from '../types'

/**
 * Header Server Component
 * Fetches settings data and passes to client component for interactivity
 */
export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  const menuItems = (settings?.menuItems || []).filter(
    (item) => Boolean(item?._key) && (item?._type === 'navCTA' || item?._type === 'navDropdownCTA'),
  ) as unknown as MenuItem[]

  return <HeaderClient menuItems={menuItems} />
}
