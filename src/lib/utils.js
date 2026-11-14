export const cn = (...c) => c.filter(Boolean).join(' ')
export const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
