import { motion } from 'framer-motion'
import Reveal from '@/components/motion/Reveal'
import Magnetic from '@/components/motion/Magnetic'
import { profile } from '@/data/profile'

export default function Contact() {
  const mail = `mailto:${profile.email}`
  return (
    <section id="contact">
      <div className="wrap">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>08 <b>Contact</b></div>
        <Reveal as="h2">Let's create something <em className="sheen">timeless.</em></Reveal>
        <Magnetic>
          <motion.a
            className="say" href={mail} data-cursor="big"
            initial={{ scale: 0, rotate: -120 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ type: 'spring', stiffness: 110, damping: 11 }}
          >
            Say hello
          </motion.a>
        </Magnetic>
        <a className="mail" href={mail}>{profile.email}</a>
        <div className="meta"><span>{profile.phone}</span><span>{profile.area}</span></div>
      </div>
    </section>
  )
}
