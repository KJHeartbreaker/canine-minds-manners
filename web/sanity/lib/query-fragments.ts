/**
 * Composable query fragments for reusable data patterns
 * This allows us to build queries incrementally and avoid duplication
 */

// Common image projection used across many queries
export const imageProjection = `
  alt,
  crop,
  hotspot,
  asset -> {
    _id,
    _type,
    url,
    metadata {
      dimensions {
        width,
        height,
        aspectRatio
      },
      lqip,
      palette {
        dominant {
          background
        }
      }
    }
  }
`

// Author/trainer projection
export const authorProjection = `
  _id,
  name,
  firstName,
  lastName,
  slug,
  picture {
    ${imageProjection}
  },
  certifications,
  role,
  bio
`

// CTA/link projection
export const ctaProjection = `
  title,
  arrow,
  kind,
  link,
  landingPageRoute -> {
    _id,
    "slug": slug.current,
    _type
  }
`

// Class/training projection
export const classProjection = `
  _id,
  name,
  trainingType,
  customTrainingTitle,
  price,
  slug {
    current
  },
  description,
  takeaways,
  picture {
    ${imageProjection}
  },
  cta {
    ${ctaProjection}
  },
  upcoming22[] {
    _key,
    availability,
    startDate,
    startTime,
    amPm
  }
`

// Product projection
export const productProjection = `
  _id,
  _key,
  heading,
  price,
  image {
    ${imageProjection}
  },
  cta {
    ${ctaProjection}
  }
`

// Post/resource projection
export const postProjection = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage {
    ${imageProjection}
  },
  author -> {
    ${authorProjection}
  },
  date,
  _updatedAt
`

// Settings/navigation projection
export const settingsProjection = `
  _id,
  title,
  description,
  ogImage {
    ${imageProjection}
  },
  menuItems[] {
    _key,
    _type,
    title,
    cta {
      ${ctaProjection}
    },
    subnav[] {
      _key,
      landingPageRoute -> {
        _id,
        "slug": slug.current,
        title,
        _type
      }
    }
  },
  footerLogos[] {
    _key,
    alt,
    asset -> {
      _id,
      metadata {
        lqip
      }
    }
  }
`
