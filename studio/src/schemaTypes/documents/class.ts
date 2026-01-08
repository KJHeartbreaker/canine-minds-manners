import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const classDocument = defineType({
	name: 'class',
	title: 'Class',
	type: 'document',
	icon: DocumentIcon,
	fieldsets: [
		{
			title: 'Text Fields',
			name: 'textFields',
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		{
			title: 'Class Image',
			name: 'classImage',
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		{
			title: 'Grid Display',
			name: 'gridParams',
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		{
			title: 'CTA',
			name: 'cta',
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		{
			title: 'On Demand',
			name: 'onDemand',
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
	],
	initialValue: {
		trainingType: 'group',
		namePlacement: 'topLeft',
	},
	fields: [
		defineField({
			name: 'name',
			title: 'Class Name',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: 'Parent Page',
			name: 'parentPage',
			description: `This refers to the page where the class details are displayed. If nothing is referenced, links to this class will go directly to the slug. If there is a parent page, the slug will be used as an anchor link.`,
			type: 'reference',
			to: [{type: 'page'}],
		}),
		defineField({
			type: 'slug',
			name: 'slug',
			title: 'Slug',
			options: {
				source: 'name',
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: 'Which type of training is this?',
			type: 'string',
			name: 'trainingType',
			options: {
				list: [
					{title: 'Group', value: 'group'},
					{title: 'Private', value: 'private'},
					{title: 'On Demand', value: 'onDemand'},
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'customTrainingTitle',
			title: 'Custom Training Type Title',
			description:
				'If no title is provided, the default title will appear. The defaults are Group Class, and Private Training.',
			type: 'string',
		}),
		defineField({
			name: 'price',
			title: 'Price',
			description:
				'If no price is provided, a link will appear in its place that says Contact Us, and points to the Contact page.',
			type: 'string',
			fieldset: 'textFields',
		}),
		defineField({
			name: 'upcoming22',
			type: 'array',
			title: 'Upcoming Classes (Legacy)',
			description: 'Legacy format - use "Upcoming Classes (New)" for new entries',
			of: [defineArrayMember({type: 'dateTime'})],
			validation: (rule) => rule.max(8),
		}),
		defineField({
			name: 'upcomingClasses',
			type: 'array',
			title: 'Upcoming Classes (New)',
			description: 'New format with improved date/time picker and Acuity ID extraction',
			of: [defineArrayMember({type: 'dateTimeV2'})],
			validation: (rule) => rule.max(8),
		}),
		defineField({
			title: 'Key Takeaways',
			name: 'takeaways',
			type: 'array',
			of: [{type: 'string'}],
			validation: (Rule) => Rule.max(4),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'simplePortableText',
			fieldset: 'textFields',
		}),
		defineField({
			name: 'picture',
			title: 'Picture',
			type: 'mainImage',
			options: {hotspot: true},
			fieldset: 'classImage',
		}),
		defineField({
			name: 'cta',
			title: 'CTA',
			type: 'cta',
			fieldset: 'cta',
		}),
		defineField({
			name: 'dogName',
			title: 'Dog Name',
			type: 'string',
			fieldset: 'gridParams',
		}),
		defineField({
			title: 'In which corner should the name appear?',
			type: 'string',
			name: 'namePlacement',
			options: {
				list: [
					{title: 'Top Left', value: 'topLeft'},
					{title: 'Top Right', value: 'topRight'},
					{title: 'Bottom Left', value: 'bottomLeft'},
					{title: 'Bottom Right', value: 'bottomRight'},
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			fieldset: 'gridParams',
		}),
		defineField({
			name: 'cardImage',
			title: 'Card Image',
			type: 'mainImage',
			description: 'This image will be displayed on the card in the training grid',
			options: {hotspot: true},
			fieldset: 'gridParams',
		}),
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'trainingType',
			photo: 'picture',
		},
		prepare({title, subtitle, photo}) {
			return {
				title,
				subtitle,
				media: photo,
			}
		},
	},
})

