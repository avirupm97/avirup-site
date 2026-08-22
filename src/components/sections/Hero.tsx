import { useRef } from 'react'
import { profile } from '../../data/site'
import { useDrawPaths } from '../../hooks/useDrawPaths'
import { useHeroIntro } from '../../hooks/useHeroIntro'
import { CtaOutline, SketchUnderline } from '../icons/SketchIcons'
import { Grain } from '../ui/Grain'
import { HeroPortrait } from './HeroPortrait'

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useHeroIntro(rootRef)
  useDrawPaths(rootRef, { trigger: 'mount' })

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative w-full overflow-hidden lg:min-h-[calc(100vh-var(--header-height))]"
    >
      <Grain />

      <div className="relative z-[4] mx-auto grid max-w-[1340px] items-center gap-12 px-6 pt-16 pb-24 md:px-14 lg:min-h-[calc(100vh-var(--header-height))] lg:grid-cols-[60%_40%] lg:gap-8">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -z-10 blur-3xl"
            style={{
              width: 520,
              height: 380,
              left: -40,
              top: 20,
              background:
                'radial-gradient(circle at 40% 40%, rgba(20,20,19,.10), rgba(20,20,19,.03) 60%, transparent 74%)',
              borderRadius: '55% 45% 60% 40%/50% 55% 45% 50%',
            }}
          />

          <h1
            data-hero-el
            className="font-display text-[clamp(36px,3.6vw,52px)] leading-none font-bold tracking-[-0.015em]"
          >
            {profile.heroTitle.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span>{profile.heroTitle.emphasis}.</span>
          </h1>

          <div data-hero-el className="mt-6 max-w-[62ch] text-[17px] leading-[1.6] sm:text-[18px]">
            {profile.heroParagraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? undefined : 'mt-4'}>
                {paragraph}
              </p>
            ))}
          </div>

          <div
            data-hero-el
            className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-6"
          >
            <a
              href={profile.primaryCta.href}
              className="relative inline-block text-ink"
            >
              <CtaOutline />
              <span
                className="relative inline-block bg-ember-soft px-9 py-4 text-center text-[13px] font-semibold text-ink"
                style={{ clipPath: 'polygon(1% 6%,99% 2%,100% 94%,2% 98%)' }}
              >
                {profile.primaryCta.label}
              </span>
            </a>

            <a
              href={profile.secondaryCta.href}
              className="relative text-[14px] font-medium"
            >
              {profile.secondaryCta.label}
              <SketchUnderline />
            </a>
          </div>
        </div>

        {/* the portrait is desktop-only — on phones the copy carries the hero */}
        <div
          data-hero-el
          className="relative hidden items-center justify-center lg:flex"
        >
          <HeroPortrait />
        </div>
      </div>
    </section>
  )
}
