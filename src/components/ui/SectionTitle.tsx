import { Reveal } from './Reveal'

interface SectionTitleProps {
  eyebrow: string
  title: string
  description?: string
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-flame">{eyebrow}</p>
      <h2 className="font-display text-2xl font-semibold leading-tight text-ink md:text-4xl">{title}</h2>
      <div className="sun-divider mt-6" />
      {description && <p className="mt-6 text-base leading-relaxed text-cocoa">{description}</p>}
    </Reveal>
  )
}
