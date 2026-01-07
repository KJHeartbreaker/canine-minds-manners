'use client'

import { useState, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { ToastContainer, toast } from 'react-toastify'
import Confetti from 'react-confetti'
import ReCAPTCHA from 'react-google-recaptcha'
import { validationSchema, type FormValues } from '@/lib/validations'
import 'react-toastify/dist/ReactToastify.css'

/**
 * Contact Form Component
 * Form with validation, reCAPTCHA, and success feedback
 */
export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    // Use environment variable, fallback to hardcoded key for backwards compatibility
    const recaptchaKey = process.env.GOOGLE_RECAPTCHA_PUBLIC_KEY || '6LdeJvcmAAAAAKZAOPDgWXgWfq3OPdHcrVtjEj6P'
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    const handleSubmit = async (
        values: FormValues,
        {
            resetForm,
        }: {
            resetForm: () => void
        },
    ) => {
        try {
            setIsLoading(true)

            // Execute invisible reCAPTCHA before submitting
            let recaptchaToken: string | null = null
            if (recaptchaRef.current) {
                recaptchaToken = await recaptchaRef.current.executeAsync()
            }

            // Send email using API route
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values, recaptchaToken }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                const errorMessage = errorData.error || 'Failed to send message'
                throw new Error(errorMessage)
            }

            // Reset the form
            resetForm()
            if (recaptchaRef.current) {
                recaptchaRef.current.reset()
            }

            // Show success message
            toast.success('Form submitted successfully!')
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 5000)
        } catch (error) {
            console.error('Failed to send email:', error)
            toast.error('Failed to send message. Please try again.')
            // Reset reCAPTCHA on error so user can try again
            if (recaptchaRef.current) {
                recaptchaRef.current.reset()
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-[#f4f4f4] p-5 rounded w-full">
            <Formik
                initialValues={{ name: '', email: '', phone: '', message: '' }}
                validationSchema={toFormikValidationSchema(validationSchema)}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="relative">
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            className="w-full p-2.5 box-border text-dark-grey mb-[30px] border-0 border-b border-dark-grey bg-white flex items-center justify-center focus-visible:rounded focus-visible:outline-2 focus-visible:outline-orange"
                        />
                        <ErrorMessage name="name" component="span" className="absolute text-sm text-red bottom-[-25px]" />
                    </div>

                    <div className="relative">
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="w-full p-2.5 box-border text-dark-grey mb-[30px] border-0 border-b border-dark-grey bg-white flex items-center justify-center focus-visible:rounded focus-visible:outline-2 focus-visible:outline-orange"
                        />
                        <ErrorMessage name="email" component="span" className="absolute text-sm text-red bottom-[-25px]" />
                    </div>

                    <div className="relative">
                        <Field
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Phone"
                            className="w-full p-2.5 box-border text-dark-grey mb-[30px] border-0 border-b border-dark-grey bg-white flex items-center justify-center focus-visible:rounded focus-visible:outline-2 focus-visible:outline-orange"
                        />
                        <ErrorMessage name="phone" component="span" className="absolute text-sm text-red bottom-[-25px]" />
                    </div>

                    <div className="relative">
                        <Field
                            id="message"
                            name="message"
                            as="textarea"
                            placeholder="Message"
                            className="w-full p-2.5 text-dark-grey mb-[30px] border border-dark-grey bg-white"
                        />
                        <ErrorMessage
                            name="message"
                            component="span"
                            className="absolute text-sm text-red bottom-[5px] left-0"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-orange w-1/2 rounded transition-colors hover:bg-orange-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>

                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={recaptchaKey}
                        size="invisible"
                    />
                </Form>
            </Formik>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {showConfetti && typeof window !== 'undefined' && (
                <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
            )}
        </div>
    )
}

