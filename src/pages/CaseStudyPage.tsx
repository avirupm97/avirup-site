import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CaseBlocks } from '../components/case/CaseBlocks'
import { ReturnArrow } from '../components/icons/SketchIcons'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { Grain } from '../components/ui/Grain'
import { ROUTES } from '../constants/routes'
import { getCaseStudy } from '../data/cases'
import { casePage, profile } from '../data/site'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Long-form write-up for a single `/cases/:slug` entry — one narrow column of
 * running prose on the page itself, the way a newsletter post reads.
 */
export function CaseStudyPage() {
  const { slug } = useParams()
  const study = getCaseStudy(slug)

  const pageRef = useRef<HTMLDivElement>(null)
  useScrollReveal(pageRef)

  // An unknown slug is treated the same as unpublished work.
  if (!study) return <Navigate to={ROUTES.wip} replace />

  return (
    <div ref={pageRef} className="relative w-full">
      <SiteHeader />

      <main className="relative w-full overflow-hidden py-10 md:py-14">
        <Grain />

        <div className="shell-prose relative z-[4]">
          <Link
            to={ROUTES.home}
            className="navlink inline-flex items-center gap-3 text-[13px] font-medium text-ink"
          >
            <ReturnArrow />
            {casePage.backLabel}
          </Link>

          <article className="mt-8">
            {/* Masthead */}
            <header>
              <p className="text-[12px] font-medium tracking-[0.16em] text-ember uppercase">
                {casePage.eyebrow} · {study.domain}
              </p>

              <h1 className="mt-4 font-display text-[clamp(30px,4.6vw,44px)] leading-[1.12] font-bold text-balance">
                {study.title}
              </h1>

              {study.tagline ? (
                <p className="mt-4 text-[17px] leading-[1.65] text-ink-muted sm:text-[19px]">
                  {study.tagline}
                </p>
              ) : null}

              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-b border-ink/12 py-4 text-[13px] text-ink-faint">
                <span className="font-medium text-ink">{profile.name}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.role}</span>
                <span aria-hidden="true">·</span>
                <span>{study.readingTime}</span>
              </div>
            </header>

            {/* Body */}
            <div className="mt-9 space-y-10">
              {study.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  data-reveal
                  aria-labelledby={`${section.id}-title`}
                  className="scroll-mt-[calc(var(--header-height)+24px)]"
                >
                  <h2
                    id={`${section.id}-title`}
                    className="font-display text-[24px] leading-snug font-bold sm:text-[27px]"
                  >
                    {section.title}
                  </h2>

                  <CaseBlocks blocks={section.blocks} className="mt-4" />

                  {section.subsections?.map((subsection) => (
                    <div key={subsection.id} className="mt-8">
                      <h3 className="font-display text-[19px] leading-snug font-bold sm:text-[21px]">
                        {subsection.title}
                      </h3>
                      <CaseBlocks blocks={subsection.blocks} className="mt-3" />
                    </div>
                  ))}
                </section>
              ))}

            </div>
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
