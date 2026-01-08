import React, { useEffect } from 'react'
import { set } from 'sanity'
import { useFormValue } from 'sanity'
import { Stack, Text, Card } from '@sanity/ui'

/**
 * Custom input component that automatically calculates availability
 * based on bookingsCount and totalSpots
 */
export function AvailabilityCalculator(props: any) {
	const { schemaType, value, onChange, path } = props

	// Get parent object values using useFormValue
	// The path to parent fields: remove 'availability' from the end
	const parentPath = path.slice(0, -1)
	const totalSpots = useFormValue([...parentPath, 'totalSpots']) as number | undefined
	const bookingsCount = (useFormValue([...parentPath, 'bookingsCount']) as number | undefined) || 0

	// Calculate availability
	const calculateAvailability = (spots: number | undefined, bookings: number): 'open' | 'nearlyFull' | 'full' => {
		if (!spots || spots === 0) {
			return value || 'open' // Keep existing value if no spots set
		}

		const remaining = spots - bookings
		const percentage = (bookings / spots) * 100

		if (remaining <= 0) {
			return 'full'
		} else if (remaining <= 2 || percentage >= 80) {
			return 'nearlyFull'
		}
		return 'open'
	}

	const calculatedAvailability = calculateAvailability(totalSpots, bookingsCount)
	const shouldAutoUpdate = totalSpots && totalSpots > 0

	// Auto-update availability when spots or bookings change
	useEffect(() => {
		if (shouldAutoUpdate && calculatedAvailability !== value) {
			onChange(set(calculatedAvailability))
		}
	}, [totalSpots, bookingsCount, calculatedAvailability, value, onChange, shouldAutoUpdate])

	const remainingSpots = totalSpots ? totalSpots - bookingsCount : null
	const percentage = totalSpots ? Math.round((bookingsCount / totalSpots) * 100) : null

	return (
		<Stack space={2}>
			{shouldAutoUpdate ? (
				<Card padding={3} tone="positive" radius={2}>
					<Stack space={3}>
						<Text size={1} weight="semibold">
							Auto-calculated: {calculatedAvailability === 'full' ? 'Full' : calculatedAvailability === 'nearlyFull' ? 'Nearly Full' : 'Open'}
						</Text>
						<Text size={0} muted>
							{bookingsCount} of {totalSpots} spots booked ({percentage}%)
							{remainingSpots !== null && remainingSpots > 0 && (
								<> • {remainingSpots} spot{remainingSpots !== 1 ? 's' : ''} remaining</>
							)}
						</Text>
					</Stack>
				</Card>
			) : (
				<Card padding={2} tone="caution" radius={2}>
					<Text size={1}>
						Set "Total Spots" to enable automatic availability calculation
					</Text>
				</Card>
			)}

			{/* Render the default radio input for manual override */}
			{props.renderDefault(props)}
		</Stack>
	)
}

