'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import NavbarDropdown from './NavbarDropdown'
import MobileHeaderDropdown from './MobileHeaderDropdown'
import { MenuItem } from './types'

interface HeaderClientProps {
    menuItems: MenuItem[]
}

/**
 * Header Client Component
 * Handles all interactive features (mobile menu, dropdowns)
 */
export default function HeaderClient({ menuItems }: HeaderClientProps) {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [menuOpen])

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
        <header className="sticky top-0 left-0 right-0 z-[100] bg-blue-44">
            <nav className="grid grid-rows-[75px] grid-cols-1">
                <div className="flex items-center justify-between max-w-full w-full mx-auto px-3 z-[100] lg:max-w-[1280px] xl:max-w-[1440px] xxl:max-w-[1600px]">
                    {/* Logo */}
                    <div className="flex max-w-[120px]">
                        <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center justify-center">
                            <Image
                                src="/images/CMMPDT_Logo-type.png"
                                alt="CMM Logo"
                                width={75}
                                height={75}
                                priority
                            />
                            <div className="hidden md:flex flex-col justify-center items-center w-[250px]">
                                <p className="font-display text-sm text-white mb-0">Canine Minds & Manners</p>
                                <p className="text-xs text-white mb-0">Professional Dog Training</p>
                            </div>
                        </Link>
                    </div>

                    {/* Contact Icons - Mobile only */}
                    <div className="flex flex-row items-center justify-center gap-4 flex-1 sm:hidden">
                        <Link
                            href="tel:4038165629"
                            aria-label="Call us at 403-816-5629"
                            className="flex items-center justify-center w-10 h-10 bg-orange rounded-full transition-colors hover:bg-orange-hover"
                        >
                            <FaPhone size={24} className="text-white" />
                        </Link>
                        <Link
                            href="mailto:cmm_info@shaw.ca"
                            aria-label="Email us at cmm_info@shaw.ca"
                            className="flex items-center justify-center w-10 h-10 bg-orange rounded-full transition-colors hover:bg-orange-hover"
                        >
                            <FaEnvelope size={24} className="text-white" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    {!isMobile && isMobile !== null && (
                        <ul className="flex items-center justify-evenly px-5 w-full md:w-[70%] m-0 p-0">
                            {menuItems.map((menuItem) => {
                                if (menuItem._type === 'navDropdownCTA' && menuItem.subnav && menuItem.subnav.length > 0) {
                                    return (
                                        <li key={menuItem._key} className="flex items-center justify-center h-full w-auto list-none m-0">
                                            <NavbarDropdown menuItem={menuItem} pathname={pathname} />
                                        </li>
                                    )
                                }
                                return (
                                    <li
                                        key={menuItem._key}
                                        className="flex items-center justify-center h-full w-auto list-none m-0 transition-colors"
                                    >
                                        <Link
                                            href={getHref(menuItem)}
                                            className={cn(
                                                'flex h-full font-display text-white font-normal transition-colors',
                                                isActive(menuItem) && 'text-orange',
                                                'hover:text-orange-hover'
                                            )}
                                        >
                                            {menuItem.cta?.title}
                                        </Link>
                                    </li>
                                )
                            })}

                            {/* Social Icons */}
                            <div className="flex flex-row">
                                <p className="font-display text-white w-max mb-0">Follow Us:</p>
                                <Link
                                    href="https://www.instagram.com/canine.minds.and.manners/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on Instagram"
                                    className="flex flex-row ml-3"
                                >
                                    <FaInstagram size={24} className="text-white hover:text-orange transition-colors" />
                                </Link>
                                <Link
                                    href="https://www.facebook.com/CanineMindsandManners/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on Facebook"
                                    className="flex flex-row ml-3"
                                >
                                    <FaFacebook size={24} className="text-white hover:text-orange transition-colors" />
                                </Link>
                            </div>
                        </ul>
                    )}

                    {/* Mobile Menu Icon */}
                    {isMobile && (
                        <button
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="w-[25px] min-w-[25px] block sm:hidden cursor-pointer bg-transparent border-0 p-0"
                            aria-label="Toggle menu"
                        >
                            <div
                                className={cn(
                                    'h-0.5 bg-white my-[5px] w-full transition-all duration-350 linear',
                                    menuOpen && 'rotate-45 origin-left my-[7px]'
                                )}
                            />
                            <div
                                className={cn(
                                    'h-0.5 bg-white my-[5px] w-full transition-all duration-350 linear',
                                    menuOpen && 'w-0 opacity-0 my-[7px]'
                                )}
                            />
                            <div
                                className={cn(
                                    'h-0.5 bg-white my-[5px] w-full transition-all duration-350 linear',
                                    menuOpen && '-rotate-45 origin-left my-[7px]'
                                )}
                            />
                        </button>
                    )}
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobile && (
                    <>
                        {menuOpen && (
                            <div className="fixed top-[75px] left-0 w-full h-[calc(100vh-75px)] bg-black/50 z-10" />
                        )}
                        <div
                            className={cn(
                                'absolute top-[75px] left-0 right-0 p-5 h-[calc(100vh-75px)] overflow-y-auto bg-grey-44 flex flex-col items-center text-center z-[100]',
                                menuOpen ? 'flex' : 'hidden'
                            )}
                        >
                            {menuItems.map((menuItem) => {
                                if (menuItem._type === 'navDropdownCTA' && menuItem.subnav && menuItem.subnav.length > 0) {
                                    return (
                                        <div key={menuItem._key} className="flex flex-col justify-center items-start w-full">
                                            <MobileHeaderDropdown item={menuItem} setMenuOpen={setMenuOpen} pathname={pathname} />
                                        </div>
                                    )
                                }
                                return (
                                    <Link
                                        key={menuItem._key}
                                        href={getHref(menuItem)}
                                        className={cn(
                                            'text-white no-underline py-2.5',
                                            isActive(menuItem) && 'text-orange'
                                        )}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {menuItem.cta?.title}
                                    </Link>
                                )
                            })}

                            {/* Mobile Social Icons */}
                            <div className="flex flex-col items-center mt-4">
                                <p className="font-display text-white font-semibold w-max mb-0">Follow us:</p>
                                <div className="flex flex-row justify-around gap-4 mt-2">
                                    <Link
                                        href="https://www.instagram.com/canine.minds.and.manners/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white"
                                    >
                                        <FaInstagram size={36} />
                                    </Link>
                                    <Link
                                        href="https://www.facebook.com/CanineMindsandManners/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white"
                                    >
                                        <FaFacebook size={36} />
                                    </Link>
                                </div>
                            </div>

                            {/* Mobile Contact Button */}
                            <Link href="tel:4038165629" className="block mt-4">
                                <button
                                    type="button"
                                    className="bg-blue-22 py-1.5 px-2.5 rounded text-white"
                                >
                                    Kirsten Rose <br />
                                    (403) 816-5629
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </nav>
        </header>
    )
}

