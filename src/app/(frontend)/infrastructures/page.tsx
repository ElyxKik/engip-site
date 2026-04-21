import type { Metadata } from 'next'
import React from 'react'
import { GitBranch, Warehouse, Factory, Gauge, Truck, Anchor } from 'lucide-react'

import { PageHero } from '@/components/institutional/PageHero'
import { SectionHeading } from '@/components/institutional/SectionHeading'
import { StatBlock } from '@/components/institutional/StatBlock'
import { CTABanner } from '@/components/institutional/CTABanner'

export const metadata: Metadata = {
  title: 'Infrastructures pétrolières — ENGIP-RDC',
  description:
    'Réseau de transport pétrolier, sites de stockage stratégiques, terminaux et installations critiques de l’aval pétrolier congolais.',
}

const CATEGORIES = [
  {
    id: 'reseau',
    icon: GitBranch,
    title: 'Réseau de transport',
    subtitle: 'Pipelines & routes logistiques',
    description:
      'Un maillage structurant de pipelines et de routes logistiques assurant la continuité des flux sur l’ensemble du territoire.',
    stats: [
      { value: '3 200', unit: 'km', label: 'Linéaire total' },
      { value: '18', label: 'Axes stratégiques' },
      { value: '99.8', unit: '%', label: 'Disponibilité' },
    ],
    highlights: [
      'Surveillance en temps réel par centre de supervision national',
      'Maintenance préventive programmée',
      'Certifications internationales de sécurité',
    ],
  },
  {
    id: 'stockage',
    icon: Warehouse,
    title: 'Sites de stockage',
    subtitle: 'Capacités nationales réparties',
    description:
      'Une capacité de stockage stratégique répartie sur le territoire pour garantir la résilience nationale.',
    stats: [
      { value: '48', label: 'Sites opérationnels' },
      { value: '2.4', unit: 'Mm³', label: 'Capacité cumulée' },
      { value: '24', unit: '/7', label: 'Supervision' },
    ],
    highlights: [
      'Redondance et plans de continuité',
      'Audits environnementaux périodiques',
      'Normes HSE internationales',
    ],
  },
  {
    id: 'installations',
    icon: Factory,
    title: 'Installations stratégiques',
    subtitle: 'Sites critiques et terminaux',
    description:
      'Des installations critiques — terminaux portuaires, stations de compression, centres de contrôle — au cœur du dispositif national.',
    stats: [
      { value: '26', label: 'Sites critiques' },
      { value: '6', label: 'Terminaux majeurs' },
      { value: '1 400', unit: '+', label: 'Personnels dédiés' },
    ],
    highlights: [
      'Périmètres sécurisés et certifiés',
      'Plans d’intervention d’urgence',
      'Coopération avec les autorités',
    ],
  },
]

export default function InfrastructuresPage() {
  return (
    <main>
      <PageHero
        eyebrow="Infrastructures pétrolières"
        title="La colonne vertébrale de l’aval pétrolier congolais"
        description="Réseau de transport (pipelines, logistique), sites de stockage stratégiques et terminaux : l’ensemble des infrastructures pétrolières opérées au service de la sécurité d’approvisionnement de la RDC."
        breadcrumbs={[{ label: 'Infrastructures' }]}
      />

      {/* Chiffres clés consolidés */}
      <section className="container py-14 md:py-16">
        <StatBlock
          stats={[
            { value: '3 200', unit: 'km', label: 'Réseau total' },
            { value: '48', label: 'Sites de stockage' },
            { value: '26', label: 'Installations critiques' },
            { value: '99.8', unit: '%', label: 'Disponibilité' },
          ]}
        />
      </section>

      {/* Catégories */}
      {CATEGORIES.map((cat, i) => {
        const isEven = i % 2 === 0
        const Icon = cat.icon
        return (
          <section
            key={cat.id}
            id={cat.id}
            className={isEven ? 'bg-background border-y border-border' : 'bg-muted/40 border-y border-border'}
          >
            <div className="container py-16 md:py-20">
              <div className="grid gap-10 lg:grid-cols-12 items-start">
                <div className="lg:col-span-5">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/5 text-primary mb-6">
                    <Icon className="w-6 h-6" strokeWidth={1.5} aria-hidden />
                  </div>
                  <div className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-secondary">
                    <span className="block w-6 h-px bg-secondary" aria-hidden />
                    <span>{cat.subtitle}</span>
                  </div>
                  <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                    {cat.title}
                  </h2>
                  <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {cat.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-foreground/85">
                        <span
                          className="mt-1.5 block w-1.5 h-1.5 bg-secondary shrink-0"
                          aria-hidden
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-7">
                  <div className="grid grid-cols-3 divide-x divide-border border border-border bg-background">
                    {cat.stats.map((s, k) => (
                      <div key={k} className="p-6 text-center">
                        <div className="font-serif font-semibold text-primary leading-none">
                          <span className="text-3xl md:text-4xl">{s.value}</span>
                          {s.unit && (
                            <span className="ml-1 text-lg md:text-xl text-secondary font-medium">
                              {s.unit}
                            </span>
                          )}
                        </div>
                        <div className="mt-3 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground font-medium">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Visuel illustratif sobre */}
                  <div className="mt-6 aspect-[16/8] bg-gradient-to-br from-primary/5 via-primary/3 to-secondary/5 border border-border flex items-center justify-center">
                    <div className="flex items-center gap-3 text-muted-foreground/60">
                      {cat.id === 'reseau' && (
                        <>
                          <Truck className="w-6 h-6" strokeWidth={1.4} aria-hidden />
                          <GitBranch className="w-6 h-6" strokeWidth={1.4} aria-hidden />
                        </>
                      )}
                      {cat.id === 'stockage' && (
                        <>
                          <Warehouse className="w-6 h-6" strokeWidth={1.4} aria-hidden />
                          <Gauge className="w-6 h-6" strokeWidth={1.4} aria-hidden />
                        </>
                      )}
                      {cat.id === 'installations' && (
                        <>
                          <Factory className="w-6 h-6" strokeWidth={1.4} aria-hidden />
                          <Anchor className="w-6 h-6" strokeWidth={1.4} aria-hidden />
                        </>
                      )}
                      <span className="text-xs uppercase tracking-[0.14em] font-medium">
                        Illustration
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <CTABanner
        eyebrow="Projets"
        title="Découvrez les projets stratégiques en cours"
        description="Investissements, extensions et modernisations : le futur du réseau national se construit aujourd’hui."
        primaryCta={{ label: 'Voir les projets', href: '/projets' }}
        secondaryCta={{ label: 'Publications officielles', href: '/publications' }}
      />
    </main>
  )
}
