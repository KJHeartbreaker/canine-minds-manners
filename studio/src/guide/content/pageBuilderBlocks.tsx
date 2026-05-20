import {GuideBlockDoc} from '../components/GuideBlockDoc'
import type {GuideSection} from '../types'

type PageBuilderBlock = {
  id: string
  title: string
  whenToUse: string
  fields?: string[]
  gotchas?: string[]
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
  },
  {
    id: 'success-stories-block',
    title: 'Success Stories Block',
    whenToUse:
      'A carousel-style block showcasing client success stories (up to 8). Choose a background colour for the section.',
    fields: ['Background Colour', 'Success Stories — add individual story entries'],
  },
  {
    id: 'row-container',
    title: 'Multi Column Row',
    whenToUse:
      'Two- or three-column layouts with shared row settings. Put portable text, images, cards, forms, carousels, or FAQs inside each column.',
    fields: [
      'Content Row — two or three columns',
      'Row Content — per-column blocks (portable text, FAQ, images, icon cards, forms, Acuity form, carousel, etc.)',
      'Title options — colour, centre, or Hide Title (hidden on site, visible in Studio only)',
      'Optional background image or colour',
    ],
    gotchas: [
      'Hide Title keeps a label in the CMS but removes it from the live page — useful for organizing sections.',
    ],
  },
  {
    id: 'programs-grid-container',
    title: 'Programs Grid',
    whenToUse:
      'Displays selected **Classes** as program cards. Use **Enhanced Grid** for bullet points and action buttons on cards.',
    fields: [
      'Programs — pick which classes appear',
      'Enhanced Grid, Description, Center Content — for the enhanced layout',
      'Optional Background Colour',
    ],
    gotchas: ['Classes must be published to appear on the site.'],
  },
  {
    id: 'trainers-grid-container',
    title: 'Trainers Grid',
    whenToUse: 'Shows selected **Our Team** (trainer) profiles in a grid.',
    fields: ['Trainers — references to trainer documents', 'Optional Background Colour'],
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
  },
  {
    id: 'class-rows-container',
    title: 'Class Rows',
    whenToUse: 'Lists specific **Classes** in a row layout (not the full programs grid).',
    fields: ['Classes — select which class documents to show'],
    gotchas: ['Publish class documents before expecting them on the site.'],
  },
  {
    id: 'related-resources-row',
    title: 'Related Resources Row',
    whenToUse:
      'A titled row linking to blog posts or downloadable resources — often used at the bottom of articles or service pages.',
    fields: [
      'Related Resources — references to posts or resources',
      'Title, Title Colour, Optional Background Colour',
    ],
  },
  {
    id: 'contact-page-map',
    title: 'Contact Page Map',
    whenToUse:
      'Contact page layout: map image, map link, form intro copy, and icon cards (address, phone, email).',
    fields: ['Map', 'Map Link', 'Form Copy Block', 'Icon Cards'],
    gotchas: ['Typically used only on the Contact page.'],
  },
  {
    id: 'custom-component',
    title: 'Custom Component',
    whenToUse:
      'A wrapper for specialized layouts: trainer rows, image gallery, or About Us content. Use the internal title to identify the block in Studio.',
    fields: [
      'Rows — Trainer Rows, Gallery Grid, or About Us Container',
      'Optional Background Colour',
    ],
    gotchas: [
      'The Custom Component title field does not appear on the website.',
      'Nested Trainer Rows and Gallery Grid types live inside this block.',
    ],
  },
  {
    id: 'product-grid-container',
    title: 'Product Grid',
    whenToUse: 'Displays selected **Products** in a grid with optional background colour.',
    fields: ['Products — references to product documents', 'Optional Background Colour'],
  },
]

export const pageBuilderSections: GuideSection[] = blocks.map((block) => ({
  id: block.id,
  title: block.title,
  content: (
    <GuideBlockDoc whenToUse={block.whenToUse} fields={block.fields} gotchas={block.gotchas} />
  ),
}))
