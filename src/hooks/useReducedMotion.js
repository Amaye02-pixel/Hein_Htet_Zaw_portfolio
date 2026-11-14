import { useEffect, useState } from 'react'

const KEY = 'motion'
const EVT = 'motion-change'
const forced = () => {
  try { return localStorage.getItem(KEY) === 'on' } catch { return window.__motion === 'on' }
}
const os = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Respects the OS "reduce motion" setting, but lets the visitor opt in to full
 * animation with one click. Returns { reduced, osReduced, enable }.
 */
export function useReducedMotion() {
  const [s, setS] = useState(() => ({ os: os(), force: forced() }))
  useEffect(() => {
    const sync = () => setS({ os: os(), force: forced() })
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    mq.addEventListener('change', sync)
    window.addEventListener(EVT, sync)
    return () => { mq.removeEventListener('change', sync); window.removeEventListener(EVT, sync) }
  }, [])
  const enable = () => {
    try { localStorage.setItem(KEY, 'on') } catch { window.__motion = 'on' }
    window.dispatchEvent(new Event(EVT))
  }
  return { reduced: s.os && !s.force, osReduced: s.os, enable }
}
