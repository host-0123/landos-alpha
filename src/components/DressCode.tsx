import { Footprints, Heart, Leaf, Shirt } from 'lucide-react'
import { dressCode } from '../data/event'
import { heroImages } from '../data/hero'
import { PhotoCarousel } from './ui/PhotoCarousel'
import { Reveal } from './ui/Reveal'

export function DressCode() {
  return (
    <section id="dresscode" className="noise relative overflow-hidden py-24 md:py-32">
      {/* warm backdrop for the flagship section */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-peach/35 to-cream" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgb(232 130 59 / 0.3), transparent 65%)' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-flame">15 серпня · головна ніч</p>
          <h2 className="font-display text-3xl font-medium italic leading-tight text-ink md:text-5xl">
            {dressCode.title}
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {dressCode.formula.map((word, i) => (
              <span key={word} className="flex items-center gap-3">
                <span className="font-display text-base italic text-flame md:text-lg">{word}</span>
                {i < dressCode.formula.length - 1 && <span className="text-sun">·</span>}
              </span>
            ))}
          </div>

          <div className="mt-10 space-y-4">
            {dressCode.description.map((line) => (
              <p key={line} className="text-base leading-relaxed text-ink/80 md:text-lg">
                {line}
              </p>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-xl rounded-2xl border border-flame/30 bg-card/80 px-6 py-5 text-sm leading-relaxed text-flame md:text-base">
            {dressCode.important}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Reveal className="md:col-span-2 lg:col-span-1" delay={0}>
            <div className="card-hover h-full rounded-3xl border border-ink/10 bg-card p-8 hover:border-sun/60">
              <div className="flex items-center gap-3">
                <Heart className="size-5 text-flame" />
                <h3 className="font-display text-xl font-medium italic text-ink">Що вітається</h3>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {dressCode.welcomed.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-sun/40 bg-cream/70 px-3.5 py-1.5 text-sm text-ink/80 transition-colors duration-300 hover:border-flame hover:text-flame"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-hover h-full rounded-3xl border border-ink/10 bg-card p-8 hover:border-sun/60">
              <div className="flex items-center gap-3">
                <Leaf className="size-5 text-flame" />
                <h3 className="font-display text-xl font-medium italic text-ink">Матеріали</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {dressCode.materials.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ink/80">
                    <Shirt className="size-4 shrink-0 text-sun" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="card-hover h-full rounded-3xl border border-ink/10 bg-card p-8 hover:border-sun/60">
              <div className="flex items-center gap-3">
                <Footprints className="size-5 text-flame" />
                <h3 className="font-display text-xl font-medium italic text-ink">Взуття</h3>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-cocoa">{dressCode.shoes.note}</p>
              <p className="mt-4 text-sm text-ink/80">{dressCode.shoes.hint}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {dressCode.shoes.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-sun/40 bg-cream/70 px-3.5 py-1.5 text-sm text-ink/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Real looks from past gatherings — a visual reference for the dress code */}
        <Reveal className="mx-auto mt-16 max-w-md">
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.3em] text-flame">
            Натхнення
          </p>
          <PhotoCarousel images={heroImages} alt="Образи Дітей Сонця" lightbox />
          <p className="mt-6 text-center text-sm text-cocoa">
            Це орієнтири, а не правила. Головне — цілісний образ, у якому тобі вільно.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
