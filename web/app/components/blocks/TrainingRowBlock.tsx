'use client'

import ContentBlock from './ContentBlock'
import TrainingRow from '../classes/TrainingRow'

interface TrainingRowBlockProps {
    block: {
        _key: string
        _type: 'Class Row'
        classRefs?: any[]
        backgroundColor?: string
        removeBottomPadding?: boolean
    }
    index: number
}

/**
 * Training Row Block Component
 * Displays training classes in a row layout
 */
export default function TrainingRowBlock({ block }: TrainingRowBlockProps) {
    const { classRefs, backgroundColor, removeBottomPadding } = block

    return (
        <ContentBlock
            bgColor={backgroundColor}
            bgImage={null}
            overlay="noOverlay"
            removeBottomPadding={removeBottomPadding}
            skinny={false}
        >
            <TrainingRow classes={classRefs || []} />
        </ContentBlock>
    )
}

