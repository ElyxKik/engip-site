import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface Breadcrumb {
  label: string
  href?: string
}

interface Props {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
}

/**
 * Hero d'en-tête pour les pages internes — compact, avec fil d'Ariane,
 * ornements bleu/rouge et bande dégradée.
 */
export const PageHero: React.FC<Props> = ({ eyebrow, title, description, breadcrumbs }) => {
  return (
    <section className="relative bg-background overflow-hidden border-b border-border">
      <div
        className="absolute -top-24 right-0 w-[420px] h-[420px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -left-12 w-[260px] h-[260px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden
      />
      <div className="container relative py-10 md:py-14">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                  aria-label="Accueil"
                >
                  <Home className="w-3.5 h-3.5" aria-hidden />
                </Link>
              </li>
              {breadcrumbs.map((b, i) => (
                <li key={i} className="inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-muted-foreground/60" aria-hidden />
                  {b.href ? (
                    <Link
                      href={b.href}
                      className="hover:text-primary transition-colors"
                    >
                      {b.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-foreground">{b.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-secondary">
            <span className="block w-6 h-px bg-secondary" aria-hidden />
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="mt-3 font-serif text-3xl md:text-5xl font-semibold text-foreground leading-[1.15] max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
