import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const [fine, setFine] = useState(false)
  const [big, setBig] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    setFine(true)
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => setBig(!!e.target.closest?.('[data-cursor="big"]'))
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', over) }
  }, [x, y])

  if (!fine) return null
  return <motion.div className={`cur ${big ? 'big' : ''}`} style={{ x: sx, y: sy }} aria-hidden="true" />
}
