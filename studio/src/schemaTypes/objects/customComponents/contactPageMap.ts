import {FcAbout as icon} from 'react-icons/fc'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const contactPageMap = defineType({
	name: 'contactPageMap',
	type: 'object',
	title: 'Contact Page Map',
	icon,
	description:
		'This is a custom component that features a full-width map, contact form, and three icon cards with contact info.',
	fields: [
		defineField({
			name: 'map',
			type: 'string',
			title: 'Map',
			description:
				'In Google Maps, navigate to the location you would like to embed. Select Share or Embed. It will open a dialog box with two tabs. Select Embed a map, and copy the HTML snippet.',
			validation: (Rule) => Rule.required().error('Embed HTML is required'),
		}),
		defineField({
			name: 'mapLink',
			type: 'string',
			title: 'Map Link',
			description:
				'In Google Maps, navigate to the location you would like to embed. Select Share or Embed. It will open a dialog box with two tabs. Select Send a link, and copy the link to share.',
			validation: (Rule) => Rule.required().error('Link is required'),
		}),
		defineField({
			name: 'copy',
			type: 'mainPortableText',
			title: 'Form Copy Block',
			description: 'This is the blurb that will appear above the form.',
		}),
		defineField({
			title: 'IconCards',
			name: 'iconCards',
			type: 'array',
			description: 'These are for the address, phone number, and email address.',
			of: [defineArrayMember({type: 'iconCard'})],
			validation: (rule) => rule.length(3),
		}),
	],
	preview: {
		select: {
			iconCard0: 'iconCards.0.name',
			iconCard1: 'iconCards.1.name',
			iconCard2: 'iconCards.2.name',
		},
		prepare: ({iconCard0, iconCard1, iconCard2}) => {
			const iconCards = [iconCard0, iconCard1, iconCard2].filter(Boolean)
			const subtitle = iconCards.length > 0 ? `${iconCards.join(', ')}` : ''
			const hasMoreIconCards = Boolean(iconCard2)

			return {
				title: 'Contact Container',
				subtitle: hasMoreIconCards ? `${subtitle}…` : subtitle,
			}
		},
	},
})

