import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from './useReducedMotion'

/**
 * Creates one Lenis instance and keeps it in lockstep with GSAP's ticker,
 * so ScrollTrigger always reads the smoothed scroll position.
 * Skipped entirely when the visitor prefers reduced motion.
 */
export function useLenis() {
  const { reduced } = useReducedMotion()
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (reduced) return
    const instance = new Lenis({ duration: 1.15, smoothWheel: true, easing: (t) => 1 - Math.pow(1 - t, 4) })
    const tick = (time) => instance.raf(time * 1000)

    instance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return lenis
}
