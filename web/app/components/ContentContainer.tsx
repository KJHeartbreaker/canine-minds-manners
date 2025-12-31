import { cn } from '@/lib/utils'
import { ReactNode, CSSProperties } from 'react'

interface ContentContainerProps {
    children: ReactNode
    className?: string
    style?: CSSProperties
}

/**
 * Content container component matching Wrappers.ts ContentContainer styled component
 * Provides consistent max-width and padding across breakpoints
 */
export default function ContentContainer({
    children,
    className,
    style,
}: ContentContainerProps) {
    return (
        <div
            className={cn(
                'mx-auto px-5',
                'sm:max-w-[720px] sm:px-0',
                'md:max-w-[960px]',
                'lg:max-w-[1280px]',
                'xl:max-w-[1440px]',
                'xxl:max-w-[1600px]',
                className
            )}
            style={style}
        >
            {children}
        </div>
    )
}

