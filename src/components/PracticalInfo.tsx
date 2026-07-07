import { Calendar, MapPin, Shirt, Sun, Tent, type LucideIcon } from 'lucide-react'
import { practicalInfo } from '../data/event'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

const icons: Record<string, LucideIcon> = {
  calendar: Calendar,
  map: MapPin,
  tent: Tent,
  sun: Sun,
  shirt: Shirt,
}

export function PracticalInfo() {
  return (
    <section id="info" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle eyebrow="Коротко" title="Практична інформація" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 md:gap-5">
          {practicalInfo.map((item, i) => {
            const Icon = icons[item.icon] ?? Sun
            return (
              <Reveal key={item.label} delay={i * 0.08} className="h-full">
                <div className="card-hover flex h-full flex-col rounded-3xl border border-ink/10 bg-card p-6 hover:border-sun/60">
                  <Icon className="size-5 text-flame" aria-hidden />
                  <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.25em] text-cocoa">{item.label}</p>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-ink">{item.value}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
