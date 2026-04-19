import React from 'react'
import { type LucideIcon } from 'lucide-react'

export interface Pillar {
  icon: LucideIcon
  title: string
  description: string
}

/** Grille de piliers (ex. Mission / Vision / Mandat) — cartes bordées avec liseré supérieur bleu. */
export const PillarsGrid: React.FC<{ pillars: Pillar[] }> = ({ pillars }) => {
  return (
    <div className="grid gap-0 md:grid-cols-3 border border-border">
      {pillars.map(({ icon: Icon, title, description }, i) => (
        <article
          key={i}
          className="relative p-8 bg-background md:[&:not(:last-child)]:border-r border-border [&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-b-0"
        >
          <span
            className="absolute top-0 left-0 w-16 h-[3px] bg-primary"
            aria-hidden
          />
          <span className="inline-flex items-center justify-center w-12 h-12 bg-primary/5 text-primary mb-5">
            <Icon className="w-6 h-6" strokeWidth={1.5} aria-hidden />
          </span>
          <h3 className="font-serif text-xl font-semibold text-foreground leading-snug">
            {title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </article>
      ))}
    </div>
  )
}
