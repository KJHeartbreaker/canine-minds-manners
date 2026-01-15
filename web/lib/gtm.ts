declare global {
  interface Window {
    dataLayer?: any[]
    // eslint-disable-next-line no-unused-vars
    gtag?: (...args: any[]) => void
  }
}

/**
 * Push an object into GTM's dataLayer.
 * Safe to call even if GTM isn't installed (it will queue in `dataLayer`).
 */
export function pushToDataLayer(payload: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload as any)
}

export function trackDataLayerEvent(event: string, payload: Record<string, unknown> = {}) {
  pushToDataLayer({event, ...payload})
}
