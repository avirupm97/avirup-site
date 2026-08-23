/**
 * Every client-side route in the site. Referenced instead of raw strings so a
 * path change is a one-line edit rather than a grep.
 */
export const ROUTES = {
  home: '/',
  /** placeholder for work and writing that isn't published yet */
  wip: '/wip',
  /** parent route for all case studies; every write-up lives beneath it */
  cases: '/cases',
  /** pattern registered with the router — use `casePath()` to build a link */
  caseStudy: '/cases/:slug',
} as const

export type Route = (typeof ROUTES)[keyof typeof ROUTES]

/** Slugs of the individual case studies, mirroring `src/data/cases`. */
export const CASE_SLUGS = {
  improveUi: 'improve-ui',
  improveDesign: 'improve-design',
  contextGraphs: 'context-graphs',
  reduceSubscriptionCancellation: 'reduce-subscription-cancellation',
  visitorToActivation: 'visitor-to-activation',
} as const

export type CaseSlug = (typeof CASE_SLUGS)[keyof typeof CASE_SLUGS]

/** Builds the path for a single case study, e.g. `/cases/trial-conversion`. */
export function casePath(slug: CaseSlug): string {
  return `${ROUTES.cases}/${slug}`
}

/**
 * Section anchors that are only mounted on the home page. The footer (`#contact`)
 * is deliberately absent — it renders on every page, so linking to it should stay
 * an in-page scroll rather than a trip back home.
 */
export const HOME_ONLY_SECTIONS: readonly string[] = [
  '#top',
  '#route',
  '#work',
  '#notes',
]
