import React from 'react'
import { BadgeCheck } from 'lucide-react'

export interface Certification {
  code: string
  title: string
  description: string
  validUntil?: string
}

/** Badge certification — mise en avant sobre (pas d'imitation d'emblème officiel). */
export const CertificationBadge: React.FC<{ cert: Certification }> = ({ cert }) => (
  <article className="group relative bg-background border border-border hover:border-primary transition-colors p-6 flex flex-col items-start gap-4">
    <span
      className="absolute top-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform"
      aria-hidden
    />
    <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-primary text-primary">
      <BadgeCheck className="w-7 h-7" strokeWidth={1.5} aria-hidden />
    </div>
    <div className="min-w-0">
      <div className="font-mono text-[0.72rem] uppercase tracking-[0.14em] font-semibold text-secondary">
        {cert.code}
      </div>
      <h3 className="mt-1 font-serif text-lg font-semibold text-foreground leading-snug">
        {cert.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {cert.description}
      </p>
      {cert.validUntil && (
        <div className="mt-3 text-xs text-muted-foreground">
          Valide jusqu’au {cert.validUntil}
        </div>
      )}
    </div>
  </article>
)
