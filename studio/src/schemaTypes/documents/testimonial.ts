import {SlSpeech as icon} from 'react-icons/sl'
import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
	title: 'Testimonial',
	name: 'testimonial',
	type: 'document',
	icon,
	fields: [
		defineField({
			name: 'heading',
			type: 'string',
			title: 'Says who?',
		}),
		defineField({
			title: 'Copy',
			name: 'copy',
			type: 'simplePortableText',
		}),
	],
	preview: {
		select: {
			title: 'heading',
		},
		prepare({title}) {
			return {
				title: `Testimonial: ${title}`,
			}
		},
	},
})

