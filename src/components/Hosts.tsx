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
          eyebrow="Команда вечора"
          title="Люди, які створюють атмосферу"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {people.map((person, i) => (
            <Reveal key={person.image} delay={i * 0.12}>
              <article className="group h-full overflow-hidden rounded-3xl border border-linen/8 bg-coal/70 transition-colors duration-500 hover:border-gold/40">
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
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{person.role}</p>
                  <h3 className="mt-1.5 font-display text-lg text-linen">{person.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-faded">{person.description}</p>
                  {person.instagram && (
                    <a
                      href={`https://instagram.com/${person.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-xs font-medium text-sun transition-colors duration-300 hover:border-sun hover:bg-sun/10"
                    >
                      <InstagramIcon className="size-3.5" />
                      Instagram
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
