import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const trainer = defineType({
	name: 'trainer',
	title: 'Trainer',
	type: 'document',
	icon: UserIcon,
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (rule) => rule.required(),
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
			name: 'picture',
			title: 'Picture',
			type: 'mainImage',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'role',
			title: 'Role',
			type: 'string',
		}),
		defineField({
			name: 'bio',
			title: 'Bio',
			type: 'simplePortableText',
		}),
		defineField({
			name: 'certifications',
			title: 'Certifications',
			type: 'simplePortableText',
		}),
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'role',
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

