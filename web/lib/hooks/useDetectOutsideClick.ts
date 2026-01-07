/* eslint-disable no-unused-vars */
'use client'

import {useEffect, useState, RefObject} from 'react'

/**
 * Hook for detecting clicks outside of an element
 * Useful for dropdowns, modals, etc.
 */
export function useDetectOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  initialState: boolean,
): [boolean, (value: boolean) => void] {
  const [isActive, setIsActive] = useState(initialState)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // If the active element exists and click is outside of it
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        setIsActive(false)
      }
    }

    // Only listen if active
    if (isActive) {
      window.addEventListener('click', onClick)
    }

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [isActive, ref])

  return [isActive, setIsActive]
}
