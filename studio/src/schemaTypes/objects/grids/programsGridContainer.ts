import {GiJumpingDog as icon} from 'react-icons/gi'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {noDuplicateReferences} from '../../../lib/validations/noDuplicateReferences'

export const programsGridContainer = defineType({
  name: 'programsGridContainer',
  type: 'object',
  title: 'Programs Grid',
  icon,
  description: 'Select the programs that you would like to display in this section.',
  initialValue: {
    backgroundColor: 'White',
  },
  fields: [
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
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      title: 'Programs',
      name: 'programs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'class'}],
        }),
      ],
      validation: (Rule) =>
        Rule.custom(noDuplicateReferences('Each class can only be added once to this grid.')),
    }),
    defineField({
      name: 'enhanced',
      title: 'Enhanced Grid',
      type: 'boolean',
      description: 'Enable enhanced card layout with bullet points and action buttons',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'mainPortableText',
      description: 'Optional description to display above the enhanced programs grid',
      hidden: ({parent}) => !parent?.enhanced,
    }),
    defineField({
      name: 'centerContent',
      title: 'Center Content',
      type: 'boolean',
      description: 'This determines if the description content is centered, or left aligned.',
      hidden: ({parent}) => !parent?.enhanced,
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      enhanced: 'enhanced',
      program0: 'programs.0.name',
      program1: 'programs.1.name',
      program2: 'programs.2.name',
      program3: 'programs.3.name',
      programImage: 'programs.0.cardImage',
      descriptionText: 'description.portableTextBlock.0.children.0.text',
    },
    prepare: ({
      enhanced,
      program0,
      program1,
      program2,
      program3,
      programImage,
      descriptionText,
    }) => {
      const programs = [program0, program1, program2].filter(Boolean)
      const subtitle = programs.length > 0 ? `${programs.join(', ')}` : ''
      const hasMorePrograms = Boolean(program3)

      if (enhanced) {
        return {
          title: 'Enhanced Programs Grid',
          subtitle:
            descriptionText || (hasMorePrograms ? `${subtitle}…` : subtitle) || 'No description',
          media: programImage || icon,
        }
      }

      return {
        title: 'programs',
        subtitle: hasMorePrograms ? `${subtitle}…` : subtitle,
        media: programImage || icon,
      }
    },
  },
})
