'use client'

import ContentContainer from '../wrappers/ContentContainer'
import EnhancedProgramCard, { EnhancedProgramCardProps } from '../cards/EnhancedProgramCard'
import { getStableKey } from '../types'

interface EnhancedProgramsGridProps {
    programsArr: EnhancedProgramCardProps[]
}

/**
 * Enhanced Programs Grid Component
 * Displays training programs in a responsive grid layout with enhanced card design
 */
export default function EnhancedProgramsGrid({ programsArr }: EnhancedProgramsGridProps) {
    if (!programsArr || programsArr.length === 0) {
        return null
    }

    return (
        <ContentContainer data-component="EnhancedProgramsGrid" className="grid grid-cols-1 gap-2.5 py-5 w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-5">
            {programsArr.map((program, i) => (
                <EnhancedProgramCard
                    key={getStableKey({ _id: program.slug?.current, _key: program.slug?.current }, i)}
                    name={program.name}
                    enhancedCardTitle={program.enhancedCardTitle}
                    parentPage={program.parentPage}
                    slug={program.slug}
                    cardImage={program.cardImage}
                    cardTakeaways={program.cardTakeaways}
                    takeaways={program.takeaways}
                    acuityCategoryUrl={program.acuityCategoryUrl}
                    upcomingClasses={program.upcomingClasses}
                />
            ))}
        </ContentContainer>
    )
}
