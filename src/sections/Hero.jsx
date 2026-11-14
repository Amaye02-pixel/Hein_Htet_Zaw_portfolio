import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Magnetic from '@/components/motion/Magnetic'
import { ease } from '@/lib/motion-variants'
import { profile } from '@/data/profile'

const line = { hidden: { y: '115%' }, show: { y: 0, transition: { duration: 1.6, ease } } }
const orbs = [
  { size: 460, style: { right: '-8%', top: '8%' } },
  { size: 240, style: { left: '6%', bottom: '14%' } },
  { size: 120, style: { right: '30%', bottom: '6%' } },
]

function Orb({ progress, i, size, style }) {
  const y = useTransform(progress, [0, 1], ['0%', `${-70 * (i + 1)}%`])
  return (
    <motion.i className="orb" style={{ width: size, height: size, y, ...style }} aria-hidden="true">
      <motion.i
        className="orb-in"
        animate={{ x: [0, 34 * (i % 2 ? -1 : 1), 0], y: [0, 24, 0] }}
        transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.i>
  )
}

export default function Hero({ loaded }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15])
  const fade = (delay) => ({
    initial: { opacity: 0, y: 30 },
    animate: loaded ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.1, ease, delay },
  })

  return (
    <section id="hero" ref={ref} aria-label="Introduction">
      {orbs.map((o, i) => <Orb key={i} i={i} progress={scrollYProgress} {...o} />)}
      <div className="wrap">
        <motion.div className="eyebrow" {...fade(0.9)}>Portfolio <b>— {profile.location.split(',')[0]}, 2026</b></motion.div>
        <motion.h1
          className="name"
          aria-label={profile.name}
          style={{ y, opacity }}
          initial="hidden"
          animate={loaded ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.35 } } }}
        >
          <span className="ln"><motion.span variants={line}>Hein</motion.span></span>
          <span className="ln"><motion.span variants={line}>Htet <span className="it sheen">Zaw</span></motion.span></span>
        </motion.h1>
        <motion.div className="hrow" {...fade(1.1)}>
          <div>
            <p><b>Freelancer</b> {profile.intro}</p>
            <div className="ctas">
              <Magnetic><a className="btn fill" href="#projects">View my work</a></Magnetic>
              <Magnetic><a className="btn" href="#contact">Get in touch</a></Magnetic>
            </div>
          </div>
          <div className="badge" aria-hidden="true">
            <svg viewBox="0 0 140 140">
              <defs><path id="circ" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" /></defs>
              <text><textPath href="#circ">Open to internships • freelance • design roles •</textPath></text>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
