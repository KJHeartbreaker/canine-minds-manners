'use client'

import ContentContainer from '../wrappers/ContentContainer'
import ProgramCard, { ProgramCardProps } from '../cards/ProgramCard'
import { getStableKey } from '../types'

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
        <ContentContainer data-component="ProgramsGrid" className="grid grid-cols-1 gap-2.5 py-5 w-full sm:grid-cols-2 md:grid-cols-3 md:gap-5">
            {programsArr.map((program, i) => (
                <ProgramCard
                    key={getStableKey({ _id: program.slug?.current, _key: program.slug?.current }, i)}
                    name={program.name}
                    parentPage={program.parentPage}
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

