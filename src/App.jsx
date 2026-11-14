import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { ScrollProvider, useScroll } from '@/context/ScrollContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ScrollTrigger } from '@/lib/gsap'
import { profile } from '@/data/profile'

import Preloader from '@/components/layout/Preloader'
import ScrollProgress from '@/components/layout/ScrollProgress'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/effects/Cursor'
import Glow from '@/components/effects/Glow'
import Marquee from '@/components/motion/Marquee'

import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Statistics from '@/sections/Statistics'
import Projects from '@/sections/Projects'
import Experience from '@/sections/Experience'
import Education from '@/sections/Education'
import Certificates from '@/sections/Certificates'
import Contact from '@/sections/Contact'

function Shell() {
  const lenis = useScroll()
  const { reduced, osReduced, enable } = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const done = useCallback(() => setLoaded(true), [])

  useEffect(() => { document.documentElement.classList.toggle('reduce-motion', reduced) }, [reduced])

  // No intro when the visitor prefers reduced motion
  useEffect(() => { if (reduced) setLoaded(true) }, [reduced])

  // Lock scroll during the intro
  useEffect(() => {
    if (!lenis) return
    loaded ? lenis.start() : lenis.stop()
  }, [lenis, loaded])

  // Re-measure pinned sections once fonts have loaded
  useEffect(() => { document.fonts?.ready.then(() => ScrollTrigger.refresh()) }, [])

  // Smooth in-page anchor navigation
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || a.getAttribute('href') === '#') return
      e.preventDefault()
      const target = a.getAttribute('href')
      lenis ? lenis.scrollTo(target, { offset: -10, duration: 1.6 }) : document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [lenis])

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <AnimatePresence>{!loaded && !reduced && <Preloader key="pre" onDone={done} />}</AnimatePresence>
      <ScrollProgress />
      <Glow />
      <Cursor />
      <Navbar />
      <main>
        <Hero loaded={loaded} />
        <Marquee items={profile.marquee.a} />
        <About />
        <Skills />
        <Marquee items={profile.marquee.b} reverse />
        <Statistics />
        <Projects />
        <Experience />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      {osReduced && reduced && (
        <button className="motion-btn" onClick={enable}>Reduced motion is on · Enable animations</button>
      )}
    </MotionConfig>
  )
}

export default function App() {
  return (
    <ScrollProvider>
      <Shell />
    </ScrollProvider>
  )
}
