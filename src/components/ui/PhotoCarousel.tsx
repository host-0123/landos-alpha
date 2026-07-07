import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface PhotoCarouselProps {
  images: string[]
  alt: string
  intervalMs?: number
  className?: string
  aspectClass?: string
}

/**
 * Arch-framed photo slideshow with crossfade + dot navigation.
 * Missing files (not in /public) are dropped automatically, so the list
 * can be edited freely without breaking the layout.
 */
export function PhotoCarousel({
  images: initial,
  alt,
  intervalMs = 5000,
  className = '',
  aspectClass = 'aspect-[4/5]',
}: PhotoCarouselProps) {
  const [images, setImages] = useState<string[]>(initial)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    initial.forEach((src) => {
      const img = new Image()
      img.onerror = () => setImages((prev) => prev.filter((s) => s !== src))
      img.src = src
    })
  }, [initial])

  useEffect(() => {
    if (images.length < 2) return
    const timer = setInterval(() => setIdx((i) => i + 1), intervalMs)
    return () => clearInterval(timer)
  }, [images.length, intervalMs])

  const current = images.length > 0 ? images[idx % images.length] : null

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`relative ${aspectClass} overflow-hidden rounded-b-[2rem] rounded-t-[12rem] border border-ink/10 bg-shell shadow-[0_40px_80px_-40px_rgb(201_64_29/0.35)]`}
      >
        {current ? (
          <AnimatePresence mode="sync">
            <motion.img
              key={current}
              src={current}
              alt={alt}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <p className="font-display italic text-cocoa">Додайте фото в public/images/hero/</p>
          </div>
        )}
        {/* warm glass edge */}
        <div className="pointer-events-none absolute inset-0 rounded-b-[2rem] rounded-t-[12rem] ring-1 ring-inset ring-ink/10" />
      </div>

      {images.length > 1 && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Фото ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === idx % images.length ? 'w-6 bg-flame' : 'w-1.5 bg-ink/20 hover:bg-sun'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
