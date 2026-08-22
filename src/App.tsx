import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { ROUTES } from './constants/routes'
import { HomePage } from './pages/HomePage'
import { WipPage } from './pages/WipPage'

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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.wip} element={<WipPage />} />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
