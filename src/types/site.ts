export interface NavLink {
  label: string
  href: string
  /** rendered in the accent colour */
  accent?: boolean
}

export type TornEdge = 'torn-a' | 'torn-b' | 'torn-c'

export interface TapePlacement {
  /** horizontal anchor of the tape strip */
  side: 'left' | 'right'
  /** distance from the anchored edge, e.g. "26%" */
  offset: string
  /** rotation of the tape strip in degrees */
  rotate: number
}

/** A product launch, shown as its announcement tweet. */
export interface Launch {
  /** stable key */
  id: string
  /** numeric id from `x.com/<handle>/status/<id>` */
  tweetId: string
  /** optional label shown above the embed */
  product?: string
}

export interface CareerAnnotation {
  text: string
  left: number
  top: number
  maxWidth: number
  rotate: number
}

export interface CareerMilestone {
  id: string
  /** each entry renders on its own line inside the blob */
  lines: string[]
  date?: string
  /** position of the date label in the map's design space (`careerSection.mapSize`) */
  datePosition?: { left: number; top: number }
  annotation?: CareerAnnotation
  /** the current role is filled instead of outlined */
  current?: boolean
  /** organic border-radius that gives the blob its hand-drawn feel */
  radius: string
  /**
   * placement in the map's design space (`careerSection.mapSize`). The map
   * renders fluid, so these are converted to percentages at render time.
   */
  box: { left: number; top: number; width: number; height: number }
}

export type ContactIcon = 'mail' | 'linkedin' | 'x'

export interface ContactLink {
  label: string
  href: string
  icon: ContactIcon
}
