import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface PhotoCarouselProps {
  images: string[]
  alt: string
  intervalMs?: number
  className?: string
  aspectClass?: string
  /** Make the photo clickable to open a fullscreen viewer with prev/next */
  lightbox?: boolean
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
  lightbox = false,
}: PhotoCarouselProps) {
  const [images, setImages] = useState<string[]>(initial)
  const [idx, setIdx] = useState(0)
  const [open, setOpen] = useState(false)

  const len = images.length
  const safeIdx = len > 0 ? idx % len : 0
  const current = len > 0 ? images[safeIdx] : null

  const go = useCallback((dir: number) => setIdx((i) => (i + dir + len) % len), [len])

  useEffect(() => {
    initial.forEach((src) => {
      const img = new Image()
      img.onerror = () => setImages((prev) => prev.filter((s) => s !== src))
      img.src = src
    })
  }, [initial])

  // Auto-advance only while the fullscreen viewer is closed
  useEffect(() => {
    if (len < 2 || open) return
    const timer = setInterval(() => setIdx((i) => (i + 1) % len), intervalMs)
    return () => clearInterval(timer)
  }, [len, intervalMs, open])

  // Keyboard control + scroll lock for the fullscreen viewer
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, go])

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
            <p className="font-display text-sm text-cocoa">Додайте фото в public/images/hero/</p>
          </div>
        )}

        {/* click-to-zoom overlay */}
        {lightbox && current && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Відкрити фото на весь екран"
            className="absolute inset-0 z-20 cursor-zoom-in"
          />
        )}

        {/* inline prev/next controls - switch without opening the viewer */}
        {len > 1 && current && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Попереднє фото"
              className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-ink/10 bg-cream/70 p-2 text-ink shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-cream hover:text-flame"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Наступне фото"
              className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-ink/10 bg-cream/70 p-2 text-ink shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-cream hover:text-flame"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        {/* warm glass edge */}
        <div className="pointer-events-none absolute inset-0 z-10 rounded-b-[2rem] rounded-t-[12rem] ring-1 ring-inset ring-ink/10" />
      </div>

      {len > 1 && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Фото ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === safeIdx ? 'w-6 bg-flame' : 'w-1.5 bg-ink/20 hover:bg-sun'
              }`}
            />
          ))}
        </div>
      )}

      {/* Fullscreen viewer - portaled to body so `fixed` escapes any transformed ancestor */}
      {lightbox &&
        open &&
        current &&
        createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Перегляд фото"
          >
            <>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрити"
                className="absolute right-4 top-4 rounded-full p-2 text-cream/80 transition-colors hover:text-cream"
              >
                <X className="size-7" />
              </button>

              {len > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(-1)
                  }}
                  aria-label="Попереднє фото"
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 p-2 text-cream/80 transition-colors hover:bg-cream/20 hover:text-cream md:left-6"
                >
                  <ChevronLeft className="size-7" />
                </button>
              )}

              <motion.img
                key={current}
                src={current}
                alt={alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
              />

              {len > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(1)
                  }}
                  aria-label="Наступне фото"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 p-2 text-cream/80 transition-colors hover:bg-cream/20 hover:text-cream md:right-6"
                >
                  <ChevronRight className="size-7" />
                </button>
              )}

              {len > 1 && (
                <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm tracking-widest text-cream/70">
                  {safeIdx + 1} / {len}
                </p>
              )}
            </>
          </motion.div>,
          document.body,
        )}
    </div>
  )
}
