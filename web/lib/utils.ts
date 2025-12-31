import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

/**
 * Utility function to merge Tailwind classes
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Section padding utilities matching Wrappers.ts
 */
export const sectionPadding = {
  default: 'pt-10 pb-15 sm:pt-15 sm:pb-20 md:pt-25 md:pb-35',
  hasBg: 'pt-10 pb-10 sm:pt-20 sm:pb-20 md:pt-35 md:pb-35',
  short: 'pt-10 pb-0 sm:pt-15 sm:pb-0 md:pt-25 md:pb-0',
  skinny: 'pt-5 pb-5 sm:pt-5 sm:pb-5 md:pt-5 md:pb-5',
} as const
