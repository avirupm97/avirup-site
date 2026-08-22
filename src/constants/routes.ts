/**
 * Every client-side route in the site. Referenced instead of raw strings so a
 * path change is a one-line edit rather than a grep.
 */
export const ROUTES = {
  home: '/',
  /** placeholder for work and writing that isn't published yet */
  wip: '/wip',
} as const

export type Route = (typeof ROUTES)[keyof typeof ROUTES]

/**
 * Section anchors that are only mounted on the home page. The footer (`#contact`)
 * is deliberately absent — it renders on every page, so linking to it should stay
 * an in-page scroll rather than a trip back home.
 */
export const HOME_ONLY_SECTIONS: readonly string[] = [
  '#top',
  '#work',
  '#route',
  '#notes',
]
