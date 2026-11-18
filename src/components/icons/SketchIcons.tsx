import type { ContactIcon } from '../../types/site'

const HAND_DRAWN = {
  fill: 'none',
  strokeLinecap: 'round' as const,
}

/** Nudging arrow used on cards and links. */
export function CardArrow() {
  return (
    <svg
      className="rowarrow shrink-0"
      width={30}
      height={12}
      viewBox="0 0 30 12"
      aria-hidden="true"
    >
      <path
        d="M1 6 Q14 1 27 6 M27 6 L21 2 M27 6 L21 10"
        stroke="currentColor"
        strokeWidth={1.7}
        {...HAND_DRAWN}
      />
    </svg>
  )
}

/**
 * Vertical connector arrow for the stacked career timeline. Alternating
 * `flip` values make consecutive arrows lean opposite ways, so the column
 * reads as a zig-zag when there is no room for a wide map.
 */
export function StackArrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={flip ? '-scale-x-100' : undefined}
      width={26}
      height={46}
      viewBox="0 0 26 46"
      aria-hidden="true"
    >
      <path
        d="M13 2 C3 12, 23 26, 13 40 M13 40 L7 33 M13 40 L19 34"
        stroke="currentColor"
        strokeWidth={1.6}
        {...HAND_DRAWN}
      />
    </svg>
  )
}

/** Sketchy outline drawn around the primary call to action. */
export function CtaOutline() {
  return (
    <svg
      className="pointer-events-none absolute -top-1 -left-2 overflow-visible"
      width={216}
      height={60}
      viewBox="0 0 216 60"
      aria-hidden="true"
    >
      <path
        d="M9 12 Q60 4 108 7 T207 11 Q212 30 206 49 Q158 57 108 54 T11 50 Q5 30 9 12 Z"
        stroke="currentColor"
        strokeWidth={2.1}
        opacity={0.85}
        {...HAND_DRAWN}
      />
    </svg>
  )
}

/** Wobbly underline beneath the secondary call to action. */
export function SketchUnderline() {
  return (
    <svg
      className="pointer-events-none absolute -bottom-2 left-0"
      width={96}
      height={10}
      viewBox="0 0 96 10"
      aria-hidden="true"
    >
      <path
        d="M2 6 Q26 1 50 5 T94 4"
        stroke="var(--color-ember-soft)"
        strokeWidth={1.8}
        {...HAND_DRAWN}
      />
    </svg>
  )
}

/** Curved arrow that self-draws next to the back-to-top link. */
export function ReturnArrow() {
  return (
    <svg width={70} height={24} viewBox="0 0 70 24" aria-hidden="true">
      <path
        className="draw-path"
        d="M66 20 C46 3, 20 3, 6 17 M6 17 L16 12 M6 17 L15 22"
        stroke="currentColor"
        strokeWidth={1.8}
        {...HAND_DRAWN}
      />
    </svg>
  )
}

const CONTACT_PATHS: Record<ContactIcon, { d: string; strokeWidth: number }> = {
  mail: {
    d: 'M2 3 Q13 1 24 3 Q25 9 23 16 Q13 17 3 16 Q1 9 2 3 Z M3 4 L13 10 L23 4',
    strokeWidth: 1.6,
  },
  linkedin: {
    d: 'M4 16 L4 7 M4 3.5 L4 4 M10 16 L10 7 Q16 4 19 9 L19 16',
    strokeWidth: 1.7,
  },
  x: { d: 'M5 3 Q13 9 21 16 M21 3 Q13 9 5 16', strokeWidth: 1.7 },
}

/** Hand-drawn glyph for a contact channel. */
export function ContactGlyph({ icon }: { icon: ContactIcon }) {
  const { d, strokeWidth } = CONTACT_PATHS[icon]

  return (
    <svg
      className="shrink-0 text-ember"
      width={26}
      height={18}
      viewBox="0 0 26 18"
      aria-hidden="true"
    >
      <path d={d} stroke="currentColor" strokeWidth={strokeWidth} {...HAND_DRAWN} />
    </svg>
  )
}

/** Three slightly uneven lines for the mobile menu toggle. */
export function MenuGlyph() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7 Q12 5.5 20 7 M4 12 Q12 13.2 20 12 M4 17 Q12 15.8 20 17"
        stroke="currentColor"
        strokeWidth={1.7}
        {...HAND_DRAWN}
      />
    </svg>
  )
}

/** Sketch X used while the mobile menu is open. */
export function CloseGlyph() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6 Q12 12 18 18 M18 6 Q12 12 6 18"
        stroke="currentColor"
        strokeWidth={1.7}
        {...HAND_DRAWN}
      />
    </svg>
  )
}
