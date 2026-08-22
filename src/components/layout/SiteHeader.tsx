import { navLinks, profile } from '../../data/site'
import { cx } from '../../utils/cx'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/12 bg-bone">
      <div className="mx-auto flex h-(--header-height) max-w-[1180px] items-end justify-between gap-4 px-6 pb-3">
        <div className="flex min-w-0 items-baseline gap-4">
          <a
            href="#top"
            aria-label={`${profile.name} — home`}
            className="sig-mark -mb-[3px] font-script text-[26px] leading-none font-bold tracking-[0.01em] text-ember sm:text-[32px]"
          >
            {profile.name}
          </a>
          <span className="hidden truncate text-[12px] text-ink-muted md:inline">
            {profile.role}
          </span>
        </div>

        <nav
          aria-label="Main"
          className="flex items-center gap-4 text-[13px] sm:gap-7 sm:text-[14px]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cx('navlink', link.accent && 'text-ember')}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
