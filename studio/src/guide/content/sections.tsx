import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideParagraph} from '../components/GuideProse'
import type {GuideSection} from '../types'
import {pageBuilderSections} from './pageBuilderBlocks'
import {workflowSections} from './workflowSections'

const pageBuilderParent: GuideSection = {
  id: 'page-builder',
  title: 'Page builder components',
  content: (
    <Stack space={4}>
      <GuideParagraph>
        Page sections are the building blocks inside <strong>Home</strong>, <strong>Blog</strong>,{' '}
        <strong>Pages</strong>, and <strong>Contact</strong>. When adding a section, use the grid
        insert menu to pick a component. Reorder sections by dragging.
      </GuideParagraph>
      <GuideCallout tone="positive" title="Tip">
        Most page sections include a <strong>Disabled</strong> checkbox. Use it to hide a block on
        the live site without deleting it from the page.
      </GuideCallout>
    </Stack>
  ),
  children: pageBuilderSections,
}

export const guideSections: GuideSection[] = [...workflowSections, pageBuilderParent]
