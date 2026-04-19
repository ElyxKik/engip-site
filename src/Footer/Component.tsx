import Link from 'next/link'
import React from 'react'
import { MapPin, Mail, Phone } from 'lucide-react'

import { Logo } from '@/components/Logo/Logo'

const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Institution',
    links: [
      { label: 'Présentation', href: '/institution' },
      { label: 'Mission & mandat', href: '/institution#mission' },
      { label: 'Historique', href: '/institution#historique' },
      { label: 'Gouvernance', href: '/institution#gouvernance' },
    ],
  },
  {
    title: 'Activités',
    links: [
      { label: 'Infrastructures nationales', href: '/infrastructures' },
      { label: 'Projets stratégiques', href: '/projets' },
      { label: 'Sécurité & conformité', href: '/securite-conformite' },
      { label: 'Carrières', href: '/carrieres' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Publications officielles', href: '/publications' },
      { label: 'Rapports annuels', href: '/publications?type=rapport' },
      { label: 'Communiqués de presse', href: '/publications?type=communique' },
      { label: 'Appels d’offres', href: '/appels-offres' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Nous contacter', href: '/contact' },
      { label: 'Relations presse', href: '/contact#presse' },
      { label: 'Espace fournisseurs', href: '/appels-offres/fournisseurs' },
      { label: 'Administration', href: '/admin' },
    ],
  },
]

export async function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border">
      {/* Accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-primary to-secondary" />

      {/* Main footer */}
      <div className="bg-[#0A1F44] text-white/90">
        <div className="container py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Retour à l'accueil">
              <Logo variant="light" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-sm">
              ENGIP-RDC — Entreprise Nationale de Gestion des Infrastructures
              Pétrolières, au service de la sécurité et de la souveraineté
              énergétiques de la République Démocratique du Congo.
            </p>
            <address className="mt-6 not-italic text-sm space-y-2 text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-secondary shrink-0" aria-hidden />
                <span>
                  Boulevard du 30 Juin, Commune de la Gombe
                  <br />
                  Kinshasa, République Démocratique du Congo
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary shrink-0" aria-hidden />
                <a href="tel:+243810000000" className="hover:text-white transition-colors">
                  +243 810 00 00 00
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary shrink-0" aria-hidden />
                <a
                  href="mailto:contact@engip.cd"
                  className="hover:text-white transition-colors"
                >
                  contact@engip.cd
                </a>
              </div>
            </address>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[0.72rem] uppercase tracking-[0.16em] font-semibold text-white mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-white/60">
            <span>© {year} ENGIP — Tous droits réservés.</span>
            <nav className="flex flex-wrap gap-5" aria-label="Informations légales">
              <Link href="/mentions-legales" className="hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/accessibilite" className="hover:text-white transition-colors">
                Accessibilité
              </Link>
              <Link href="/plan-du-site" className="hover:text-white transition-colors">
                Plan du site
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
