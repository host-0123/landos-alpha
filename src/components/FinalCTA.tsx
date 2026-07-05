import { motion } from 'motion/react'
import { event } from '../data/event'
import { Reveal } from './ui/Reveal'

export function FinalCTA() {
  return (
    <section className="noise relative overflow-hidden py-28 md:py-40">
      {/* fire glow rising from below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26rem]"
        style={{
          background:
            'radial-gradient(ellipse 70% 100% at 50% 100%, rgb(226 112 58 / 0.28) 0%, rgb(242 178 78 / 0.1) 45%, transparent 75%)',
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-6rem] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-flame/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-medium leading-tight text-linen md:text-5xl">
            Усі зірки збираються разом.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-linen/80">
            Під карпатським небом. Біля вогню. У русі, музиці й свободі.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#dresscode"
            className="rounded-full bg-sun px-8 py-3.5 text-sm font-medium text-night shadow-[0_0_50px_-10px_rgb(242_178_78/0.8)] transition-colors duration-300 hover:bg-linen"
          >
            Подивитись дрес-код
          </a>
          <a
            href="#program"
            className="rounded-full border border-gold/60 px-8 py-3.5 text-sm font-medium text-sun transition-colors duration-300 hover:border-sun hover:bg-sun/10"
          >
            Відкрити програму
          </a>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-14 text-xs uppercase tracking-[0.3em] text-faded">
            {event.dates} · {event.location}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
