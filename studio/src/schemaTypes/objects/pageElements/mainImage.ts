import {defineField, defineType} from 'sanity'

export const mainImage = defineType({
	name: 'mainImage',
	type: 'image',
	title: 'Image',
	options: {
		hotspot: true,
		metadata: [
			'blurhash', // Default: included
			'lqip', // Default: included
		],
	},
	initialValue: {
		overlay: 'noOverlay',
	},
	fields: [
		defineField({
			name: 'width',
			type: 'number',
			title: 'Width',
			description:
				'Width and height are helpful so that the CDN serves the correct image size, and maintains aspect ratio. Populate these fields with a pixel value',
		}),
		defineField({
			name: 'height',
			type: 'number',
			title: 'Height',
		}),
		defineField({
			name: 'alt',
			type: 'string',
			title: 'Alternative text',
			description: 'Important for SEO and accessiblity.',
		}),
	],
	preview: {
		select: {
			imageUrl: 'asset.url',
			title: 'alt',
		},
	},
})

