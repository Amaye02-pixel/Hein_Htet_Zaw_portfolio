import { navigation } from '@/data/navigation'
import { useScrollSpy } from '@/hooks/useScrollSpy'

const ids = navigation.map((n) => n.id)

export default function Navbar() {
  const active = useScrollSpy(ids)
  return (
    <>
      <a className="logo" href="#hero" aria-label="Back to top">H.Z</a>
      <nav aria-label="Primary">
        {navigation.map((n) => (
          <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'on' : ''} aria-current={active === n.id ? 'true' : undefined}>
            {n.label}
          </a>
        ))}
      </nav>
    </>
  )
}
