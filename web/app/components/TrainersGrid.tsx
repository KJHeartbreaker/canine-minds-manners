'use client'

import ContentContainer from './ContentContainer'
import TrainerCard, { TrainerCardProps } from './TrainerCard'
import { getStableKey } from './types'

interface TrainersGridProps {
    trainers: TrainerCardProps[]
}

/**
 * Trainers Grid Component
 * Displays trainers in a responsive grid layout
 */
export default function TrainersGrid({ trainers }: TrainersGridProps) {
    if (!trainers || trainers.length === 0) {
        return null
    }

    return (
        <ContentContainer className="grid grid-cols-1 gap-5 p-5 w-full xs:grid-cols-2 md:grid-cols-3">
            {trainers.map((trainer, i) => (
                <TrainerCard
                    key={getStableKey({ _id: trainer.slug?.current, _key: trainer.slug?.current }, i)}
                    name={trainer.name}
                    slug={trainer.slug}
                    certs={trainer.certs}
                    image={trainer.image}
                />
            ))}
        </ContentContainer>
    )
}

