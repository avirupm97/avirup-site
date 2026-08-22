import { Link } from 'react-router-dom'
import { workDomains, workSection } from '../../data/site'
import type { WorkDomain } from '../../types/site'
import { cx } from '../../utils/cx'
import { RowArrow } from '../icons/SketchIcons'
import { Grain } from '../ui/Grain'
import { PaperCard } from '../ui/PaperCard'
import { SectionHeading } from '../ui/SectionHeading'

function DomainCard({ domain, index }: { domain: WorkDomain; index: number }) {
  return (
    <div
      data-reveal
      className={cx('relative', domain.offsetTop && 'md:mt-6')}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <PaperCard
        tilt={domain.tilt}
        tape={domain.tape}
        tornEdge={domain.tornEdge}
        className="px-8 py-10"
      >
        <h3 className="font-display text-[28px] leading-tight font-bold">
          {domain.title}
        </h3>
        <p className="mt-3 text-[17px] leading-[1.7] text-ink-muted">
          {domain.description}
        </p>

        <ul className="mt-7 text-[13px]">
          {domain.links.map((link, linkIndex) => (
            <li
              key={link.label}
              className={cx(
                'border-t border-ink/12',
                linkIndex === domain.links.length - 1 && 'border-b',
              )}
            >
              <Link
                to={link.href}
                className="rowlink flex items-center justify-between gap-3 py-3 text-ember"
              >
                <span className="text-ink">{link.label}</span>
                <RowArrow />
              </Link>
            </li>
          ))}
        </ul>
      </PaperCard>
    </div>
  )
}

export function WorkDomains() {
  return (
    <section
      id="work"
      className="relative w-full overflow-hidden border-t border-ink/12 py-24 scroll-mt-(--header-height)"
    >
      <Grain />
      <div className="relative z-[4] mx-auto max-w-[1180px] px-6 md:px-8">
        <SectionHeading className="max-w-[24ch]">
          {workSection.title}
        </SectionHeading>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {workDomains.map((domain, index) => (
            <DomainCard key={domain.id} domain={domain} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
