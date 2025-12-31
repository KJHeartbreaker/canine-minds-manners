'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useDetectOutsideClick } from '@/lib/hooks/useDetectOutsideClick'
import { cn } from '@/lib/utils'
import { MenuItem } from './types'

interface MobileHeaderDropdownProps {
    item: MenuItem
    setMenuOpen: (open: boolean) => void
    pathname: string
}

/**
 * Mobile navigation dropdown component
 * Shows submenu on click
 */
export default function MobileHeaderDropdown({
    item,
    setMenuOpen,
    pathname,
}: MobileHeaderDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [mobileSubnavOpen, setMobileSubnavOpen] = useDetectOutsideClick(dropdownRef, false)

    const mainHref = item.cta?.landingPageRoute?.slug
        ? `/${item.cta.landingPageRoute.slug}`
        : item.cta?.link
            ? `/${item.cta.link}`
            : '#'

    // Check if main link or any submenu link is active
    const isNavMenuLinkActive = pathname === mainHref || pathname === mainHref.replace(/\/$/, '')
    const isSubMenuActive =
        item.subnav &&
        item.subnav.some((l) => pathname === `/${l.landingPageRoute?.slug}` || pathname === `/${l.landingPageRoute?.slug}/`)

    return (
        <>
            <div className="flex items-center w-full text-center justify-center" ref={dropdownRef}>
                {item.cta?.landingPageRoute && (
                    <Link
                        href={mainHref}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                            'text-white no-underline py-2.5',
                            (isNavMenuLinkActive || isSubMenuActive) && 'text-orange'
                        )}
                    >
                        {item.cta.title}
                    </Link>
                )}
                {item.subnav && item.subnav.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setMobileSubnavOpen(!mobileSubnavOpen)}
                        className="m-0 p-0 bg-transparent text-dark-grey flex items-center hover:bg-transparent"
                    >
                        {!item.cta?.landingPageRoute && <span className="text-white">{item.cta?.title}</span>}
                        <MdKeyboardArrowDown
                            className={cn(
                                'text-white transition-transform',
                                mobileSubnavOpen && 'rotate-180'
                            )}
                        />
                    </button>
                )}
            </div>
            {item.subnav && item.subnav.length > 0 && (
                <ul className={cn('w-full m-0', mobileSubnavOpen ? 'block' : 'hidden')}>
                    {item.subnav.map((l) => {
                        const subHref = l.landingPageRoute?.slug ? `/${l.landingPageRoute.slug}` : '#'
                        const title = l.landingPageRoute?.title || l.landingPageRoute?.slug || 'Link'
                        return (
                            <li key={l._key} className="block py-2.5 min-h-[40px] leading-10 m-0 bg-orange">
                                <Link
                                    href={subHref}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-white no-underline py-2.5 font-sans text-sm font-bold"
                                >
                                    {title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </>
    )
}

