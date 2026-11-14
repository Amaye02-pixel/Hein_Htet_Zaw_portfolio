import SplitHeading from '@/components/motion/SplitHeading'
import Reveal from '@/components/motion/Reveal'
import { education } from '@/data/education'

export default function Education() {
  return (
    <section id="education">
      <div className="wrap">
        <div className="eyebrow">06 <b>Education</b></div>
        <SplitHeading>Education.</SplitHeading>
        <div>
          {education.map((e) => (
            <Reveal key={e.school} className="row">
              <span className="mute">{e.period}</span>
              <div>
                <h3>{e.school}</h3>
                <p className="mute">{e.program}{e.note ? `. ${e.note}` : ''}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
