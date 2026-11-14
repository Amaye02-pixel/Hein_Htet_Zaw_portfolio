import SplitHeading from '@/components/motion/SplitHeading'
import Reveal from '@/components/motion/Reveal'
import Counter from '@/components/motion/Counter'
import { stats } from '@/data/stats'

export default function Statistics() {
  return (
    <section id="stats">
      <div className="wrap">
        <div className="eyebrow">03 <b>Impact</b></div>
        <SplitHeading>Measured in people reached.</SplitHeading>
        <div className="stats">
          {stats.map((s) => (
            <Reveal key={s.label} className="stat">
              <div className="num sheen"><Counter value={s.value} suffix={s.suffix} /></div>
              <p>{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
