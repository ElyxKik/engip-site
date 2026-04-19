import type { Metadata } from 'next'
import React from 'react'
import {
  Target,
  Eye,
  Landmark,
  Building2,
  Users as UsersIcon,
  Wrench,
  Shield,
  ClipboardCheck,
  Briefcase,
  Database,
  BookOpen,
  TrendingUp,
} from 'lucide-react'

import { PageHero } from '@/components/institutional/PageHero'
import { SectionHeading } from '@/components/institutional/SectionHeading'
import { PillarsGrid } from '@/components/institutional/PillarsGrid'
import { Timeline } from '@/components/institutional/Timeline'
import { LeadershipGrid, type Leader } from '@/components/institutional/LeadershipGrid'
import { CEOMessage } from '@/components/institutional/CEOMessage'
import { CTABanner } from '@/components/institutional/CTABanner'

export const metadata: Metadata = {
  title: 'Institution — ENGIP-RDC',
  description:
    'L’Entreprise Nationale de Gestion des Infrastructures Pétrolières de la RDC : missions, vision, gouvernance et organisation interne.',
}

/** Les 7 missions officielles de l'ENGIP-RDC. */
const MISSIONS = [
  {
    icon: Wrench,
    title: 'Ingénierie & exploitation des infrastructures pétrolières',
    description:
      'Assurer la conception, l’ingénierie, la réalisation, l’exploitation, la maintenance et le développement d’installations, d’équipements et de matériels de logistique pétrolière sur l’ensemble du territoire national.',
  },
  {
    icon: ClipboardCheck,
    title: 'Gestion rigoureuse des actifs pétroliers',
    description:
      'Garantir une gestion rigoureuse, transparente et responsable des actifs pétroliers conformément aux lois et aux standards reconnus dans l’industrie pétrolière.',
  },
  {
    icon: Shield,
    title: 'Résilience & sécurisation de l’approvisionnement',
    description:
      'Renforcer la résilience et la gestion des risques en mettant en place des mécanismes de prévention, de gestion des incidents et de continuité d’activité afin de protéger les infrastructures critiques et sécuriser l’approvisionnement national.',
  },
  {
    icon: Briefcase,
    title: 'Participations dans les sociétés stratégiques',
    description:
      'Prendre intérêt, par divers mécanismes commerciaux et financiers, dans les sociétés de nature à favoriser le développement, l’exploitation et la gestion des infrastructures pétrolières.',
  },
  {
    icon: Database,
    title: 'Base de données de l’aval pétrolier congolais',
    description:
      'Gérer la base de données relative aux activités de l’aval pétrolier congolais.',
  },
  {
    icon: BookOpen,
    title: 'Études sectorielles',
    description:
      'Concevoir des études relatives à l’exploitation des infrastructures pétrolières en République Démocratique du Congo.',
  },
  {
    icon: TrendingUp,
    title: 'Développement économique & expertise nationale',
    description:
      'Contribuer au développement économique et à l’emploi national. Optimiser les coûts liés à la logistique qui impactent les prix des produits pétroliers à la pompe et développer l’expertise nationale.',
  },
]

const LEADERS: Leader[] = [
  { name: 'Prénom NOM', role: 'Directeur Général' },
  { name: 'Prénom NOM', role: 'Directeur Général Adjoint' },
  { name: 'Prénom NOM', role: 'Directeur Financier' },
  { name: 'Prénom NOM', role: 'Directeur des Opérations' },
]

const BOARD: Leader[] = [
  { name: 'Prénom NOM', role: 'Président du Conseil' },
  { name: 'Prénom NOM', role: 'Administrateur' },
  { name: 'Prénom NOM', role: 'Administratrice' },
  { name: 'Prénom NOM', role: 'Administrateur' },
]

export default function InstitutionPage() {
  return (
    <main>
      <PageHero
        eyebrow="Entreprise publique"
        title="L’ENGIP-RDC, opérateur national de la logistique pétrolière"
        description="Une institution publique dédiée au renforcement de la sécurité et de la souveraineté énergétiques de la République Démocratique du Congo."
        breadcrumbs={[{ label: 'Institution' }]}
      />

      {/* Présentation */}
      <section id="presentation" className="container py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] items-start">
          <SectionHeading
            eyebrow="Présentation"
            title="Un acteur stratégique de la souveraineté énergétique"
          />
          <div className="prose prose-neutral max-w-none text-base md:text-lg text-foreground/85 leading-relaxed space-y-5">
            <p>
              L’<strong>ENGIP-RDC</strong> — <em>Entreprise Nationale de Gestion des
              Infrastructures Pétrolières</em> — est une institution publique dont la
              mise en place s’inscrit dans une dynamique de renforcement de la sécurité
              et de la souveraineté énergétiques de la République Démocratique du Congo.
            </p>
            <p>
              À ce titre, l’entreprise conduit l’ensemble des activités de la
              logistique pétrolière sur le territoire national : conception,
              ingénierie, réalisation, exploitation, maintenance et développement des
              installations et équipements stratégiques du secteur aval.
            </p>
            <p>
              Placé sous tutelle publique, l’ENGIP-RDC agit selon les principes de
              transparence, d’excellence opérationnelle et de responsabilité, et
              contribue activement au développement économique et à l’expertise
              nationale.
            </p>
          </div>
        </div>
      </section>

      {/* 7 missions officielles */}
      <section id="missions" className="bg-background border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Missions officielles"
            title="Sept missions au service de la nation"
            description="L’ENGIP-RDC poursuit sept missions complémentaires, structurant son action au service de la sécurité énergétique et du développement national."
          />
          <ol className="mt-12 grid gap-0 md:grid-cols-2 border border-border">
            {MISSIONS.map(({ icon: Icon, title, description }, i) => (
              <li
                key={i}
                className={
                  'relative bg-background p-6 md:p-8 flex gap-5 ' +
                  '[&:not(:last-child)]:border-b ' +
                  'md:[&:nth-child(odd)]:border-r md:border-border ' +
                  'md:[&:nth-last-child(-n+2)]:border-b-0 md:[&:nth-last-child(-n+2):nth-child(even)]:border-b-0'
                }
              >
                <span
                  className="absolute top-0 left-0 w-12 h-[3px] bg-secondary"
                  aria-hidden
                />
                <div className="shrink-0">
                  <div className="relative inline-flex items-center justify-center w-14 h-14 bg-primary/5 text-primary">
                    <Icon className="w-6 h-6" strokeWidth={1.5} aria-hidden />
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground leading-snug">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Vision / Mandat */}
      <section id="mission" className="bg-muted/40 border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Raison d’être"
            title="Mission, vision et mandat public"
            description="Les trois piliers qui structurent notre action au quotidien."
          />
          <div className="mt-12">
            <PillarsGrid
              pillars={[
                {
                  icon: Target,
                  title: 'Mission',
                  description:
                    'Assurer la maîtrise publique de la logistique pétrolière et sécuriser l’approvisionnement énergétique de la RDC.',
                },
                {
                  icon: Eye,
                  title: 'Vision',
                  description:
                    'Devenir l’opérateur pétrolier public de référence, moteur de la souveraineté énergétique et de l’expertise nationale.',
                },
                {
                  icon: Landmark,
                  title: 'Mandat public',
                  description:
                    'Exercer une mission de service public placée sous tutelle institutionnelle, dans le respect des principes de transparence et de redevabilité.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Message du CEO */}
      <div id="mot-du-ceo">
        <CEOMessage
          name="Prénom NOM"
          role="Directeur Général"
          excerpt="L’ENGIP-RDC porte une ambition claire : renforcer la sécurité et la souveraineté énergétiques de la République Démocratique du Congo en plaçant la logistique pétrolière sous la maîtrise publique. Nos sept missions guident chacune de nos décisions, avec une exigence permanente de transparence, de rigueur et de contribution au développement économique du pays."
          readMoreHref="#missions"
        />
      </div>

      {/* Historique */}
      <section id="historique" className="bg-background border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Historique"
            title="Les grandes étapes de notre institution"
            description="Une trajectoire jalonnée d’investissements structurants et d’engagements au service de la nation."
          />
          <div className="mt-12 max-w-4xl">
            <Timeline
              entries={[
                {
                  year: 'Historique',
                  title: 'L’aval pétrolier congolais',
                  description:
                    'Structuration progressive du secteur pétrolier aval et des infrastructures logistiques stratégiques en RDC.',
                },
                {
                  year: '2020+',
                  title: 'Réflexion institutionnelle',
                  description:
                    'Identification du besoin d’un opérateur public dédié à la gestion des infrastructures pétrolières pour consolider la souveraineté énergétique.',
                },
                {
                  year: 'Création',
                  title: 'Mise en place de l’ENGIP-RDC',
                  description:
                    'Création de l’Entreprise Nationale de Gestion des Infrastructures Pétrolières, chargée de sept missions de service public.',
                },
                {
                  year: 'Phase 1',
                  title: 'Inventaire & cartographie des actifs',
                  description:
                    'Recensement exhaustif des infrastructures pétrolières nationales et mise en place de la base de données de l’aval pétrolier congolais.',
                },
                {
                  year: 'Aujourd’hui',
                  title: 'Opérationnalisation & développement',
                  description:
                    'Exploitation, maintenance, sécurisation et développement des infrastructures stratégiques sur l’ensemble du territoire.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Gouvernance */}
      <section id="gouvernance" className="container py-16 md:py-20">
        <SectionHeading
          eyebrow="Gouvernance"
          title="Direction générale et conseil d’administration"
          description="Une équipe dirigeante et un conseil engagés dans la conduite rigoureuse et transparente de notre mission publique."
        />
        <div className="mt-12 space-y-14">
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
              Direction générale
            </h3>
            <LeadershipGrid leaders={LEADERS} />
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
              Conseil d’administration
            </h3>
            <LeadershipGrid leaders={BOARD} />
          </div>
        </div>
      </section>

      {/* Organisation interne */}
      <section id="organisation" className="bg-muted/40 border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Organisation"
            title="Structure interne et directions métiers"
            description="Notre organisation s’articule autour de directions spécialisées garantissant cohérence stratégique et efficacité opérationnelle."
          />
          <div className="mt-10 grid gap-0 md:grid-cols-3 border border-border bg-background">
            {
              [
                {
                  icon: Building2,
                  title: 'Directions opérationnelles',
                  description:
                    'Ingénierie pétrolière, exploitation, maintenance, sécurité industrielle HSE et logistique aval.',
                },
                {
                  icon: UsersIcon,
                  title: 'Directions support',
                  description:
                    'Finances, ressources humaines, juridique, systèmes d’information, base de données sectorielle et communication.',
                },
                {
                  icon: Landmark,
                  title: 'Instances institutionnelles',
                  description:
                    'Comité exécutif, comité d’audit, comité stratégique, comité de conformité et comité HSE.',
                },
              ].map(({ icon: Icon, title, description }, i, arr) => (
                <div
                  key={i}
                  className={
                    'p-8 ' +
                    (i < arr.length - 1
                      ? 'border-b md:border-b-0 md:border-r border-border'
                      : '')
                  }
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 bg-primary/5 text-primary mb-5">
                    <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-foreground">
                    {title}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="En savoir plus"
        title="Découvrez nos infrastructures et nos projets"
        description="Explorez le réseau national, les installations stratégiques et les grands projets en cours."
        primaryCta={{ label: 'Voir les infrastructures', href: '/infrastructures' }}
        secondaryCta={{ label: 'Nos projets', href: '/projets' }}
      />
    </main>
  )
}
