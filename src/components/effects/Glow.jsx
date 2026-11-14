import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Soft gold light that trails the cursor. Transform-only, so it never repaints the page. */
export default function Glow() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 90, damping: 20 })
  const sy = useSpring(y, { stiffness: 90, damping: 20 })
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])
  return <motion.div id="glow" style={{ x: sx, y: sy }} aria-hidden="true" />
}
