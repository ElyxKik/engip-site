'use client'

import React, { useEffect, useRef } from 'react'
import maplibregl, { Map as MLMap, Marker } from 'maplibre-gl'

export type MapSiteType = 'pipeline' | 'stockage' | 'installation'

export interface GeoSite {
  id: string
  name: string
  type: MapSiteType
  lat: number
  lng: number
  description?: string
}

const TYPE_COLORS: Record<MapSiteType, string> = {
  pipeline: '#0A3D91',
  stockage: '#C8102E',
  installation: '#1A1A1A',
}

/** Bounds approximatifs de la République Démocratique du Congo (SW, NE). */
const DRC_BOUNDS: [[number, number], [number, number]] = [
  [11.5, -13.8],
  [31.5, 5.8],
]

interface Props {
  sites: GeoSite[]
  /** Filtre actif (doit matcher TYPE_COLORS ou 'all'). */
  activeFilter?: MapSiteType | 'all'
  className?: string
}

/**
 * Carte réelle MapLibre GL basée sur les tuiles OpenStreetMap.
 * Centrée automatiquement sur la République Démocratique du Congo avec
 * marqueurs colorés par type d'infrastructure.
 */
export const RealMap: React.FC<Props> = ({ sites, activeFilter = 'all', className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MLMap | null>(null)
  const markersRef = useRef<Marker[]>([])

  // Initialisation unique du style MapLibre (raster OSM) + contrôles.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
            maxzoom: 19,
          },
        },
        layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
      },
      bounds: DRC_BOUNDS,
      fitBoundsOptions: { padding: 24 },
      minZoom: 3,
      maxZoom: 12,
      attributionControl: { compact: true },
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
    map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-left')

    // Silhouette subtile autour du pays (masque lumineux sur le reste du monde).
    map.on('load', () => {
      map.addSource('world-mask', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [
              // Rectangle englobant le monde entier (anti-horaire)
              [
                [-180, -85],
                [180, -85],
                [180, 85],
                [-180, 85],
                [-180, -85],
              ],
              // Trou correspondant à la RDC (approximation large — bbox)
              [
                [11.5, -13.8],
                [31.5, -13.8],
                [31.5, 5.8],
                [11.5, 5.8],
                [11.5, -13.8],
              ],
            ],
          },
        },
      })
      map.addLayer({
        id: 'world-mask',
        type: 'fill',
        source: 'world-mask',
        paint: { 'fill-color': '#0A1F44', 'fill-opacity': 0.08 },
      })
    })

    mapRef.current = map

    return () => {
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []
      map.remove()
      mapRef.current = null
    }
  }, [])

  // (Re)création des marqueurs à chaque changement de sites ou filtre.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    const visible = sites.filter((s) => activeFilter === 'all' || s.type === activeFilter)

    visible.forEach((s) => {
      const el = document.createElement('div')
      el.className = 'engip-marker'
      el.style.cssText = [
        'width:16px',
        'height:16px',
        'border-radius:9999px',
        `background:${TYPE_COLORS[s.type]}`,
        'border:2px solid #fff',
        'box-shadow:0 0 0 4px ' + TYPE_COLORS[s.type] + '33, 0 2px 6px rgba(0,0,0,0.25)',
        'cursor:pointer',
      ].join(';')

      const popup = new maplibregl.Popup({ offset: 16, closeButton: false }).setHTML(
        `<div style="font-family:var(--font-sans),sans-serif;min-width:180px">
          <div style="font-weight:600;color:#0A1F44;font-size:13px">${escapeHtml(s.name)}</div>
          <div style="color:#6B7280;font-size:11px;margin-top:2px;text-transform:uppercase;letter-spacing:0.08em">${typeLabel(s.type)}</div>
          ${s.description ? `<div style="color:#374151;font-size:12px;margin-top:6px;line-height:1.4">${escapeHtml(s.description)}</div>` : ''}
        </div>`,
      )

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([s.lng, s.lat])
        .setPopup(popup)
        .addTo(map)

      markersRef.current.push(marker)
    })
  }, [sites, activeFilter])

  return (
    <div
      ref={containerRef}
      className={className ?? 'relative w-full h-[420px] md:h-[520px]'}
      role="region"
      aria-label="Carte interactive de la République Démocratique du Congo"
    />
  )
}

const typeLabel = (t: MapSiteType): string =>
  t === 'pipeline' ? 'Pipeline' : t === 'stockage' ? 'Stockage' : 'Installation stratégique'

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
