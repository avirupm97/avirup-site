import type { CSSProperties, ReactNode } from 'react'
import type { TapePlacement, TornEdge } from '../../types/site'
import { cx } from '../../utils/cx'
import { Grain } from './Grain'
import { Tape } from './Tape'

interface PaperCardProps {
  /** resting rotation in degrees; the card straightens on hover */
  tilt: number
  tape?: TapePlacement
  tornEdge?: TornEdge
  /** classes for the paper sheet itself (padding, layout) */
  className?: string
  /** classes for the content layer that sits above the grain */
  contentClassName?: string
  children: ReactNode
}

/**
 * A tilted sheet of paper, held down with tape and topped with grain.
 * Render it inside a `relative` parent so the tape can anchor to the card.
 */
export function PaperCard({
  tilt,
  tape,
  tornEdge,
  className,
  contentClassName,
  children,
}: PaperCardProps) {
  const style = { '--tilt': `${tilt}deg` } as CSSProperties

  return (
    <>
      {tape ? <Tape {...tape} /> : null}
      <div
        className={cx('card-tilt paper relative h-full', tornEdge, className)}
        style={style}
      >
        <Grain />
        <div className={cx('relative z-[4] flex h-full flex-col', contentClassName)}>
          {children}
        </div>
      </div>
    </>
  )
}
