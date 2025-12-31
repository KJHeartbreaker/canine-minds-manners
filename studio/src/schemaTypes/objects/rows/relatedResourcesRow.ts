import {TbCirclesRelation as icon} from 'react-icons/tb'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const relatedResourcesRow = defineType({
	name: 'relatedResourcesRow',
	type: 'object',
	title: 'Related Resources Row',
	icon,
	fieldsets: [
		{
			title: 'Row Parameters',
			name: 'rowParams',
			options: {
				collapsible: true,
				collapsed: false,
			},
		},
		{
			title: 'Title Options',
			name: 'titleOptions',
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
	],
	initialValue: {
		backgroundColor: '#e2e2e2',
		titleColor: '#ee6d08',
	},
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			description:
				'This title will appear above the row, and might say something like "More about puppy training".',
		}),
		defineField({
			name: 'titleColor',
			title: 'Title Colour',
			type: 'string',
			description: 'Default is Dark Grey.',
			options: {
				list: [
					{title: 'Orange', value: '#ee6d08'},
					{title: 'Dark Grey', value: '#333333'},
					{title: 'Blue', value: '#16abcc'},
					{title: 'Yellow', value: '#feca2d'},
					{title: 'White', value: '#ffffff'},
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			fieldset: 'titleOptions',
		}),
		defineField({
			name: 'backgroundColor',
			title: 'Optional Background Colour',
			type: 'string',
			description:
				'If no background image is uploaded, you can choose a background colour. If no selection is made, the default is grey.',
			options: {
				list: [
					{title: 'Grey', value: '#e2e2e2'},
					{title: 'White', value: '#ffffff'},
					{title: 'Blue', value: '#16abcc'},
					{title: 'Orange', value: '#ee6d08'},
					{title: 'Yellow', value: '#feca2d'},
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			fieldset: 'rowParams',
		}),
		defineField({
			name: 'relatedResources',
			type: 'array',
			title: 'Related Resources',
			description: 'You can reference blog posts, or downloadable files.',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{type: 'post'}, {type: 'resource'}],
				}),
			],
			validation: (Rule) => Rule.max(4).warning('You can only add up to 4 references.'),
		}),

		defineField({
			name: 'disabled',
			title: 'Disabled',
			description: 'Setting this to true will disable the component, but not delete it.',
			type: 'boolean',
		}),
	],
	preview: {
		select: {
			title: 'title',
			rowContent0: 'relatedResources.0.title',
			rowContent1: 'relatedResources.1.title',
			rowContent2: 'relatedResources.2.title',
			rowContent3: 'relatedResources.3.title',
		},
		prepare({title, rowContent3, ...rowContent}) {
			const subs = Object.values(rowContent).filter(Boolean)
			const subtitle = subs.length > 0 ? `${subs.join(', ')}` : ''
			const hasMoreContent = Boolean(rowContent3)

			return {
				title,
				subtitle: hasMoreContent ? `${subtitle}…` : subtitle,
			}
		},
	},
})

