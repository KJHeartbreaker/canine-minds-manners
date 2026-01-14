import {GrDocument as icon} from 'react-icons/gr'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {BsSearch} from 'react-icons/bs'

export const page = defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
      icon: BsSearch,
      default: true,
    },
  ],
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
      name: 'seo',
      type: 'seo',
      title: 'SEO Settings',
      description: 'Configure how this page appears in search engines',
      group: 'seo',
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
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName: string) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.png`,
            },
            {name: 'list'},
          ],
        },
      },
      of: [
        defineArrayMember({type: 'heroBanner'}),
        defineArrayMember({type: 'heroTwoPanel'}),
        defineArrayMember({type: 'singleColumnContentBlock'}),
        defineArrayMember({type: 'successStoriesBlock'}),
        defineArrayMember({type: 'rowContainer'}),
        defineArrayMember({type: 'programsGridContainer'}),
        defineArrayMember({type: 'trainersGridContainer'}),
        defineArrayMember({type: 'testimonialGridContainer'}),
        defineArrayMember({type: 'classRowsContainer'}),
        defineArrayMember({type: 'relatedResourcesRow'}),
        defineArrayMember({type: 'contactPageMap'}),
        defineArrayMember({type: 'customComponent'}),
        defineArrayMember({type: 'productGridContainer'}),
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
