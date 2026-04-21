'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

export interface HeroSlide {
  eyebrow?: string
  title: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /** URL d'une image de fond premium plein écran. */
  backgroundImage: string
}

interface Props {
  slides: HeroSlide[]
  /** Durée d'affichage d'un slide en ms (défaut: 6500). */
  interval?: number
  /** Autoplay activé au montage (défaut: true). */
  autoPlay?: boolean
}

/**
 * Hero institutionnel premium — version slider.
 * Conserve exactement le design du hero single (overlays, halos, typo, filet rouge, liseré bas)
 * et y ajoute : crossfade, Ken Burns, pagination, flèches, barre de progression,
 * clavier (←/→/espace), swipe tactile, pause au survol, a11y complète.
 */
export const InstitutionalHeroSlider: React.FC<Props> = ({
  slides,
  interval = 6500,
  autoPlay = true,
}) => {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(autoPlay)
  const [progress, setProgress] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const hoverRef = useRef(false)
  const touchStartX = useRef<number | null>(null)
  const count = slides.length

  // Respecte prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduceMotion(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const goTo = useCallback(
    (i: number) => {
      setActive(((i % count) + count) % count)
      setProgress(0)
    },
    [count],
  )
  const next = useCallback(() => goTo(active + 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1), [active, goTo])

  // Progression + auto-play
  useEffect(() => {
    if (!playing || count <= 1 || reduceMotion) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      if (hoverRef.current) {
        raf = requestAnimationFrame(tick)
        return
      }
      const elapsed = now - start
      const p = Math.min(elapsed / interval, 1)
      setProgress(p)
      if (p >= 1) {
        next()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, playing, count, interval, next, reduceMotion])

  // Navigation clavier
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === ' ') {
        e.preventDefault()
        setPlaying((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Préchargement des images
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image()
      img.src = s.backgroundImage
    })
  }, [slides])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      if (dx < 0) next()
      else prev()
    }
    touchStartX.current = null
  }

  if (count === 0) return null

  return (
    <section
      className="relative isolate overflow-hidden bg-[#0A1F44] text-white"
      aria-roledescription="carousel"
      aria-label="Présentation institutionnelle"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Pile d'images en crossfade + Ken Burns */}
      {slides.map((s, i) => {
        const isActive = i === active
        return (
          <div
            key={i}
            aria-hidden={!isActive}
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.backgroundImage}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
              style={
                isActive && !reduceMotion
                  ? {
                      animation: `heroKenBurns ${interval + 1500}ms ease-out forwards`,
                    }
                  : undefined
              }
            />
          </div>
        )
      })}

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

      {/* Contenu des slides en crossfade */}
      <div
        className="container relative py-16 md:py-24 lg:py-28"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="relative max-w-3xl min-h-[360px] md:min-h-[420px]">
          {slides.map((s, i) => {
            const isActive = i === active
            return (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} sur ${count}`}
                aria-hidden={!isActive}
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(14px)',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {s.eyebrow && (
                  <div className="inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-white/90">
                    <span className="block w-8 h-px bg-secondary" aria-hidden />
                    <span>{s.eyebrow}</span>
                  </div>
                )}
                <h1 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
                  {s.title}
                </h1>
                {s.description && (
                  <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
                    {s.description}
                  </p>
                )}
                {(s.primaryCta || s.secondaryCta) && (
                  <div className="mt-10 flex flex-wrap gap-3">
                    {s.primaryCta && (
                      <Link
                        href={s.primaryCta.href}
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 text-sm font-semibold hover:bg-secondary/90 transition-colors"
                      >
                        {s.primaryCta.label}
                        <ArrowRight className="w-4 h-4" aria-hidden />
                      </Link>
                    )}
                    {s.secondaryCta && (
                      <Link
                        href={s.secondaryCta.href}
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
                      >
                        {s.secondaryCta.label}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Contrôles : flèches latérales */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Slide précédent"
            className="hidden md:inline-flex absolute top-1/2 -translate-y-1/2 right-20 h-11 w-11 items-center justify-center border border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 hover:border-white/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Slide suivant"
            className="hidden md:inline-flex absolute top-1/2 -translate-y-1/2 right-6 h-11 w-11 items-center justify-center border border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 hover:border-white/50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" aria-hidden />
          </button>
        </>
      )}

      {/* Barre bas : pagination + compteur + lecture */}
      {count > 1 && (
        <div className="absolute bottom-4 md:bottom-6 left-0 right-0 z-10">
          <div className="container flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {/* Pagination (dots + barre active) */}
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Sélection du slide"
              >
                {slides.map((_, i) => {
                  const isActive = i === active
                  return (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Aller au slide ${i + 1}`}
                      onClick={() => goTo(i)}
                      className="group relative h-[3px] overflow-hidden bg-white/25 hover:bg-white/40 transition-colors"
                      style={{ width: isActive ? 44 : 20 }}
                    >
                      <span
                        className="absolute inset-y-0 left-0 bg-white"
                        style={{
                          width: isActive ? `${Math.min(progress * 100, 100)}%` : 0,
                          transition: isActive ? 'none' : 'width 200ms',
                        }}
                      />
                    </button>
                  )
                })}
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-white/70 tabular-nums">
                <span className="text-white">
                  {String(active + 1).padStart(2, '0')}
                </span>
                <span className="w-4 h-px bg-white/30" aria-hidden />
                <span>{String(count).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Bouton lecture / pause */}
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? 'Mettre en pause' : 'Reprendre la lecture'}
              className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-white/80 hover:text-white transition-colors"
            >
              {playing ? (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden />
                  <span className="hidden sm:inline">Lecture</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Liseré dégradé bleu → rouge en bas */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-secondary"
        aria-hidden
      />

      {/* Ken Burns keyframes (locales) */}
      <style>{`
        @keyframes heroKenBurns {
          0%   { transform: scale(1.02) translate3d(0,0,0); }
          100% { transform: scale(1.12) translate3d(-1.5%, -1%, 0); }
        }
      `}</style>
    </section>
  )
}
