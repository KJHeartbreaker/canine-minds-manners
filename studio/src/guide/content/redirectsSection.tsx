import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const redirectsSection: GuideSection = {
  id: 'redirects',
  title: 'Redirects',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        Use <strong>Redirects</strong> when a URL on the site has changed and old links or bookmarks
        should still work. Common reasons: renaming a page slug, restructuring blog URLs, or retiring
        a page in favour of a new one.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>Create a redirect</GuideSubheading>
        <GuideSteps
          steps={[
            <>Go to <strong>Redirects</strong> in the Content sidebar and click <strong>Create new</strong>.</>,
            <>
              <strong>Source Path</strong> — the old URL path visitors might still use. Must start with{' '}
              <code>/</code> (for example <code>/old-training-page</code> or{' '}
              <code>/blog/old-post-slug</code>). Do not include the domain.
            </>,
            <>
              <strong>Destination Path</strong> — where they should land. Use a site path starting with{' '}
              <code>/</code> (for example <code>/training</code>) or a full URL starting with{' '}
              <code>https://</code> if sending people off-site.
            </>,
            <>
              <strong>Permanent Redirect</strong> — leave off for temporary moves; turn on when the old
              URL is gone for good (helps search engines update).
            </>,
            <>
              Optional <strong>Description</strong> — internal note for your team (not shown on the
              site).
            </>,
            <><strong>Publish</strong> the redirect document.</>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>After you change a page slug</GuideSubheading>
        <GuideParagraph>
          When you rename a <strong>Page</strong> or <strong>Post</strong> slug, add a redirect from
          the old path to the new one right away. Otherwise visitors and Google may hit a 404 on the
          old URL.
        </GuideParagraph>
        <GuideList
          items={[
            <>Page <code>about</code> → <code>about-us</code>: redirect <code>/about</code> to <code>/about-us</code></>,
            <>
              Post slug change: redirect <code>/blog/old-slug</code> to <code>/blog/new-slug</code>
            </>,
          ]}
        />
      </Stack>

      <GuideCallout tone="caution" title="Good to know">
        <GuideList
          items={[
            <>Source and destination are <strong>paths</strong>, not full links like <code>https://caninemindsandmanners.com/...</code> unless the destination is intentionally off-site.</>,
            <>Avoid redirect loops (A → B and B → A).</>,
            <>If a redirect does not work after publishing, try a hard refresh once, then contact your developer.</>,
          ]}
        />
      </GuideCallout>
    </Stack>
  ),
}
