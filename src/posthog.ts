import posthog from 'posthog-js'

const posthogKey = import.meta.env.VITE_POSTHOG_KEY
const posthogHost = import.meta.env.VITE_POSTHOG_HOST

/**
 * Local traffic pollutes funnels. Skip init on localhost / loopback so
 * `vite` and `vite preview` never send events; deployed hosts still do.
 */
function isLocalHost() {
  if (typeof window === 'undefined') return true
  const { hostname } = window.location
  return hostname === 'localhost' || hostname === '127.0.0.1'
}

const shouldInit = Boolean(posthogKey && posthogHost && !isLocalHost())

if (shouldInit) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: '2026-05-30',
    // SPA route changes are captured in App — avoid a double $pageview on first load.
    capture_pageview: false,
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
  })
}

export default shouldInit ? posthog : undefined
