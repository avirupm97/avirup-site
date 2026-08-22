import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'

interface SectionHeadingProps {
  children: ReactNode
  className?: string
}

/** Serif section title with the shared scroll-reveal behaviour. */
export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      data-reveal
      className={cx(
        'font-display text-[clamp(30px,4vw,40px)] leading-[1.08] font-bold',
        className,
      )}
    >
      {children}
    </h2>
  )
}
