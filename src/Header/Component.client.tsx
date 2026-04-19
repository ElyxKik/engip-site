'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Globe, Lock } from 'lucide-react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav, HeaderActions } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={
        'sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b transition-shadow duration-300 ' +
        (scrolled
          ? 'border-border/80 shadow-[0_6px_24px_-12px_rgba(10,31,68,0.25)]'
          : 'border-border')
      }
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {/* Official top strip — se replie au scroll pour un header compact pro */}
      <div
        className={
          'bg-primary text-primary-foreground text-xs overflow-hidden transition-all duration-300 ' +
          (scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100')
        }
        aria-hidden={scrolled}
      >
        <div className="container flex items-center justify-between gap-3 h-8">
          <span className="uppercase tracking-[0.14em] font-medium truncate">
            <span className="hidden sm:inline">
              Site officiel — République Démocratique du Congo
            </span>
            <span className="sm:hidden">Site officiel — RDC</span>
          </span>
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              aria-label="Choisir la langue"
            >
              <Globe className="w-3.5 h-3.5" aria-hidden />
              <span className="font-medium">FR</span>
              <span className="opacity-60 hidden sm:inline">/ EN / AR</span>
            </button>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              aria-label="Espace administration"
            >
              <Lock className="w-3.5 h-3.5" aria-hidden />
              <span className="font-medium hidden md:inline">Espace administration</span>
              <span className="font-medium md:hidden">Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header bar — 3 colonnes sur desktop : logo | menu centré | actions */}
      <div
        className={
          'container flex items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr] transition-[padding] duration-300 ' +
          (scrolled ? 'py-3' : 'py-5')
        }
      >
        <Link
          href="/"
          aria-label="Retour à l'accueil"
          className="justify-self-start"
        >
          <Logo loading="eager" priority="high" />
        </Link>
        <div className="ml-auto lg:ml-0 lg:justify-self-center">
          <HeaderNav data={data} />
        </div>
        <div className="hidden lg:block lg:justify-self-end">
          <HeaderActions />
        </div>
      </div>

      {/* Decorative accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary via-primary to-secondary" />
    </header>
  )
}
