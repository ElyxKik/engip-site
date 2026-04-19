'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  SearchIcon,
  ChevronDown,
  Menu as MenuIcon,
  X as CloseIcon,
  ArrowRight,
  Plus,
  Minus,
} from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'
import { NAV_GROUPS, type NavGroup } from '../navigation'

/**
 * Navigation institutionnelle responsive :
 *  - Desktop (≥ lg) : méga-menus déroulants (hover + focus + clavier)
 *  - Mobile (< lg) : bouton burger + panneau coulissant avec accordéons
 */
/** Menu principal — centré sur desktop, burger sur mobile. */
export const HeaderNav: React.FC<{ data: HeaderType }> = () => {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  )
}

/** Actions de droite sur desktop : recherche + CTA fournisseurs. */
export const HeaderActions: React.FC = () => (
  <div className="hidden lg:flex items-center gap-2">
    <Link
      href="/search"
      aria-label="Rechercher"
      className="p-2 rounded-md text-foreground/70 hover:text-primary hover:bg-muted transition-colors"
    >
      <SearchIcon className="w-4 h-4" aria-hidden />
    </Link>
    <Link
      href="/appels-offres/fournisseurs"
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
    >
      Espace fournisseurs
    </Link>
  </div>
)

/* ---------------------------------- Desktop --------------------------------- */

const DesktopNav: React.FC = () => {
  const pathname = usePathname()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  const scheduleClose = () => {
    clearTimer()
    closeTimer.current = setTimeout(() => setOpenIndex(null), 120)
  }

  // Close on ESC and on route change
  useEffect(() => setOpenIndex(null), [pathname])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <nav
      className="hidden lg:flex items-center justify-center gap-1"
      aria-label="Navigation principale"
      onMouseLeave={scheduleClose}
    >
      {NAV_GROUPS.map((group, i) => {
        const active =
          group.href === '/'
            ? pathname === '/'
            : pathname === group.href || pathname?.startsWith(group.href + '/')
        const isOpen = openIndex === i
        const hasItems = group.items.length > 0

        // Top-level simple link (e.g. "Accueil") — no dropdown.
        if (!hasItems) {
          return (
            <Link
              key={group.label}
              href={group.href}
              className={
                'relative px-3 py-2 text-sm font-medium transition-colors ' +
                (active ? 'text-primary' : 'text-foreground/80 hover:text-primary')
              }
              aria-current={active ? 'page' : undefined}
              onMouseEnter={() => {
                clearTimer()
                setOpenIndex(null)
              }}
            >
              {group.label}
              {active && (
                <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-secondary" />
              )}
            </Link>
          )
        }

        return (
          <div
            key={group.label}
            className="relative"
            onMouseEnter={() => {
              clearTimer()
              setOpenIndex(i)
            }}
          >
            <button
              type="button"
              className={
                'relative inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ' +
                (active || isOpen
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-primary')
              }
              aria-expanded={isOpen}
              aria-haspopup="true"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              onFocus={() => {
                clearTimer()
                setOpenIndex(i)
              }}
            >
              {group.label}
              <ChevronDown
                className={
                  'w-3.5 h-3.5 transition-transform ' + (isOpen ? 'rotate-180' : '')
                }
                aria-hidden
              />
              {active && (
                <span className="absolute left-3 right-6 -bottom-0.5 h-[2px] bg-secondary" />
              )}
            </button>

            {isOpen && <MegaPanel group={group} />}
          </div>
        )
      })}
    </nav>
  )
}

const MegaPanel: React.FC<{ group: NavGroup }> = ({ group }) => {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-40"
      role="menu"
    >
      <div className="w-[min(640px,90vw)] bg-background border border-border shadow-[0_20px_50px_-20px_rgba(10,31,68,0.25)]">
        {/* Accent top bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-primary via-primary to-secondary" />
        <div className="grid grid-cols-[1.1fr_2fr] gap-0">
          {/* Left intro column */}
          <div className="bg-muted/60 p-6 border-r border-border">
            <div className="inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] font-semibold text-secondary">
              <span className="block w-5 h-px bg-secondary" aria-hidden />
              <span>Section</span>
            </div>
            <h3 className="mt-3 font-serif text-xl font-semibold text-foreground leading-tight">
              {group.label}
            </h3>
            {group.description && (
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {group.description}
              </p>
            )}
            <Link
              href={group.href}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
              role="menuitem"
            >
              Voir toute la section
              <ArrowRight className="w-3.5 h-3.5" aria-hidden />
            </Link>
          </div>

          {/* Right items column */}
          <ul className="p-3">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  role="menuitem"
                  className="group flex items-start gap-3 rounded-sm p-3 hover:bg-muted/70 transition-colors"
                >
                  <span
                    className="mt-2 block w-1.5 h-1.5 bg-primary/30 group-hover:bg-secondary transition-colors shrink-0"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {item.description}
                      </div>
                    )}
                  </div>
                  <ArrowRight
                    className="w-4 h-4 mt-1 text-muted-foreground/0 group-hover:text-secondary group-hover:translate-x-0.5 transition-all"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------- Mobile ---------------------------------- */

const MobileNav: React.FC = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  useEffect(() => setIsOpen(false), [pathname])

  // Lock body scroll when open
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div className="lg:hidden flex items-center gap-1">
      <Link
        href="/search"
        aria-label="Rechercher"
        className="p-2 text-foreground/70 hover:text-primary transition-colors"
      >
        <SearchIcon className="w-5 h-5" aria-hidden />
      </Link>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={isOpen}
        className="p-2 text-primary hover:bg-muted transition-colors"
      >
        <MenuIcon className="w-6 h-6" aria-hidden />
      </button>

      {isOpen && mounted && createPortal(
        <div
          className="bg-black/50"
          style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <aside
            className="bg-background shadow-2xl flex flex-col"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(420px, 92vw)',
              maxWidth: '100vw',
              backgroundColor: 'var(--background)',
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            {/* Header of the panel */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-border">
              <span className="text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-primary">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fermer le menu"
                className="p-2 text-foreground hover:bg-muted transition-colors"
              >
                <CloseIcon className="w-5 h-5" aria-hidden />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <nav aria-label="Navigation principale">
                <ul className="divide-y divide-border">
                  {NAV_GROUPS.map((group, i) => {
                    const isExpanded = expanded === i
                    const hasItems = group.items.length > 0

                    // Plain link (e.g. "Accueil")
                    if (!hasItems) {
                      return (
                        <li key={group.label}>
                          <Link
                            href={group.href}
                            className="flex items-center justify-between px-5 py-4 font-serif text-base font-semibold text-foreground hover:bg-muted/60 transition-colors"
                          >
                            {group.label}
                            <ArrowRight className="w-4 h-4 text-primary" aria-hidden />
                          </Link>
                        </li>
                      )
                    }

                    return (
                      <li key={group.label}>
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded(isExpanded ? null : i)
                          }
                          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/60 transition-colors"
                          aria-expanded={isExpanded}
                        >
                          <span className="font-serif text-base font-semibold text-foreground">
                            {group.label}
                          </span>
                          {isExpanded ? (
                            <Minus className="w-4 h-4 text-secondary" aria-hidden />
                          ) : (
                            <Plus className="w-4 h-4 text-primary" aria-hidden />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="bg-muted/40 border-t border-border">
                            <Link
                              href={group.href}
                              className="flex items-center justify-between px-5 py-3 text-sm font-semibold text-primary hover:bg-background transition-colors"
                            >
                              Voir toute la section
                              <ArrowRight className="w-4 h-4" aria-hidden />
                            </Link>
                            <ul>
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    className="block px-5 py-3 pl-7 text-sm text-foreground/80 hover:bg-background hover:text-primary transition-colors border-t border-border"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            {/* Footer CTA */}
            <div className="p-5 border-t border-border space-y-3">
              <Link
                href="/appels-offres/fournisseurs"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Espace fournisseurs
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
              <div className="flex gap-2 text-xs text-muted-foreground justify-center">
                <button type="button" className="px-2 py-1 font-medium text-foreground">
                  FR
                </button>
                <span>/</span>
                <button type="button" className="px-2 py-1 hover:text-primary transition-colors">
                  EN
                </button>
                <span>/</span>
                <button type="button" className="px-2 py-1 hover:text-primary transition-colors">
                  AR
                </button>
              </div>
            </div>
          </aside>
        </div>,
        document.body,
      )}
    </div>
  )
}
