'use client'

import TrainingComponent from './TrainingComponent'

interface TrainingSession {
    _id: string
    _key?: string
    [key: string]: any
}

interface TrainingRowProps {
    classes: TrainingSession[]
}

/**
 * Training Row Component
 * Renders a list of training components
 */
export default function TrainingRow({ classes }: TrainingRowProps) {
    return (
        <>
            {classes.map((training) => (
                <TrainingComponent key={training._id || training._key} {...training} />
            ))}
        </>
    )
}

