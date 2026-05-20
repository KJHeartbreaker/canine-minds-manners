import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const publishChecklistSection: GuideSection = {
  id: 'publish-checklist',
  title: 'Before you publish',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        Use this quick checklist whenever you are about to <strong>Publish</strong> — not just save a
        draft. Saving keeps work in Studio; publishing makes it live on the website.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>Every page or post</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>SEO tab</strong> — meta description filled in (required on pages and posts)
            </>,
            <>
              <strong>Images</strong> — alt text on uploaded images (see <strong>Images &amp; alt text</strong>)
            </>,
            <>
              <strong>Preview</strong> — optional but recommended: open <strong>Presentation</strong>, enable Draft Mode, and spot-check layout
            </>,
            <>
              Click <strong>Publish</strong> when you are ready for visitors to see the change
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Pages with grids or class content</GuideSubheading>
        <GuideList
          items={[
            <>
              Referenced documents (<strong>Classes</strong>, <strong>Posts</strong>,{' '}
              <strong>Resources</strong>, trainers, testimonials) are <strong>published</strong>{' '}
              themselves — see <strong>Referenced content</strong>
            </>,
            <>
              New <strong>Class</strong> sessions have date, Acuity ID, and total spots if they should
              show booking buttons (see <strong>Classes</strong>)
            </>,
            <>
              <strong>Related Resources</strong> rows — no duplicate post/resource picked twice
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>After a slug or URL change</GuideSubheading>
        <GuideList
          items={[
            <>
              Add a <strong>Redirect</strong> from the old path to the new one (see <strong>Redirects</strong>)
            </>,
          ]}
        />
      </Stack>

      <GuideCallout tone="primary" title="Draft vs published">
        Draft Mode in Presentation shows unpublished edits in preview only. Publishing is what updates
        the public site.
      </GuideCallout>
    </Stack>
  ),
}
