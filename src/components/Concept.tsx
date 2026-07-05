import { Flame, Mountain, Sparkles, Sun } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

const pillars = [
  { icon: Mountain, label: 'Земля', text: 'Карпати, ліс і тиша гір' },
  { icon: Flame, label: 'Вогонь', text: 'Ритуали, тепло і жива енергія' },
  { icon: Sun, label: 'Сонце', text: 'Центр, навколо якого все обертається' },
  { icon: Sparkles, label: 'Зірки', text: 'Кожен з нас — своя зірка' },
]

export function Concept() {
  return (
    <section id="concept" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle eyebrow="Концепція" title="Повернення до коріння" />

        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <p className="text-lg leading-relaxed text-linen/80 md:text-xl">
              14–16 серпня в Східниці ми збираємось не просто на корпоратив — ми{' '}
              <span className="text-sun">повертаємось до коріння</span>. До землі, вогню,
              сонця і один до одного.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-linen/80 md:text-xl">
              Galaktica — це всесвіт, у якому{' '}
              <span className="text-sun">кожен з нас своя зірка</span>. А цього літа всі
              зірки збираються разом під карпатським небом.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {pillars.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.1}>
              <div className="card-hover group h-full rounded-3xl border border-linen/8 bg-coal/60 p-6 text-center hover:border-gold/40 hover:bg-coal/80">
                <p.icon className="mx-auto size-6 text-gold transition-transform duration-500 group-hover:scale-110" />
                <p className="mt-4 font-display text-sm text-linen">{p.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-faded">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
