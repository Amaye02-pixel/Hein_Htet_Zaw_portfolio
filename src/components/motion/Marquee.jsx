import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useScroll } from '@/context/ScrollContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Infinite text band. Speeds up and skews with scroll velocity. */
export default function Marquee({ items, reverse = false }) {
  const root = useRef(null)
  const lenis = useScroll()
  const { reduced } = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const rows = root.current.querySelectorAll('.mq-row')
    rows.forEach((r) => (r.style.animation = 'none'))
    const t = gsap.fromTo(rows, { xPercent: reverse ? -100 : 0 }, { xPercent: reverse ? 0 : -100, duration: 40, ease: 'none', repeat: -1 })
    const onScroll = ({ velocity: v }) => {
      t.timeScale(1 + Math.min(Math.abs(v) * 0.5, 7))
      root.current?.style.setProperty('--sk', gsap.utils.clamp(-14, 14, v * -0.6) + 'deg')
    }
    lenis?.on('scroll', onScroll)
    return () => { t.kill(); lenis?.off('scroll', onScroll) }
  }, [reduced, reverse, lenis])

  const row = (k) => (
    <div className="mq-row" key={k}>
      {items.map((t, i) => <span key={t} className={i % 2 ? 'o' : ''}>{t}</span>)}
    </div>
  )
  return (
    <div ref={root} className={`mq ${reverse ? 'rev' : ''}`} aria-hidden="true">
      {row(0)}{row(1)}
    </div>
  )
}
