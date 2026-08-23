import { useEffect, useId, useRef, useState } from 'react'
import { navLinks, profile } from '../../data/site'
import { useSectionHref } from '../../hooks/useSectionHref'
import { cx } from '../../utils/cx'
import { CloseGlyph, MenuGlyph } from '../icons/SketchIcons'
import { Grain } from '../ui/Grain'

const DESKTOP_NAV = '(min-width: 768px)'

export function SiteHeader() {
  const sectionHref = useSectionHref()
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_NAV)
    const onChange = () => {
      if (media.matches) setOpen(false)
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ''
      if (wasOpen.current) toggleRef.current?.focus()
      wasOpen.current = false
      return
    }

    wasOpen.current = true
    document.body.style.overflow = 'hidden'

    const getFocusable = () => {
      const menu = document.getElementById(menuId)
      const links = menu
        ? Array.from(menu.querySelectorAll<HTMLElement>('a[href]'))
        : []
      return [toggleRef.current, ...links].filter(
        (element): element is HTMLElement => Boolean(element),
      )
    }

    getFocusable()[1]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, menuId])

  const close = () => setOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink/12 bg-bone">
        <div className="shell flex h-(--header-height) items-end justify-between gap-4 pb-3">
          <div className="flex min-w-0 items-baseline gap-4">
            <a
              href={sectionHref('#top')}
              aria-label={`${profile.name} — home`}
              className="sig-mark -mb-[3px] whitespace-nowrap font-script text-[26px] leading-none font-bold tracking-[0.01em] text-ember sm:text-[32px]"
              onClick={close}
            >
              {profile.name}
            </a>
            <span className="hidden truncate text-[12px] text-ink-muted md:inline">
              {profile.role}
            </span>
          </div>

          <nav
            aria-label="Main"
            className="hidden items-center gap-7 text-[14px] md:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={sectionHref(link.href)}
                className={cx('navlink', link.accent && 'text-ember')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="-mb-1.5 flex size-11 shrink-0 items-center justify-center text-ink md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseGlyph /> : <MenuGlyph />}
          </button>
        </div>
      </header>

      {open ? (
        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="mobile-nav fixed inset-x-0 top-(--header-height) bottom-0 z-40 overflow-y-auto bg-bone md:hidden"
        >
          <Grain />
          <nav
            aria-label="Mobile"
            className="shell relative z-[4] flex flex-col gap-1 pt-10"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={sectionHref(link.href)}
                onClick={close}
                className={cx(
                  'flex min-h-11 items-center font-display text-[28px] leading-none font-bold transition-colors hover:text-ember',
                  link.accent ? 'text-ember' : 'text-ink',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  )
}
