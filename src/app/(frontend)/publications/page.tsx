import type { Metadata } from 'next'
import React from 'react'
import { BarChart3, TrendingUp, Gauge, Activity } from 'lucide-react'

import { PageHero } from '@/components/institutional/PageHero'
import { SectionHeading } from '@/components/institutional/SectionHeading'
import { PublicationsList } from '@/components/institutional/PublicationsList'
import { type Publication } from '@/components/institutional/PublicationCard'
import { CTABanner } from '@/components/institutional/CTABanner'

export const metadata: Metadata = {
  title: 'Publications officielles — ENGIP',
  description:
    'Rapports annuels, communiqués de presse, études, documents PDF et statistiques publiques.',
}

const PUBLICATIONS: Publication[] = [
  {
    id: 'p1',
    title: 'Rapport annuel 2025',
    summary:
      'Bilan complet des activités, indicateurs de performance et engagements environnementaux de l’exercice écoulé.',
    type: 'rapport',
    date: '2026-03-28',
    dateLabel: '28 mars 2026',
    fileSize: '4,2 Mo',
    pages: 128,
  },
  {
    id: 'p2',
    title: 'Rapport annuel 2024',
    summary:
      'Bilan consolidé de l’activité 2024, gouvernance, résultats financiers et feuille de route stratégique.',
    type: 'rapport',
    date: '2025-03-15',
    dateLabel: '15 mars 2025',
    fileSize: '3,8 Mo',
    pages: 112,
  },
  {
    id: 'p3',
    title: 'Signature d’un accord stratégique pour le renforcement du réseau',
    summary:
      'Communiqué officiel annonçant un partenariat majeur destiné à moderniser les infrastructures de transport.',
    type: 'communique',
    date: '2026-04-12',
    dateLabel: '12 avril 2026',
    fileSize: '420 Ko',
    pages: 3,
  },
  {
    id: 'p4',
    title: 'Inauguration officielle du nouveau site stratégique',
    summary:
      'Annonce de mise en service d’une installation clé pour la sécurité d’approvisionnement du territoire.',
    type: 'communique',
    date: '2026-03-15',
    dateLabel: '15 mars 2026',
    fileSize: '310 Ko',
    pages: 2,
  },
  {
    id: 'p5',
    title: 'Étude d’impact économique du corridor stratégique',
    summary:
      'Analyse approfondie des retombées économiques, sociales et territoriales du projet d’extension du réseau national.',
    type: 'etude',
    date: '2025-11-20',
    dateLabel: '20 novembre 2025',
    fileSize: '6,1 Mo',
    pages: 72,
  },
  {
    id: 'p6',
    title: 'Étude prospective : décarbonation à horizon 2035',
    summary:
      'Trajectoire de réduction des émissions, scénarios technologiques et recommandations de politique publique.',
    type: 'etude',
    date: '2025-09-05',
    dateLabel: '5 septembre 2025',
    fileSize: '5,3 Mo',
    pages: 84,
  },
  {
    id: 'p7',
    title: 'Bulletin statistique trimestriel — T4 2025',
    summary:
      'Indicateurs opérationnels, volumes transportés, performance du réseau et taux de disponibilité.',
    type: 'statistiques',
    date: '2026-01-30',
    dateLabel: '30 janvier 2026',
    fileSize: '1,1 Mo',
    pages: 24,
  },
  {
    id: 'p8',
    title: 'Données ouvertes — Réseau national (format CSV)',
    summary:
      'Jeu de données public consolidé : linéaires, capacités, sites, disponibilité — mise à jour mensuelle.',
    type: 'statistiques',
    date: '2026-02-10',
    dateLabel: '10 février 2026',
    fileSize: '540 Ko',
  },
]

const HIGHLIGHT_STATS = [
  { icon: BarChart3, value: '99,8 %', label: 'Disponibilité du réseau' },
  { icon: Activity, value: '24/7', label: 'Supervision opérationnelle' },
  { icon: TrendingUp, value: '+12 %', label: 'Volumes transportés (2025)' },
  { icon: Gauge, value: '2,4 Mm³', label: 'Capacité de stockage' },
]

export default function PublicationsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Publications officielles"
        title="Centre de documentation institutionnelle"
        description="Consultez et téléchargez les rapports, communiqués, études et statistiques publiques de l’institution."
        breadcrumbs={[{ label: 'Publications' }]}
      />

      {/* Liste filtrable */}
      <section className="bg-background">
        <div className="container py-14 md:py-16">
          <PublicationsList publications={PUBLICATIONS} />
        </div>
      </section>

      {/* Statistiques publiques mises en avant */}
      <section id="statistiques" className="bg-muted/40 border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Statistiques publiques"
            title="Principaux indicateurs en accès ouvert"
            description="Les indicateurs clés de performance, mis à jour régulièrement dans un souci de transparence publique."
          />
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-4 border border-border bg-background">
            {HIGHLIGHT_STATS.map(({ icon: Icon, value, label }, i, arr) => (
              <div
                key={i}
                className={
                  'p-6 ' +
                  (i < arr.length - 1
                    ? 'border-b lg:border-b-0 lg:border-r border-border md:[&:nth-child(even)]:border-r-0 md:[&:nth-child(even)]:lg:border-r lg:[&:last-child]:border-r-0'
                    : '')
                }
              >
                <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} aria-hidden />
                <div className="mt-4 font-serif text-3xl md:text-4xl font-semibold text-primary leading-none">
                  {value}
                </div>
                <div className="mt-2 text-[0.7rem] uppercase tracking-[0.14em] font-medium text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Données ouvertes et réutilisables — téléchargez les jeux complets dans la liste ci-dessus.
          </p>
        </div>
      </section>

      <CTABanner
        eyebrow="Presse & institutionnel"
        title="Besoin d’un document spécifique ou d’un contact presse ?"
        description="Notre service relations presse et institutionnel répond à vos sollicitations dans les meilleurs délais."
        primaryCta={{ label: 'Relations presse', href: '/contact#presse' }}
        secondaryCta={{ label: 'Nous contacter', href: '/contact' }}
      />
    </main>
  )
}
