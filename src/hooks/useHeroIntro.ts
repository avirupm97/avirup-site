import { useEffect } from 'react'
import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from './usePrefersReducedMotion'

const HERO_ELEMENT_SELECTOR = '[data-hero-el]'

/** Staggered rise-in for the hero headline, copy and actions. */
export function useHeroIntro(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const context = gsap.context(() => {
      gsap.fromTo(
        HERO_ELEMENT_SELECTOR,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          delay: 0.1,
        },
      )
    }, root)

    return () => context.revert()
  }, [rootRef])
}
