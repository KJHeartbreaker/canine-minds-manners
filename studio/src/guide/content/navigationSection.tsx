import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const navigationSection: GuideSection = {
  id: 'navigation',
  title: 'Navigation & site settings',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        <strong>Settings and Menus</strong> is a single document for site-wide chrome: header menu,
        footer accreditation logos, and the default social sharing image. Changes apply everywhere
        after you <strong>Publish</strong> this document.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>Add, reorder, or remove a menu link</GuideSubheading>
        <GuideSteps
          steps={[
            <>Open <strong>Settings and Menus</strong> in the Content sidebar.</>,
            <>
              In <strong>Menu Item list</strong>, click <strong>Add item</strong> (or the + control).
            </>,
            <>
              Choose <strong>Navigation Item</strong> for a single top-level link, or{' '}
              <strong>Navigation Dropdown</strong> for a link with a flyout submenu.
            </>,
            <>
              Fill in the <strong>CTA</strong> fields (label and destination) — see{' '}
              <strong>Call to action (CTA) buttons & links</strong> in this guide.
            </>,
            <>Drag items to reorder them. The order in Studio is the order in the header.</>,
            <>To remove a link, open the item and delete it from the list, then <strong>Publish</strong>.</>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Navigation Item vs Navigation Dropdown</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Navigation Item</strong> — one label in the header that goes to one destination
              (a page, post, external URL, etc.).
            </>,
            <>
              <strong>Navigation Dropdown</strong> — a parent label (with its own optional link) plus{' '}
              <strong>Dropdown Items</strong>: a list of additional CTAs shown when visitors hover or
              tap the menu (desktop) or expand the section (mobile).
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Dropdown tips</GuideSubheading>
        <GuideList
          items={[
            <>
              The parent <strong>CTA</strong> title is the text shown in the header (e.g. “Classes”).
            </>,
            <>
              Each <strong>Dropdown Item</strong> is a full CTA — usually a <strong>Landing page</strong>{' '}
              reference to a Page on the site.
            </>,
            <>
              If the parent should not navigate anywhere, leave its link fields empty and only set{' '}
              dropdown children (the label still appears; it opens the submenu).
            </>,
          ]}
        />
      </Stack>

      <GuideCallout tone="primary" title="Note">
        Use <strong>Navigation Item</strong> or <strong>Navigation Dropdown</strong> for menu entries.
        Other item types in the list may not appear in the header — stick to these two for reliable
        results.
      </GuideCallout>

      <Stack space={4}>
        <GuideSubheading>Footer logos</GuideSubheading>
        <GuideParagraph>
          <strong>Footer Logos</strong> are accreditation or partner marks shown in the site footer (not
          the main navigation). Add <strong>Logo</strong> entries with image and alt text; reorder by
          dragging. Publish Settings and Menus after changes.
        </GuideParagraph>
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Default social sharing image</GuideSubheading>
        <GuideParagraph>
          <strong>Open Graph Image</strong> is the fallback image when a page or post does not set its
          own SEO social image — used for link previews on social platforms and some search contexts.
          Upload an on-brand image and add <strong>alt text</strong> (required when an image is set).
          Page-level SEO images override this default; see <strong>SEO settings</strong>.
        </GuideParagraph>
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        After changing the menu, footer, or default image, publish <strong>Settings and Menus</strong>{' '}
        and check the live site header, footer, and a sample page share preview if needed.
      </GuideCallout>
    </Stack>
  ),
}
