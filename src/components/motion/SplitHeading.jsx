import { motion } from 'framer-motion'
import { ease, stagger } from '@/lib/motion-variants'

const word = {
  hidden: { y: '115%', rotate: 7 },
  show: { y: 0, rotate: 0, transition: { duration: 1.3, ease } },
}

/** Masked word-by-word headline reveal. */
export default function SplitHeading({ children, className = '' }) {
  const words = String(children).split(' ')
  return (
    <motion.h2
      className={className}
      aria-label={children}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px' }}
      variants={stagger(0.09)}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="ln2"><motion.span variants={word}>{w}</motion.span></span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </motion.h2>
  )
}
