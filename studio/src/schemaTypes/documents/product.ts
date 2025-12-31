import {CgShoppingCart as icon} from 'react-icons/cg'
import {defineField, defineType} from 'sanity'

export const product = defineType({
	title: 'Product',
	name: 'product',
	type: 'document',
	icon,
	fields: [
		defineField({
			name: 'heading',
			type: 'string',
			title: 'Heading',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'price',
			title: 'Price',
			type: 'number',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'image',
			type: 'mainImage',
			title: 'Product Image',
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
			photo: 'image',
		},
		prepare({title, photo}) {
			return {
				title: `Product: ${title}`,
				media: photo,
			}
		},
	},
})

