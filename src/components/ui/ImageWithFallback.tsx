import { useState } from 'react'
import { Sparkles } from 'lucide-react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  /** Big label shown on the placeholder when the image is missing */
  fallbackLabel: string
}

/**
 * Renders the image if it exists in /public; otherwise shows a styled
 * placeholder with the expected file path, so replacing it is obvious.
 */
export function ImageWithFallback({ src, alt, className = '', fallbackLabel }: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-coal via-ember to-night p-6 text-center ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 20%, rgb(242 178 78 / 0.14), transparent 60%)',
          }}
        />
        <Sparkles className="size-7 text-gold/70" aria-hidden />
        <p className="font-display text-sm text-linen/80">{fallbackLabel}</p>
        <p className="max-w-full break-all text-[10px] uppercase tracking-widest text-faded/60">{src}</p>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
