'use client'

import { useState } from 'react'
import { PortableTextBlock } from 'next-sanity'
import { IoIosArrowDown } from 'react-icons/io'
import { cn } from '@/lib/utils'
import CustomPortableText from './portableText/PortableText'

interface FAQItem {
    _key: string
    question: string
    answer: {
        portableTextBlock: PortableTextBlock[]
    }
}

interface FAQProps {
    items: FAQItem[]
}

/**
 * FAQ Component
 * Accordion-style FAQ with orange background questions and white Paytone text
 */
export default function FAQ({ items }: FAQProps) {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set())

    const toggleItem = (key: string) => {
        const newOpenItems = new Set(openItems)
        if (newOpenItems.has(key)) {
            newOpenItems.delete(key)
        } else {
            newOpenItems.add(key)
        }
        setOpenItems(newOpenItems)
    }

    return (
        <div className="flex flex-col w-full space-y-3">
            {items.map((item) => {
                const isOpen = openItems.has(item._key)
                return (
                    <div key={item._key} className="w-full">
                        {/* Question Button */}
                        <button
                            type="button"
                            onClick={() => toggleItem(item._key)}
                            className={cn(
                                'w-full flex items-center justify-between',
                                'bg-orange text-white font-display font-bold',
                                'px-4 py-3 m-0 rounded transition-colors',
                                'hover:bg-orange-hover',
                                'focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2'
                            )}
                            aria-expanded={isOpen}
                            aria-controls={`faq-answer-${item._key}`}
                        >
                            <span className="text-left pr-4">{item.question}</span>
                            <IoIosArrowDown
                                size="1.3em"
                                className={cn(
                                    'shrink-0 transition-transform',
                                    isOpen && 'rotate-180'
                                )}
                            />
                        </button>
                        {/* Answer Content */}
                        <div
                            id={`faq-answer-${item._key}`}
                            className={cn(
                                'overflow-hidden transition-all duration-300 ease-in-out',
                                isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                            )}
                        >
                            <div className="pt-4 pb-2">
                                <CustomPortableText value={item.answer.portableTextBlock} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
