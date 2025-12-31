import type {Config} from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem', // 20px
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
      },
    },
    screens: {
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1366px',
      xl: '1600px',
      xxl: '1920px',
    },
    extend: {
      boxShadow: {
        layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        // Brand colors from GlobalStyles.ts
        blue: {
          22: '#61c8e9',
          33: '#16abcc',
          44: '#057198',
          55: '#013b63',
        },
        grey: {
          22: '#e2e2e2',
          33: '#454d5a',
          44: '#323943',
          55: '#333333',
        },
        orange: {
          DEFAULT: '#ee6d08',
          hover: '#f39852',
        },
        red: {
          DEFAULT: '#ff001c',
        },
        yellow: {
          DEFAULT: '#feca2d',
        },
        black: '#000000',
        white: '#ffffff',
        // Legacy color names for backward compatibility
        gray: {
          50: '#f6f6f8',
          100: '#eeeef1',
          200: '#e3e4e8',
          300: '#bbbdc9',
          400: '#9499ad',
          500: '#727892',
          600: '#515870',
          700: '#383d51',
          800: '#252837',
          900: '#1b1d27',
          950: '#13141b',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        display: ['var(--font-paytone-one)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        kalam: ['var(--font-kalam)', 'cursive'],
      },
      fontSize: {
        // Typography sizes from Typography.ts
        'micro': ['0.75rem', {lineHeight: '1.4'}], // 12px
        'small': ['1rem', {lineHeight: '1.3125'}], // 16px mobile, base desktop
        'base': ['1rem', {lineHeight: '1.625'}], // 16px, 26px line-height
        'large': ['1.125rem', {lineHeight: '1.5'}], // 18px
        'title-5': {
          mobile: ['1rem', {lineHeight: '1.625'}], // 16px
          DEFAULT: ['1.125rem', {lineHeight: '1.3'}], // 18px
        },
        'title-4': {
          mobile: ['1.375rem', {lineHeight: '1.364'}], // 22px
          DEFAULT: ['1.25rem', {lineHeight: '1.429'}], // 20px
        },
        'title-3': {
          mobile: ['1.625rem', {lineHeight: '1.154'}], // 26px
          DEFAULT: ['1.4375rem', {lineHeight: '1.364'}], // 23px
        },
        'title-2': {
          mobile: ['1.875rem', {lineHeight: '1.2'}], // 30px
          DEFAULT: ['2.25rem', {lineHeight: '1.25'}], // 36px
        },
        'title-1': {
          mobile: ['2.75rem', {lineHeight: '1.091'}], // 44px
          DEFAULT: ['3.25rem', {lineHeight: '1.096'}], // 52px
        },
      },
      spacing: {
        // Common spacing values
        section: {
          mobile: '2.5rem', // 40px
          sm: '3.75rem', // 60px
          md: '6.25rem', // 100px
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config
