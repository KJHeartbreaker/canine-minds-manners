import {FcAbout as icon} from 'react-icons/fc'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutUsContainer = defineType({
	name: 'aboutUsContainer',
	type: 'object',
	title: 'About Us',
	icon,
	description: 'This is a custom component that features a text block, and four icon cards.',
	fields: [
		defineField({
			name: 'copy',
			type: 'mainPortableText',
			title: 'Copy',
		}),
		defineField({
			title: 'IconCards',
			name: 'iconCards',
			type: 'array',
			of: [defineArrayMember({type: 'iconCard'})],
			validation: (rule) => rule.length(4),
		}),
	],
	preview: {
		select: {
			iconCard0: 'iconCards.0.heading',
			iconCard1: 'iconCards.1.heading',
			iconCard2: 'iconCards.2.heading',
			iconCard3: 'iconCards.3.heading',
		},
		prepare: ({iconCard0, iconCard1, iconCard2, iconCard3}) => {
			const iconCards = [iconCard0, iconCard1, iconCard2].filter(Boolean)
			const subtitle = iconCards.length > 0 ? `${iconCards.join(', ')}` : ''
			const hasMoreIconCards = Boolean(iconCard3)

			return {
				title: 'About Us Container',
				subtitle: hasMoreIconCards ? `${subtitle}…` : subtitle,
			}
		},
	},
})

