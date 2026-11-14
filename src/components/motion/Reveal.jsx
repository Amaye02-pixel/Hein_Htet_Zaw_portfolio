import { motion } from 'framer-motion'
import { ease } from '@/lib/motion-variants'

/** Fade + rise when scrolled into view. `as` picks the HTML element. */
export default function Reveal({ children, as = 'div', delay = 0, y = 44, ...rest }) {
  const M = motion[as]
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, ease, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}
