import {GrFormEdit as icon} from 'react-icons/gr'
import {defineField, defineType} from 'sanity'

export const form = defineType({
  name: 'form',
  type: 'object',
  title: 'Contact Form',
  icon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    defineField({
      title: 'Copy',
      name: 'copy',
      type: 'simplePortableText',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: `Contact Form: ${title}`,
      }
    },
  },
})
