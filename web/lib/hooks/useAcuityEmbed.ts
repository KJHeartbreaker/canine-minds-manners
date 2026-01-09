import {useEffect} from 'react'

/**
 * Custom hook to load Acuity Scheduling embed scripts and stylesheets
 * Ensures they're only loaded once, even if used in multiple components
 */
export function useAcuityEmbed() {
  useEffect(() => {
    // Check if stylesheet already exists
    const hasStylesheet = document.getElementById('acuity-button-styles')
    if (!hasStylesheet) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://embed.acuityscheduling.com/embed/button/28298110.css'
      link.id = 'acuity-button-styles'
      document.head.appendChild(link)
    }

    // Check if script already exists
    const hasScript = document.querySelector('script[src*="acuityscheduling.com/embed/button"]')
    if (!hasScript) {
      const script = document.createElement('script')
      script.src = 'https://embed.acuityscheduling.com/embed/button/28298110.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])
}
