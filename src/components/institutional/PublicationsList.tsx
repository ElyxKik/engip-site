'use client'

import React, { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

import {
  PublicationCard,
  type Publication,
  type PublicationType,
} from './PublicationCard'

type Filter = PublicationType | 'all'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Toutes' },
  { id: 'rapport', label: 'Rapports annuels' },
  { id: 'communique', label: 'Communiqués de presse' },
  { id: 'etude', label: 'Études' },
  { id: 'statistiques', label: 'Statistiques' },
]

/** Liste filtrable de publications — onglets par type + recherche texte. */
export const PublicationsList: React.FC<{ publications: Publication[] }> = ({
  publications,
}) => {
  const [active, setActive] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return publications.filter((p) => {
      if (active !== 'all' && p.type !== active) return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
      )
    })
  }, [publications, active, query])

  return (
    <div>
      {/* Barre de contrôles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div
          role="tablist"
          aria-label="Filtrer par type"
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => {
            const isActive = active === f.id
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f.id)}
                className={
                  'px-3.5 py-1.5 text-xs font-medium border transition-colors ' +
                  (isActive
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground/70 border-border hover:border-primary hover:text-primary')
                }
              >
                {f.label}
              </button>
            )
          })}
        </div>
        <div className="relative lg:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une publication…"
            aria-label="Rechercher une publication"
            className="w-full pl-10 pr-3 py-2.5 text-sm bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Compteur */}
      <p className="text-xs uppercase tracking-[0.14em] font-medium text-muted-foreground mb-4">
        {filtered.length} publication{filtered.length > 1 ? 's' : ''}
      </p>

      {/* Liste */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground border border-dashed border-border">
          Aucune publication ne correspond à votre recherche.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((p) => (
            <PublicationCard key={p.id} publication={p} />
          ))}
        </div>
      )}
    </div>
  )
}
