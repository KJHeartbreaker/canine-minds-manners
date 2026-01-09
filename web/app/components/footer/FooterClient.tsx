'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import NavbarDropdown from '../header/NavbarDropdown'
import LogoRow from '../rows/LogoRow'
import { MenuItem, FooterLogo } from '../types'
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa'

interface FooterClientProps {
    menuItems: MenuItem[]
    logos: FooterLogo[]
}

/**
 * Footer Client Component
 * Handles responsive behavior and active link detection
 */
export default function FooterClient({ menuItems, logos }: FooterClientProps) {
    const isMobile = useMediaQuery('(max-width: 576px)')
    const currentYr = new Date().getFullYear()
    const pathname = usePathname()

    const getHref = (menuItem: MenuItem) => {
        const slug = menuItem.cta?.landingPageRoute?.slug
        const link = menuItem.cta?.link
        if (slug) {
            return slug.startsWith('/') ? slug : `/${slug}`
        }
        if (link) {
            return link.startsWith('/') || link.startsWith('http') ? link : `/${link}`
        }
        return '#'
    }

    const isActive = (menuItem: MenuItem) => {
        const href = getHref(menuItem)
        return pathname === href || pathname === href.replace(/\/$/, '')
    }

    return (
        <footer className="flex justify-center items-center bg-grey-44">
            <div className="flex justify-center items-center flex-col max-w-[767px] w-full min-h-[300px] py-[35px] px-5 sm:py-[35px] sm:px-0">
                {/* Contact Info Row */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    {/* Phone Section */}
                    <div className="flex items-center justify-start gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-orange flex items-center justify-center">
                            <FaPhoneAlt className="text-white text-lg" />
                        </div>
                        <div className="flex flex-col">
                            <Link
                                href={`tel:${4038165629}`}
                                className={cn('font-bold text-md text-white hover:text-blue-22 transition-color')}
                            >
                                (403) 816-5629
                            </Link>
                            <span className={cn('text-sm font-bold text-white uppercase')}>(Call or TXT)</span>
                        </div>
                    </div>

                    {/* Email Section */}
                    <div className="flex items-center justify-start gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-orange flex items-center justify-center">
                            <FaEnvelope className="text-white text-lg" />
                        </div>
                        <div className="flex flex-col">
                            <Link
                                href={`mailto:cmm_info@shaw.ca`}
                                className={cn('font-bold text-md text-white hover:text-blue-22 transition-color')}
                            >
                                cmm_info@shaw.ca
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Desktop Menu */}
                {!isMobile && isMobile !== null && (
                    <div className="flex flex-row justify-between w-full my-[25px]">
                        {menuItems.map((menuItem) => {
                            if (menuItem._type === 'navDropdownCTA' && menuItem.subnav && menuItem.subnav.length > 0) {
                                return (
                                    <div key={menuItem._key} className="list-none">
                                        <NavbarDropdown menuItem={menuItem} pathname={pathname} useSansFont={true} />
                                    </div>
                                )
                            }
                            return (
                                <div key={menuItem._key} className="list-none">
                                    <Link
                                        href={getHref(menuItem)}
                                        className={cn(
                                            'font-sans text-white no-underline',
                                            isActive(menuItem) && 'text-orange'
                                        )}
                                    >
                                        {menuItem.cta?.title}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Logo Row */}
                <LogoRow logos={logos} />

                {/* Copyright */}
                <p className="text-xs text-grey-22 mt-5">
                    © {currentYr} Canine Minds and Manners. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

