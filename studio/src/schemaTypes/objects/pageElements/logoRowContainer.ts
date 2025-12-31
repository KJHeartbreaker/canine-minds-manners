import {TbSquareLetterL as icon} from 'react-icons/tb'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const logoRow = defineType({
	title: 'Logo Row',
	name: 'logoRow',
	type: 'object',
	icon,
	fields: [
		defineField({
			name: 'logoRow',
			title: 'Logo Row',
			description:
				'Technically, these could be any image or icon, but this is meant for accrediations.',
			type: 'array',
			of: [defineArrayMember({type: 'logo'})],
		}),
	],
	preview: {
		select: {
			logo0: 'logoRow.0.logo',
			logo1: 'logoRow.1.logo',
			logo2: 'logoRow.2.logo',
			logo3: 'logoRow.3.logo',
		},
		prepare({logo0, logo1, logo2, logo3}) {
			const logos = [logo0, logo1, logo2].filter(Boolean)
			const subtitle = logos.length > 0 ? `${logos.join(', ')}` : ''
			const hasMorelogos = Boolean(logo3)

			return {
				title: hasMorelogos ? `Logos: ${subtitle}…` : `Logos: ${subtitle}`,
			}
		},
	},
})

