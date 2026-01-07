'use client'

import ContentContainer from '../wrappers/ContentContainer'
import RowColumn from './RowColumn'
import { cn } from '@/lib/utils'

interface PanelContent {
    _key: string
    _type: string
    [key: string]: any
}

interface ThreeColumnRowProps {
    id?: string
    title?: string
    hideTitle?: boolean
    centerTitle?: boolean
    condensedCopy?: boolean
    centerCopy?: boolean
    titleColor?: string
    panels: PanelContent[]
}

/**
 * Three Column Row Component
 * Displays content in a three-column grid layout
 */
export default function ThreeColumnRow({
    id,
    title,
    hideTitle = false,
    centerTitle = false,
    condensedCopy = false,
    centerCopy = false,
    titleColor,
    panels,
}: ThreeColumnRowProps) {
    return (
        <ContentContainer id={id} data-component="ThreeColumnRow" className="flex flex-col w-full">
            {title && !hideTitle && (
                <div className={cn('flex items-center mb-5 z-10', centerTitle && 'justify-center')}>
                    <h2 style={{ color: titleColor || 'var(--color-grey-33)' }}>{title}</h2>
                </div>
            )}
            <div className="grid grid-cols-1 gap-5 z-10 justify-center sm:grid-cols-2 md:grid-cols-3">
                {panels.map((panel) => (
                    <RowColumn key={panel._key} condensedCopy={condensedCopy} centerCopy={centerCopy} {...panel} />
                ))}
            </div>
        </ContentContainer>
    )
}

