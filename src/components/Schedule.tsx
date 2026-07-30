import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { schedule } from '../data/schedule'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

export function Schedule() {
  const [dayIdx, setDayIdx] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false })
  const [edges, setEdges] = useState({ left: false, right: true })

  const day = schedule[dayIdx]

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
    // wait a frame for layout of the newly rendered day
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
  // Swallow the click that follows a drag so cards don't feel "sticky"
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

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
            description="Тягни стрічку, гортай стрілками — і дивись, як складається кожен день."
          />

          {/* Day tabs */}
          <Reveal className="mb-10 flex flex-wrap justify-center gap-3">
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
        <div className="relative">
          {/* arrows */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 mx-auto hidden max-w-6xl items-center justify-between px-2 md:flex">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              disabled={!edges.left}
              aria-label="Попередні події"
              className="pointer-events-auto rounded-full border border-ink/10 bg-cream/80 p-3 text-ink shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-cream hover:text-flame disabled:cursor-not-allowed disabled:opacity-0"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={!edges.right}
              aria-label="Наступні події"
              className="pointer-events-auto rounded-full border border-ink/10 bg-cream/80 p-3 text-ink shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-cream hover:text-flame disabled:cursor-not-allowed disabled:opacity-0"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

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
                className="hide-scrollbar flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-4 select-none active:cursor-grabbing md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
              >
                {day.events.map((ev, i) => (
                  <article
                    key={i}
                    data-card
                    className="relative w-[264px] shrink-0 snap-start sm:w-[300px]"
                  >
                    {/* time + rail node */}
                    <p className="font-display text-base font-medium text-ink">{ev.time}</p>
                    <div className="relative my-3 h-3">
                      <span
                        className={`absolute left-0 top-1/2 z-10 size-3.5 -translate-y-1/2 rounded-full ring-4 ring-cream ${
                          ev.highlight ? 'bg-flame' : 'bg-sun'
                        }`}
                      />
                      {/* rail segment (full card width + gap so segments join) */}
                      <span className="absolute left-0 top-1/2 h-px w-[calc(100%+1.25rem)] -translate-y-1/2 bg-ink/15" />
                    </div>

                    <div
                      className={`card-hover h-full rounded-3xl border p-5 ${
                        ev.highlight
                          ? 'border-flame/40 bg-gradient-to-b from-peach/50 to-card hover:border-flame/60'
                          : 'border-ink/10 bg-card hover:border-sun/60'
                      }`}
                    >
                      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-flame">
                        {ev.tag}
                      </p>
                      <h4 className="mt-1.5 font-display text-sm font-semibold leading-snug text-ink">
                        {ev.title}
                      </h4>
                      {ev.details && (
                        <p className="mt-2.5 text-sm leading-relaxed text-cocoa">{ev.details}</p>
                      )}
                      {ev.location && (
                        <p className="mt-3 flex items-start gap-1.5 text-xs leading-snug text-ink/55">
                          <MapPin className="mt-0.5 size-3.5 shrink-0 text-sun" />
                          {ev.location}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
                {/* trailing spacer so the last card can snap fully into view */}
                <span aria-hidden className="w-px shrink-0" />
              </div>
          </motion.div>

          {/* mobile hint */}
          <p className="mt-4 text-center text-xs text-ink/40 md:hidden">← тягни, щоб гортати →</p>
        </div>
      </div>
    </section>
  )
}
