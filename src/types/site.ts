export interface NavLink {
  label: string
  href: string
  /** rendered in the accent colour */
  accent?: boolean
}

export interface WorkLink {
  label: string
  href: string
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

export interface WorkDomain {
  id: string
  title: string
  description: string
  links: WorkLink[]
  tornEdge: TornEdge
  /** resting rotation of the card in degrees */
  tilt: number
  tape: TapePlacement
  /** pushes the middle card down so the row reads as a scatter */
  offsetTop?: boolean
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
  /** absolute position of the date label on the desktop map */
  datePosition?: { left: number; top: number }
  annotation?: CareerAnnotation
  /** the current role is filled instead of outlined */
  current?: boolean
  /** organic border-radius that gives the blob its hand-drawn feel */
  radius: string
  /** absolute placement on the 1176 x 520 desktop map */
  box: { left: number; top: number; width: number; height: number }
}

export type BlogStatus = 'Published' | 'Drafting'

export interface BlogPost {
  id: string
  tag: string
  title: string
  excerpt: string
  status: BlogStatus
  href: string
  tilt: number
  tape: TapePlacement
}

export type ContactIcon = 'mail' | 'linkedin' | 'x'

export interface ContactLink {
  label: string
  href: string
  icon: ContactIcon
}
