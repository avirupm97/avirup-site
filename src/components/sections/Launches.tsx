import { useRef, useState } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import { EmbeddedTweet, TweetSkeleton, useTweet } from 'react-tweet'
import { launches, workSection } from '../../data/site'
import posthog from '../../posthog'
import type { Launch, LaunchCategory } from '../../types/site'
import { cx } from '../../utils/cx'
import { CardArrow } from '../icons/SketchIcons'
import { SectionHeading } from '../ui/SectionHeading'

type LaunchTab = (typeof workSection.tabs)[number]

const tabId = (category: LaunchCategory) => `launches-tab-${category}`
const panelId = (category: LaunchCategory) => `launches-panel-${category}`

function tweetUrl(launch: Launch) {
  return `https://x.com/${workSection.handle}/status/${launch.tweetId}`
}

/**
 * Every link inside an embed (the tweet itself, its media, author, replies)
 * leaves for x.com, so one capture-phase listener covers them all.
 */
function trackTweetOpened(launch: Launch, event: MouseEvent<HTMLElement>) {
  if (!(event.target as HTMLElement).closest('a')) return
  posthog.capture('launch_tweet_opened', {
    tweet_id: launch.tweetId,
  })
}

/** Shown when the tweet was deleted or its data could not be fetched. */
function TweetFallback({ launch }: { launch: Launch }) {
  return (
    <a
      href={tweetUrl(launch)}
      target="_blank"
      rel="noreferrer"
      className="paper rowlink flex items-center justify-between gap-4 px-6 py-5 text-ember"
    >
      <span className="text-[15px] text-ink">
        {launch.product
          ? `Read the ${launch.product} launch on X`
          : 'Read this launch on X'}
      </span>
      <CardArrow />
    </a>
  )
}

function LaunchTweet({ launch }: { launch: Launch }) {
  const { data, error, isLoading } = useTweet(launch.tweetId)

  if (isLoading) return <TweetSkeleton />
  if (error || !data) return <TweetFallback launch={launch} />
  return <EmbeddedTweet tweet={data} />
}

function LaunchCard({
  launch,
  index,
  reveal,
}: {
  launch: Launch
  index: number
  /**
   * `useScrollReveal` only observes elements present on mount, so cards
   * added later by "show all" skip the reveal instead of staying hidden.
   */
  reveal: boolean
}) {
  return (
    <article
      data-reveal={reveal || undefined}
      className="mb-8 break-inside-avoid"
      style={reveal ? { transitionDelay: `${(index % 3) * 90}ms` } : undefined}
      onClickCapture={(event) => trackTweetOpened(launch, event)}
    >
      {launch.product ? (
        <p className="mb-3 text-[12px] font-medium tracking-[0.16em] text-ember uppercase">
          {launch.product}
        </p>
      ) : null}
      <LaunchTweet launch={launch} />
    </article>
  )
}

function LaunchPanel({
  tab,
  items,
  active,
}: {
  tab: LaunchTab
  items: Launch[]
  active: boolean
}) {
  const [showAll, setShowAll] = useState(false)

  const hasMore = items.length > workSection.initialCount
  const visible = showAll ? items : items.slice(0, workSection.initialCount)

  function handleShowAll() {
    setShowAll(true)
    posthog.capture('launches_show_all_clicked', {
      tab: tab.id,
      hidden_count: items.length - workSection.initialCount,
    })
  }

  return (
    // Inactive panels stay mounted but `hidden`: their cards are observed by
    // `useScrollReveal` on mount and reveal once their tab is opened.
    <div
      id={panelId(tab.id)}
      role="tabpanel"
      aria-labelledby={tabId(tab.id)}
      hidden={!active}
    >
      <div
        data-theme="light"
        className="launch-embeds columns-1 gap-8 md:columns-2 xl:columns-3"
      >
        {visible.map((launch, index) => (
          <LaunchCard
            key={launch.id}
            launch={launch}
            index={index}
            reveal={index < workSection.initialCount}
          />
        ))}
      </div>

      {hasMore && !showAll ? (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleShowAll}
            className="rowlink flex cursor-pointer items-center gap-3 border border-ink px-5 py-3 text-[15px] font-medium text-ink"
          >
            {workSection.showAllLabel}
            <span className="text-ember">
              <CardArrow />
            </span>
          </button>
        </div>
      ) : null}
    </div>
  )
}

export function Launches() {
  const tabs = workSection.tabs
    .map((tab) => ({
      tab,
      items: launches.filter((launch) => launch.category === tab.id),
    }))
    .filter(({ items }) => items.length > 0)

  const [activeId, setActiveId] = useState(tabs[0]?.tab.id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  if (tabs.length === 0) return null

  function selectTab(index: number) {
    const { tab } = tabs[index]
    if (tab.id === activeId) return
    setActiveId(tab.id)
    posthog.capture('launches_tab_selected', { tab: tab.id })
  }

  /** Arrow keys move between tabs, per the WAI-ARIA tabs pattern. */
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step =
      event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (step === 0) return
    event.preventDefault()
    const current = tabs.findIndex(({ tab }) => tab.id === activeId)
    const next = (current + step + tabs.length) % tabs.length
    selectTab(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section
      id="work"
      className="relative w-full border-t border-ink/12 py-24 scroll-mt-(--header-height)"
    >
      <div className="shell">
        <SectionHeading className="max-w-[24ch]">
          {workSection.title}
        </SectionHeading>
        <p
          data-reveal
          className="mt-4 max-w-[52ch] text-[17px] leading-[1.65] text-ink-muted"
        >
          {workSection.subtitle}
        </p>

        <div
          role="tablist"
          aria-label={workSection.title}
          data-reveal
          className="mt-10 inline-flex border border-ink/15 bg-paper p-1"
          onKeyDown={handleKeyDown}
        >
          {tabs.map(({ tab, items }, index) => {
            const selected = tab.id === activeId

            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                id={tabId(tab.id)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId(tab.id)}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTab(index)}
                className={cx(
                  'flex cursor-pointer items-center gap-2 px-4 py-2 text-[15px] font-medium transition-colors sm:px-5',
                  selected ? 'bg-ink text-bone' : 'text-ink-muted hover:text-ink',
                )}
              >
                {tab.label}
                <span
                  className={cx(
                    'num text-[12px]',
                    selected ? 'text-bone/60' : 'text-ink-faint',
                  )}
                >
                  {items.length}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-10">
          {tabs.map(({ tab, items }) => (
            <LaunchPanel
              key={tab.id}
              tab={tab}
              items={items}
              active={tab.id === activeId}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
