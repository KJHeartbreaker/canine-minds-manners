declare module 'react-google-recaptcha' {
  import {Component} from 'react'

  export interface ReCAPTCHAProps {
    sitekey: string
    // token parameter is required by ReCAPTCHA API signature but may not be used by all implementations
    // eslint-disable-next-line no-unused-vars
    onChange?: (token: string | null) => void
    onExpired?: () => void
    onError?: () => void
    size?: 'normal' | 'compact' | 'invisible'
    theme?: 'light' | 'dark'
    type?: 'image' | 'audio'
    tabindex?: number
    hl?: string
    badge?: 'bottomright' | 'bottomleft' | 'inline'
    isolated?: boolean
    stoken?: string
    grecaptcha?: any
    asyncScriptOnLoad?: () => void
  }

  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {
    reset(): void
    execute(): void
    executeAsync(): Promise<string>
    getValue(): string | null
  }
}
