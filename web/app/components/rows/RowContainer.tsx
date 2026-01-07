'use client'

import TwoColumnRow from './TwoColumnRow'
import ThreeColumnRow from './ThreeColumnRow'

interface PanelContent {
    _key: string
    _type: string
    [key: string]: any
}

interface RowContainerProps {
    row?: 'twoColumn' | 'threeColumn'
    content: PanelContent[]
    condensedCopy?: boolean
    centerCopy?: boolean
    title?: string
    hideTitle?: boolean
    centerTitle?: boolean
    titleColor?: string
}

/**
 * Row Container Component
 * Routes to TwoColumnRow or ThreeColumnRow based on row type
 */
export default function RowContainer({
    row,
    content,
    title,
    hideTitle = false,
    centerTitle = false,
    titleColor,
    condensedCopy = false,
    centerCopy = false,
}: RowContainerProps) {
    if (row === 'twoColumn') {
        return (
            <TwoColumnRow
                panels={content}
                title={title}
                hideTitle={hideTitle}
                centerTitle={centerTitle}
                titleColor={titleColor}
                condensedCopy={condensedCopy}
                centerCopy={centerCopy}
            />
        )
    }

    if (row === 'threeColumn') {
        return (
            <ThreeColumnRow
                panels={content}
                title={title}
                hideTitle={hideTitle}
                centerTitle={centerTitle}
                titleColor={titleColor}
                condensedCopy={condensedCopy}
                centerCopy={centerCopy}
            />
        )
    }

    return null
}

