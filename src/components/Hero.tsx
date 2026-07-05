import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { event } from '../data/event'

const ctas = [
  { label: 'Програма', href: '#program', style: 'solid' },
  { label: 'Дрес-код', href: '#dresscode', style: 'outline' },
  { label: 'Натхнення', href: '#inspiration', style: 'ghost' },
] as const

const ctaStyles: Record<(typeof ctas)[number]['style'], string> = {
  solid: 'btn btn-solid',
  outline: 'btn btn-outline',
  ghost: 'btn btn-ghost',
}

/** Deterministic pseudo-random star field (stable across renders). */
function useStars(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = Math.sin(i * 999) * 10000
        const rnd = (n: number) => {
          const x = Math.sin(seed + n * 137) * 10000
          return x - Math.floor(x)
        }
        return {
          left: rnd(1) * 100,
          top: rnd(2) * 62,
          size: 1 + rnd(3) * 1.6,
          delay: rnd(4) * 4,
          duration: 2.5 + rnd(5) * 3.5,
        }
      }),
    [count],
  )
}

export function Hero() {
  const stars = useStars(90)
  const [heroImgOk, setHeroImgOk] = useState(true)

  return (
    <section id="top" className="noise relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b0a14_0%,#150f14_35%,#241708_78%,#0b0908_100%)]" />

      {/* Optional real photo: drop /public/images/hero/hero.jpg to replace the generated sky */}
      {heroImgOk && (
        <img
          src="/images/hero/hero.jpg"
          alt=""
          onError={() => setHeroImgOk(false)}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
      )}

      {/* Stars */}
      <div className="absolute inset-0" aria-hidden>
        {stars.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-linen"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.15, 0.9, 0.15] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Sun glow on the horizon */}
      <div
        className="absolute bottom-[14%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full md:h-96 md:w-96"
        style={{
          background:
            'radial-gradient(circle, rgb(242 178 78 / 0.55) 0%, rgb(226 112 58 / 0.25) 40%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        aria-hidden
      />

      {/* Mountain silhouettes */}
      <svg
        className="absolute bottom-0 left-0 w-full text-[#120d08]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="#1a130c"
          d="M0,224 L180,150 L340,210 L520,110 L720,190 L900,90 L1090,180 L1260,130 L1440,200 L1440,320 L0,320 Z"
          opacity="0.8"
        />
        <path
          fill="currentColor"
          d="M0,280 L200,210 L400,260 L620,180 L840,250 L1040,170 L1240,240 L1440,190 L1440,320 L0,320 Z"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-28 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-gold md:text-sm"
        >
          {event.dates} · {event.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="heading-sunrise font-display text-4xl font-semibold leading-tight sm:text-5xl md:text-7xl"
        >
          {event.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-4 font-display text-sm font-light tracking-wide text-sun md:text-lg"
        >
          {event.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-linen/80 md:text-lg"
        >
          Цього літа ми їдемо в Карпати. Туди, де гори зустрічаються з небом, а час
          сповільнюється до ритму природи.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {ctas.map((cta) => (
            <a key={cta.href} href={cta.href} className={ctaStyles[cta.style]}>
              {cta.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#concept"
        aria-label="Прокрутити вниз"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-faded transition-colors duration-300 hover:text-sun"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="size-6" />
      </motion.a>
    </section>
  )
}
