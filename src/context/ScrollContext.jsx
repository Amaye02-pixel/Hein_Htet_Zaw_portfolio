import { createContext, useContext } from 'react'
import { useLenis } from '@/hooks/useLenis'

const ScrollContext = createContext(null)

export function ScrollProvider({ children }) {
  const lenis = useLenis()
  return <ScrollContext.Provider value={lenis}>{children}</ScrollContext.Provider>
}

/** Returns the Lenis instance (null when reduced motion is on). */
export const useScroll = () => useContext(ScrollContext)
