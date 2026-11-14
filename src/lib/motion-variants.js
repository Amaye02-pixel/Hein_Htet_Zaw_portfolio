export const ease = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

export const stagger = (delay = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren } },
})

export const lineReveal = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 1, ease } },
}

export const viewportOnce = { once: true, margin: '-12% 0px' }
