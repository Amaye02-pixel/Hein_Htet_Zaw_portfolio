import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Reveal from '@/components/motion/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { profile } from '@/data/profile'

export default function About() {
  const root = useRef(null)
  const { reduced } = useReducedMotion()

  // Scroll-scrubbed word highlight (GSAP ScrollTrigger)
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.to('.w', {
        opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: '.big', start: 'top 80%', end: 'bottom 45%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="about" ref={root}>
      <div className="wrap">
        <div className="eyebrow">01 <b>About</b></div>
        <p className="big">
          {profile.statement.split(' ').map((w, i) => (
            <span key={i} className="w" style={reduced ? { opacity: 1 } : undefined}>{w}</span>
          ))}
        </p>
        <div className="facts">
          {profile.facts.map((f) => (
            <Reveal key={f.label}><small>{f.label}</small><p>{f.text}</p></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
