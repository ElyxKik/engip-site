import React from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  /** Date formatée pour affichage (ex: "12 avril 2026"). */
  dateLabel: string
  category: string
  href: string
  coverUrl?: string
}

interface Props {
  items: NewsItem[]
  viewAllHref?: string
}

/**
 * Dernières actualités — une vedette à gauche + deux compactes à droite.
 * Style institutionnel : catégorie rouge en majuscules, date avec icône, titre serif.
 */
export const LatestNews: React.FC<Props> = ({ items, viewAllHref = '/publications?type=actualite' }) => {
  if (!items.length) return null
  const [featured, ...rest] = items

  return (
    <section className="bg-background">
      <div className="container py-16 md:py-20">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-secondary">
              <span className="block w-6 h-px bg-secondary" aria-hidden />
              <span>Actualités</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              Dernières publications institutionnelles
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors whitespace-nowrap"
          >
            Toutes les actualités
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Vedette */}
          <Link
            href={featured.href}
            className="group lg:col-span-2 flex flex-col bg-background border border-border hover:border-primary transition-colors"
          >
            <div className="relative aspect-[16/9] bg-muted overflow-hidden">
              {featured.coverUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={featured.coverUrl}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10" />
              )}
              <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] font-semibold">
                {featured.category}
              </span>
            </div>
            <div className="p-7 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" aria-hidden />
                <time dateTime={featured.date}>{featured.dateLabel}</time>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                {featured.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Lire l’article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden />
              </span>
            </div>
          </Link>

          {/* Compactes */}
          <div className="flex flex-col gap-6">
            {rest.slice(0, 2).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex-1 flex flex-col bg-background border border-border hover:border-primary transition-colors p-6"
              >
                <div className="flex items-center gap-3 text-xs">
                  <span className="uppercase tracking-[0.14em] font-semibold text-secondary">
                    {item.category}
                  </span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-3 h-3" aria-hidden />
                    <time dateTime={item.date}>{item.dateLabel}</time>
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>
                <span className="mt-auto pt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary">
                  Lire
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Toutes les actualités
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
