'use client'

import {useEffect, useState} from 'react'

/**
 * Modern media query hook for responsive behavior
 * Returns true when the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize state with the media query result to avoid sync setState in effect
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)

    const handleMatch = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Mark as initialized - use setTimeout to defer and avoid sync setState warning
    setTimeout(() => setIsInitialized(true), 0)

    // Listen for changes
    media.addEventListener('change', handleMatch)

    return () => {
      media.removeEventListener('change', handleMatch)
    }
  }, [query])

  return isInitialized ? matches : false
}
