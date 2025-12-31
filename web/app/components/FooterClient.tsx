'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import NavbarDropdown from './NavbarDropdown'
import LogoRow from './LogoRow'
import FooterIcon from './FooterIcon'
import { MenuItem, FooterLogo } from './types'

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
        return slug ? `/${slug}` : link ? `/${link}` : '#'
    }

    const isActive = (menuItem: MenuItem) => {
        const href = getHref(menuItem)
        return pathname === href || pathname === href.replace(/\/$/, '')
    }

    return (
        <footer className="flex justify-center items-center bg-grey-44">
            <div className="flex justify-center items-center flex-col max-w-[767px] w-full min-h-[300px] py-[35px] px-5 sm:py-[35px] sm:px-0">
                {/* Contact Info Row */}
                <div
                    className={cn(
                        'flex flex-col justify-center items-center place-items-center w-full',
                        'sm:grid sm:grid-cols-[40%_20%_40%]'
                    )}
                >
                    <h5 className="my-[5px] text-white text-base order-1 sm:order-0 sm:mt-0 mt-2.5">
                        Phone:{' '}
                        <Link href="tel:4038165629" className="text-orange hover:text-orange-hover">
                            Kirsten Rose (403) 816-5629
                        </Link>
                    </h5>

                    <FooterIcon className="w-10 text-white order-0 sm:order-0" />

                    <h5 className="my-[5px] text-white text-base order-2 sm:order-0">
                        Email:{' '}
                        <Link href="mailto:cmm_info@shaw.ca" className="text-orange hover:text-orange-hover">
                            cmm_info@shaw.ca
                        </Link>
                    </h5>
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

