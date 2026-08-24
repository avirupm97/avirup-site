import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { ROUTES } from './constants/routes'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { HomePage } from './pages/HomePage'
import { WipPage } from './pages/WipPage'
import posthog from './posthog'

/**
 * A client-side route change keeps the previous scroll offset, so following a
 * card link from halfway down the page would land mid-way down the next one.
 * Hash navigation is left alone — it only ever changes the hash, not the path.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function PostHogPageView() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    posthog.capture('$pageview')
  }, [pathname, search])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PostHogPageView />
      <Analytics />
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.wip} element={<WipPage />} />
        <Route path={ROUTES.caseStudy} element={<CaseStudyPage />} />
        <Route
          path={ROUTES.cases}
          element={<Navigate to={ROUTES.home} replace />}
        />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
