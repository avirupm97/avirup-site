import type { CSSProperties } from 'react'

interface GrainProps {
  /** overrides the default 6% grain strength */
  opacity?: number
}

/** Decorative paper-grain overlay. Purely visual, never interactive. */
export function Grain({ opacity }: GrainProps) {
  const style: CSSProperties | undefined =
    opacity === undefined ? undefined : { opacity }

  return <div className="grain" style={style} aria-hidden="true" />
}
