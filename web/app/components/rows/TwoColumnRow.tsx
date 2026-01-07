'use client'

import ContentContainer from '../wrappers/ContentContainer'
import RowColumn from './RowColumn'
import { cn } from '@/lib/utils'

interface PanelContent {
    _key: string
    _type: string
    [key: string]: any
}

interface TwoColumnRowProps {
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
 * Two Column Row Component
 * Displays content in a two-column grid layout
 */
export default function TwoColumnRow({
    id,
    title,
    hideTitle = false,
    centerTitle = false,
    condensedCopy = false,
    centerCopy = false,
    titleColor,
    panels,
}: TwoColumnRowProps) {
    return (
        <ContentContainer id={id} data-component="TwoColumnRow" className="flex flex-col w-full">
            {title && !hideTitle && (
                <div className={cn('flex items-center mb-5 z-10', centerTitle && 'justify-center')}>
                    <h2 style={{ color: titleColor || 'var(--color-grey-33)' }}>{title}</h2>
                </div>
            )}
            <div
                className={cn(
                    'grid grid-cols-1 gap-5 z-10 w-full overflow-hidden',
                    'sm:items-start',
                    condensedCopy ? 'md:grid-cols-[400px_400px] md:justify-center' : 'lg:grid-cols-2',
                )}
            >
                {panels.map((panel) => (
                    <RowColumn key={panel._key} condensedCopy={condensedCopy} centerCopy={centerCopy} {...panel} />
                ))}
            </div>
        </ContentContainer>
    )
}

