import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, type LucideIcon } from 'lucide-react'

export interface QuickAccessItem {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

/** Cartes d'accès rapide institutionnelles — liseré rouge au survol, icône Lucide. */
export const QuickAccessCards: React.FC<{ items: QuickAccessItem[] }> = ({ items }) => {
  return (
    <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3 border border-border">
      {items.map(({ icon: Icon, title, description, href }, i) => (
        <Link
          key={i}
          href={href}
          className="group relative flex flex-col gap-3 p-7 border-border hover:bg-muted/60 transition-colors [&:not(:last-child)]:border-b md:[&:nth-child(odd)]:border-r md:[&:nth-child(even)]:border-r-0 lg:[&]:border-r lg:[&:nth-child(3n)]:border-r-0"
        >
          <span
            className="absolute left-0 top-0 h-full w-[3px] bg-secondary scale-y-0 group-hover:scale-y-100 origin-top transition-transform"
            aria-hidden
          />
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-primary/5 text-primary">
              <Icon className="w-5 h-5" strokeWidth={1.6} aria-hidden />
            </span>
            <ArrowUpRight
              className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors"
              aria-hidden
            />
          </div>
          <h3 className="font-serif text-xl font-semibold text-foreground leading-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </Link>
      ))}
    </div>
  )
}
