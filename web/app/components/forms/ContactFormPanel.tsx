'use client'

import { PortableTextBlock } from 'next-sanity'
import SimplePortableText from '../portableText/SimplePortableText'
import ContactForm from './ContactForm'
import AcuityEmbed from './AcuityEmbed'

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

