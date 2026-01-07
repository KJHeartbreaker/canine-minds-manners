'use client'

import TestimonialCard, { TestimonialCardProps } from '../cards/TestimonialCard'

interface TestimonialsGridProps {
    title?: string
    titleColor?: string
    panels: TestimonialCardProps[]
}

/**
 * Testimonials Grid Component
 * Displays testimonials in a responsive grid layout
 */
export default function TestimonialsGrid({ title, titleColor = 'var(--color-grey-33)', panels }: TestimonialsGridProps) {
    if (!panels || panels.length === 0) {
        return null
    }

    return (
        <div data-component="TestimonialsGrid" className="flex flex-col justify-center items-center py-5">
            {title && (
                <h2 className="mb-5" style={{ color: titleColor }}>
                    {title}
                </h2>
            )}
            <div className="grid grid-cols-1 gap-2.5 p-5 sm:grid-cols-2 sm:gap-5 sm:w-[70%]">
                {panels
                    .filter((panel) => panel && panel.heading)
                    .map((panel, i) => (
                        <TestimonialCard key={i} heading={panel.heading} copy={panel.copy} />
                    ))}
            </div>
        </div>
    )
}

