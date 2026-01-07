/**
 * Type definitions for components
 * These types are based on the actual query structure since the generated types
 * may not always be accurate
 */


// Sanity Image Type - should match SanityImageAsset structure
export type SanityImage = {
  asset?: {
    _ref?: string
    _id?: string
    _type?: 'reference' | 'sanity.imageAsset'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  _type?: 'image'
}

export type MenuItem = {
  _key: string
  _type: 'navCTA' | 'navDropdownCTA'
  title?: string
  cta?: {
    title?: string
    arrow?: boolean
    kind?: string
    link?: string
    landingPageRoute?: {
      _id: string
      slug: string
      title?: string
      _type: string
    } | null
  } | null
  subnav?: Array<{
    _key: string
    landingPageRoute?: {
      _id: string
      slug: string
      title?: string
      _type: string
    } | null
  }> | null
}

export type FooterLogo = {
  _key: string
  alt?: string | null
  asset?: {
    _id: string
    metadata?: {
      lqip?: string | null
    } | null
  } | null
}

// Helper type for items that have an _id or _key
export type Identifiable = {
  _id?: string
  _key?: string
}

// Helper function to generate stable keys for React lists
export function getStableKey(item: Identifiable, index: number): string {
  return item._id || item._key || `item-${index}`
}
