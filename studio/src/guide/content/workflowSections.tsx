import {Stack, Text} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'
import {blogLandingSection} from './blogLandingSection'
import {classesSection} from './classesSection'
import {ctaSection} from './ctaSection'
import {portableTextSection} from './portableTextSection'
import {presentationSection} from './presentationSection'
import {imagesAltSection} from './imagesAltSection'
import {navigationSection} from './navigationSection'
import {publishChecklistSection} from './publishChecklistSection'
import {referencedContentSection} from './referencedContentSection'
import {redirectsSection} from './redirectsSection'
import {seoSettingsSection} from './seoSettingsSection'

const workflowSectionsBeforeSeo: GuideSection[] = [
  {
    id: 'introduction',
    title: 'Getting started',
    content: (
      <Stack space={5}>
        <GuideParagraph>
          This site is managed in Sanity Studio. Most content changes follow the same workflow: edit
          a document, preview when helpful, then publish when you are ready.
        </GuideParagraph>

        <Stack space={4}>
          <GuideSubheading>Where to find things</GuideSubheading>
          <GuideParagraph>Use the <strong>Content</strong> sidebar to open the area you need:</GuideParagraph>
          <GuideList
            items={[
              <>
                <strong>Home</strong> — homepage sections and SEO
              </>,
              <>
                <strong>Blog</strong> — blog landing page sections and SEO
              </>,
              <>
                <strong>Settings and Menus</strong> — header navigation, footer logos, default social
                image (see <strong>Navigation &amp; site settings</strong>)
              </>,
              <>
                <strong>Contact</strong> — the Contact page (slug <code>contact</code>)
              </>,
              <>
                <strong>Pages</strong> — all other site pages (Contact is listed separately)
              </>,
              <>
                <strong>Posts</strong> — blog articles
              </>,
              <>
                <strong>Redirects</strong> — URL redirects for old links
              </>,
              <>
                <strong>Classes</strong> — training programs, schedules, and booking (see{' '}
                <strong>Classes</strong> in this guide)
              </>,
              <>
                <strong>Our Team</strong>, <strong>Resources</strong>, <strong>Testimonials</strong>{' '}
                — reusable documents (see <strong>Referenced content</strong>)
              </>,
            ]}
          />
        </Stack>

        <GuideCallout tone="primary">
          This guide is read-only. It lives inside Studio so you always have help at hand — it is not
          stored as editable content in the CMS.
        </GuideCallout>
      </Stack>
    ),
  },
  {
    id: 'draft-vs-published',
    title: 'Draft vs published',
    content: (
      <Stack space={5}>
        <GuideParagraph>
          Sanity keeps two versions of your work: changes you are still editing (draft) and what
          visitors see on the live website (published).
        </GuideParagraph>

        <GuideList
          items={[
            <>
              <strong>Draft</strong> — saved in Studio but not on the public site until you publish.
            </>,
            <>
              <strong>Published</strong> — live on the website. New edits create a draft again until
              you publish a second time.
            </>,
            <>
              <strong>Discard changes</strong> — throws away unpublished edits and reverts to the
              last published version.
            </>,
            <>
              <strong>Unpublish</strong> — removes the document from the live site (use carefully).
            </>,
          ]}
        />

        <GuideCallout tone="positive" title="Tip">
          Visitors only see published content unless they are previewing with Presentation and Draft
          Mode enabled.
        </GuideCallout>

        <GuideCallout tone="caution" title="Caching">
          After publishing, changes usually appear within seconds. If something looks stuck, try a
          hard refresh once.
        </GuideCallout>
      </Stack>
    ),
  },
  presentationSection,
  {
    id: 'pages',
    title: 'Creating and editing pages',
    content: (
      <Stack space={5}>
        <GuideSubheading>Create a new page</GuideSubheading>
        <GuideSteps
          steps={[
            <>Go to <strong>Pages</strong> and click <strong>Create new</strong>.</>,
            <>
              Set <strong>Title</strong> and <strong>Slug</strong> (the slug becomes the URL, e.g.{' '}
              <code>about-us</code> → <code>/about-us</code>).
            </>,
            <>
              Add <strong>Page sections</strong> — reorder blocks anytime with drag and drop.
            </>,
            <>
              Open the <strong>SEO</strong> tab and complete SEO settings (see{' '}
              <strong>SEO settings</strong> in this guide).
            </>,
            <><strong>Publish</strong>.</>,
          ]}
        />

        <GuideSubheading>Edit Home, Blog, or Contact</GuideSubheading>
        <GuideParagraph>
          <strong>Home</strong> and <strong>Blog</strong> are single documents at the top of the
          sidebar — they use the same page sections and SEO tabs as regular pages.{' '}
          <strong>Contact</strong> is a dedicated entry; do not create a second contact page under
          Pages.
        </GuideParagraph>

        <GuideCallout tone="positive" title="Tip">
          See <strong>SEO settings</strong> and <strong>Page builder</strong> below for more detail.
        </GuideCallout>
      </Stack>
    ),
  },
]

const workflowSectionsAfterSeo: GuideSection[] = [
  {
    id: 'posts',
    title: 'Blog posts',
    content: (
      <Stack space={5}>
        <GuideSteps
          steps={[
            <>Go to <strong>Posts</strong> and click <strong>Create new</strong>.</>,
            <>
              In <strong>Post Settings</strong>: Title, Slug (becomes <code>/blog/your-slug</code>
              ), Author (required), and Excerpt (required — used in cards and grids).
            </>,
            <>
              In <strong>Post Content</strong>: Header Image (recommended) and Body (required).
            </>,
            <>
              Complete the <strong>SEO</strong> tab — meta description is required (see{' '}
              <strong>SEO settings</strong>).
            </>,
            <><strong>Publish</strong>.</>,
          ]}
        />
      </Stack>
    ),
  },
  blogLandingSection,
  referencedContentSection,
]

export const workflowSections: GuideSection[] = [
  ...workflowSectionsBeforeSeo,
  publishChecklistSection,
  classesSection,
  seoSettingsSection,
  imagesAltSection,
  portableTextSection,
  navigationSection,
  ctaSection,
  ...workflowSectionsAfterSeo,
  redirectsSection,
]
