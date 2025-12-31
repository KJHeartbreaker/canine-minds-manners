import {GrDocument as icon} from 'react-icons/gr'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const page = defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      title: 'Overview',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      // validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections',
      of: [
        defineArrayMember({
          name: 'Hero Banner',
          type: 'heroBanner',
        }),
        defineArrayMember({
          name: 'Single Column Content Block',
          type: 'singleColumnContentBlock',
        }),
        defineArrayMember({
          name: 'Content Rows',
          type: 'rowContainer',
        }),
        defineArrayMember({
          name: 'Product Grid',
          type: 'productGridContainer',
        }),
        defineArrayMember({
          name: 'Programs Grid',
          type: 'programsGridContainer',
        }),
        defineArrayMember({
          name: 'Trainers Grid',
          type: 'trainersGridContainer',
        }),
        defineArrayMember({
          name: 'Testimonials',
          type: 'testimonialGridContainer',
        }),
        defineArrayMember({
          name: 'Custom Component',
          type: 'customComponent',
        }),
        defineArrayMember({
          name: 'Class Row',
          type: 'classRowsContainer',
        }),
        defineArrayMember({
          name: 'Related Resources',
          type: 'relatedResourcesRow',
        }),
        defineArrayMember({
          name: 'Contact Page Map',
          type: 'contactPageMap',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title,
        subtitle: `/${slug}`,
      }
    },
  },
})
