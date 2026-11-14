import { motion } from 'framer-motion'
import SplitHeading from '@/components/motion/SplitHeading'
import Reveal from '@/components/motion/Reveal'
import { ease, stagger } from '@/lib/motion-variants'
import { skillGroups, languages } from '@/data/skills'

const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease } } }

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="eyebrow">02 <b>Skills</b></div>
        <SplitHeading>Technical depth, creative range.</SplitHeading>
        {skillGroups.map((g) => (
          <Reveal key={g.title} className="srow">
            <h3>{g.title}</h3>
            <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10% 0px' }} variants={stagger(0.07)}>
              {g.items.map((s) => <motion.li key={s} variants={item}>{s}</motion.li>)}
            </motion.ul>
          </Reveal>
        ))}
        <div className="gauges">
          {languages.map((l) => (
            <Reveal key={l.name} className="gauge">
              <svg viewBox="0 0 40 40" aria-hidden="true">
                <circle className="t" cx="20" cy="20" r="17" />
                <motion.circle
                  className="p" cx="20" cy="20" r="17" pathLength={214}
                  initial={{ strokeDashoffset: 214 }}
                  whileInView={{ strokeDashoffset: 214 - (214 * l.value) / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease }}
                />
              </svg>
              <h4>{l.name}</h4>
              <small>{l.level}</small>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
