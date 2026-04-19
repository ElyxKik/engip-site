import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Props {
  eyebrow?: string
  title: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /**
   * URL d'une image de fond premium plein écran.
   * Si fournie : fond sombre institutionnel + overlay + texte blanc.
   * Si absente : fond blanc avec ornements subtils (version interne).
   */
  backgroundImage?: string
}

/**
 * Hero institutionnel premium — deux variantes :
 *  - Avec image : plein écran avec overlay bleu dégradé, texte blanc
 *  - Sans image : fond blanc avec ornements discrets
 */
export const InstitutionalHero: React.FC<Props> = ({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
}) => {
  if (backgroundImage) {
    return (
      <section className="relative isolate overflow-hidden bg-[#0A1F44] text-white">
        {/* Image de fond plein écran */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundImage}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-contain object-center"
        />

        {/* Overlay institutionnel : bleu profond + dégradé pour lisibilité */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[rgba(10,31,68,0.92)] via-[rgba(10,31,68,0.78)] to-[rgba(10,31,68,0.55)] pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(10,31,68,0.6)] to-transparent pointer-events-none"
          aria-hidden
        />

        {/* Filet vertical rouge décoratif côté gauche */}
        <div
          className="absolute top-0 left-6 md:left-10 bottom-0 w-px bg-white/10"
          aria-hidden
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 left-6 md:left-10 w-px h-24 bg-secondary"
          aria-hidden
        />

        {/* Halos subtils */}
        <div
          className="absolute -top-32 -right-20 w-[520px] h-[520px] bg-secondary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-primary/30 rounded-full blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="container relative py-10 md:py-14 lg:py-16">
          <div className="max-w-3xl">
            {eyebrow && (
              <div className="inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-white/90">
                <span className="block w-8 h-px bg-secondary" aria-hidden />
                <span>{eyebrow}</span>
              </div>
            )}
            <h1 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
              {title}
            </h1>
            {description && (
              <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="mt-10 flex flex-wrap gap-3">
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
                    className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Liseré dégradé bleu → rouge en bas */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-secondary"
          aria-hidden
        />
      </section>
    )
  }

  // Variante sans image — fond blanc avec ornements subtils
  return (
    <section className="relative bg-background overflow-hidden">
      <div
        className="absolute -top-20 -right-20 w-[420px] h-[420px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-1/3 -left-24 w-[280px] h-[280px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="container relative py-20 md:py-28">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-secondary">
              <span className="block w-8 h-px bg-secondary" aria-hidden />
              <span>{eyebrow}</span>
            </div>
          )}
          <h1 className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  {primaryCta.label}
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 border border-primary/20 text-primary px-6 py-3 text-sm font-semibold hover:bg-primary/5 transition-colors"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="h-px w-full bg-border" />
    </section>
  )
}
