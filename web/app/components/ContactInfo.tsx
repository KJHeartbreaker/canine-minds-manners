import React from 'react'
import Link from 'next/link'
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { cn } from '@/lib/utils'

interface ContactInfoProps {
	headline?: string
	phoneNumber: string
	phoneLabel?: string
	email: string
	textColor?: 'white' | 'blue'
	showHeadline?: boolean
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
}: ContactInfoProps) {
	const textColorClass = textColor === 'white' ? 'text-white' : 'text-blue-33'
	const headlineColor = textColor === 'white' ? 'text-white' : 'text-orange'

	console.log(textColor)

	// Format phone number for tel: link (remove spaces, parentheses, dashes)
	const phoneLink = phoneNumber.replace(/[\s()-]/g, '')

	return (
		<div className="w-full py-6" data-component="ContactInfo">
			{showHeadline && headline && (
				<h4 className={cn('mb-4 font-bold', headlineColor)}>{headline}</h4>
			)}
			<div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
				{/* Phone Section */}
				<div className="flex items-center gap-3">
					<div className="shrink-0 w-10 h-10 rounded-full bg-orange flex items-center justify-center">
						<FaPhoneAlt className="text-white text-lg" />
					</div>
					<div className="flex flex-col">
						<Link
							href={`tel:${phoneLink}`}
							className={cn('font-bold text-sm hover:opacity-80 transition-opacity', textColorClass)}
						>
							{phoneNumber}
						</Link>
						{phoneLabel && (
							<span className={cn('text-sm font-normal', textColorClass)}>{phoneLabel}</span>
						)}
					</div>
				</div>

				{/* Email Section */}
				<div className="flex items-center gap-3">
					<div className="shrink-0 w-10 h-10 rounded-full bg-orange flex items-center justify-center">
						<FaEnvelope className="text-white text-lg" />
					</div>
					<div className="flex flex-col">
						<Link
							href={`mailto:${email}`}
							className={cn('font-bold text-sm hover:opacity-80 transition-opacity', textColorClass)}
						>
							{email}
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
