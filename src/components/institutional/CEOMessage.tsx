import React from 'react'
import Link from 'next/link'
import { Quote, ArrowRight } from 'lucide-react'

interface Props {
  name: string
  role: string
  /** URL de la photo du dirigeant, ou undefined pour afficher un placeholder sobre. */
  portraitUrl?: string
  excerpt: string
  readMoreHref?: string
}

/**
 * Bloc "Message institutionnel du CEO / État" — photo à gauche, citation à droite,
 * filet bleu vertical + accent rouge sur guillemet, signature typographique.
 */
export const CEOMessage: React.FC<Props> = ({
  name,
  role,
  portraitUrl,
  excerpt,
  readMoreHref = '/institution#mot-du-ceo',
}) => {
  return (
    <section className="bg-background">
      <div className="container py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Portrait */}
          <div className="lg:col-span-4">
            <div className="relative">
              <div
                className="absolute -top-3 -left-3 w-16 h-16 bg-secondary"
                aria-hidden
              />
              <div className="relative aspect-[4/5] bg-muted border border-border overflow-hidden">
                {portraitUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={portraitUrl}
                    alt={`Portrait officiel de ${name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/60">
                    <span className="font-serif text-6xl font-semibold text-primary/20 select-none">
                      {name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                  </div>
                )}
              </div>
              <div
                className="absolute -bottom-3 -right-3 w-24 h-1 bg-primary"
                aria-hidden
              />
            </div>
          </div>

          {/* Message */}
          <div className="lg:col-span-8 lg:pl-8 relative">
            <span
              className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-border"
              aria-hidden
            />
            <div className="inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-secondary">
              <span className="block w-8 h-px bg-secondary" aria-hidden />
              <span>Message institutionnel</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              Mot du {role}
            </h2>
            <div className="mt-6 relative">
              <Quote
                className="absolute -top-2 -left-1 w-8 h-8 text-secondary/80"
                strokeWidth={1.6}
                aria-hidden
              />
              <blockquote className="pl-10 text-lg md:text-xl text-foreground/85 leading-relaxed font-serif italic">
                {excerpt}
              </blockquote>
            </div>
            <div className="mt-8 pl-10 border-l-0">
              <div className="font-serif text-lg font-semibold text-primary">{name}</div>
              <div className="text-sm text-muted-foreground mt-1">{role}</div>
              <Link
                href={readMoreHref}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
              >
                Lire le mot intégral
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
