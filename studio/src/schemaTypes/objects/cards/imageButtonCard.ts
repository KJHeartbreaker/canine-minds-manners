import {GiButtonFinger as icon} from 'react-icons/gi'
import {defineField, defineType} from 'sanity'

export const imageButtonCard = defineType({
	title: 'Image Button Card',
	name: 'imageButtonCard',
	type: 'object',
	icon,
	fields: [
		defineField({
			name: 'image',
			type: 'mainImage',
			title: 'Background Image',
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
			title: 'Landing page',
			name: 'landingPageRoute',
			type: 'reference',
			description: 'This links to another page within the site',
			to: [{type: 'page'}],
		}),
	],
	preview: {
		select: {
			title: 'heading',
			subtitle: 'subheading',
			photo: 'image',
		},
		prepare({title, photo}) {
			return {
				title: `Image Card: ${title}`,
				media: photo,
			}
		},
	},
})

