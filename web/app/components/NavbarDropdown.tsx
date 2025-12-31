'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io'
import { useDetectOutsideClick } from '@/lib/hooks/useDetectOutsideClick'
import { cn } from '@/lib/utils'
import { MenuItem } from './types'

interface NavbarDropdownProps {
    menuItem: MenuItem
    pathname: string
    useSansFont?: boolean // Use Montserrat instead of Paytone One (for footer)
}

/**
 * Desktop navigation dropdown component
 * Shows submenu on hover/click
 */
export default function NavbarDropdown({ menuItem, pathname, useSansFont = false }: NavbarDropdownProps) {
    const { subnav, cta } = menuItem
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [subnavState, setSubnavState] = useDetectOutsideClick(dropdownRef, false)

    const mainHref = cta?.landingPageRoute?.slug ? `/${cta.landingPageRoute.slug}` : cta?.link ? `/${cta.link}` : '#'

    // Check if main link or any submenu link is active
    const isNavMenuLinkActive = pathname === mainHref || pathname === mainHref.replace(/\/$/, '')
    const isSubMenuActive =
        subnav && subnav.some((l) => pathname === `/${l.landingPageRoute?.slug}` || pathname === `/${l.landingPageRoute?.slug}/`)

    return (
        <div
            ref={dropdownRef}
            onMouseEnter={() => subnav && setSubnavState(true)}
            onMouseLeave={() => subnav && setSubnavState(false)}
            className="relative flex cursor-pointer"
        >
            <div className="flex items-center justify-between">
                {cta?.landingPageRoute ? (
                    <Link
                        href={mainHref}
                        className={cn(
                            useSansFont ? 'font-sans' : 'font-display',
                            'text-white font-bold transition-colors',
                            (isNavMenuLinkActive || isSubMenuActive) && 'text-orange',
                            'hover:text-orange-hover'
                        )}
                    >
                        {cta.title}
                    </Link>
                ) : (
                    <span className={cn(
                        useSansFont ? 'font-sans' : 'font-display',
                        'text-white font-bold cursor-default hover:text-white'
                    )}>
                        {cta?.title}
                    </span>
                )}
                {subnav && subnav.length > 0 && (
                    <IoIosArrowDown
                        size="1.3em"
                        className={cn(
                            'text-white ml-2 transition-transform',
                            isSubMenuActive && 'text-orange',
                            subnavState && 'rotate-180'
                        )}
                    />
                )}
            </div>
            {subnav && subnav.length > 0 && (
                <ul
                    className={cn(
                        'absolute top-5 left-0 w-[250px] py-1.5 bg-white border-2 border-yellow rounded z-[2] m-0 p-0 flex flex-col items-start list-none',
                        subnavState ? 'flex' : 'hidden'
                    )}
                >
                    {subnav.map((l) => {
                        const subHref = l.landingPageRoute?.slug ? `/${l.landingPageRoute.slug}` : '#'
                        const isActive = pathname === subHref || pathname === subHref.replace(/\/$/, '')
                        // Get title from the referenced page, fallback to slug, then 'Link'
                        const title = l.landingPageRoute?.title || l.landingPageRoute?.slug || 'Link'
                        return (
                            <li
                                key={l._key}
                                className="flex h-full w-full transition-colors hover:bg-grey-44 list-none m-0"
                            >
                                <Link
                                    href={subHref}
                                    className={cn(
                                        'text-grey-44 py-2 pl-[15px] pr-0 flex h-full w-full text-sm font-bold',
                                        useSansFont ? 'font-sans' : 'font-display',
                                        isActive && 'text-orange',
                                        'hover:text-white'
                                    )}
                                >
                                    {title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

