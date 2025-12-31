import {GoMegaphone as icon} from 'react-icons/go'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const blogLandingPage = defineType({
	name: 'blogLandingPage',
	title: 'Blog',
	type: 'document',
	icon,
	fields: [
		defineField({
			name: 'title',
			description: 'Blog page meta title.',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			type: 'slug',
			name: 'slug',
			title: 'Slug',
			options: {
				source: 'title',
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'overview',
			description:
				'Used both for the <meta> description tag for SEO, and the personal website subheader.',
			title: 'Description',
			type: 'array',
			of: [
				// Paragraphs
				defineArrayMember({
					lists: [],
					marks: {
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'Link',
								fields: [
									{
										name: 'href',
										type: 'url',
										title: 'Url',
									},
								],
							},
						],
						decorators: [
							{
								title: 'Italic',
								value: 'em',
							},
							{
								title: 'Strong',
								value: 'strong',
							},
						],
					},
					styles: [],
					type: 'block',
				}),
			],
			validation: (rule) => rule.max(155).required(),
		}),
		defineField({
			name: 'content',
			type: 'array',
			title: 'Page sections',
			description: 'Add, edit, and reorder sections',
			of: [
				defineArrayMember({
					name: 'Hero Banner',
					type: 'heroBanner',
				}),
				defineArrayMember({
					name: 'Single Column Content Block',
					type: 'singleColumnContentBlock',
				}),
				defineArrayMember({
					name: 'Posts Grid',
					type: 'postsGridContainer',
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare({title}) {
			return {
				title,
			}
		},
	},
})

