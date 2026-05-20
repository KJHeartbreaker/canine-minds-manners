import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideScreenshot} from '../components/GuideScreenshot'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'
import {guideImage} from '../utils/guideImages'

export const presentationSection: GuideSection = {
  id: 'presentation',
  title: 'Presentation mode',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        <strong>Presentation</strong> shows the live website inside Studio so you can preview layout
        before publishing. With <strong>Draft Mode</strong> on, you see unpublished changes in that
        preview — not what regular visitors see until you publish.
      </GuideParagraph>

      <GuideScreenshot
        src={guideImage('presentationMode.png')}
        alt="Presentation tool with website preview and Studio panes"
        caption="Presentation: site preview plus Studio panels for navigation and editing."
      />

      <Stack space={4}>
        <GuideSubheading>Getting started</GuideSubheading>
        <GuideSteps
          steps={[
            <>Open the <strong>Presentation</strong> tool in the Studio toolbar (top of the screen).</>,
            <>
              Use the route picker or URL bar to choose the page you want (Home, a Page slug,{' '}
              <code>/blog</code>, a post, etc.).
            </>,
            <>Click <strong>Enable Draft Mode</strong> if prompted — required to preview unpublished work.</>,
            <>
              Scroll and interact with the preview like a normal webpage (links may respect draft
              content when Draft Mode is on).
            </>,
            <><strong>Publish</strong> documents when you are satisfied. Draft Mode alone does not make changes live.</>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Structure pane (click to edit)</GuideSubheading>
        <GuideParagraph>
          Presentation usually shows a <strong>Structure</strong> (or document tree) pane alongside the
          preview. When you <strong>click an element on the preview</strong> (or pick a route), Studio
          opens the matching document or section in a <strong>separate editing pane</strong> — often on
          the right or in a split view.
        </GuideParagraph>
        <GuideList
          items={[
            <>
              Clicking a region tied to a <strong>page section</strong> jumps you to that block inside
              the page’s <strong>Page sections</strong> list.
            </>,
            <>
              Clicking content from a <strong>referenced document</strong> (for example a class or post)
              may open that document instead — edit there, then return to Presentation.
            </>,
            <>
              The preview and editor stay linked: saves in the edit pane update the preview after a short
              refresh.
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Editing directly from Presentation</GuideSubheading>
        <GuideParagraph>
          Depending on what you click, you can often edit <strong>inline in the preview</strong> (Visual
          Editing) for simple text, or use the form fields in the Studio pane for full control (images,
          references, SEO, row settings).
        </GuideParagraph>
        <GuideList
          items={[
            <>
              <strong>Quick text tweaks</strong> — click copy in the preview when the editing overlay
              appears; changes save to the underlying document.
            </>,
            <>
              <strong>Complex changes</strong> — use the Structure pane to open the full document (Page,
              Post, Class, etc.) and edit all fields as you would in the Content area.
            </>,
            <>
              Always <strong>Publish</strong> when you want the public site updated — draft preview and
              live site are different until you publish.
            </>,
          ]}
        />
      </Stack>

      <GuideCallout tone="primary" title="Draft Mode">
        Draft Mode is for preview only. Turn it off to see published-only content in the iframe. The
        preview bar may briefly show a <code>draft-mode/enable</code> URL — that is normal; you do not
        browse to that address manually.
      </GuideCallout>

      <Stack space={4}>
        <GuideSubheading>If preview will not connect</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Wrong site in the preview bar</strong> — hosted Studio may remember an old URL
              (for example a Vercel staging link). Clear <code>?preview=</code> from the Studio browser
              address bar or set the preview origin to your real site (or <code>http://localhost:3000</code>{' '}
              when developing locally).
            </>,
            <>
              <strong>“Unable to connect” or “Invalid Secret”</strong> — usually preview URL, API token,
              or permissions on the hosting side. Editors cannot fix this in content; contact your
              developer.
            </>,
            <>
              <strong>Blank iframe</strong> — the site may be blocking embed; developers adjust security
              headers. Check the browser console on the Presentation tab for clues.
            </>,
            <>
              <strong>Unpublished page 404</strong> in a normal browser tab is expected — use
              Presentation with Draft Mode instead of opening the URL directly.
            </>,
          ]}
        />
        <GuideParagraph>
          Developers: see <strong>Troubleshooting.md</strong> in the project repository for setup
          detail (environment variables, deploy, CSP).
        </GuideParagraph>
      </Stack>
    </Stack>
  ),
}
