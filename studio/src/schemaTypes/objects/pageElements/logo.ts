import {defineField, defineType} from 'sanity'

export const logo = defineType({
	name: 'logo',
	type: 'image',
	title: 'Logo',
	fields: [
		defineField({
			name: 'logo',
			title: 'Logo',
			type: 'string',
		}),
		defineField({
			name: 'alt',
			type: 'string',
			title: 'Alternative text',
			description: 'Important for SEO and accessiblity.',
			validation: (Rule) =>
				Rule.error('You have to fill out the alternative text.').required(),
		}),
	],
	preview: {
		select: {
			imageUrl: 'asset.url',
			title: 'alt',
		},
	},
})

