import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideScreenshot} from '../components/GuideScreenshot'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import {guideImage} from '../utils/guideImages'
import type {GuideSection} from '../types'
import {pageBuilderSections} from './pageBuilderBlocks'
import {workflowSections} from './workflowSections'

const pageBuilderParent: GuideSection = {
  id: 'page-builder',
  title: 'Page builder',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        The page builder is the <strong>Page sections</strong> field on <strong>Home</strong>,{' '}
        <strong>Blog</strong>, <strong>Pages</strong>, and <strong>Contact</strong>. Each entry in
        the list is one section on the live page — hero, multi-column row, programs grid, and so on.
        Sections stack top to bottom in the order you arrange them in Studio.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>Choosing a section (insert menu)</GuideSubheading>
        <GuideSteps
          steps={[
            <>
              Open a page document and scroll to <strong>Page sections</strong> (under the{' '}
              <strong>Content</strong> tab).
            </>,
            <>
              Click <strong>Add item…</strong> (or the + control at the bottom of the list).
            </>,
            <>
              The insert menu opens as a <strong>grid of previews</strong> — each thumbnail matches a
              section type (Hero Banner, Multi Column Row, Programs Grid, etc.). Use the search box if
              you know the name. You can switch to a <strong>list</strong> view from the menu toolbar
              if you prefer text only.
            </>,
            <>
              Click the section you want. It is added to the page and opens so you can fill in fields.
            </>,
          ]}
        />
        <GuideParagraph>
          Not every document has every section type. For example, the <strong>Blog</strong> landing
          page includes a <strong>Posts Grid</strong> option that regular pages do not. See{' '}
          <strong>Blog landing page</strong> in this guide.
        </GuideParagraph>
        <GuideScreenshot
          src={guideImage('menuItems.png')}
          alt="Page builder insert menu showing section thumbnails in a grid"
          caption="Insert menu — grid of section previews (switch to list view or search if needed)."
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Populating a section (what you fill in)</GuideSubheading>
        <GuideParagraph>
          After you add a section, click it in the list to expand it. What you edit depends on the
          section type — there are two common patterns:
        </GuideParagraph>
        <GuideList
          items={[
            <>
              <strong>Content lives inside the section</strong> — headings, portable text, images,
              FAQs, and forms typed directly in that block (for example Hero Banner, Single Column
              Content Block, Multi Column Row column content, Success Stories).
            </>,
            <>
              <strong>Content is referenced from elsewhere</strong> — you pick existing documents
              (classes, trainers, posts, testimonials, resources) and the site pulls in their
              published data (for example Programs Grid, Trainers Grid, Related Resources Row). See{' '}
              <strong>Referenced content</strong> for how that works.
            </>,
          ]}
        />
        <GuideParagraph>
          Some sections mix both: a Multi Column Row might have portable text in one column and an
          Acuity Form in another; a Custom Component wraps trainer rows or a gallery you configure
          inside the block.
        </GuideParagraph>
        <GuideParagraph>
          Fill in the fields, then <strong>Publish</strong> the page. If a grid looks empty, publish
          the referenced documents too (classes, posts, etc.).
        </GuideParagraph>
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Arranging sections on the page</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Order</strong> — drag sections by the handle on the left of each item. The first
              section in the list is the top of the page on the website; the last is nearest the footer.
            </>,
            <>
              <strong>Collapse</strong> — click the section header to fold it closed while you work on
              another block; order does not change when collapsed.
            </>,
            <>
              <strong>Section menu (⋯)</strong> — remove, duplicate, or other actions depending on the
              block (see screenshot below).
            </>,
            <>
              Prefer <strong>Disabled</strong> over delete when you might turn a block back on later.
            </>,
          ]}
        />
        <GuideScreenshot
          src={guideImage('dragToReorder.png')}
          alt="Page sections list with drag handle and section overflow menu"
          caption="Drag the handle to reorder; use ⋯ on a section for duplicate, remove, and related actions."
        />
      </Stack>

      <GuideCallout tone="positive" title="Disabled sections">
        Most blocks include a <strong>Disabled</strong> checkbox. When checked, the section stays in
        Studio for your reference but does not render on the live site — useful for seasonal content
        or work in progress.
      </GuideCallout>

      <GuideCallout tone="primary" title="Preview before publish">
        Use <strong>Presentation</strong> to see how the stacked sections look on the real site layout.
        Section order in Studio matches scroll order on the page.
      </GuideCallout>

      <Stack space={3}>
        <GuideSubheading>Section types (detail)</GuideSubheading>
        <GuideParagraph>
          Each type below has its own guide entry with screenshots, key fields, and tips.
        </GuideParagraph>
      </Stack>
    </Stack>
  ),
  children: pageBuilderSections,
}

export const guideSections: GuideSection[] = [...workflowSections, pageBuilderParent]
