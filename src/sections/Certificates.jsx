import SplitHeading from '@/components/motion/SplitHeading'
import Reveal from '@/components/motion/Reveal'
import { certificates } from '@/data/certificates'

export default function Certificates() {
  return (
    <section id="certificates">
      <div className="wrap">
        <div className="eyebrow">07 <b>Certificates</b></div>
        <SplitHeading>Credentials.</SplitHeading>
        <ul className="cl">
          {certificates.map((c, i) => (
            <Reveal as="li" key={c.title}>
              <span className="n">0{i + 1}</span>
              <h3>{c.title}</h3>
              <span className="m">{c.issuer}</span>
              <span className="y">{c.year}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
