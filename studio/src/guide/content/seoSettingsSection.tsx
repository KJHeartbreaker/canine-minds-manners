import { Stack } from '@sanity/ui'

import { GuideCallout } from '../components/GuideCallout'
import { GuideList, GuideParagraph, GuideSubheading } from '../components/GuideProse'
import type { GuideSection } from '../types'

export const seoSettingsSection: GuideSection = {
  id: 'seo-settings',
  title: 'SEO settings',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        For Canine Minds and Manners, <strong>SEO is king</strong>. Strong SEO helps people in Calgary
        and beyond find your classes, resources, and expertise when they search Google — often before
        they ever see the homepage design. Every important page and post should have thoughtful SEO
        filled in before you publish.
      </GuideParagraph>

      <GuideCallout tone="critical" title="Before you publish">
        Open the <strong>SEO</strong> tab on every page and post. Meta description is{' '}
        <strong>required</strong> — Studio will not let you skip it. Treat SEO as part of the publish
        checklist, not an afterthought.
      </GuideCallout>

      <Stack space={4}>
        <GuideSubheading>Where to find SEO settings</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Pages</strong>, <strong>Home</strong>, and <strong>Blog</strong> — SEO tab on
              the document
            </>,
            <>
              <strong>Posts</strong> — SEO tab (alongside Post Settings and Post Content)
            </>,
            <>
              <strong>Settings and Menus</strong> — default social sharing image used when a page does
              not set its own
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>What each field does</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>SEO Title</strong> — The blue link text in Google search results. Aim for about{' '}
              <strong>50–60 characters</strong> (65 max). Include the service or topic and location
              when it fits naturally (e.g. “Puppy Training Classes in Calgary”). If you leave it
              blank, the page title is used instead — but a custom SEO title is almost always better.
            </>,
            <>
              <strong>Meta Description</strong> — The short summary under the title in search
              results. <strong>Required.</strong> Aim for about <strong>150–155 characters</strong>.
              Write for humans: what will they learn or get, and why click? This is your pitch in
              search — make it specific, not generic.
            </>,
            <>
              <strong>Hide from Search Engines (noindex)</strong> — Turn on only when a page should{' '}
              <em>not</em> appear in Google (thank-you pages, duplicates, internal-only content).
              Leave off for normal marketing pages, classes, and blog posts.
            </>,
            <>
              <strong>Canonical URL</strong> — Almost always leave blank. Use only when the same
              content lives at two URLs and you want Google to treat another URL as the “official”
              one. Your developer can advise if unsure.
            </>,
            <>
              <strong>Social Sharing Image</strong> — The image shown when someone shares the page on
              Facebook, LinkedIn, or messaging apps. Recommended size: <strong>1200×630 px</strong>.
              Add <strong>alt text</strong> on the image (required when an image is set). If empty,
              the site will fall back to the default from Settings and Menus.
            </>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Character counters</GuideSubheading>
        <GuideParagraph>
          SEO Title and Meta Description show a live character count in Studio. Stay in the green —
          text that is too long gets cut off in search results with “...”, which looks unprofessional
          and can lower clicks.
        </GuideParagraph>
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        Write meta descriptions for <strong>search intent</strong>: match what someone would type
        (“dog training Calgary”, “reactive dog class”) with a clear answer to what they will find on
        the page. Unique descriptions per page beat copying the same text everywhere.
      </GuideCallout>

      <GuideCallout tone="primary" title="Good habit">
        When you publish a new page or post: Content tab first, then <strong>SEO tab</strong>, then{' '}
        <strong>Publish</strong>. Preview in Presentation if you want to see layout — but SEO fields
        affect search and social cards, not the on-page design.
      </GuideCallout>
    </Stack>
  ),
}
