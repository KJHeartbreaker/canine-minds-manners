import { NextRequest, NextResponse } from 'next/server'
import type { SendMailOptions } from 'nodemailer'
import { render } from '@react-email/components'

import { transporter, smtpEmail, smtpMailTo } from '@/lib/nodemailer'
import { Email } from '@/app/components/forms/Email'

interface ReCAPTCHAResponse {
    success: boolean
    challenge_ts?: string
    hostname?: string
    'error-codes'?: string[]
}

/**
 * Validate reCAPTCHA token with Google's API
 */
async function validateReCAPTCHA(token: string | null | undefined): Promise<boolean> {
    if (!token) {
        return false
    }

    // Support both naming conventions for backwards compatibility
    const secretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY || process.env.RECAPTCHA_SECRET_KEY
    if (!secretKey) {
        console.error('reCAPTCHA secret key is not set. Please set GOOGLE_RECAPTCHA_SECRET_KEY or RECAPTCHA_SECRET_KEY')
        return false
    }

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${secretKey}&response=${token}`,
        })

        const data: ReCAPTCHAResponse = await response.json()

        if (!data.success) {
            console.error('reCAPTCHA validation failed:', data['error-codes'])
            return false
        }

        return true
    } catch (error) {
        console.error('Failed to validate reCAPTCHA:', error)
        return false
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { name, email, phone, message, recaptchaToken } = body

    // Validate reCAPTCHA token
    const isValidReCAPTCHA = await validateReCAPTCHA(recaptchaToken)
    if (!isValidReCAPTCHA) {
        return NextResponse.json({ error: 'reCAPTCHA validation failed' }, { status: 400 })
    }

    // Validate required fields
    if (!name || !email || !message) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!smtpEmail || !smtpMailTo) {
        return NextResponse.json({ error: 'Email configuration missing' }, { status: 500 })
    }

    const emailHtml = await render(<Email name={name} email={email} phone={phone} message={message} />)

    const options: SendMailOptions = {
        from: smtpEmail,
        to: smtpMailTo,
        replyTo: email,
        subject: `New Form Submission from ${name}`,
        html: emailHtml,
    }

    try {
        // Send email using the transporter
        await transporter.sendMail(options)
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Failed to send email:', error)
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
}

