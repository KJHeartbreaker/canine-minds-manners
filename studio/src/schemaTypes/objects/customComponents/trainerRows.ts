import {GiJumpingDog as icon} from 'react-icons/gi'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const trainerRows = defineType({
	name: 'trainerRows',
	type: 'object',
	title: 'Trainer Rows',
	icon,
	description: 'Select the trainers that you would like to display in this section.',
	fields: [
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

