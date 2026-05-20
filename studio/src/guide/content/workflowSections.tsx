import {Stack, Text} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'
import {ctaSection} from './ctaSection'
import {navigationSection} from './navigationSection'
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
                image
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
                <strong>Our Team</strong>, <strong>Classes</strong>, <strong>Resources</strong>,{' '}
                <strong>Products</strong>, <strong>Testimonials</strong> — supporting content
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
  {
    id: 'presentation',
    title: 'Presentation mode',
    content: (
      <Stack space={5}>
        <GuideParagraph>
          The <strong>Presentation</strong> tool shows the real website inside Studio so you can
          preview layout before publishing. With Draft Mode on, you see unpublished changes in that
          preview.
        </GuideParagraph>

        <GuideSteps
          steps={[
            <>Open the <strong>Presentation</strong> tool in the Studio toolbar.</>,
            <>Pick the page or route you want to preview.</>,
            <>Click <strong>Enable Draft Mode</strong> if prompted.</>,
            <>Edit content in Studio while watching the preview update.</>,
            <><strong>Publish</strong> when you are satisfied — Draft Mode alone does not make changes live.</>,
          ]}
        />

        <GuideCallout tone="primary" title="Draft Mode">
          Draft Mode is only for previewing. Turn it off to return to published-only content in the
          preview frame.
        </GuideCallout>

        <GuideCallout tone="caution" title="If preview will not connect">
          Contact your developer if Presentation shows “Unable to connect” or “Invalid Secret” — that
          usually means preview URL or permissions need to be fixed (not something editors change in
          content).
        </GuideCallout>
      </Stack>
    ),
  },
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
          See <strong>SEO settings</strong> and <strong>Page builder components</strong> below for
          more detail.
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
  {
    id: 'other-content',
    title: 'Classes, resources, and more',
    content: (
      <Stack space={5}>
        <Stack space={4}>
          <GuideSubheading>Classes</GuideSubheading>
          <GuideParagraph>
            Open <strong>Classes</strong> to manage training offerings. Use the <strong>Content</strong>{' '}
            tab for names, descriptions, and pricing; <strong>Acuity / Scheduling</strong> for booking
            URLs and upcoming sessions; <strong>Display</strong> for card images and labels on listing
            pages. Publish when ready.
          </GuideParagraph>
        </Stack>

        <Stack space={4}>
          <GuideSubheading>Resources, Products, Our Team, Testimonials</GuideSubheading>
          <GuideParagraph>
            Create or edit the document, fill in the fields, and <strong>Publish</strong>. Grids and
            rows on pages reference these documents — publish them before expecting them to appear in
            a page section.
          </GuideParagraph>
        </Stack>

        <Stack space={4}>
          <GuideSubheading>Redirects</GuideSubheading>
          <GuideParagraph>
            Use <strong>Redirects</strong> when an old URL should send visitors to a new page (for
            example after renaming a slug).
          </GuideParagraph>
        </Stack>
      </Stack>
    ),
  },
]

export const workflowSections: GuideSection[] = [
  ...workflowSectionsBeforeSeo,
  seoSettingsSection,
  navigationSection,
  ctaSection,
  ...workflowSectionsAfterSeo,
]
