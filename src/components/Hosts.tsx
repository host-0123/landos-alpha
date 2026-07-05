import { people } from '../data/people'
import { ImageWithFallback } from './ui/ImageWithFallback'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

/* Brand icons were removed from lucide 1.x, so Instagram lives here as inline SVG */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export function Hosts() {
  return (
    <section id="hosts" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle
          eyebrow="Наші ведучі"
          title="Голоси Сонцестояння"
          description="Люди, які створюють атмосферу — ведуть вечір, тримають вогонь і музику ночі."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {people.map((person, i) => (
            <Reveal key={person.image} delay={i * 0.12}>
              <article className="card-hover group h-full overflow-hidden rounded-3xl border border-linen/8 bg-coal/70 hover:border-gold/40">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <ImageWithFallback
                    src={person.image}
                    alt={person.name}
                    fallbackLabel={person.name}
                    className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-coal to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold">{person.role}</p>
                  <h3 className="mt-2 font-display text-xl font-medium tracking-wide text-linen">
                    {person.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-faded">{person.description}</p>
                  {person.instagram && (
                    <a
                      href={`https://instagram.com/${person.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline btn-sm mt-5"
                    >
                      <InstagramIcon className="size-3.5" />
                      @{person.instagram}
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
