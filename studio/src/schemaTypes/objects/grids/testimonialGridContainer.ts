import {SlSpeech as icon} from 'react-icons/sl'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const testimonialGridContainer = defineType({
	name: 'testimonialGridContainer',
	type: 'object',
	title: 'Testimonials',
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
		titleColor: '#333333',
		backgroundColor: '#ffffff',
	},
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			description:
				'This is an optional field. It might say something like "What people are saying".',
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
			description: 'If no selection is made, the default is white.',
			options: {
				list: [
					{title: 'White', value: '#ffffff'},
					{title: 'Grey', value: '#e2e2e2'},
					{title: 'Blue', value: '#61c8e9'},
					{title: 'Yellow', value: '#feca2d'},
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			fieldset: 'rowParams',
		}),
		defineField({
			name: 'skinny',
			title: 'Skinny',
			type: 'boolean',
			description:
				'This option significantly reduces the top and bottom padding for all screen sizes.',
			fieldset: 'rowParams',
		}),
		defineField({
			name: 'testimonialsArr',
			type: 'array',
			title: 'Testimonials',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{type: 'testimonial'}],
				}),
			],
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
			testimonial0: 'testimonialsArr.0.heading',
			testimonial1: 'testimonialsArr.1.heading',
			testimonial2: 'testimonialsArr.2.heading',
			testimonial3: 'testimonialsArr.3.heading',
		},
		prepare: ({testimonial0, testimonial1, testimonial2, testimonial3}) => {
			const testimonials = [testimonial0, testimonial1, testimonial2].filter(Boolean)
			const subtitles = testimonials.length > 0 ? `${testimonials.join(', ')}` : ''

			return {
				title: 'Testimonials',
				subtitle: `${subtitles}`,
			}
		},
	},
})

