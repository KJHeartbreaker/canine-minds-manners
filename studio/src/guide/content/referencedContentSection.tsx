import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const referencedContentSection: GuideSection = {
  id: 'referenced-content',
  title: 'Referenced content',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        Many items in the sidebar are <strong>documents</strong> you maintain once — trainers, blog
        posts, testimonials, downloadable resources, and classes. Page sections do not usually copy
        that content inline; they <strong>reference</strong> (link to) those documents and pull in
        the latest published version on the website.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>What is a reference?</GuideSubheading>
        <GuideParagraph>
          In Studio, a reference field looks like a picker: you search for an existing document and
          attach it. Think of it as “show this piece of content here” rather than retyping the same
          bio, photo, or quote in every place it appears.
        </GuideParagraph>
        <GuideList
          items={[
            <>
              <strong>Edit once</strong> — update the trainer’s bio in <strong>Our Team</strong> and
              every page that references them updates after you publish (including blog bylines).
            </>,
            <>
              <strong>Stay consistent</strong> — the same name, image, and wording everywhere that
              document is used.
            </>,
            <>
              <strong>Pick and choose</strong> — each page section decides <em>which</em> documents to
              show (three trainers on one page, five on another).
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Why not paste the same content into every page?</GuideSubheading>
        <GuideParagraph>
          Duplicating text and images across pages is hard to keep in sync. References are how
          headless CMS sites avoid “which version is correct?” problems. The page holds{' '}
          <strong>layout</strong> (grid, row, hero); the referenced document holds the{' '}
          <strong>facts</strong> (who said it, who teaches it, what file to download).
        </GuideParagraph>
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Where each document type can appear</GuideSubheading>
        <GuideParagraph>
          Below is how this site uses references today. The sidebar name is what you open to edit the
          source document; the right column is where you attach it on a page.
        </GuideParagraph>
        <GuideList
          items={[
            <>
              <strong>Our Team</strong> (trainer profiles) —{' '}
              <strong>Trainers Grid</strong> page section; <strong>Trainer Rows</strong> inside a Custom
              Component; <strong>Author</strong> on blog posts (same person, same photo and name on
              post cards and related-resource rows).
            </>,
            <>
              <strong>Testimonials</strong> — <strong>Testimonials</strong> page section (quote cards
              in a grid). These are separate from the <strong>Success Stories</strong> block, which is
              story content typed directly on the page, not a reference.
            </>,
            <>
              <strong>Resources</strong> (downloads) — <strong>Related Resources Row</strong> alongside
              blog posts; shows title, excerpt, image, and download button from the Resource document.
            </>,
            <>
              <strong>Posts</strong> — their own URL at <code>/blog/slug</code>; also selectable in{' '}
              <strong>Related Resources Row</strong> and the blog landing <strong>Posts Grid</strong>{' '}
              (where configured).
            </>,
            <>
              <strong>Classes</strong> — <strong>Programs Grid</strong>, <strong>Class Rows</strong>, and
              class detail areas (see <strong>Classes</strong> in this guide).
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Your workflow</GuideSubheading>
        <GuideList
          items={[
            <>Create or edit the document in the sidebar (for example <strong>Our Team</strong>).</>,
            <>Fill in the fields and <strong>Publish</strong> the document.</>,
            <>
              On a page, open the relevant section (grid, row, post settings, etc.) and use the
              reference picker to add it.
            </>,
            <><strong>Publish</strong> the page (or home/blog document) so the live site picks up the link.</>,
          ]}
        />
        <GuideParagraph>
          If something is missing on the site, check both publishes: the referenced document{' '}
          <em>and</em> the page that points to it.
        </GuideParagraph>
      </Stack>

      <GuideCallout tone="caution" title="Products (on hold)">
        <GuideParagraph>
          <strong>Products</strong> documents exist for future use. Product Grid page sections are not
          in active use — avoid adding new product grids until your developer confirms they are live.
        </GuideParagraph>
      </GuideCallout>

      <GuideCallout tone="positive" title="Tip">
        A grid or row is only a <strong>window</strong> onto your library of documents. Growing the
        library (more testimonials, trainers, resources) does not change existing pages until you add
        those references somewhere new.
      </GuideCallout>
    </Stack>
  ),
}
