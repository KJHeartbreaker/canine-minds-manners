import {BiBone as icon} from 'react-icons/bi'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {noDuplicateReferences} from '../../../lib/validations/noDuplicateReferences'

export const classRowsContainer = defineType({
  name: 'classRowsContainer',
  type: 'object',
  title: 'Class Rows',
  icon,
  description: 'Select the classes that you would like to display in this section.',
  fields: [
    defineField({
      title: 'Classes',
      name: 'classRefs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'class'}],
        }),
      ],
      validation: (Rule) =>
        Rule.custom(noDuplicateReferences('Each class can only be added once to this row.')),
    }),
  ],
  preview: {
    select: {
      class0: 'classRefs.0.name',
      class1: 'classRefs.1.name',
      class2: 'classRefs.2.name',
      class3: 'classRefs.3.name',
      classImage: 'classRefs.0.cardImage',
    },
    prepare: ({class0, class1, class2, class3, classImage}) => {
      const classes = [class0, class1, class2].filter(Boolean)
      const subtitle = classes.length > 0 ? `${classes.join(', ')}` : ''
      const hasMoreClasses = Boolean(class3)

      return {
        title: 'Classes',
        subtitle: hasMoreClasses ? `${subtitle}…` : subtitle,
        media: classImage || icon,
      }
    },
  },
})
