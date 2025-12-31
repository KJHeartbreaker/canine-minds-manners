import {BiBone as icon} from 'react-icons/bi'
import {defineArrayMember, defineField, defineType} from 'sanity'

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
		}),
	],
	preview: {
		select: {
			class0: 'classRefs.0.name',
			class1: 'classRefs.1.name',
			class2: 'classRefs.2.name',
			class3: 'classRefs.3.name',
		},
		prepare: ({class0, class1, class2, class3}) => {
			const classes = [class0, class1, class2].filter(Boolean)
			const subtitle = classes.length > 0 ? `${classes.join(', ')}` : ''
			const hasMoreClasses = Boolean(class3)

			return {
				title: 'Classes',
				subtitle: hasMoreClasses ? `${subtitle}…` : subtitle,
			}
		},
	},
})

