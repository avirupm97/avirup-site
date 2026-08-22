import { useRef } from 'react'
import { contactLinks, contactSection, profile } from '../../data/site'
import { useDrawPaths } from '../../hooks/useDrawPaths'
import { ContactGlyph, ReturnArrow } from '../icons/SketchIcons'
import { Grain } from '../ui/Grain'

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)
  useDrawPaths(footerRef, { trigger: 'view', duration: 0.9, stagger: 0 })

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full overflow-hidden pt-24 pb-10 scroll-mt-(--header-height)"
    >
      <Grain />
      <div className="relative z-[4] mx-auto max-w-[1000px] px-6 md:px-8">
        <h2
          data-reveal
          className="max-w-[24ch] font-display text-[clamp(32px,4.5vw,44px)] leading-[1.05] font-bold"
        >
          {contactSection.title}
        </h2>

        <ul data-reveal className="mt-10 space-y-4 text-[15px]">
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

        <div className="mt-16 flex items-center justify-between gap-6 border-t border-ink/12 pt-5 text-[12px] text-ink-faint">
          <span className="num">{profile.copyright}</span>
          <a href="#top" className="navlink inline-flex items-center gap-3 text-ink">
            <ReturnArrow />
            {contactSection.backToTop}
          </a>
        </div>
      </div>
    </footer>
  )
}
