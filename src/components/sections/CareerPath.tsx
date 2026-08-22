import { useRef } from 'react'
import { careerMilestones, careerSection } from '../../data/site'
import { useDrawPaths } from '../../hooks/useDrawPaths'
import type { CareerMilestone } from '../../types/site'
import { cx } from '../../utils/cx'
import { StackArrow } from '../icons/SketchIcons'
import { Grain } from '../ui/Grain'
import { SectionHeading } from '../ui/SectionHeading'

const { mapSize, connectors } = careerSection

function blobClasses(current?: boolean) {
  return cx(
    'grid place-items-center px-4 text-center text-[12px] leading-snug font-medium',
    current ? 'bg-bone text-ink' : 'text-bone',
  )
}

function MilestoneLabel({ milestone }: { milestone: CareerMilestone }) {
  return (
    <span>
      {milestone.lines.map((line, index) => (
        <span key={line} className={index === 0 ? undefined : 'block'}>
          {line}
        </span>
      ))}
    </span>
  )
}

/** Wide, hand-drawn map of roles connected by arrows. */
function CareerMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  useDrawPaths(mapRef, { trigger: 'view', stagger: 0.12 })

  return (
    <div
      ref={mapRef}
      className="relative mx-auto mt-16 hidden xl:block"
      style={{ width: mapSize.width, height: mapSize.height }}
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${mapSize.width} ${mapSize.height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="career-arrowhead"
            markerWidth={10}
            markerHeight={10}
            orient="auto"
            refX={6}
            refY={3}
          >
            <path d="M0 0 L7 3 L0 6" fill="none" stroke="currentColor" strokeWidth={1.4} />
          </marker>
        </defs>
        <g
          className="text-bone"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          opacity={0.8}
          markerEnd="url(#career-arrowhead)"
        >
          {connectors.map((d) => (
            <path key={d} className="draw-path" d={d} />
          ))}
        </g>
      </svg>

      {careerMilestones.map((milestone) => (
        <div key={milestone.id}>
          <div
            className={cx('absolute', blobClasses(milestone.current))}
            style={{
              left: milestone.box.left,
              top: milestone.box.top,
              width: milestone.box.width,
              height: milestone.box.height,
              border: '1.6px solid var(--color-bone)',
              borderRadius: milestone.radius,
            }}
          >
            <MilestoneLabel milestone={milestone} />
          </div>

          {milestone.date && milestone.datePosition ? (
            <span
              className="num absolute text-[11px] text-bone/60"
              style={milestone.datePosition}
            >
              {milestone.date}
            </span>
          ) : null}

          {milestone.annotation ? (
            <span
              className="absolute text-[13px] text-ember-soft italic"
              style={{
                left: milestone.annotation.left,
                top: milestone.annotation.top,
                maxWidth: milestone.annotation.maxWidth,
                transform: `rotate(${milestone.annotation.rotate}deg)`,
              }}
            >
              {milestone.annotation.text}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  )
}

/** Stacked version of the same journey for narrow viewports. */
function CareerList() {
  const lastIndex = careerMilestones.length - 1

  return (
    <ol className="mt-12 space-y-4 xl:hidden">
      {careerMilestones.map((milestone, index) => (
        <li key={milestone.id} className="flex flex-col items-center gap-2">
          <div
            className={cx('mx-auto w-full max-w-[280px] py-6', blobClasses(milestone.current))}
            style={{
              border: '1.6px solid var(--color-bone)',
              borderRadius: milestone.radius,
            }}
          >
            <MilestoneLabel milestone={milestone} />
            {milestone.date ? (
              <span
                className={cx(
                  'num mt-1 block text-[11px]',
                  milestone.current ? 'text-ink-muted' : 'text-bone/60',
                )}
              >
                {milestone.date}
              </span>
            ) : null}
          </div>

          {milestone.annotation ? (
            <p className="max-w-[280px] text-center text-[13px] text-ember-soft italic">
              {milestone.annotation.text}
            </p>
          ) : null}

          {index !== lastIndex ? (
            <span className="mt-1 text-bone/55">
              <StackArrow flip={index % 2 === 1} />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

export function CareerPath() {
  return (
    <section
      id="route"
      className="relative w-full overflow-hidden bg-ink py-24 text-bone scroll-mt-(--header-height)"
    >
      <Grain opacity={0.1} />
      <div className="relative z-[4] mx-auto max-w-[1240px] px-6 md:px-8">
        <SectionHeading>{careerSection.title}</SectionHeading>
        <p
          data-reveal
          className="mt-4 max-w-[66ch] text-[17px] leading-[1.7] text-bone/72"
        >
          {careerSection.subtitle}
        </p>

        <CareerMap />
        <CareerList />
      </div>
    </section>
  )
}
