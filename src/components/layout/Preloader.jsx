import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)
  const p = useMotionValue(0)
  useEffect(() => {
    const c = animate(0, 100, {
      duration: 2.1,
      ease: 'easeInOut',
      onUpdate: (v) => { setN(Math.round(v)); p.set(v / 100) },
      onComplete: onDone,
    })
    return () => c.stop()
  }, [onDone, p])
  return (
    <motion.div id="pre" aria-hidden="true" exit={{ y: '-100%', transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}>
      <small>Hein Htet Zaw &nbsp;·&nbsp; Digital Identity</small>
      <div>
        <div className="c">{n}</div>
        <motion.i style={{ scaleX: p }} />
      </div>
    </motion.div>
  )
}
