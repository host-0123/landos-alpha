import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { event } from '../data/event'
import { heroImages } from '../data/hero'
import { PhotoCarousel } from './ui/PhotoCarousel'

const ctas = [
  { label: 'Програма', href: '#program' },
  { label: 'Дрес-код', href: '#dresscode' },
  { label: 'Люди', href: '#hosts' },
] as const

export function Hero() {
  return (
    <section id="top" className="noise relative overflow-hidden">
      {/* Soft warm blobs, like blurred sunlight */}
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, rgb(244 190 146 / 0.9) 0%, rgb(232 130 59 / 0.5) 45%, rgb(201 64 29 / 0.25) 70%, transparent 85%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgb(233 174 59 / 0.55) 0%, rgb(244 190 146 / 0.35) 55%, transparent 80%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid min-h-svh max-w-6xl items-center gap-12 px-6 pb-20 pt-28 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:pt-32">
        {/* Copy */}
        <div className="text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-flame md:text-sm"
          >
            {event.dates} · {event.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display text-5xl font-medium uppercase italic leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Сонце&shy;стояння
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="mt-5 font-display text-lg italic text-flame md:text-2xl"
          >
            {event.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mx-auto mt-8 max-w-md text-base leading-relaxed text-ink/75 md:mx-0 md:text-lg"
          >
            Цього літа ми їдемо в Карпати. Туди, де гори зустрічаються з небом, а час
            сповільнюється до ритму природи.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            {ctas.map((cta) => (
              <a key={cta.href} href={cta.href} className="btn btn-outline">
                {cta.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Photo slideshow in an arch frame */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative mx-auto w-full max-w-sm md:max-w-none"
        >
          <PhotoCarousel images={heroImages} alt="Сонцестояння — настрій події" />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#concept"
        aria-label="Прокрутити вниз"
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-cocoa transition-colors duration-300 hover:text-flame"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="size-6" />
      </motion.a>
    </section>
  )
}
