import { Footprints, Heart, Leaf, Shirt } from 'lucide-react'
import { dressCode } from '../data/event'
import { Reveal } from './ui/Reveal'

export function DressCode() {
  return (
    <section id="dresscode" className="noise relative overflow-hidden py-24 md:py-32">
      {/* warm backdrop for the flagship section */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-ember/40 to-night" />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgb(242 178 78 / 0.15), transparent 65%)' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">15 серпня · головна ніч</p>
          <h2 className="font-display text-3xl font-medium leading-tight text-linen md:text-5xl">
            {dressCode.title}
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {dressCode.formula.map((word, i) => (
              <span key={word} className="flex items-center gap-3">
                <span className="font-display text-sm font-light text-sun md:text-base">{word}</span>
                {i < dressCode.formula.length - 1 && <span className="text-gold/50">·</span>}
              </span>
            ))}
          </div>

          <div className="mt-10 space-y-4">
            {dressCode.description.map((line) => (
              <p key={line} className="text-base leading-relaxed text-linen/80 md:text-lg">
                {line}
              </p>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-xl rounded-2xl border border-gold/25 bg-night/50 px-6 py-5 text-sm leading-relaxed text-sun/90 md:text-base">
            {dressCode.important}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Reveal className="md:col-span-2 lg:col-span-1" delay={0}>
            <div className="card-hover h-full rounded-3xl border border-linen/8 bg-coal/70 p-8 hover:border-gold/40">
              <div className="flex items-center gap-3">
                <Heart className="size-5 text-gold" />
                <h3 className="font-display text-lg text-linen">Що вітається</h3>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {dressCode.welcomed.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-gold/20 bg-night/40 px-3.5 py-1.5 text-sm text-linen/80 transition-colors duration-300 hover:border-sun/60 hover:text-sun"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-hover h-full rounded-3xl border border-linen/8 bg-coal/70 p-8 hover:border-gold/40">
              <div className="flex items-center gap-3">
                <Leaf className="size-5 text-gold" />
                <h3 className="font-display text-lg text-linen">Матеріали</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {dressCode.materials.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-linen/80">
                    <Shirt className="size-4 shrink-0 text-gold/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="card-hover h-full rounded-3xl border border-linen/8 bg-coal/70 p-8 hover:border-gold/40">
              <div className="flex items-center gap-3">
                <Footprints className="size-5 text-gold" />
                <h3 className="font-display text-lg text-linen">Взуття</h3>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-faded">{dressCode.shoes.note}</p>
              <p className="mt-4 text-sm text-linen/80">{dressCode.shoes.hint}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {dressCode.shoes.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-gold/20 bg-night/40 px-3.5 py-1.5 text-sm text-linen/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
