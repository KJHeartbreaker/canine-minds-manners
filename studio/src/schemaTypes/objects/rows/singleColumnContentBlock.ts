import {GiHamburgerMenu as icon} from 'react-icons/gi'
import {defineField, defineType} from 'sanity'

export const singleColumnContentBlock = defineType({
  name: 'singleColumnContentBlock',
  type: 'object',
  title: 'Single Column Content Block',
  icon,
  fieldsets: [
    {
      title: 'Row Parameters',
      name: 'rowParams',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  initialValue: {
    centerContent: false,
    removeBottomPadding: false,
    skinny: false,
    backgroundColor: 'White',
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description:
        'This field is only for the studio, and previewing content. It will not appear on your site.',
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
          {title: 'Dark Blue', value: '#013b63'},
          {title: 'Yellow', value: '#feca2d'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      fieldset: 'rowParams',
    }),
    defineField({
      name: 'removeBottomPadding',
      title: 'Remove Bottom Padding',
      type: 'boolean',
      description:
        'Content Blocks have space by default, this option removes the extra space below the content if selected.',
      fieldset: 'rowParams',
    }),
    defineField({
      name: 'skinny',
      title: 'Skinny',
      type: 'boolean',
      description:
        'This option significantly reduces the top and bottom padding for all screen sizes.',
      fieldset: 'rowParams',
    }),
    defineField({
      name: 'centerContent',
      title: 'Center Content',
      type: 'boolean',
      description: 'This determines if the content is to be centered, or left aligned.',
      fieldset: 'rowParams',
    }),
    defineField({
      name: 'contentBlock',
      type: 'object',
      title: 'Content',
      fields: [
        defineField({
          name: 'contentType',
          type: 'string',
          title: 'Content Type',
          description: 'Choose the type of content to display',
          options: {
            list: [
              {title: 'Portable Text', value: 'mainPortableText'},
              {title: 'FAQ', value: 'faq'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'mainPortableText',
        }),
        defineField({
          name: 'portableTextBlock',
          type: 'mainPortableText',
          title: 'Portable Text',
          hidden: ({parent}) => {
            const contentType = parent?.contentType || 'mainPortableText'
            return contentType !== 'mainPortableText'
          },
        }),
        defineField({
          name: 'faq',
          type: 'faq',
          title: 'FAQ',
          hidden: ({parent}) => {
            const contentType = parent?.contentType || 'mainPortableText'
            return contentType !== 'faq'
          },
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
      title: 'title',
      contentType: 'contentBlock.contentType',
      portableTextBlock: 'contentBlock.portableTextBlock.portableTextBlock',
      faqItems: 'contentBlock.faq.items',
      disabled: 'disabled',
    },
    prepare({title, disabled, contentType, portableTextBlock, faqItems}) {
      const baseTitle = title ? `Single Column Block: ${title}` : `Single Column Block`

      let subtitle = 'Please add content'

      if (contentType === 'faq' && faqItems && Array.isArray(faqItems)) {
        const itemCount = faqItems.length
        if (itemCount > 0) {
          // Show first question as preview
          const firstQuestion = faqItems[0]?.question
          subtitle =
            itemCount === 1
              ? `FAQ: ${firstQuestion || '1 item'}`
              : `FAQ: ${firstQuestion || `${itemCount} items`} (${itemCount} items)`
        } else {
          subtitle = 'FAQ: No items yet'
        }
      } else if (
        contentType === 'mainPortableText' &&
        portableTextBlock &&
        Array.isArray(portableTextBlock)
      ) {
        // Extract text from first block
        const firstBlock = portableTextBlock[0]
        if (firstBlock?._type === 'block' && firstBlock.children) {
          subtitle = firstBlock.children[0]?.text || 'Portable Text'
        } else if (firstBlock?._type === 'youtube') {
          subtitle = 'YouTube Embed'
        } else if (firstBlock?._type === 'image') {
          subtitle = 'Image'
        } else if (firstBlock?._type === 'cta') {
          subtitle = `CTA: ${firstBlock.title || 'Button'}`
        } else {
          subtitle = 'Portable Text'
        }
      }

      return {
        title: disabled ? `*** DISABLED *** ${baseTitle}` : baseTitle,
        subtitle,
        media: icon,
      }
    },
  },
})
