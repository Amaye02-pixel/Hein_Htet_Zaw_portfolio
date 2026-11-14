import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once. Everywhere else: import { gsap, ScrollTrigger } from '@/lib/gsap'
gsap.registerPlugin(ScrollTrigger)
gsap.config({ nullTargetWarn: false })

export { gsap, ScrollTrigger }
