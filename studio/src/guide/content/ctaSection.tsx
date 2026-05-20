import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const ctaSection: GuideSection = {
  id: 'cta-and-links',
  title: 'Call to action (CTA) buttons & links',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        A <strong>Call to action (CTA)</strong> is a reusable link or button: a label plus where it
        should go. CTAs power the header menu, hero buttons, cards, products, and buttons inside rich
        text.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>Where you will see CTAs</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Settings and Menus</strong> — header/footer navigation (inside Navigation Item
              or Dropdown)
            </>,
            <>
              <strong>Hero Banner</strong> — optional hero button
            </>,
            <>
              <strong>Portable Text</strong> — insert a “CTA” block in page copy, FAQs, and similar
            </>,
            <>
              <strong>Icon cards</strong> and <strong>Products</strong> — button on cards or product
              listings
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>CTA fields (Link &amp; CTA Options)</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Title</strong> — button or link text visitors see.
            </>,
            <>
              <strong>Kind</strong> — <strong>button</strong> (orange button style) or{' '}
              <strong>link</strong> (text link style).
            </>,
            <>
              <strong>Arrow Icon</strong> — optional arrow on button-style CTAs.
            </>,
          ]}
        />
        <GuideParagraph>
          Under <strong>Link</strong>, choose <em>one</em> destination type per CTA (do not fill
          multiple — pick the one you need):
        </GuideParagraph>
        <GuideList
          items={[
            <>
              <strong>Landing page</strong> — <em>Internal.</em> Pick a <strong>Page</strong> or{' '}
              <strong>Post</strong> on this site. The URL is built from that document’s slug (posts
              use the blog path). Best for “Register”, “Learn more”, and menu links to your own
              content.
            </>,
            <>
              <strong>External link</strong> — <em>External.</em> Full URL (e.g.{' '}
              <code>https://acuityscheduling.com/...</code>). Use for booking systems, partner sites,
              or PDFs hosted elsewhere. Link-style CTAs open in a new tab when appropriate.
            </>,
            <>
              <strong>Anchor link</strong> — Jump to a section on a page (e.g.{' '}
              <code>#contact-form</code> on the same page, or a full URL with a hash for another
              page). Use when linking to a specific block on a long page.
            </>,
            <>
              <strong>Downloadable file</strong> — Upload a file; the CTA downloads it (common for
              PDFs). Link shows a download icon.
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Internal vs external — quick guide</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Stay on caninemindsandmanners.ca</strong> → use <strong>Landing page</strong>{' '}
              and select the Page or Post. URLs stay correct if you change the slug later (after
              redirects are handled).
            </>,
            <>
              <strong>Leave the site</strong> (Acuity, social, third-party tools) → use{' '}
              <strong>External link</strong> with the full <code>https://</code> address.
            </>,
            <>
              <strong>Links inside paragraphs</strong> (not the CTA object) use the rich text toolbar —
              see below.
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Links inside body copy (Portable Text)</GuideSubheading>
        <GuideParagraph>
          When editing rich text (page sections, class descriptions, blog body, etc.), highlight text
          and use the link annotation. This is separate from the CTA block:
        </GuideParagraph>
        <GuideList
          items={[
            <>
              <strong>Internal Link</strong> — reference a <strong>Page</strong> or{' '}
              <strong>Class</strong> on the site. Class links include the correct parent page path.
              Use for “see our puppy classes” pointing to a class document.
            </>,
            <>
              <strong>URL</strong> — external address with optional <strong>Open in new window</strong>.
              Use for email (<code>mailto:</code>), phone (<code>tel:</code>), or outside websites.
            </>,
            <>
              Insert a <strong>CTA</strong> block when you want a standalone button or styled link,
              not text inside a sentence.
            </>,
          ]}
        />
      </Stack>

      <GuideCallout tone="caution" title="Common mistakes">
        <GuideList
          items={[
            'Filling both Landing page and External link on the same CTA — pick one destination.',
            'Using External link for a page that exists in Pages — prefer Landing page so links stay maintainable.',
            'Forgetting to Publish after menu or CTA changes — visitors will not see updates until published.',
          ]}
        />
      </GuideCallout>

      <GuideCallout tone="positive" title="Tip">
        Menu labels should be short (one or two words). Put longer descriptions on the destination
        page, not in the nav title.
      </GuideCallout>
    </Stack>
  ),
}
