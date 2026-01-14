'use client'

import { PortableTextBlock } from 'next-sanity'
import dynamic from 'next/dynamic'
import SimplePortableText from '../portableText/SimplePortableText'
import AcuityEmbed from './AcuityEmbed'

// Dynamically import ContactForm to reduce initial bundle size (Formik + dependencies)
const ContactForm = dynamic(() => import('./ContactForm'), {
    ssr: false,
    loading: () => <div className="w-full p-5 bg-gray-100 animate-pulse rounded">Loading form...</div>,
})

interface FormPanel {
    title?: string
    type?: 'form' | 'acuityForm'
    copy?: {
        portableTextBlock?: PortableTextBlock[]
    }
}

/**
 * Contact Form Panel Component
 * Wrapper for contact form or Acuity embed with optional title and copy
 */
export default function ContactFormPanel({ title, copy, type }: FormPanel) {
    return (
        <div data-component="ContactFormPanel" className="flex flex-col w-full">
            {title && <h2>{title}</h2>}
            {copy?.portableTextBlock && (
                <div className="copyBlock">
                    <SimplePortableText value={copy.portableTextBlock} />
                </div>
            )}
            {type === 'form' && <ContactForm />}
            {type === 'acuityForm' && <AcuityEmbed />}
        </div>
    )
}

