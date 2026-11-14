import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export default function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref}>{n}{suffix}</span>
}
