import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const blogLandingSection: GuideSection = {
  id: 'blog-landing',
  title: 'Blog landing page',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        The <strong>Blog</strong> document in the sidebar is not a list of articles — it is the{' '}
        <strong>landing page</strong> at <code>/blog</code>. Individual articles live under{' '}
        <strong>Posts</strong>.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>Blog vs Posts</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Blog</strong> (singleton) — layout and sections for the blog index: hero, intro
              copy, optional <strong>Posts Grid</strong>, SEO for <code>/blog</code>.
            </>,
            <>
              <strong>Posts</strong> — each article at <code>/blog/your-slug</code> with its own
              author, body, and SEO (see <strong>Blog posts</strong>).
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Editing the blog landing</GuideSubheading>
        <GuideSteps
          steps={[
            <>Open <strong>Blog</strong> at the top of the Content sidebar (not under Pages).</>,
            <>
              Edit <strong>Page sections</strong> the same way as Home or a regular page — see{' '}
              <strong>Page builder</strong>.
            </>,
            <>
              The <strong>Posts Grid</strong> section type is only available on the Blog document. Pick
              which <strong>Posts</strong> to show (references — same pattern as other grids; see{' '}
              <strong>Referenced content</strong>).
            </>,
            <>
              Complete the <strong>SEO</strong> tab for the blog index, then <strong>Publish</strong>{' '}
              the Blog document.
            </>,
          ]}
        />
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        Publishing a new <strong>Post</strong> does not automatically change the Blog landing layout
        — only whether that post appears in grids or lists that reference it. Update the Blog
        document itself when you want to change the intro or sections around the post list.
      </GuideCallout>
    </Stack>
  ),
}
