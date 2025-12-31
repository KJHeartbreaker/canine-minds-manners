'use client'

import {useEffect, useState} from 'react'

/**
 * Modern media query hook for responsive behavior
 * Returns true when the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)

    const handleMatch = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Check initial match
    setMatches(media.matches)
    setIsInitialized(true)

    // Listen for changes
    media.addEventListener('change', handleMatch)

    return () => {
      media.removeEventListener('change', handleMatch)
    }
  }, [query])

  return isInitialized ? matches : false
}
