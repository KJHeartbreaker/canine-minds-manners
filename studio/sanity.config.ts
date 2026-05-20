/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import {assist} from '@sanity/assist'
import {media} from 'sanity-plugin-media'
import {unpublishAction} from './src/actions/unpublish'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// URL for preview functionality, defaults to localhost:3000 if not set
function getPreviewOrigin(): string {
  const raw = process.env.SANITY_STUDIO_PREVIEW_URL
  if (!raw) return 'http://localhost:3000'

  const trimmed = raw.trim()
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`

  try {
    const url = new URL(withProtocol)
    if (url.pathname.includes('/api/draft-mode')) {
      console.warn(
        'SANITY_STUDIO_PREVIEW_URL should be the website origin only (e.g. https://your-site.vercel.app), not the /api/draft-mode/enable path.',
        {SANITY_STUDIO_PREVIEW_URL: raw, origin: url.origin},
      )
    }
    return url.origin
  } catch {
    console.warn('Invalid SANITY_STUDIO_PREVIEW_URL, falling back to localhost', {
      SANITY_STUDIO_PREVIEW_URL: raw,
    })
    return 'http://localhost:3000'
  }
}

const previewOrigin = getPreviewOrigin()

if (previewOrigin.endsWith('.sanity.studio')) {
  console.warn(
    'SANITY_STUDIO_PREVIEW_URL points at the Studio. It must be the website origin (where /api/draft-mode/enable lives).',
    {previewOrigin},
  )
}

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'post':
      return slug ? `/blog/${slug}` : undefined
    case 'page':
      return slug ? `/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

// Main Sanity configuration
const singletonTypes = new Set(['home', 'settings', 'blogLandingPage'])

export default defineConfig({
  name: 'default',
  title: 'Canine Minds and Manners',

  projectId,
  dataset,

  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "home" && _id == "home"`,
          },
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/blog/:slug',
            filter: `_type == "post" && slug.current == $slug || _id == $slug`,
          },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
        locations: {
          home: defineLocations({
            locations: [homeLocation],
            message: 'This is the homepage',
            tone: 'positive',
          }),
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),
          page: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: resolveHref('page', doc?.slug)!,
                },
              ],
            }),
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('post', doc?.slug)!,
                },
                {
                  title: 'Home',
                  href: '/',
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    media(),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },

  // Document actions
  document: {
    actions: (prev, context) => {
      const isSingleton = singletonTypes.has(context.schemaType) && context.documentId === context.schemaType
      const withUnpublish = [...prev, unpublishAction]

      if (!isSingleton) return withUnpublish

      return withUnpublish.filter(({action}) => action !== 'delete' && action !== 'duplicate')
    },
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type !== 'global') return prev
      return prev.filter((templateItem) => !singletonTypes.has(templateItem.templateId))
    },
  },
})
