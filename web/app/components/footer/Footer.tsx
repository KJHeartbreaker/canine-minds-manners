import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import FooterClient from './FooterClient'
import { type MenuItem, type FooterLogo } from '../types'

/**
 * Footer Server Component
 * Fetches settings data and passes to client component
 */
export default async function Footer() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  const menuItems = (settings?.menuItems || []).filter(
    (item) => Boolean(item?._key) && (item?._type === 'navCTA' || item?._type === 'navDropdownCTA'),
  ) as unknown as MenuItem[]

  const logos = (settings?.footerLogos || []).filter((logo) => Boolean(logo?._key)) as unknown as FooterLogo[]

  return (
    <FooterClient
      menuItems={menuItems}
      logos={logos}
    />
  )
}
