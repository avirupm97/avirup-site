import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ReturnArrow } from '../components/icons/SketchIcons'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { Grain } from '../components/ui/Grain'
import { PaperCard } from '../components/ui/PaperCard'
import { ROUTES } from '../constants/routes'
import { contactLinks, wipPage } from '../data/site'
import { useDrawPaths } from '../hooks/useDrawPaths'
import { useScrollReveal } from '../hooks/useScrollReveal'

const emailLink = contactLinks.find((link) => link.icon === 'mail')

/**
 * Landing spot for every case study and post that isn't written up yet. Kept on
 * one shared route rather than a stub per item, so there is a single place to
 * edit the message.
 */
export function WipPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const noticeRef = useRef<HTMLElement>(null)

  useScrollReveal(pageRef)
  useDrawPaths(noticeRef, { trigger: 'mount' })

  return (
    <div ref={pageRef} className="relative w-full">
      <SiteHeader />

      <main>
        <section
          ref={noticeRef}
          className="relative w-full overflow-hidden"
          aria-labelledby="wip-title"
        >
          <Grain />

          <div className="shell-prose relative z-[4] flex min-h-[calc(100vh-var(--header-height))] items-center py-20">
            <div className="relative w-full">
              <PaperCard
                tilt={-1.2}
                tape={{ side: 'left', offset: '34%', rotate: -5 }}
                tornEdge="torn-a"
                className="px-7 py-11 sm:px-12 sm:py-14 md:px-16"
              >
                <p className="text-[12px] font-medium tracking-[0.16em] text-ember uppercase">
                  {wipPage.eyebrow}
                </p>

                <h1
                  id="wip-title"
                  className="mt-4 max-w-[22ch] font-display text-[clamp(30px,5vw,44px)] leading-[1.08] font-bold"
                >
                  {wipPage.title}
                </h1>

                <div className="mt-6 max-w-[58ch] space-y-4 text-[16px] leading-[1.7] text-ink-muted sm:text-[17px]">
                  {wipPage.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-5 border-t border-ink/12 pt-7 text-[14px]">
                  <Link
                    to={ROUTES.home}
                    className="navlink inline-flex items-center gap-3 font-medium text-ink"
                  >
                    <ReturnArrow />
                    {wipPage.backLabel}
                  </Link>

                  {emailLink ? (
                    <a
                      href={emailLink.href}
                      className="navlink font-medium text-ember"
                    >
                      {wipPage.contactLabel}
                    </a>
                  ) : null}
                </div>
              </PaperCard>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
