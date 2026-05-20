import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideList, GuideParagraph, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'

export const imagesAltSection: GuideSection = {
  id: 'images-and-alt-text',
  title: 'Images & alt text',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        Images need short, accurate <strong>alternative text (alt text)</strong> so the site is
        accessible and search engines understand what the image shows. Studio will prompt you when
        alt text is required.
      </GuideParagraph>

      <GuideCallout tone="critical" title="Rule of thumb">
        If an image is uploaded and used on the site, add alt text before you publish — unless the
        image is purely decorative and your developer has set it up that way (rare for this site).
      </GuideCallout>

      <Stack space={4}>
        <GuideSubheading>Where you add alt text</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Image</strong> fields (hero backgrounds, row images, gallery images, class
              photos, card images) — open the image and fill in <strong>Alternative text</strong>
            </>,
            <>
              <strong>Portable text</strong> — images embedded in body copy have their own alt field
              on the image block
            </>,
            <>
              <strong>SEO → Social Sharing Image</strong> — alt is required when an OG image is set
              (see <strong>SEO settings</strong>)
            </>,
            <>
              <strong>Posts</strong> — header image alt helps cards and social sharing
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Writing good alt text</GuideSubheading>
        <GuideList
          items={[
            <>Describe what is in the image, not “image of” or the filename.</>,
            <>
              Example: <em>Golden retriever sitting during a group training class indoors</em> — not{' '}
              <em>dog.jpg</em>
            </>,
            <>Keep it concise — usually one sentence.</>,
            <>If the image is a button or link (for example a logo linking home), say what it does.</>,
          ]}
        />
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        Alt text is for people using screen readers and for SEO. It is not the same as a caption in
        body copy — you can have both where the design allows captions.
      </GuideCallout>
    </Stack>
  ),
}
