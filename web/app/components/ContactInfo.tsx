import React from 'react'
import Link from 'next/link'
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { trackDataLayerEvent } from '@/lib/gtm'
import { cn } from '@/lib/utils'

interface ContactInfoProps {
	headline?: string
	phoneNumber: string
	phoneLabel?: string
	email: string
	textColor?: 'white' | 'blue'
	showHeadline?: boolean
	size?: 'normal' | 'large'
	centered?: boolean
}

/**
 * Reusable Contact Information Component
 * Displays phone and email contact information with icons
 * Can be used in portable text or hardcoded with/without headline
 */
export default function ContactInfo({
	headline,
	phoneNumber,
	phoneLabel,
	email,
	textColor = 'blue',
	showHeadline = true,
	size = 'normal',
	centered = false,
}: ContactInfoProps) {
	const textColorClass = textColor === 'white' ? 'text-white' : 'text-blue-33'
	const headlineColor = textColor === 'white' ? 'text-white' : 'text-orange'

	// Size-based classes - force normal size on mobile, use size prop on desktop
	const isLarge = size === 'large'
	const iconContainerSize = isLarge ? 'w-10 h-10 lg:w-14 lg:h-14' : 'w-10 h-10'
	const iconSize = isLarge ? 'text-lg lg:text-2xl' : 'text-lg'
	const textSize = isLarge ? 'text-sm lg:text-lg' : 'text-sm'
	const headlineSize = isLarge ? 'text-base lg:text-xl' : 'text-base'
	const gapSize = isLarge ? 'gap-3 lg:gap-4' : 'gap-3'
	const sectionGap = isLarge ? 'gap-4 sm:gap-6 lg:gap-8' : 'gap-4 sm:gap-6'

	// Format phone number for tel: link (remove spaces, parentheses, dashes)
	const phoneLink = phoneNumber.replace(/[\s()-]/g, '')

	return (
		<div className={cn('w-full py-6', centered && 'flex flex-col items-center')} data-component="ContactInfo">
			{showHeadline && headline && (
				<h4 className={cn('mb-4 font-bold', headlineColor, headlineSize)}>{headline}</h4>
			)}
			<div className={cn('flex flex-col sm:flex-row', sectionGap, centered && 'justify-center')}>
				{/* Phone Section */}
				<div className={cn('flex items-center', gapSize)}>
					<div className={cn('shrink-0 rounded-full bg-orange flex items-center justify-center', iconContainerSize)}>
						<FaPhoneAlt className={cn('text-white', iconSize)} />
					</div>
					<div className="flex flex-col">
						<Link
							href={`tel:${phoneLink}`}
							className={cn('font-bold hover:opacity-80 transition-opacity', textColorClass, textSize)}
							onClick={() =>
								trackDataLayerEvent('phone_click', {
									location: 'contact_info',
									phone: phoneLink,
								})
							}
						>
							{phoneNumber}
						</Link>
						{phoneLabel && (
							<span className={cn('font-normal', textColorClass, textSize)}>{phoneLabel}</span>
						)}
					</div>
				</div>

				{/* Email Section */}
				<div className={cn('flex items-center', gapSize)}>
					<div className={cn('shrink-0 rounded-full bg-orange flex items-center justify-center', iconContainerSize)}>
						<FaEnvelope className={cn('text-white', iconSize)} />
					</div>
					<div className="flex flex-col">
						<Link
							href={`mailto:${email}`}
							className={cn('font-bold hover:opacity-80 transition-opacity', textColorClass, textSize)}
							onClick={() =>
								trackDataLayerEvent('email_click', {
									location: 'contact_info',
									email,
								})
							}
						>
							{email}
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
