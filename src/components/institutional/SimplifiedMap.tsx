'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { RealMap, type GeoSite } from './RealMap'

export type MapSiteType = 'pipeline' | 'stockage' | 'installation'

export interface MapSite {
  id: string
  name: string
  type: MapSiteType
  /** Coordonnées géographiques réelles (WGS84). */
  lat: number
  lng: number
  description?: string
}

const TYPE_META: Record<MapSiteType, { label: string; color: string }> = {
  pipeline: { label: 'Pipeline', color: '#0A3D91' },
  stockage: { label: 'Stockage', color: '#C8102E' },
  installation: { label: 'Installation stratégique', color: '#1A1A1A' },
}

interface Props {
  sites: MapSite[]
  fullMapHref?: string
}

/**
 * Section carte interactive — vraie carte MapLibre GL + tuiles OpenStreetMap
 * centrée sur la République Démocratique du Congo, avec filtres par type
 * d'infrastructure et liste latérale des sites référencés.
 */
export const SimplifiedMap: React.FC<Props> = ({
  sites,
  fullMapHref = '/infrastructures',
}) => {
  const [activeFilter, setActiveFilter] = useState<MapSiteType | 'all'>('all')

  const filtered = sites.filter(
    (s) => activeFilter === 'all' || s.type === activeFilter,
  )

  const geoSites: GeoSite[] = sites.map((s) => ({
    id: s.id,
    name: s.name,
    type: s.type,
    lat: s.lat,
    lng: s.lng,
    description: s.description,
  }))

  return (
    <section className="bg-muted/40 border-y border-border">
      <div className="container py-16 md:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-secondary">
              <span className="block w-6 h-px bg-secondary" aria-hidden />
              <span>Réseau national — RDC</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              Infrastructures pétrolières en République Démocratique du Congo
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              Carte interactive des principaux sites sur le territoire congolais,
              fondée sur les données OpenStreetMap.
            </p>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2">
            <FilterButton
              label="Tous"
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            />
            {(Object.keys(TYPE_META) as MapSiteType[]).map((t) => (
              <FilterButton
                key={t}
                label={TYPE_META[t].label}
                color={TYPE_META[t].color}
                active={activeFilter === t}
                onClick={() => setActiveFilter(t)}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Carte réelle MapLibre + OSM */}
          <div className="lg:col-span-2 bg-background border border-border p-2 md:p-3">
            <RealMap
              sites={geoSites}
              activeFilter={activeFilter}
              className="relative w-full h-[420px] md:h-[520px]"
            />
          </div>

          {/* Liste des sites */}
          <aside className="bg-background border border-border">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Sites référencés
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {filtered.length} site{filtered.length > 1 ? 's' : ''} affiché
                {filtered.length > 1 ? 's' : ''}
              </p>
            </div>
            <ul className="divide-y divide-border max-h-[460px] overflow-y-auto">
              {filtered.map((s) => (
                <li
                  key={s.id}
                  className="px-5 py-3.5 hover:bg-muted/60 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: TYPE_META[s.type].color }}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {s.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {TYPE_META[s.type].label}
                        {s.description && ` — ${s.description}`}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href={fullMapHref}
              className="flex items-center justify-between px-5 py-3.5 border-t border-border text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <span>Accéder à la carte complète</span>
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}

const FilterButton: React.FC<{
  label: string
  active: boolean
  color?: string
  onClick: () => void
}> = ({ label, active, color, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={
      'inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium border transition-colors ' +
      (active
        ? 'bg-primary text-primary-foreground border-primary'
        : 'bg-background text-foreground/70 border-border hover:border-primary hover:text-primary')
    }
  >
    {color && (
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden
      />
    )}
    {label}
  </button>
)
