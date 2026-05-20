import type {ReactNode} from 'react'

import {
  GuideBlockDoc,
  GuideVariantDoc,
  guideVariantSectionId,
  type GuideBlockVariant,
} from '../components/GuideBlockDoc'
import {GuideCallout} from '../components/GuideCallout'
import type {GuideScreenshotItem} from '../components/GuideScreenshot'
import type {GuideSection} from '../types'
import {guideImage} from '../utils/guideImages'

type PageBuilderBlock = {
  id: string
  title: string
  whenToUse: string
  fields?: string[]
  gotchas?: string[]
  images?: GuideScreenshotItem[]
  /** Nested in the TOC and content area (e.g. row layouts, custom component row types). */
  subsections?: GuideBlockVariant[]
  callout?: ReactNode
}

function blockToGuideSection(block: PageBuilderBlock): GuideSection {
  const children = block.subsections?.map((subsection) => ({
    id: guideVariantSectionId(block.id, subsection.title),
    title: subsection.title,
    content: <GuideVariantDoc variant={subsection} />,
  }))

  return {
    id: block.id,
    title: block.title,
    content: (
      <GuideBlockDoc
        whenToUse={block.whenToUse}
        fields={block.fields}
        gotchas={block.gotchas}
        images={block.images}
        callout={block.callout}
      />
    ),
    children: children && children.length > 0 ? children : undefined,
  }
}

const blocks: PageBuilderBlock[] = [
  {
    id: 'hero-banner',
    title: 'Hero Banner',
    whenToUse:
      'A full-width hero with background image, heading, subheading, body copy, and an optional call-to-action. Best for the top of a page.',
    fields: [
      'Hero Size — controls height',
      'Subheading, Heading, Copy — with colour options for each',
      'Background Image and Overlay (none, dark, or blue)',
      'Hero CTA — optional button link',
    ],
    images: [
      {
        src: guideImage('heroBanner.png'),
        alt: 'Hero Banner example on the live site',
      },
    ],
  },
  {
    id: 'hero-two-panel',
    title: 'Hero Two Panel',
    whenToUse:
      'A split hero: image on one side and coloured copy panel on the other. Good for feature pages with strong visuals.',
    fields: [
      'Hero Size',
      'Image panel image',
      'Copy panel background colour and portable text content',
      'Center Text — vertically centre copy in the panel',
    ],
    images: [
      {
        src: guideImage('heroTwoPanel.png'),
        alt: 'Hero Two Panel example on the live site',
      },
    ],
  },
  {
    id: 'single-column-content-block',
    title: 'Single Column Content Block',
    whenToUse:
      'A flexible single-column section for rich text or an FAQ list, with optional background colour and layout tweaks.',
    fields: [
      'Content Type — Portable Text or FAQ',
      'Optional Background Colour',
      'Skinny / Center Content / Remove Bottom Padding',
    ],
    gotchas: [
      'The internal Title field is for Studio identification only — it does not appear on the website.',
    ],
    images: [
      {
        src: guideImage('singleColumnContentBlock.png'),
        alt: 'Single Column Content Block example on the live site',
      },
    ],
  },
  {
    id: 'success-stories-block',
    title: 'Success Stories Block',
    whenToUse:
      'A carousel-style block showcasing client success stories (up to 8). Choose a background colour for the section.',
    fields: ['Background Colour', 'Success Stories — add individual story entries'],
    images: [
      {
        src: guideImage('successStoriesBlock.png'),
        alt: 'Success Stories Block example on the live site',
      },
    ],
  },
  {
    id: 'row-container',
    title: 'Multi Column Row',
    whenToUse:
      'Two- or three-column layouts with shared row settings. Put portable text, images, cards, forms, carousels, or FAQs inside each column. Choose **Two Column** or **Three Column** under **Content Row** — see the layout examples below.',
    fields: [
      'Content Row — Two Column or Three Column',
      'Row Content — per-column blocks (portable text, FAQ, images, icon cards, forms, Acuity form, carousel, etc.)',
      'Title options — colour, centre, or Hide Title (hidden on site, visible in Studio only)',
      'Optional background image or colour',
    ],
    gotchas: [
      'Hide Title keeps a label in the CMS but removes it from the live page — useful for organizing sections.',
      'Column count is set once per row — you cannot mix two- and three-column layouts in the same block.',
    ],
    subsections: [
      {
        title: 'Two Column',
        whenToUse:
          'Set **Content Row** to **Two Column** in the block settings. Row content fills two side-by-side columns on desktop (stacked on mobile).',
        images: [
          {
            src: guideImage('rowContainer-twoColumn.png'),
            alt: 'Two-column Multi Column Row example',
          },
        ],
      },
      {
        title: 'Three Column',
        whenToUse:
          'Set **Content Row** to **Three Column** in the block settings. Row content fills three columns on desktop (stacked on mobile).',
        images: [
          {
            src: guideImage('rowContainer-threeColumn.png'),
            alt: 'Three-column Multi Column Row example',
          },
        ],
      },
      {
        title: 'Blocks inside Row Content',
        whenToUse:
          'Open a Multi Column Row, then add items to **Row Content**. Blocks flow into columns in order (first items fill column one, then two, and so on depending on two- vs three-column mode).',
        fields: [
          'Portable Text — rich text, headings, links, images, and embeds in the column',
          'Image — single image with alt text',
          'Icon Card — small card with icon, heading, and short copy',
          'Image Button Card — image with heading and button-style link',
          'FAQ — collapsible question and answer pairs',
          'Carousel — rotating set of images',
          'Contact Form — on-site contact form with optional title and intro copy',
          'Acuity Form — full Acuity scheduling embed for general booking (not per-class session buttons — those come from **Classes**)',
        ],
        gotchas: [
          'Contact Form and Acuity Form appear near each other in the picker — Contact Form is your website form; Acuity Form loads the external scheduler.',
        ],
      },
    ],
  },
  {
    id: 'programs-grid-container',
    title: 'Programs Grid',
    whenToUse:
      'Displays selected **Classes** as program cards on the page. Card text, images, pricing, and links all come from each **Class** document in the sidebar — this block only chooses which classes to show and how they are laid out. Compare **Standard layout** and **Enhanced layout** below.',
    fields: [
      'Programs — pick which Class documents appear',
      'Enhanced Grid — enables bullet points, action buttons, and optional intro copy',
      'Description and Center Content — only when Enhanced Grid is on',
      'Optional Background Colour',
    ],
    gotchas: [
      'Edit the actual program content under **Classes**, not inside this block.',
      'Classes must be published to appear on the site.',
    ],
    subsections: [
      {
        title: 'Standard layout',
        whenToUse:
          'Leave **Enhanced Grid** unchecked for a simple card grid — title, image, and excerpt from each Class document.',
        images: [
          {
            src: guideImage('programsGridContainer.png'),
            alt: 'Standard Programs Grid example',
          },
        ],
      },
      {
        title: 'Enhanced layout',
        whenToUse:
          'Turn on **Enhanced Grid** for bullet points, action buttons on cards, and optional intro copy above the grid.',
        fields: ['Description', 'Center Content'],
        images: [
          {
            src: guideImage('enhancedProgramsGridContainer.png'),
            alt: 'Enhanced Programs Grid example',
          },
        ],
      },
    ],
  },
  {
    id: 'trainers-grid-container',
    title: 'Trainers Grid',
    whenToUse: 'Shows selected **Our Team** (trainer) profiles in a grid.',
    fields: ['Trainers — references to trainer documents', 'Optional Background Colour'],
    images: [
      {
        src: guideImage('trainersGridContainer.png'),
        alt: 'Trainers Grid example on the live site',
      },
    ],
  },
  {
    id: 'testimonial-grid-container',
    title: 'Testimonials',
    whenToUse: 'Displays selected testimonial documents in a grid with optional title styling.',
    fields: [
      'Testimonials — pick testimonial documents',
      'Title and Title Colour',
      'Skinny — reduces vertical padding',
    ],
    images: [
      {
        src: guideImage('testimonialGridContainer.png'),
        alt: 'Testimonials grid example on the live site',
      },
    ],
  },
  {
    id: 'class-rows-container',
    title: 'Class Rows',
    whenToUse:
      'Lists specific **Classes** in a horizontal row layout (not the full programs grid). Like Programs Grid, the visible content is pulled from each **Class** document you reference here.',
    fields: ['Classes — select which Class documents to show'],
    gotchas: [
      'Edit class names, descriptions, images, and booking links under **Classes** in the sidebar.',
      'Publish class documents before expecting them on the site.',
    ],
    images: [
      {
        src: guideImage('classRowsContainer.png'),
        alt: 'Class Rows example on the live site',
      },
    ],
  },
  {
    id: 'related-resources-row',
    title: 'Related Resources Row',
    whenToUse:
      'A titled row linking to blog posts or downloadable resources — often used at the bottom of articles or service pages.',
    fields: [
      'Related Resources — references to posts or resources (up to 4; avoid selecting the same item twice)',
      'Title, Title Colour, Optional Background Colour',
    ],
    images: [
      {
        src: guideImage('relatedResourcesRow.png'),
        alt: 'Related Resources Row example on the live site',
      },
    ],
  },
  {
    id: 'contact-page-map',
    title: 'Contact Page Map',
    whenToUse:
      'Contact page layout: map image, map link, form intro copy, and icon cards (address, phone, email).',
    fields: ['Map', 'Map Link', 'Form Copy Block', 'Icon Cards'],
    gotchas: ['Typically used only on the Contact page.'],
    images: [
      {
        src: guideImage('contactPageMap.png'),
        alt: 'Contact Page Map block example on the live site',
      },
    ],
  },
  {
    id: 'custom-component',
    title: 'Custom Component',
    whenToUse:
      'A wrapper for specialized layouts that do not fit other page sections. Add one or more rows inside **Rows** — each row is a different layout type (see **Trainer Rows**, **Gallery Grid**, and **About Us** below). The internal title is for Studio only.',
    fields: ['Rows — choose a row type below', 'Optional Background Colour'],
    gotchas: [
      'The Custom Component title field does not appear on the website.',
      'Only add the row types you need — most pages use a single row.',
    ],
    subsections: [
      {
        title: 'Trainer Rows',
        whenToUse:
          'A list of trainer profiles in a row layout. Select trainers from **Our Team** — profile photos, bios, and links come from those documents.',
        fields: ['Trainers — references to trainer documents'],
        image: {
          src: guideImage('customComponent-trainerRow.png'),
          alt: 'Trainer Rows layout inside a Custom Component',
        },
      },
      {
        title: 'Gallery Grid',
        whenToUse:
          'A mosaic image gallery on the page. Upload images directly in this row (not from another document type). On the live site, **clicking any image opens a modal** with a larger view and a carousel of every image in the gallery, starting on the one the visitor clicked.',
        fields: [
          'Gallery — add images in the order they should appear in the grid and carousel',
          'Alt text — set on each image for accessibility in both the grid and the modal',
        ],
        images: [
          {
            src: guideImage('customComponent-gallery.png'),
            alt: 'Gallery Grid mosaic layout on the page',
            caption: 'Gallery grid — images display in a mosaic layout.',
          },
          {
            src: guideImage('galleryModal.png'),
            alt: 'Gallery modal with main image carousel and thumbnail strip',
            caption:
              'Image modal — opens when a visitor clicks any grid image. Previous/next arrows browse the set; thumbnails below jump between images.',
          },
        ],
        gotchas: [
          'The modal always includes every image from the Gallery field — visitors are not limited to the image they clicked.',
          'Close the modal with the X button or by clicking the dark overlay outside the white panel.',
          'Image order in Studio is the order used in the grid and in the carousel.',
        ],
      },
      {
        title: 'About Us',
        whenToUse:
          'About page pattern: one portable text block plus exactly four icon cards (values, credentials, etc.).',
        fields: ['Copy — main portable text', 'Icon Cards — four icon card entries (required)'],
        image: {
          src: guideImage('customComponent-aboutUs.png'),
          alt: 'About Us layout inside a Custom Component',
        },
      },
    ],
  },
  {
    id: 'product-grid-container',
    title: 'Product Grid',
    whenToUse:
      'Would display selected **Products** in a grid. This area of the site is under construction and product-related work is currently on hold — avoid adding new product grids until your developer confirms it is live.',
    fields: ['Products — references to product documents', 'Optional Background Colour'],
    callout: (
      <GuideCallout tone="caution" title="On hold">
        Product pages and the Product Grid block are not in active use. You can still manage Product
        documents in the sidebar for future use, but new product sections on pages may not appear or
        may change when this feature ships.
      </GuideCallout>
    ),
  },
]

export const pageBuilderSections: GuideSection[] = blocks.map(blockToGuideSection)
