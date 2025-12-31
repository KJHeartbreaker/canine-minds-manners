import {SiIconify as icon} from 'react-icons/si'
import {defineField, defineType} from 'sanity'

export const iconCard = defineType({
	title: 'Icon Card',
	name: 'iconCard',
	type: 'object',
	icon,
	fields: [
		defineField({
			name: 'icon',
			type: 'icon',
			title: 'Icon',
		}),
		defineField({
			name: 'heading',
			type: 'string',
			title: 'Heading',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Copy',
			name: 'copy',
			type: 'simplePortableText',
		}),
		defineField({
			name: 'cta',
			title: 'CTA',
			type: 'cta',
		}),
	],
	preview: {
		select: {
			title: 'heading',
			subtitle: 'copy',
		},
		prepare({title, subtitle}) {
			return {
				title: `Icon Card: ${title}`,
				subtitle: subtitle?.portableTextBlock?.[0]?.children?.[0]?.text,
			}
		},
	},
})

