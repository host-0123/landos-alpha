import { Flame, Sparkles } from 'lucide-react'
import { programDays } from '../data/event'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

const accentStyles = {
  earth: {
    card: 'border-ink/10 bg-card hover:border-sun/60',
    badge: 'bg-sun/15 text-flame',
    icon: Flame,
  },
  cosmic: {
    card: 'border-sun/40 bg-gradient-to-b from-peach/45 to-card hover:border-flame/60',
    badge: 'bg-flame/10 text-flame',
    icon: Sparkles,
  },
} as const

export function Program() {
  return (
    <section id="program" className="relative overflow-hidden py-24 md:py-32">
      {/* soft sunlight behind the cards */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgb(244 190 146 / 0.5), transparent 65%)' }}
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
                    <accent.icon className="size-5 text-sun" aria-hidden />
                  </div>

                  <p className="mt-6 text-xs uppercase tracking-[0.25em] text-cocoa">{day.label}</p>
                  <h3 className="mt-2 font-display text-2xl font-medium italic text-ink md:text-3xl">
                    {day.title}
                  </h3>

                  <div className="mt-5 space-y-3">
                    {day.intro.map((line) => (
                      <p key={line} className="text-sm leading-relaxed text-ink/75 md:text-base">
                        {line}
                      </p>
                    ))}
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {day.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-ink/15 bg-cream/70 px-3.5 py-1.5 text-sm text-ink/80"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  {day.note && (
                    <p className="mt-auto pt-6 text-sm italic leading-relaxed text-cocoa">{day.note}</p>
                  )}
                  {day.accent === 'cosmic' && (
                    <a
                      href="#dresscode"
                      className="mt-auto inline-block rounded-full pt-6 text-sm font-medium tracking-[0.04em] text-flame transition-colors duration-300 hover:text-ink"
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
