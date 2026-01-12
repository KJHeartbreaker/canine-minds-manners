import {GiJumpingDog as icon} from 'react-icons/gi'
import {defineArrayMember, defineField, defineType} from 'sanity'

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
    }),
    defineField({
      name: 'enhanced',
      title: 'Enhanced Grid',
      type: 'boolean',
      description: 'Enable enhanced card layout with bullet points and action buttons',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      program0: 'programs.0.name',
      program1: 'programs.1.name',
      program2: 'programs.2.name',
      program3: 'programs.3.name',
      programImage: 'programs.0.cardImage',
    },
    prepare: ({program0, program1, program2, program3, programImage}) => {
      const programs = [program0, program1, program2].filter(Boolean)
      const subtitle = programs.length > 0 ? `${programs.join(', ')}` : ''
      const hasMorePrograms = Boolean(program3)

      return {
        title: 'programs',
        subtitle: hasMorePrograms ? `${subtitle}…` : subtitle,
        media: programImage || icon,
      }
    },
  },
})
