import type { CaseStudy } from '../../types/case'
import { contextGraphs } from './context-graphs'
import { improveDesign } from './improve-design'
import { improveUi } from './improve-ui'
import { reduceSubscriptionCancellation } from './reduce-subscription-cancellation'
import { visitorToActivation } from './visitor-to-activation'

/** Every published case study, in the order they should be listed. */
export const caseStudies: CaseStudy[] = [
  improveUi,
  improveDesign,
  contextGraphs,
  reduceSubscriptionCancellation,
  visitorToActivation,
]

const bySlug = new Map(caseStudies.map((study) => [study.slug, study]))

export function getCaseStudy(slug: string | undefined): CaseStudy | undefined {
  return slug ? bySlug.get(slug) : undefined
}
