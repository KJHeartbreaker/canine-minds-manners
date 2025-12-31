import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionProps {
    children: ReactNode
    className?: string
    hasBg?: boolean
    short?: boolean
    skinny?: boolean
}

/**
 * Section wrapper component matching Wrappers.ts Section styled component
 * Provides consistent section padding
 */
export default function Section({
    children,
    className,
    hasBg = false,
    short = false,
    skinny = false,
}: SectionProps) {
    return (
        <section
            className={cn(
                'flex flex-col relative justify-center items-center',
                // Default padding: 40px top, 60px bottom mobile; 60px/80px sm; 100px/140px md
                !hasBg &&
                !short &&
                !skinny &&
                'pt-[40px] pb-[60px] sm:pt-[60px] sm:pb-[80px] md:pt-[100px] md:pb-[140px]',
                // Has background padding: 40px mobile; 80px sm; 140px md
                hasBg && 'pt-[40px] pb-[40px] sm:pt-[80px] sm:pb-[80px] md:pt-[140px] md:pb-[140px]',
                // Short padding: same top, no bottom
                short && 'pt-[40px] pb-0 sm:pt-[60px] sm:pb-0 md:pt-[100px] md:pb-0',
                // Skinny padding: 20px all around
                skinny && 'pt-5 pb-5',
                className
            )}
        >
            {children}
        </section>
    )
}

