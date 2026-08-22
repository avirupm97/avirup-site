import type { CSSProperties } from 'react'
import { profile } from '../../data/site'
import { Grain } from '../ui/Grain'
import { Tape } from '../ui/Tape'

const { portrait } = profile

/** Portrait photo pinned to the page like a taped-down print. */
export function HeroPortrait() {
  return (
    <figure className="relative w-full max-w-[380px]">
      <Tape side="left" offset="30%" rotate={-6} />
      <div
        className="card-tilt paper torn-b relative p-3"
        style={{ '--tilt': '-2.2deg' } as CSSProperties}
      >
        <Grain />
        <picture>
          <source type="image/webp" srcSet={portrait.webpSrcSet} sizes={portrait.sizes} />
          <img
            src={portrait.fallbackSrc}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes={portrait.sizes}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="relative z-[3] block aspect-2/3 w-full object-cover object-top"
          />
        </picture>
      </div>
    </figure>
  )
}
