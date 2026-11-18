import { Link } from 'react-router-dom'
import { casePath } from '../../constants/routes'
import type { CaseSlug } from '../../constants/routes'
import { caseStudies } from '../../data/cases'
import { blogSection } from '../../data/site'
import posthog from '../../posthog'
import type { CaseStudy } from '../../types/case'
import type { TapePlacement } from '../../types/site'
import { CardArrow } from '../icons/SketchIcons'
import { Grain } from '../ui/Grain'
import { PaperCard } from '../ui/PaperCard'
import { SectionHeading } from '../ui/SectionHeading'

/**
 * Case studies carry no card styling of their own, so tilt and tape alternate
 * by position — enough variety for the pinned-paper look without per-post data.
 */
const TILTS = [-0.7, 0.8, -0.5, 1, -0.9]
const TAPES: TapePlacement[] = [
  { side: 'left', offset: '18%', rotate: -4 },
  { side: 'right', offset: '20%', rotate: 4 },
  { side: 'left', offset: '24%', rotate: -3 },
  { side: 'right', offset: '16%', rotate: 5 },
]

function BlogCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <Link
      to={casePath(study.slug as CaseSlug)}
      data-reveal
      className="rowlink relative block h-full"
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={() =>
        posthog.capture('blog_post_selected', { case_slug: study.slug })
      }
    >
      <PaperCard
        tilt={TILTS[index % TILTS.length]}
        tape={TAPES[index % TAPES.length]}
        className="px-6 py-7"
        contentClassName="justify-between gap-7"
      >
        <div>
          <p className="text-[12px] font-medium tracking-[0.16em] text-ember uppercase">
            {study.domain}
          </p>
          <h3 className="mt-2 font-display text-[20px] leading-snug font-bold">
            {study.title}
          </h3>
          {study.tagline ? (
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-muted">
              {study.tagline}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-5 text-ember">
          <span className="text-[13px] text-ink-faint">{study.readingTime}</span>
          <CardArrow />
        </div>
      </PaperCard>
    </Link>
  )
}

export function Blogs() {
  if (caseStudies.length === 0) return null

  return (
    <section
      id="notes"
      className="relative w-full overflow-hidden py-24 scroll-mt-(--header-height)"
    >
      <Grain />
      <div className="shell relative z-[4]">
        <SectionHeading>{blogSection.title}</SectionHeading>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <BlogCard key={study.slug} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
