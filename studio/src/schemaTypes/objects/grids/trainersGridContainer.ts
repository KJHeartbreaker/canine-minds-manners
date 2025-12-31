import {WiTrain as icon} from 'react-icons/wi'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const trainersGridContainer = defineType({
	name: 'trainersGridContainer',
	type: 'object',
	title: 'Trainers Grid',
	icon,
	description: 'Select the trainers that you would like to display in this section.',
	initialValue: {
		backgroundColor: 'White',
	},
	fields: [
		defineField({
			name: 'backgroundColor',
			title: 'Optional Background Colour',
			type: 'string',
			description:
				'If no background image is uploaded, you can choose a background colour. If no selection is made, the default is white.',
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
		}),
		defineField({
			title: 'Trainers',
			name: 'trainers',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{type: 'trainer'}],
				}),
			],
		}),
	],
	preview: {
		select: {
			trainer0: 'trainers.0.name',
			trainer1: 'trainers.1.name',
			trainer2: 'trainers.2.name',
			trainer3: 'trainers.3.name',
		},
		prepare: ({trainer0, trainer1, trainer2, trainer3}) => {
			const trainers = [trainer0, trainer1, trainer2].filter(Boolean)
			const subtitle = trainers.length > 0 ? `${trainers.join(', ')}` : ''
			const hasMoreTrainers = Boolean(trainer3)

			return {
				title: 'Trainers',
				subtitle: hasMoreTrainers ? `${subtitle}…` : subtitle,
			}
		},
	},
})

