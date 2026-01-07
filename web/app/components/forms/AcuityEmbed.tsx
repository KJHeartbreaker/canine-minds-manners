'use client'

/**
 * Acuity Embed Component
 * Embeds Acuity Scheduling iframe for appointment booking
 */
export default function AcuityEmbed() {
    return (
        <div className="flex flex-col w-full">
            <iframe
                src="https://app.acuityscheduling.com/schedule.php?owner=28298110"
                title="Schedule Appointment"
                width="100%"
                height="800"
                frameBorder="0"
                className="border-0"
            />
        </div>
    )
}

