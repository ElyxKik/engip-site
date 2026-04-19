import type { Metadata } from 'next'
import React from 'react'
import {
  HeartPulse,
  HardHat,
  Leaf,
  CheckCircle2,
  Siren,
  ShieldAlert,
  Activity,
  Scale,
} from 'lucide-react'

import { PageHero } from '@/components/institutional/PageHero'
import { SectionHeading } from '@/components/institutional/SectionHeading'
import { PillarsGrid } from '@/components/institutional/PillarsGrid'
import { StatBlock } from '@/components/institutional/StatBlock'
import {
  CertificationBadge,
  type Certification,
} from '@/components/institutional/CertificationBadge'
import { CTABanner } from '@/components/institutional/CTABanner'

export const metadata: Metadata = {
  title: 'Sécurité & conformité — ENGIP',
  description:
    'Normes HSE, certifications internationales, politiques environnementales et gestion des risques.',
}

const CERTIFICATIONS: Certification[] = [
  {
    code: 'ISO 9001',
    title: 'Management de la qualité',
    description:
      'Système de management de la qualité certifié selon la norme internationale ISO 9001:2015.',
    validUntil: '2027',
  },
  {
    code: 'ISO 14001',
    title: 'Management environnemental',
    description:
      'Certification du système de management environnemental, conforme à ISO 14001:2015.',
    validUntil: '2027',
  },
  {
    code: 'ISO 45001',
    title: 'Santé & sécurité au travail',
    description:
      'Certification du système de management SST selon ISO 45001:2018.',
    validUntil: '2026',
  },
  {
    code: 'ISO 27001',
    title: 'Sécurité de l’information',
    description:
      'Système de management de la sécurité de l’information — ISO/IEC 27001:2022.',
    validUntil: '2028',
  },
  {
    code: 'ISO 50001',
    title: 'Management de l’énergie',
    description:
      'Système de management de l’énergie — ISO 50001:2018, démarche d’efficacité énergétique.',
    validUntil: '2027',
  },
  {
    code: 'ISO 22301',
    title: 'Continuité d’activité',
    description:
      'Système de management de la continuité d’activité selon ISO 22301:2019.',
    validUntil: '2026',
  },
]

const RISK_CATEGORIES = [
  {
    icon: Siren,
    title: 'Risques opérationnels',
    description:
      'Défaillance technique, sûreté des installations, continuité des opérations et maintenance préventive.',
    controls: [
      'Plans de maintenance rigoureux',
      'Inspections non destructives périodiques',
      'Supervision 24/7 centralisée',
    ],
  },
  {
    icon: ShieldAlert,
    title: 'Risques sûreté & cyber',
    description:
      'Protection physique des sites critiques, cybersécurité industrielle, gestion des accès et continuité numérique.',
    controls: [
      'Périmètres sécurisés multi-niveaux',
      'SOC industriel et détection des menaces',
      'Plan de réponse à incidents',
    ],
  },
  {
    icon: Activity,
    title: 'Risques HSE & environnementaux',
    description:
      'Prévention des accidents, protection de l’environnement, gestion des situations d’urgence.',
    controls: [
      'Analyses de risques systématiques',
      'Exercices d’urgence réguliers',
      'Reporting environnemental transparent',
    ],
  },
  {
    icon: Scale,
    title: 'Conformité & éthique',
    description:
      'Respect des obligations légales, lutte contre la corruption, éthique des affaires et relations fournisseurs.',
    controls: [
      'Charte éthique opposable',
      'Dispositif d’alerte interne',
      'Audits de conformité indépendants',
    ],
  },
]

const ENV_COMMITMENTS = [
  {
    year: 'Horizon 2030',
    label: 'Réduction de 35 % des émissions directes de GES',
  },
  {
    year: 'Horizon 2035',
    label: 'Trajectoire de neutralité carbone opérationnelle',
  },
  {
    year: 'Chaque année',
    label: 'Publication d’un bilan environnemental indépendant',
  },
  {
    year: 'Pour tout projet',
    label: 'Étude d’impact et concertation locale systématiques',
  },
]

export default function SecuriteConformitePage() {
  return (
    <main>
      <PageHero
        eyebrow="Sécurité & conformité"
        title="L’excellence opérationnelle comme engagement public"
        description="Nos engagements HSE, nos certifications, notre politique environnementale et notre gestion des risques reflètent une exigence constante d’intégrité et de performance."
        breadcrumbs={[{ label: 'Sécurité & conformité' }]}
      />

      {/* Indicateurs clés HSE */}
      <section className="container py-14 md:py-16">
        <StatBlock
          stats={[
            { value: '0', label: 'Accident grave (2025)' },
            { value: '100', unit: '%', label: 'Sites certifiés' },
            { value: '48', label: 'Audits annuels' },
            { value: '24', unit: '/7', label: 'Supervision HSE' },
          ]}
        />
      </section>

      {/* Normes HSE */}
      <section id="hse" className="bg-muted/40 border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Normes HSE"
            title="Santé, Sécurité, Environnement, Qualité"
            description="Quatre piliers fondamentaux qui structurent notre politique opérationnelle."
          />
          <div className="mt-12">
            <PillarsGrid
              pillars={[
                {
                  icon: HeartPulse,
                  title: 'Santé',
                  description:
                    'Protection de la santé des collaborateurs, des partenaires et des populations riveraines.',
                },
                {
                  icon: HardHat,
                  title: 'Sécurité',
                  description:
                    'Prévention des risques industriels, exercices d’urgence et culture sécurité partagée.',
                },
                {
                  icon: Leaf,
                  title: 'Environnement',
                  description:
                    'Maîtrise des impacts, biodiversité, gestion des ressources et transition bas-carbone.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="bg-background border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Certifications"
            title="Des standards internationaux reconnus"
            description="Nos systèmes de management sont audités et certifiés par des organismes indépendants."
          />
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3 border border-border">
            {CERTIFICATIONS.map((c, i) => (
              <div
                key={c.code}
                className={
                  'border-border ' +
                  (i < CERTIFICATIONS.length - 1 ? '[&:not(:last-child)]:border-b ' : '') +
                  'md:[&:not(:nth-last-child(-n+2))]:border-b md:[&:nth-last-child(-n+2)]:border-b-0 ' +
                  'md:[&:nth-child(odd)]:border-r ' +
                  'lg:[&:not(:nth-last-child(-n+3))]:border-b lg:[&:nth-last-child(-n+3)]:border-b-0 ' +
                  'lg:[&:not(:nth-child(3n))]:border-r lg:[&:nth-child(3n)]:border-r-0 ' +
                  'md:[&:nth-child(odd)]:lg:[&:nth-child(3n)]:border-r-0'
                }
              >
                <CertificationBadge cert={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Politiques environnementales */}
      <section id="environnement" className="bg-muted/40 border-y border-border">
        <div className="container py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
            <div>
              <SectionHeading
                eyebrow="Politique environnementale"
                title="Une transition durable pilotée par la responsabilité"
              />
              <p className="mt-6 text-base md:text-lg text-foreground/85 leading-relaxed">
                Notre politique environnementale articule maîtrise des impacts,
                préservation de la biodiversité, gestion rigoureuse des ressources
                et contribution active à la transition bas-carbone. Elle se traduit
                par des engagements mesurables et une transparence publique totale.
              </p>
              <p className="mt-4 text-base md:text-lg text-foreground/85 leading-relaxed">
                Chaque projet d’infrastructure fait l’objet d’études d’impact
                environnemental approfondies et d’une concertation avec les parties
                prenantes locales.
              </p>
            </div>
            <ul className="divide-y divide-border border-y border-border bg-background">
              {ENV_COMMITMENTS.map((e, i) => (
                <li key={i} className="flex items-start gap-5 p-5">
                  <CheckCircle2
                    className="w-5 h-5 text-primary shrink-0 mt-0.5"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <div className="text-[0.68rem] uppercase tracking-[0.14em] font-semibold text-secondary">
                      {e.year}
                    </div>
                    <div className="mt-1 font-serif text-base md:text-lg font-medium text-foreground leading-snug">
                      {e.label}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gestion des risques */}
      <section id="risques" className="bg-background">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Gestion des risques"
            title="Une approche intégrée et continue"
            description="Un dispositif structuré identifiant, évaluant et maîtrisant les risques sur l’ensemble de la chaîne de valeur."
          />
          <div className="mt-10 grid gap-0 md:grid-cols-2 border border-border">
            {RISK_CATEGORIES.map(({ icon: Icon, title, description, controls }, i, arr) => (
              <article
                key={title}
                className={
                  'relative p-8 bg-background ' +
                  (i < arr.length - 1 ? '[&:not(:last-child)]:border-b ' : '') +
                  'md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-b md:[&:nth-last-child(-n+2)]:border-b-0'
                }
              >
                <span
                  className="absolute top-0 left-0 w-16 h-[3px] bg-secondary"
                  aria-hidden
                />
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/5 text-primary mb-5">
                  <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground leading-snug">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/85">
                  {controls.map((c) => (
                    <li key={c} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 block w-1.5 h-1.5 bg-primary shrink-0"
                        aria-hidden
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Documentation"
        title="Consultez nos publications et rapports HSE"
        description="Rapports annuels, études d’impact et bilans environnementaux sont disponibles en accès ouvert."
        primaryCta={{ label: 'Voir les publications', href: '/publications' }}
        secondaryCta={{ label: 'Nous contacter', href: '/contact' }}
      />
    </main>
  )
}
