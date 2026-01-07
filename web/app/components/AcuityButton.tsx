'use client'

import { useEffect } from 'react'
import { RiExternalLinkFill } from 'react-icons/ri'

interface AcuityButtonProps {
    appointmentTypeId: string
    date: string
}

export default function AcuityButton({ appointmentTypeId, date }: AcuityButtonProps) {
    useEffect(() => {
        // Inject Acuity stylesheet and script only once
        const hasStylesheet = document.getElementById('acuity-button-styles')
        const hasScript = document.querySelector('script[src*="acuityscheduling.com/embed/button"]')

        if (!hasStylesheet) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = 'https://embed.acuityscheduling.com/embed/button/28298110.css'
            link.id = 'acuity-button-styles'
            document.head.appendChild(link)
        }

        if (!hasScript) {
            const script = document.createElement('script')
            script.src = 'https://embed.acuityscheduling.com/embed/button/28298110.js'
            script.async = true
            document.body.appendChild(script)
        }
    }, [])

    const linkContent = (
        <span className="whitespace-nowrap inline-flex items-center">
            Register: {date} <RiExternalLinkFill color="var(--color-orange)" size={20} className="ml-2" />
        </span>
    )

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

