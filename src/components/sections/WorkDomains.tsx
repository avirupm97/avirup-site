import { Link } from 'react-router-dom'
import { workDomains, workSection } from '../../data/site'
import posthog from '../../posthog'
import type { WorkDomain, WorkLink } from '../../types/site'
import { cx } from '../../utils/cx'
import { DraftingMark, RowArrow } from '../icons/SketchIcons'
import { SectionHeading } from '../ui/SectionHeading'

function trackWorkItem(link: WorkLink) {
  posthog?.capture('work_item_selected', {
    item_status: link.status,
  })
}

function LiveRow({ link }: { link: WorkLink }) {
  return (
    <Link
      to={link.href}
      className="live-row rowlink flex items-center justify-between gap-3 py-3.5 text-ember"
      onClick={() => trackWorkItem(link)}
    >
      <span className="relative text-ink">
        {link.label}
        <span className="row-underline" aria-hidden="true" />
      </span>
      <RowArrow />
    </Link>
  )
}

function DraftingRow({ link }: { link: WorkLink }) {
  return (
    <Link
      to={link.href}
      className="flex items-center justify-between gap-3 py-3.5"
      onClick={() => trackWorkItem(link)}
    >
      <span className="text-ink-faint">{link.label}</span>
      <span className="flex shrink-0 items-center gap-2">
        <span className="font-script text-[15px] leading-none text-ember-soft">
          {workSection.draftingLabel}
        </span>
        <DraftingMark className="text-ink-faint" />
      </span>
    </Link>
  )
}

function DomainCard({ domain, index }: { domain: WorkDomain; index: number }) {
  return (
    <article
      data-reveal
      className="relative w-full min-w-0"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="paper relative px-7 py-8">
        <h3 className="font-display text-[26px] leading-tight font-bold">
          {domain.title}
        </h3>
        <p className="mt-3 text-[16px] leading-[1.65] text-ink-muted">
          {domain.description}
        </p>

        <ul className="mt-7 text-[16px]">
          {domain.links.map((link, linkIndex) => {
            const drafting = link.status === 'drafting'
            const last = linkIndex === domain.links.length - 1

            return (
              <li
                key={link.label}
                className={cx(
                  'border-t',
                  drafting
                    ? 'border-dashed border-ink/18'
                    : 'border-ink/12',
                  last && 'border-b',
                )}
              >
                {drafting ? <DraftingRow link={link} /> : <LiveRow link={link} />}
              </li>
            )
          })}
        </ul>
      </div>
    </article>
  )
}

export function WorkDomains() {
  return (
    <section
      id="work"
      className="relative w-full border-t border-ink/12 py-24 scroll-mt-(--header-height)"
    >
      <div className="shell">
        <SectionHeading className="max-w-[24ch]">
          {workSection.title}
        </SectionHeading>

        <div className="mt-16 grid grid-cols-1 items-start gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {workDomains.map((domain, index) => (
            <DomainCard key={domain.id} domain={domain} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
