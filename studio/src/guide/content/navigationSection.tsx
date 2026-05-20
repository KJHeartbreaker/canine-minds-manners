import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const navigationSection: GuideSection = {
  id: 'navigation',
  title: 'Header navigation',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        The site header menu (and a simplified version in the footer) is managed in one place:{' '}
        <strong>Settings and Menus</strong>. Changes here apply across the whole site after you{' '}
        <strong>Publish</strong>.
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

      <GuideCallout tone="positive" title="Tip">
        After changing the menu, publish Settings and check the live site header (and mobile menu).
        Clear naming in dropdowns helps visitors find puppy classes, private training, resources, and
        similar pages quickly.
      </GuideCallout>
    </Stack>
  ),
}
