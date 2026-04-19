'use client'

import React, { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

import { JobCard, type Job, type JobType } from './JobCard'

type Filter = JobType | 'all'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Toutes' },
  { id: 'emploi', label: 'Offres d’emploi' },
  { id: 'stage', label: 'Stages' },
]

/** Liste filtrable d'offres — onglets type + recherche par mot-clé + département. */
export const JobsList: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  const [active, setActive] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState<string>('all')

  const departments = useMemo(() => {
    const s = new Set(jobs.map((j) => j.department))
    return ['all', ...Array.from(s)]
  }, [jobs])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return jobs.filter((j) => {
      if (active !== 'all' && j.type !== active) return false
      if (department !== 'all' && j.department !== department) return false
      if (!q) return true
      return (
        j.title.toLowerCase().includes(q) ||
        j.summary.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      )
    })
  }, [jobs, active, department, query])

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div role="tablist" aria-label="Filtrer par type" className="flex flex-wrap gap-2">
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
        <div className="flex flex-col sm:flex-row gap-2 lg:w-auto">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            aria-label="Filtrer par direction"
            className="px-3 py-2.5 text-sm bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === 'all' ? 'Toutes les directions' : d}
              </option>
            ))}
          </select>
          <div className="relative sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mot-clé, lieu, métier…"
              aria-label="Rechercher une offre"
              className="w-full pl-10 pr-3 py-2.5 text-sm bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <p className="text-xs uppercase tracking-[0.14em] font-medium text-muted-foreground mb-4">
        {filtered.length} offre{filtered.length > 1 ? 's' : ''}
      </p>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground border border-dashed border-border">
          Aucune offre ne correspond à votre recherche.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      )}
    </div>
  )
}
