import { useRef } from 'react'
import { motion, useInView, useScroll } from 'framer-motion'
import SplitHeading from '@/components/motion/SplitHeading'
import { experience } from '@/data/experience'

function Job({ job }) {
  const ref = useRef(null)
  const on = useInView(ref, { once: true, margin: '0px 0px -35% 0px' })
  return (
    <motion.div
      ref={ref}
      className={`job ${on ? 'on' : ''}`}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <time>{job.period}</time>
      <div>
        <h3>{job.org}</h3>
        <span className="mute">{job.role}</span>
        <ul>{job.points.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 65%'] })
  return (
    <section id="experience">
      <div className="wrap">
        <div className="eyebrow">05 <b>Experience</b></div>
        <SplitHeading>Where I have made a difference.</SplitHeading>
        <div className="tl" ref={ref}>
          <motion.span className="pr" style={{ scaleY: scrollYProgress }} />
          {experience.map((j) => <Job key={j.org} job={j} />)}
        </div>
      </div>
    </section>
  )
}
