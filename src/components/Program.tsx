import { Flame, Sparkles } from 'lucide-react'
import { programDays } from '../data/event'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

const accentStyles = {
  earth: {
    card: 'border-gold/15 bg-gradient-to-b from-ember/70 to-coal/80 hover:border-gold/40',
    badge: 'bg-gold/10 text-gold',
    icon: Flame,
  },
  cosmic: {
    card: 'border-sun/20 bg-gradient-to-b from-cosmic/80 to-coal/80 hover:border-sun/50',
    badge: 'bg-sun/15 text-sun',
    icon: Sparkles,
  },
} as const

export function Program() {
  return (
    <section id="program" className="relative py-24 md:py-32">
      {/* soft ember glow behind the cards */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, rgb(226 112 58 / 0.12), transparent 65%)' }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionTitle
          eyebrow="Програма"
          title="Два дні. Дві енергії."
          description="Від першого вогню знайомства — до головної ночі під відкритим небом."
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {programDays.map((day, i) => {
            const accent = accentStyles[day.accent]
            return (
              <Reveal key={day.date} delay={i * 0.15} className="h-full">
                <article
                  className={`card-hover flex h-full flex-col rounded-3xl border p-8 md:p-10 ${accent.card}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest ${accent.badge}`}>
                      {day.date}
                    </span>
                    <accent.icon className="size-5 text-gold/70" aria-hidden />
                  </div>

                  <p className="mt-6 text-xs uppercase tracking-[0.25em] text-faded">{day.label}</p>
                  <h3 className="mt-2 font-display text-2xl font-medium text-linen md:text-3xl">
                    {day.title}
                  </h3>

                  <div className="mt-5 space-y-3">
                    {day.intro.map((line) => (
                      <p key={line} className="text-sm leading-relaxed text-linen/80 md:text-base">
                        {line}
                      </p>
                    ))}
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {day.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-linen/10 bg-night/40 px-3.5 py-1.5 text-sm text-linen/80"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  {day.note && (
                    <p className="mt-auto pt-6 text-sm italic leading-relaxed text-faded">{day.note}</p>
                  )}
                  {day.accent === 'cosmic' && (
                    <a
                      href="#dresscode"
                      className="mt-auto inline-block rounded-full pt-6 text-sm font-medium tracking-[0.04em] text-sun transition-colors duration-300 hover:text-linen"
                    >
                      Дивитись дрес-код →
                    </a>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
