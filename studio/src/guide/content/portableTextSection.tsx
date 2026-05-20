import {Stack} from '@sanity/ui'

import {GuideCallout} from '../components/GuideCallout'
import {GuideScreenshot} from '../components/GuideScreenshot'
import {GuideList, GuideParagraph, GuideSteps, GuideSubheading} from '../components/GuideProse'
import type {GuideSection} from '../types'
import {guideImage} from '../utils/guideImages'

export const portableTextSection: GuideSection = {
  id: 'portable-text',
  title: 'Portable Text',
  content: (
    <Stack space={5}>
      <GuideParagraph>
        <strong>Portable Text</strong> is the rich text editor used across the site for body copy,
        intros, FAQs, class descriptions, and more. You type in Studio; the website renders headings,
        lists, links, colours, and special blocks consistently.
      </GuideParagraph>

      <Stack space={4}>
        <GuideSubheading>Two editor types on this site</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>Full Portable Text</strong> (<em>Portable Text Block</em>) — headings, brand
              colours, images, CTAs, YouTube, horizontal rules, logo rows, and contact info blocks.
              Used on pages, posts, multi-column rows, hero panels, and similar.
            </>,
            <>
              <strong>Simple Portable Text</strong> — paragraphs with <strong>bold</strong>,{' '}
              <em>italic</em>, bullet/numbered lists, and links only. Used for excerpts, cards,
              testimonials, trainer bios, and shorter fields.
            </>,
          ]}
        />
        <GuideParagraph>
          If you do not see colour buttons or the option to insert a CTA, you are in a Simple field —
          that is expected for that location.
        </GuideParagraph>
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Text formatting (full editor)</GuideSubheading>
        <GuideParagraph>
          <strong>Block styles</strong> — use the style dropdown in the toolbar:
        </GuideParagraph>
        <GuideList
          items={[
            <>Paragraph (normal body text)</>,
            <>H1 through H5 — use lower numbers for more important headings; do not skip levels for styling alone</>,
            <>Quote (blockquote)</>,
            <>Bullet and numbered lists — use the list buttons in the toolbar</>,
          ]}
        />
        <GuideParagraph>
          <strong>Inline formatting</strong> — toolbar buttons on selected text:
        </GuideParagraph>
        <GuideList
          items={[
            <><strong>Strong</strong> and <strong>Emphasis</strong> (bold and italic)</>,
            <>Underline and strikethrough</>,
            <>
              <strong>Highlight</strong> — yellow background on selected text (use sparingly)
            </>,
          ]}
        />
        <GuideScreenshot
          src={guideImage('pteFormatting.png')}
          alt="Portable Text toolbar showing block styles and inline formatting options"
          caption="Toolbar: block style dropdown, lists, bold/italic, links, and related formatting."
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Brand colours on text</GuideSubheading>
        <GuideParagraph>
          Select the words you want to colour, then click one colour in the toolbar (shown as coloured
          circles): <strong>Yellow</strong>, <strong>Orange</strong>, <strong>Blue</strong>,{' '}
          <strong>Dark Blue</strong>, or <strong>White</strong>.
        </GuideParagraph>
        <GuideSteps
          steps={[
            <>Highlight the text (do not colour entire paragraphs unless intentional).</>,
            <>Click a single colour button — the text preview updates in the editor.</>,
            <>
              Use <strong>White</strong> only on dark backgrounds (for example blue or orange section
              backgrounds) so it stays readable.
            </>,
          ]}
        />
        <GuideScreenshot
          src={guideImage('pteColours.png')}
          alt="Portable Text toolbar showing brand colour circle buttons"
          caption="Brand colours — select text, then click one coloured circle (Yellow, Orange, Blue, Dark Blue, or White)."
        />
        <GuideCallout tone="caution" title="Good to know — one colour at a time">
          Apply <strong>only one brand colour</strong> to the same span of text. If you click a second
          colour on text that is already coloured, results can look wrong on the site or the last
          colour may win unpredictably. To change colour, select the text and apply the new colour once;
          avoid stacking Yellow + Blue + Orange on the same words.
        </GuideCallout>
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Links</GuideSubheading>
        <GuideList
          items={[
            <>
              <strong>URL</strong> — external link (https, http, mailto, tel). Optional “open in new
              window” for external sites.
            </>,
            <>
              <strong>Internal Link</strong> — pick a <strong>Page</strong> or <strong>Class</strong>{' '}
              document; the site builds the correct path (including class anchor links when a class has
              a parent page).
            </>,
          ]}
        />
        <GuideParagraph>
          For button-style actions inside copy, use a <strong>CTA</strong> block (below) rather than
          styling plain text to look like a button — see <strong>Call to action (CTA) buttons &amp; links</strong>.
        </GuideParagraph>
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Blocks you can insert (full editor only)</GuideSubheading>
        <GuideParagraph>
          Place the cursor on its own line where you want the block, then use the <strong>+</strong> or
          insert control in the Portable Text field (labels may vary slightly by Studio version):
        </GuideParagraph>
        <GuideList
          items={[
            <>
              <strong>Image</strong> — upload or choose from the library; add <strong>alt text</strong>{' '}
              (see <strong>Images &amp; alt text</strong>)
            </>,
            <>
              <strong>CTA</strong> — button or text link using the shared CTA fields (landing page,
              external URL, or file download)
            </>,
            <>
              <strong>YouTube Embed</strong> — paste the video URL
            </>,
            <>
              <strong>HR</strong> (horizontal rule) — spacing line; optional width and size in the
              block settings
            </>,
            <>
              <strong>Logo Row</strong> — row of accreditation/partner logos
            </>,
            <>
              <strong>Contact Information</strong> — phone/email block for contact-style pages
            </>,
          ]}
        />
        <GuideScreenshot
          src={guideImage('pteComponents.png')}
          alt="Portable Text insert menu showing CTA, YouTube, image, and other block types"
          caption="Insert menu — add images, CTAs, YouTube, horizontal rules, logo rows, and contact info on their own lines."
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Where you will use Portable Text</GuideSubheading>
        <GuideList
          items={[
            <>Page sections: Single Column Content Block, Multi Column Row (portable text column), Hero Two Panel copy panel</>,
            <>Blog: post <strong>Body</strong> (full); <strong>Excerpt</strong> (simple)</>,
            <>Classes: description and similar (mostly simple)</>,
            <>Cards, testimonials, resources, success stories, forms — usually simple</>,
            <>FAQ answers inside a Multi Column Row — full editor per answer</>,
          ]}
        />
      </Stack>

      <Stack space={4}>
        <GuideSubheading>Layout options that affect Portable Text</GuideSubheading>
        <GuideParagraph>
          Some sections wrap Portable Text with extra layout, not different editor features:
        </GuideParagraph>
        <GuideList
          items={[
            <>
              <strong>Center Content</strong> on Single Column Content Block — centres text; images in
              that block are centred too
            </>,
            <>Hero and row <strong>background colours</strong> — affect whether White text colour is readable</>,
          ]}
        />
      </Stack>

      <GuideCallout tone="positive" title="Tip">
        Write for scanning: short paragraphs, headings for sections, and lists where you have several
        points. Publish the parent page or post after editing so the live site updates.
      </GuideCallout>
    </Stack>
  ),
}
