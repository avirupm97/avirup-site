import { useEffect } from 'react'
import type { RefObject } from 'react'
import { prefersReducedMotion } from './usePrefersReducedMotion'

const REVEAL_SELECTOR = '[data-reveal]'
const VISIBLE_CLASS = 'is-visible'

/**
 * Reveals every `[data-reveal]` descendant of `rootRef` the first time it
 * scrolls into view. One observer for the whole page keeps this cheap and
 * avoids wrapping elements in extra layout-affecting containers.
 */
export function useScrollReveal(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    )
    if (elements.length === 0) return

    if (prefersReducedMotion()) {
      elements.forEach((element) => element.classList.add(VISIBLE_CLASS))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add(VISIBLE_CLASS)
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -4% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [rootRef])
}
