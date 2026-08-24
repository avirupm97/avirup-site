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

/**
 * Only the surface the app actually uses. Derived from posthog's own types so
 * the stub below cannot drift from the real signature.
 */
type Tracker = Pick<typeof posthog, 'capture'>

/**
 * When PostHog is not initialised (local dev, or missing env vars) we hand back
 * a no-op instead of `undefined`. Call sites stay non-nullable, so a forgotten
 * `?.` can't throw in the one environment where nobody would notice.
 */
const noopTracker: Tracker = {
  capture: () => undefined,
}

const tracker: Tracker = shouldInit ? posthog : noopTracker

export default tracker
