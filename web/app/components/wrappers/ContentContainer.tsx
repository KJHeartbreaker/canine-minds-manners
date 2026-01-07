import { cn } from '@/lib/utils'
import { ReactNode, CSSProperties } from 'react'

interface ContentContainerProps {
    children: ReactNode
    className?: string
    style?: CSSProperties
    id?: string
}

/**
 * Content container component matching Wrappers.ts ContentContainer styled component
 * Provides consistent max-width and padding across breakpoints
 */
export default function ContentContainer({
    children,
    className,
    style,
    id,
}: ContentContainerProps) {
    return (
        <div
            id={id}
            data-component="ContentContainer"
            className={cn(
                'content-container',
                'mx-auto py-0',
                'px-[12px]',
                // Using Tailwind default breakpoints with custom max-widths
                'md:max-w-[720px] md:px-0',
                'lg:max-w-[990px] lg:px-0',
                'xl:max-w-[1220px] xl:px-0',
                '2xl:max-w-[1440px] 2xl:px-0',
                className
            )}
            style={style}
        >
            {children}
        </div>
    )
}

