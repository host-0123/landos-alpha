import { galleryItems } from '../data/gallery'
import { ImageWithFallback } from './ui/ImageWithFallback'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

export function InspirationGallery() {
  return (
    <section id="inspiration" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Натхнення"
          title="Як виглядають Діти Сонця"
          description="Галерея образів, щоб зрозуміти, що вдягнути: жіночі та чоловічі луки, аксесуари, головні убори, тканини і вайб ночі."
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {galleryItems.map((item, i) => (
            <Reveal key={item.image} delay={(i % 4) * 0.08}>
              <figure className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-linen/8 bg-coal">
                <ImageWithFallback
                  src={item.image}
                  alt={item.caption}
                  fallbackLabel={item.caption}
                  className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
                {/* caption overlay */}
                <figcaption className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-night/95 via-night/60 to-transparent px-4 pb-4 pt-12">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{item.category}</p>
                  <p className="mt-1 font-display text-sm text-linen">{item.caption}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-faded">
            Це орієнтири, а не правила. Головне — цілісний образ, у якому тобі вільно.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
