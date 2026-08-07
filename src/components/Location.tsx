import { useState } from 'react'
import { ArrowUpRight, ChevronDown, MapPin, Navigation as NavIcon } from 'lucide-react'
import { venue } from '../data/event'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

const q = encodeURIComponent(venue.mapsQuery)
const embedSrc = `https://maps.google.com/maps?q=${q}&z=15&hl=uk&output=embed`

const routes = [
  { label: 'Google Maps', href: `https://www.google.com/maps/dir/?api=1&destination=${q}` },
  { label: 'Waze', href: `https://waze.com/ul?q=${q}&navigate=yes` },
]

export function Location() {
  const [open, setOpen] = useState(false)

  return (
    <section id="location" className="relative overflow-hidden py-24 md:py-32">
      {/* soft sunlight glow */}
      <div
        className="pointer-events-none absolute -left-24 top-16 h-96 w-96 rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgb(244 190 146 / 0.5), transparent 70%)' }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionTitle
          eyebrow="Location"
          title={venue.name}
          description={`${venue.tagline} · Східниця, Карпати — там, де ми збираємось на Сонцестояння.`}
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Info */}
          <Reveal className="flex">
            <div className="flex w-full flex-col rounded-3xl border border-ink/10 bg-card p-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-flame">Адреса</p>
              <p className="mt-3 flex items-start gap-3 text-lg leading-relaxed text-ink">
                <MapPin className="mt-1 size-5 shrink-0 text-sun" />
                {venue.address}
              </p>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                {/* Universal route button — pick Google Maps or Waze */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    className="btn btn-solid w-full justify-center sm:w-auto"
                  >
                    <NavIcon className="size-4" />
                    Прокласти маршрут
                    <ChevronDown className={`size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                  </button>

                  {open && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
                      <div
                        role="menu"
                        className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-[0_20px_50px_-20px_rgb(201_64_29/0.4)]"
                      >
                        {routes.map((r) => (
                          <a
                            key={r.label}
                            href={r.href}
                            target="_blank"
                            rel="noreferrer"
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-3 text-sm text-ink transition-colors duration-200 hover:bg-flame/10 hover:text-flame"
                          >
                            <MapPin className="size-4 text-sun" />
                            {r.label}
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <a
                  href={venue.website}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline justify-center"
                >
                  Сайт готелю
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-shell shadow-[0_30px_60px_-32px_rgb(201_64_29/0.35)]">
              <iframe
                title={`Карта — ${venue.name}`}
                src={embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[300px] w-full md:h-full md:min-h-[340px]"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
