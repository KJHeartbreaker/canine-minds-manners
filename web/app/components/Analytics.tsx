'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

/**
 * Modern analytics component using Next.js Script component
 * Handles both Google Tag Manager and Google Analytics
 *
 * Best practices:
 * - Uses afterInteractive strategy for non-blocking scripts
 * - Tracks page views on route changes
 * - Environment variables for IDs
 */
export default function Analytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Track page views on route changes
    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

        // Track pageview with gtag if available
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: url,
            })
        }
    }, [pathname, searchParams])

    if (!GTM_ID && !GA_MEASUREMENT_ID) {
        return null
    }

    return (
        <>
            {/* Google Tag Manager */}
            {GTM_ID && (
                <>
                    <Script
                        id="gtm-script"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
                        }}
                    />
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                            title="gtm-container"
                        />
                    </noscript>
                </>
            )}

            {/* Google Analytics */}
            {GA_MEASUREMENT_ID && (
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    />
                    <Script
                        id="google-analytics"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
                        }}
                    />
                </>
            )}
        </>
    )
}

// Extend Window interface for TypeScript
declare global {
    interface Window {
        dataLayer: any[]
        // eslint-disable-next-line no-unused-vars
        gtag: (...args: any[]) => void
    }
}

