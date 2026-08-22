import { useEffect } from 'react'
import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export interface DrawPathsOptions {
  /** `mount` draws immediately, `view` waits for the container to scroll in */
  trigger?: 'mount' | 'view'
  selector?: string
  duration?: number
  stagger?: number
  delay?: number
}

/**
 * Self-drawing SVG strokes. Every matched path is prepped with its own
 * dash length and then tweened to a zero dash offset.
 */
export function useDrawPaths(
  containerRef: RefObject<HTMLElement | SVGElement | null>,
  {
    trigger = 'view',
    selector = '.draw-path',
    duration = 1.1,
    stagger = 0.13,
    delay = 0.25,
  }: DrawPathsOptions = {},
): void {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const paths = Array.from(
      container.querySelectorAll<SVGPathElement>(selector),
    )
    if (paths.length === 0) return

    const lengths = paths.map((path) => path.getTotalLength())

    if (prefersReducedMotion()) {
      paths.forEach((path) => {
        path.style.strokeDasharray = 'none'
        path.style.strokeDashoffset = '0'
      })
      return
    }

    const context = gsap.context(() => {
      paths.forEach((path, index) => {
        const length = lengths[index]
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

        gsap.to(path, {
          strokeDashoffset: 0,
          duration,
          delay: trigger === 'mount' ? delay + index * stagger : index * stagger,
          ease: 'power1.inOut',
          scrollTrigger:
            trigger === 'view'
              ? { trigger: container, start: 'top 85%', once: true }
              : undefined,
        })
      })
    }, container)

    return () => context.revert()
  }, [containerRef, selector, trigger, duration, stagger, delay])
}
