import { useRef } from 'react'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { Blogs } from './components/sections/Blogs'
import { CareerPath } from './components/sections/CareerPath'
import { Hero } from './components/sections/Hero'
import { WorkDomains } from './components/sections/WorkDomains'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  useScrollReveal(pageRef)

  return (
    <div ref={pageRef} className="relative w-full">
      <SiteHeader />
      <main>
        <Hero />
        <WorkDomains />
        <CareerPath />
        <Blogs />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
