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
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: BsSearch,
    },
  ],
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      group: 'content',
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
      name: 'content',
      type: 'array',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections',
      group: 'content',
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
