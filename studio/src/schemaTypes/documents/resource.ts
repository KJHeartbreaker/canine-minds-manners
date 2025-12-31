import {GrResources as icon} from 'react-icons/gr'
import {defineField, defineType} from 'sanity'

export const resource = defineType({
	type: 'document',
	name: 'resource',
	title: 'Resource',
	icon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			title: 'Name',
		}),
		defineField({
			title: 'Downloadable File',
			name: 'fileDownload',
			type: 'file',
		}),
		defineField({
			title: 'CTA Title',
			name: 'ctaTitle',
			type: 'string',
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'simplePortableText',
			description: "A short description shouldn't be more than 250 characters.",
		}),
		defineField({
			name: 'image',
			type: 'mainImage',
			title: 'Image',
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
		prepare({title, media}) {
			return {
				title,
				media,
			}
		},
	},
})

