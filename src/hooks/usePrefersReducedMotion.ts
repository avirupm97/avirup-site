const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/** Reads the user's motion preference once, outside of React state. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  )
}
