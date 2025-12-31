/**
 * Breakpoint utilities matching the old Breakpoints.ts
 * These match the Tailwind config screens
 */
export const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1366,
  xl: 1600,
  xxl: 1920,
} as const

export const size = {
  xs: `${breakpoints.xs}px`,
  sm: `${breakpoints.sm}px`,
  md: `${breakpoints.md}px`,
  lg: `${breakpoints.lg}px`,
  xl: `${breakpoints.xl}px`,
  xxl: `${breakpoints.xxl}px`,
} as const

export const device = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
  xl: `(min-width: ${size.xl})`,
  xxl: `(min-width: ${size.xxl})`,
} as const

/**
 * Tailwind breakpoint classes for use in className
 */
export const twBreakpoints = {
  xs: 'xs:',
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
  xxl: 'xxl:',
} as const
