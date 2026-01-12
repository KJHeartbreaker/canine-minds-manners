import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaStar as icon} from 'react-icons/fa'

export const successStoriesBlock = defineType({
  name: 'successStoriesBlock',
  type: 'object',
  title: 'Success Stories Block',
  icon,
  fields: [
    // defineField({
    //   title: 'Title',
    //   name: 'title',
    //   type: 'string',
    //   description:
    //     'This field is only for the studio, and previewing content. It will not appear on your site.',
    // }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Colour',
      type: 'string',
      description: 'Choose the background colour for the success stories section.',
      options: {
        list: [
          {title: 'Yellow', value: 'yellow'},
          {title: 'Orange', value: 'orange'},
          {title: 'Light Blue', value: 'lightBlue'},
          {title: 'Navy', value: 'navy'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'yellow',
    }),
    defineField({
      name: 'stories',
      type: 'array',
      title: 'Success Stories',
      description: 'Add up to 8 success stories',
      validation: (Rule) => Rule.max(8).error('You can add a maximum of 8 success stories'),
      of: [
        defineArrayMember({
          type: 'simplePortableText',
          title: 'Success Story',
        }),
      ],
    }),
    defineField({
      name: 'disabled',
      title: 'Disabled',
      description: 'Setting this to true will disable the component, but not delete it.',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      stories: 'stories',
    },
    prepare({stories}) {
      const storyCount = Array.isArray(stories) ? stories.length : 0
      const story0 = stories?.[0]?.portableTextBlock?.[0]?.children?.[0]?.text
      const preview = story0
        ? `${story0.substring(0, 50)}${story0.length > 50 ? '...' : ''}`
        : 'No stories'
      return {
        title: 'Success Stories',
        subtitle: `${storyCount} ${storyCount === 1 ? 'story' : 'stories'}${preview !== 'No stories' ? `: ${preview}` : ''}`,
      }
    },
  },
})
