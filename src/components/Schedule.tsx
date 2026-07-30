import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react'
import { schedule } from '../data/schedule'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

export function Schedule() {
  const [dayIdx, setDayIdx] = useState(0)
  const [preview, setPreview] = useState<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false })
  const [edges, setEdges] = useState({ left: false, right: true })

  const day = schedule[dayIdx]
  const events = day.events

  const updateEdges = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft < max - 4 })
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: 0 })
    const id = requestAnimationFrame(updateEdges)
    return () => cancelAnimationFrame(id)
  }, [dayIdx, updateEdges])

  const scrollByCards = (dir: number) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const amount = card ? card.offsetWidth + 20 : 320
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  // Pointer drag-to-scroll
  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current
    if (!el) return
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current
    const s = drag.current
    if (!el || !s.down) return
    const dx = e.clientX - s.startX
    if (Math.abs(dx) > 4) {
      s.moved = true
      el.setPointerCapture(e.pointerId)
    }
    el.scrollLeft = s.startLeft - dx
  }
  const endDrag = () => {
    drag.current.down = false
  }
  // Swallow the click that follows a drag so cards don't open the preview mid-swipe
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  const stepPreview = useCallback(
    (dir: number) => setPreview((p) => (p === null ? p : (p + dir + events.length) % events.length)),
    [events.length],
  )

  // Keyboard + scroll lock for the preview modal
  useEffect(() => {
    if (preview === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreview(null)
      else if (e.key === 'ArrowRight') stepPreview(1)
      else if (e.key === 'ArrowLeft') stepPreview(-1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [preview, stepPreview])

  const ev = preview !== null ? events[preview] : null

  return (
    <section id="schedule" className="relative overflow-hidden py-24 md:py-32">
      {/* soft sunlight glow */}
      <div
        className="pointer-events-none absolute right-0 top-24 h-96 w-96 rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgb(244 190 146 / 0.5), transparent 70%)' }}
        aria-hidden
      />

      <div className="relative">
        <div className="mx-auto max-w-5xl px-6">
          <SectionTitle
            eyebrow="Розклад"
            title="Три дні під сонцем"
            description="Тягни стрічку або гортай стрілками, а тисни на подію - щоб роздивитись деталі."
          />

          {/* Day tabs */}
          <Reveal className="mb-8 flex flex-wrap justify-center gap-3">
            {schedule.map((d, i) => {
              const active = i === dayIdx
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDayIdx(i)}
                  aria-pressed={active}
                  className={`rounded-full border px-5 py-2.5 text-sm tracking-[0.02em] transition-all duration-300 ${
                    active
                      ? 'border-flame bg-flame text-cream shadow-[0_12px_30px_-14px_rgb(201_64_29/0.6)]'
                      : 'border-ink/15 bg-card text-ink/70 hover:border-flame/50 hover:text-flame'
                  }`}
                >
                  <span className="mr-1.5">{d.emoji}</span>
                  {d.date}
                  <span className={active ? 'text-cream/70' : 'text-ink/40'}> · {d.label}</span>
                </button>
              )
            })}
          </Reveal>

        </div>

        {/* Timeline track */}
        <motion.div
          key={day.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={trackRef}
            onScroll={updateEdges}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
            className="edge-fade-x hide-scrollbar flex cursor-grab snap-x snap-mandatory select-none gap-5 overflow-x-auto scroll-px-6 px-6 pb-4 pt-1 active:cursor-grabbing md:px-[max(1.5rem,calc((100vw-64rem)/2))]"
          >
            {events.map((event, i) => (
              <article key={i} data-card className="relative flex w-[264px] shrink-0 snap-start flex-col sm:w-[300px]">
                {/* time + rail node */}
                <p className="font-display text-base font-medium text-ink">{event.time}</p>
                <div className="relative my-3 h-3">
                  <span
                    className={`absolute left-0 top-1/2 z-10 size-3.5 -translate-y-1/2 rounded-full ring-4 ring-cream ${
                      event.highlight ? 'bg-flame' : 'bg-sun'
                    }`}
                  />
                  <span className="absolute left-0 top-1/2 h-px w-[calc(100%+1.25rem)] -translate-y-1/2 bg-ink/15" />
                </div>

                <button
                  type="button"
                  onClick={() => setPreview(i)}
                  className={`card-hover group flex w-full flex-1 flex-col rounded-3xl border p-5 text-left ${
                    event.highlight
                      ? 'border-flame/40 bg-gradient-to-b from-peach/50 to-card hover:border-flame/60'
                      : 'border-ink/10 bg-card hover:border-sun/60'
                  }`}
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-flame">{event.tag}</p>
                  <h4 className="mt-1.5 font-display text-sm font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-flame">
                    {event.title}
                  </h4>
                  {event.details && (
                    <p className="mt-2.5 line-clamp-4 text-sm leading-relaxed text-cocoa">{event.details}</p>
                  )}
                  {event.location && (
                    <p className="mt-3 flex items-start gap-1.5 text-xs leading-snug text-ink/55">
                      <MapPin className="mt-0.5 size-3.5 shrink-0 text-sun" />
                      {event.location}
                    </p>
                  )}
                </button>
              </article>
            ))}
            <span aria-hidden className="w-px shrink-0" />
          </div>
        </motion.div>

        {/* Nav controls - centered below the timeline so they never cover the cards */}
        <div className="mt-10 hidden items-center justify-center gap-5 md:flex">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={!edges.left}
            aria-label="Попередні події"
            className="rounded-full border border-ink/15 bg-card p-4 text-ink shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-flame hover:text-flame disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-ink"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={!edges.right}
            aria-label="Наступні події"
            className="rounded-full border border-ink/15 bg-card p-4 text-ink shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-flame hover:text-flame disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-ink"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>

        {/* mobile hint */}
        <p className="mt-6 text-center text-xs text-ink/40 md:hidden">← тягни або тисни на подію →</p>
      </div>

      {/* Enlarged preview - portaled to body so `fixed` escapes any transformed ancestor */}
      {ev &&
        createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Деталі події"
          >
            <motion.div
              key={preview}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-lg overflow-hidden rounded-[2rem] border p-8 shadow-2xl sm:p-10 ${
                ev.highlight ? 'border-flame/40 bg-gradient-to-b from-peach/60 to-card' : 'border-ink/10 bg-card'
              }`}
            >
              <button
                type="button"
                onClick={() => setPreview(null)}
                aria-label="Закрити"
                className="absolute right-5 top-5 rounded-full p-2 text-ink/50 transition-colors hover:bg-ink/5 hover:text-flame"
              >
                <X className="size-6" />
              </button>

              <p className="pr-10 text-xs uppercase tracking-[0.25em] text-ink/40">
                {day.emoji} {day.date} · {day.label}
              </p>
              <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.25em] text-flame">{ev.tag}</p>
              <p className="mt-2 font-display text-3xl font-medium text-flame">{ev.time}</p>
              <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-ink sm:text-2xl">
                {ev.title}
              </h3>
              {ev.details && (
                <p className="mt-4 text-base leading-relaxed text-cocoa">{ev.details}</p>
              )}
              {ev.location && (
                <p className="mt-5 flex items-start gap-2 rounded-2xl border border-ink/10 bg-cream/60 px-4 py-3 text-sm text-ink/70">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-sun" />
                  {ev.location}
                </p>
              )}

              {/* footer nav */}
              <div className="mt-7 flex items-center justify-between border-t border-ink/10 pt-5">
                <button
                  type="button"
                  onClick={() => stepPreview(-1)}
                  aria-label="Попередня подія"
                  className="flex items-center gap-1.5 rounded-full border border-ink/15 py-2 pl-2.5 pr-4 text-sm text-ink transition-colors duration-300 hover:border-flame hover:text-flame"
                >
                  <ChevronLeft className="size-4" />
                  Раніше
                </button>
                <span className="text-xs tracking-widest text-ink/40">
                  {preview! + 1} / {events.length}
                </span>
                <button
                  type="button"
                  onClick={() => stepPreview(1)}
                  aria-label="Наступна подія"
                  className="flex items-center gap-1.5 rounded-full border border-ink/15 py-2 pl-4 pr-2.5 text-sm text-ink transition-colors duration-300 hover:border-flame hover:text-flame"
                >
                  Далі
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>,
          document.body,
        )}
    </section>
  )
}
