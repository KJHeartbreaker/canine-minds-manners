'use client'

import ContentContainer from '../wrappers/ContentContainer'
import TrainerCard from '../cards/TrainerCard'
import { getStableKey } from '../types'

interface TrainersGridProps {
    trainers: Array<{
        name: string
        slug?: {
            current?: string
        }
        picture?: any
        image?: any
        certifications?: {
            portableTextBlock: any[]
        }
        certs?: {
            portableTextBlock: any[]
        }
    }>
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
        <ContentContainer data-component="TrainersGrid" className="grid grid-cols-1 gap-5 py-5 w-full sm:grid-cols-2 md:grid-cols-3">
            {trainers.map((trainer, i) => (
                <TrainerCard
                    key={getStableKey({ _id: trainer.slug?.current, _key: trainer.slug?.current }, i)}
                    name={trainer.name}
                    slug={trainer.slug}
                    certs={trainer.certifications || trainer.certs}
                    image={trainer.picture || trainer.image}
                />
            ))}
        </ContentContainer>
    )
}

