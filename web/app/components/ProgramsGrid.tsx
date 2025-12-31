'use client'

import ContentContainer from './ContentContainer'
import ProgramCard, { ProgramCardProps } from './ProgramCard'
import { getStableKey } from './types'

interface ProgramsGridProps {
    programsArr: ProgramCardProps[]
}

/**
 * Programs Grid Component
 * Displays training programs in a responsive grid layout
 */
export default function ProgramsGrid({ programsArr }: ProgramsGridProps) {
    if (!programsArr || programsArr.length === 0) {
        return null
    }

    return (
        <ContentContainer className="grid grid-cols-1 gap-2.5 p-5 w-full xs:grid-cols-2 md:grid-cols-3 md:gap-5">
            {programsArr.map((program, i) => (
                <ProgramCard
                    key={getStableKey({ _id: program.slug?.current, _key: program.slug?.current }, i)}
                    name={program.name}
                    parent={program.parent}
                    slug={program.slug}
                    dogName={program.dogName}
                    cardImage={program.cardImage}
                    trainingType={program.trainingType}
                    namePlacement={program.namePlacement}
                />
            ))}
        </ContentContainer>
    )
}

