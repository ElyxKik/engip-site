import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Props {
  eyebrow?: string
  title: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

/** Bandeau d'appel à l'action — fond bleu institutionnel, accent rouge. */
export const CTABanner: React.FC<Props> = ({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}) => {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-secondary/30 to-transparent pointer-events-none"
        aria-hidden
      />
      <div className="container py-16 md:py-20 relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-white/80">
              <span className="block w-6 h-px bg-secondary" aria-hidden />
              <span>{eyebrow}</span>
            </div>
          )}
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold leading-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">
              {description}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 text-sm font-semibold hover:bg-secondary/90 transition-colors"
                >
                  {primaryCta.label}
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
