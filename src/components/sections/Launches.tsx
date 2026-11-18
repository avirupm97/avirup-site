import { useState } from 'react'
import type { MouseEvent } from 'react'
import { EmbeddedTweet, TweetSkeleton, useTweet } from 'react-tweet'
import { launches, workSection } from '../../data/site'
import posthog from '../../posthog'
import type { Launch } from '../../types/site'
import { CardArrow } from '../icons/SketchIcons'
import { SectionHeading } from '../ui/SectionHeading'

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

export function Launches() {
  const [showAll, setShowAll] = useState(false)

  if (launches.length === 0) return null

  const hasMore = launches.length > workSection.initialCount
  const visible = showAll ? launches : launches.slice(0, workSection.initialCount)

  function handleShowAll() {
    setShowAll(true)
    posthog.capture('launches_show_all_clicked', {
      hidden_count: launches.length - workSection.initialCount,
    })
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
          data-theme="light"
          className="launch-embeds mt-14 columns-1 gap-8 md:columns-2 xl:columns-3"
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
    </section>
  )
}
