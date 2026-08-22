import type { CSSProperties } from 'react'
import type { TapePlacement } from '../../types/site'

/** Strip of masking tape pinning a paper card to the page. */
export function Tape({ side, offset, rotate }: TapePlacement) {
  const style: CSSProperties = {
    top: -11,
    transform: `rotate(${rotate}deg)`,
    ...(side === 'left' ? { left: offset } : { right: offset }),
  }

  return <div className="tape" style={style} aria-hidden="true" />
}
