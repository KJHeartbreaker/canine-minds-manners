'use client'

import { RiExternalLinkFill } from 'react-icons/ri'
import { useAcuityEmbed } from '@/lib/hooks/useAcuityEmbed'

interface AcuityButtonProps {
    appointmentTypeId: string
    date: string
    disabled?: boolean
    badge?: React.ReactNode
}

export default function AcuityButton({ appointmentTypeId, date, disabled = false, badge }: AcuityButtonProps) {
    useAcuityEmbed()

    const linkContent = (
        <span className="whitespace-nowrap inline-flex items-center upcoming-class-link">
            {date} <RiExternalLinkFill
                color={disabled ? "#e2e2e2" : "var(--color-orange)"}
                size={20}
                className="ml-2"
            />
            {badge && <span className="ml-2 md:ml-5 acuity-badge">{badge}</span>}
        </span>
    )

    if (disabled) {
        return (
            <span
                data-component="AcuityButton"
                className="acuity-embed-button acuity-embed-button-disabled"
            >
                {linkContent}
            </span>
        )
    }

    return (
        <a
            data-component="AcuityButton"
            href={`https://app.acuityscheduling.com/schedule.php?owner=28298110&appointmentType=${appointmentTypeId}&ref=booking_button`}
            target="_blank"
            rel="noopener noreferrer"
            className="acuity-embed-button"
        >
            {linkContent}
        </a>
    )
}

