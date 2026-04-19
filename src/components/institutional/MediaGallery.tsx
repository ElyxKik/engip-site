'use client'

import React, { useState } from 'react'
import { X, Play, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react'

export type MediaType = 'photo' | 'video'

export interface MediaItem {
  id: string
  type: MediaType
  title: string
  url?: string
  thumbnailUrl?: string
}

interface Props {
  items: MediaItem[]
}

/**
 * Galerie média institutionnelle — grille responsive avec lightbox clavier.
 * Les placeholders sobres s'affichent quand aucune URL n'est fournie.
 */
export const MediaGallery: React.FC<Props> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex !== null ? items[activeIndex] : null

  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % items.length))
  const prev = () =>
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + items.length) % items.length,
    )

  return (
    <>
      <ul className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((m, i) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative block w-full aspect-[4/3] bg-muted border border-border overflow-hidden"
              aria-label={`Ouvrir : ${m.title}`}
            >
              {m.thumbnailUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={m.thumbnailUrl}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 flex items-center justify-center">
                  {m.type === 'video' ? (
                    <Play
                      className="w-8 h-8 text-primary/40"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  ) : (
                    <ImageIcon
                      className="w-8 h-8 text-primary/40"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  )}
                </div>
              )}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
              <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 bg-background/90 text-[0.64rem] uppercase tracking-[0.14em] font-semibold text-primary">
                {m.type === 'video' ? (
                  <Play className="w-3 h-3" aria-hidden />
                ) : (
                  <ImageIcon className="w-3 h-3" aria-hidden />
                )}
                {m.type}
              </span>
              <span className="absolute bottom-0 inset-x-0 p-3 text-left text-xs font-medium text-white bg-gradient-to-t from-[rgba(10,31,68,0.85)] via-[rgba(10,31,68,0.3)] to-transparent">
                {m.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActiveIndex(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setActiveIndex(null)
            if (e.key === 'ArrowRight') next()
            if (e.key === 'ArrowLeft') prev()
          }}
          tabIndex={-1}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight className="w-6 h-6" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 p-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" aria-hidden />
          </button>

          <figure
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-muted flex items-center justify-center">
              {active.url && active.type === 'photo' && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={active.url}
                  alt={active.title}
                  className="w-full h-full object-contain"
                />
              )}
              {active.url && active.type === 'video' && (
                <video
                  src={active.url}
                  controls
                  className="w-full h-full"
                  aria-label={active.title}
                />
              )}
              {!active.url && (
                <div className="flex flex-col items-center gap-3 text-white/60">
                  {active.type === 'video' ? (
                    <Play className="w-12 h-12" strokeWidth={1.3} aria-hidden />
                  ) : (
                    <ImageIcon className="w-12 h-12" strokeWidth={1.3} aria-hidden />
                  )}
                  <span className="text-xs uppercase tracking-[0.14em]">
                    Média indisponible
                  </span>
                </div>
              )}
            </div>
            <figcaption className="mt-3 text-sm font-medium text-white text-center">
              {active.title}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
