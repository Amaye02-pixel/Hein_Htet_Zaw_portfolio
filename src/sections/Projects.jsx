import { useLayoutEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from '@/lib/gsap'
import SplitHeading from '@/components/motion/SplitHeading'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { projects } from '@/data/projects'

/* Illustrative visuals. Replace with real screenshots via `image` in data/projects.js */
const visuals = {
  'hawk-fashion': (
    <div className="br">
      <div className="bar"><i /><i /><i /></div>
      <div className="hero">HAWK<br />Collection</div>
      <div className="tiles"><b /><b /><b /></div>
    </div>
  ),
  'hawk-mobile': (
    <div className="ph">
      <div className="h">HAWK</div>
      <div className="g"><b /><b /><b /><b /></div>
      <div className="a">Add to bag</div>
    </div>
  ),
  'iso-presentation': (
    <div className="sl">
      <h5>ISO Processes</h5>
      <div className="fl"><b>Document</b><i /><b>Process</b><i /><b>Review</b></div>
    </div>
  ),
}

/** Cursor-tilt + idle float. The .par wrapper is reserved for GSAP parallax. */
function Tilt({ children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-16, 16]), { stiffness: 150, damping: 15 })
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [16, -16]), { stiffness: 150, damping: 15 })
  return (
    <div
      className="vis"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width - 0.5)
        y.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
      aria-hidden="true"
    >
      <div className="par">
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export default function Projects() {
  const pin = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)
  const { reduced } = useReducedMotion()

  // Pinned horizontal scroll with per-panel parallax (desktop only)
  useLayoutEffect(() => {
    if (reduced) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const t = track.current
      const hs = gsap.to(t, {
        x: () => -(t.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current, pin: true, scrub: true, anticipatePin: 1,
          end: () => '+=' + (t.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
          onUpdate: (s) => { if (bar.current) bar.current.style.transform = `scaleX(${s.progress})` },
        },
      })
      t.querySelectorAll('.pn').forEach((p) => {
        const st = (start, end) => ({ trigger: p, containerAnimation: hs, start, end, scrub: true })
        gsap.fromTo(p, { opacity: 0.25, scale: 0.9 }, { opacity: 1, scale: 1, ease: 'none', scrollTrigger: st('left 98%', 'left 45%') })
        gsap.fromTo(p.querySelector('.par'), { xPercent: 24 }, { xPercent: -24, ease: 'none', scrollTrigger: st('left right', 'right left') })
        gsap.fromTo(p.querySelector('.no'), { xPercent: -45 }, { xPercent: 45, ease: 'none', scrollTrigger: st('left right', 'right left') })
      })
    })
    return () => mm.revert()
  }, [reduced])

  return (
    <section id="projects">
      <div className="pin" ref={pin}>
        <div className="wrap">
          <div className="eyebrow">04 <b>Featured work</b></div>
          <SplitHeading>Selected projects.</SplitHeading>
        </div>
        <div className="track" ref={track}>
          {projects.map((p, i) => (
            <article key={p.id} className="card pn" onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mx', e.clientX - r.left + 'px')
              e.currentTarget.style.setProperty('--my', e.clientY - r.top + 'px')
            }}>
              <div>
                <div className="no">0{i + 1}</div>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <div className="chips">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
              <Tilt>{visuals[p.id]}</Tilt>
            </article>
          ))}
        </div>
        <div className="prog"><i ref={bar} /></div>
      </div>
    </section>
  )
}
