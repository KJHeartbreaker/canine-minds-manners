import {BsCalendarDate as icon} from 'react-icons/bs'
import {defineField, defineType} from 'sanity'

export const dateTime = defineType({
	title: 'Date Time',
	name: 'dateTime',
	type: 'object',
	icon,
	options: {columns: 2},
	initialValue: {
		availability: 'open',
		amPm: 'pm',
	},
	fields: [
		defineField({
			title: 'Start date',
			name: 'startDate',
			type: 'date',
		}),
		defineField({
			title: 'Start Time',
			name: 'startTime',
			type: 'string',
		}),
		defineField({
			title: 'AM/PM',
			type: 'string',
			name: 'amPm',
			options: {
				list: [
					{title: 'AM', value: 'am'},
					{title: 'PM', value: 'pm'},
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: 'Availability',
			type: 'string',
			name: 'availability',
			options: {
				list: [
					{title: 'Open', value: 'open'},
					{title: 'Nearly Full', value: 'nearlyFull'},
					{title: 'Full', value: 'full'},
				],
				layout: 'radio',
				direction: 'horizontal',
			},
		}),
	],
	preview: {
		select: {
			title: 'startDate',
			startTime: 'startTime',
			amPm: 'amPm',
			subtitle: 'availability',
		},
		prepare({title, startTime, amPm, subtitle}) {
			const displayDateTime = title && startTime && amPm
				? `${title} at ${startTime} ${amPm.toUpperCase()}`
				: title || 'No date set'

			return {
				title: displayDateTime,
				subtitle,
			}
		},
	},
})

