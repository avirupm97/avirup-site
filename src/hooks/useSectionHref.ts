import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { HOME_ONLY_SECTIONS, ROUTES } from '../constants/routes'

/**
 * Builds hrefs for the in-page section anchors used by the header and footer.
 *
 * On the home page every section is mounted, so a bare `#work` is correct and
 * scrolls smoothly. The header and footer render on other routes too, where
 * `#work` would point at nothing — there it has to travel home first, as
 * `/#work`. Anchors that exist on every page (the footer) are left untouched.
 */
export function useSectionHref(): (hash: string) => string {
  const { pathname } = useLocation()
  const isHome = pathname === ROUTES.home

  return useCallback(
    (hash: string) =>
      isHome || !HOME_ONLY_SECTIONS.includes(hash)
        ? hash
        : `${ROUTES.home}${hash}`,
    [isHome],
  )
}
