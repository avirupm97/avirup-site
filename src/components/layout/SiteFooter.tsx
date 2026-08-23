import { useRef } from 'react'
import { contactLinks, contactSection, profile } from '../../data/site'
import { useDrawPaths } from '../../hooks/useDrawPaths'
import { useSectionHref } from '../../hooks/useSectionHref'
import { ContactGlyph, ReturnArrow } from '../icons/SketchIcons'
import { Grain } from '../ui/Grain'

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const sectionHref = useSectionHref()
  useDrawPaths(footerRef, { trigger: 'view', duration: 0.9, stagger: 0 })

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full overflow-hidden pt-24 pb-10 scroll-mt-(--header-height)"
    >
      <Grain />
      <div className="shell relative z-[4]">
        {/* the shell runs the full page width, so the sign-off sits in its own
            centred column rather than hugging the left edge */}
        <div className="mx-auto max-w-[780px] text-center">
          <h2
            data-reveal
            className="mx-auto max-w-[24ch] font-display text-[clamp(32px,4.5vw,44px)] leading-[1.05] font-bold text-balance"
          >
            {contactSection.title}
          </h2>

          <ul
            data-reveal
            className="mt-10 flex flex-col items-center gap-4 text-[15px] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10"
          >
            {contactLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="navlink inline-flex items-center gap-4"
                  {...(link.href.startsWith('http')
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                >
                  <ContactGlyph icon={link.icon} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-ink/12 pt-5 text-[12px] text-ink-faint sm:flex-row">
          <span className="num">{profile.copyright}</span>
          <a
            href={sectionHref('#top')}
            className="navlink inline-flex items-center gap-3 text-ink"
          >
            <ReturnArrow />
            {contactSection.backToTop}
          </a>
        </div>
      </div>
    </footer>
  )
}
