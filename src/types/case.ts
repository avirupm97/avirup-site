/** A bullet, optionally led by a bolded label ("Active cancellation: ..."). */
export interface CaseListItem {
  lead?: string
  text: string
}

/**
 * The narrow set of content shapes a case study needs. Keeping it a union means
 * the write-up stays data, and the page owns every styling decision.
 */
export type CaseBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: CaseListItem[] }
  | { kind: 'quote'; text: string }
  | { kind: 'note'; title: string; items: string[] }

export interface CaseSubsection {
  id: string
  title: string
  blocks: CaseBlock[]
}

export interface CaseSection {
  id: string
  title: string
  blocks: CaseBlock[]
  subsections?: CaseSubsection[]
}

export interface CaseStudy {
  /** last segment of the `/cases/:slug` path */
  slug: string
  /** the work domain this case sits under, e.g. "PLG work" */
  domain: string
  title: string
  /** one-line framing shown under the title; omit to skip it */
  tagline?: string
  /** how long the piece takes to read, e.g. "6 min read" */
  readingTime: string
  sections: CaseSection[]
}
