import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { event } from '../data/event'

const ctas = [
  { label: 'Програма', href: '#program' },
  { label: 'Дрес-код', href: '#dresscode' },
  { label: 'Ведучі', href: '#hosts' },
] as const

export function Hero() {
  return (
    <section
      id="top"
      className="noise relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-28"
    >
      {/* warm sun blobs, like blurred sunlight */}
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, rgb(244 190 146 / 0.85) 0%, rgb(232 130 59 / 0.45) 45%, rgb(201 64 29 / 0.2) 70%, transparent 85%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[34rem] w-[34rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgb(233 174 59 / 0.5) 0%, rgb(244 190 146 / 0.3) 55%, transparent 80%)',
        }}
        aria-hidden
      />
      {/* soft sun disc behind the title */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-2xl"
        style={{ background: 'radial-gradient(circle, rgb(232 130 59 / 0.22), transparent 65%)' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
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
          className="font-display font-semibold uppercase leading-[0.95] tracking-tight text-ink whitespace-nowrap text-[clamp(1.75rem,7.6vw,6.5rem)]"
        >
          Сонцестояння
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-6 font-display text-base font-light text-flame md:text-xl"
        >
          {event.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink/75 md:text-lg"
        >
          Цього літа ми їдемо в Карпати. Туди, де гори зустрічаються з небом, а час
          сповільнюється до ритму природи.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {ctas.map((cta) => (
            <a key={cta.href} href={cta.href} className="btn btn-outline">
              {cta.label}
            </a>
          ))}
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
