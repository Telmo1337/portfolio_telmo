const GA_ID = 'G-QRDNJC2834'

// Kept for legacy / programmatic fallback — GA is now loaded via the
// exact snippet in index.html:5-14 (gtag.js). This helper is only used
// if you call initGA() manually elsewhere.
export function initGA(id = GA_ID) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  if (!id || window.gtag) return
  if (window.navigator?.doNotTrack === '1' || window.doNotTrack === '1') return
  if (window.__ga_initialized) return
  window.__ga_initialized = true
  window.dataLayer = window.dataLayer || []
  function gtag(...args) { window.dataLayer.push(args) }
  window.gtag = window.gtag || gtag
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(s)
  gtag('js', new Date())
  gtag('config', id, { send_page_view: true })
}

// SPA helper: fire a page_view when the virtual route changes.
// Call with the current path + query (e.g. "/portfolio_telmo/?case=decide-together").
export function trackPageView(path, id = GA_ID) {
  if (typeof window === 'undefined' || !window.gtag || !id) return
  window.gtag('config', id, {
    page_path: path,
    page_location: window.location.href,
  })
}

// Optional: generic event helper
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}

export { GA_ID }
