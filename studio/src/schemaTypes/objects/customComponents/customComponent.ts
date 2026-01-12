import {FcRating as icon} from 'react-icons/fc'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const customComponent = defineType({
  type: 'object',
  name: 'customComponent',
  title: 'Custom Component',
  icon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Custom Component',
      description:
        'This title will not appear on the page. It is just to help you identify this block in the Studio',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Optional Background Colour',
      type: 'string',
      description:
        'If no background image is uploaded, you can choose a background colour. If no selection is made, the default is white.',
      options: {
        list: [
          {title: 'White', value: '#ffffff'},
          {title: 'Grey', value: '#e2e2e2'},
          {title: 'Blue', value: '#61c8e9'},
          {title: 'Yellow', value: '#feca2d'},
          {title: 'Orange', value: '#ee6d08'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      type: 'array',
      name: 'rows',
      of: [
        defineArrayMember({type: 'trainerRows'}),
        defineArrayMember({type: 'galleryGrid'}),
        defineArrayMember({type: 'aboutUsContainer'}),
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
      title: 'title',
      content: 'content.0.title',
      rows: 'rows',
      disabled: 'disabled',
    },
    prepare({title, content, disabled, rows}) {
      const baseTitle = title ? `Custom Component: ${title}` : `Custom Component`

      // Try to get image from galleryGrid if it exists
      let previewImage
      if (rows && Array.isArray(rows)) {
        const galleryGrid = rows.find((row: any) => row._type === 'galleryGrid')
        if (galleryGrid?.galleryArr?.[0]) {
          previewImage = galleryGrid.galleryArr[0]
        }
      }

      const preview: any = {
        title: disabled ? `*** DISABLED *** ${baseTitle}` : baseTitle,
        subtitle: content,
      }

      // Use image if available, otherwise use the schema icon
      preview.media = previewImage || icon

      return preview
    },
  },
})
