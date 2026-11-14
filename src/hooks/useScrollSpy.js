import { useEffect, useState } from 'react'

export function useScrollSpy(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.map((id) => document.getElementById(id)).filter(Boolean).forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}
