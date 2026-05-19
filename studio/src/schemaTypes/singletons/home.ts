import {GoHome as icon} from 'react-icons/go'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {BsSearch} from 'react-icons/bs'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
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
      name: 'title',
      description: 'This field is the title of your personal website.',
      title: 'Title',
      type: 'string',
      group: 'content',
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
    },
    prepare({title}) {
      return {
        title,
      }
    },
  },
})
