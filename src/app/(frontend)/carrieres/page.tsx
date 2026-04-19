import type { Metadata } from 'next'
import React from 'react'
import { Rocket, Handshake, GraduationCap, Target } from 'lucide-react'

import { PageHero } from '@/components/institutional/PageHero'
import { SectionHeading } from '@/components/institutional/SectionHeading'
import { PillarsGrid } from '@/components/institutional/PillarsGrid'
import { StatBlock } from '@/components/institutional/StatBlock'
import { JobsList } from '@/components/institutional/JobsList'
import { type Job } from '@/components/institutional/JobCard'
import { SpontaneousApplicationForm } from '@/components/institutional/SpontaneousApplicationForm'

export const metadata: Metadata = {
  title: 'Carrières — ENGIP',
  description:
    'Offres d’emploi, stages et dépôt de CV. Rejoignez une institution au service du développement de la RDC.',
}

const JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Ingénieur·e pipeline — Nord-Kivu',
    department: 'Exploitation & Maintenance',
    location: 'Nord-Kivu',
    type: 'emploi',
    contract: 'cdi',
    summary:
      'Pilotage de projets de maintenance et de modernisation sur les axes de transport stratégiques.',
    deadline: '2026-06-30',
    deadlineLabel: '30 juin 2026',
    href: '/carrieres/ingenieur-pipeline-nord',
  },
  {
    id: 'j2',
    title: 'Responsable cybersécurité industrielle',
    department: 'Systèmes d’information',
    location: 'Kinshasa',
    type: 'emploi',
    contract: 'cdi',
    summary:
      'Définition et mise en œuvre de la stratégie de cybersécurité OT/IT sur l’ensemble du périmètre.',
    deadline: '2026-05-20',
    deadlineLabel: '20 mai 2026',
    href: '/carrieres/responsable-cybersecurite',
  },
  {
    id: 'j3',
    title: 'Contrôleur·euse de gestion senior',
    department: 'Finances',
    location: 'Kinshasa',
    type: 'emploi',
    contract: 'cdi',
    summary:
      'Pilotage budgétaire, analyse de performance et reporting consolidé auprès de la direction.',
    deadline: '2026-05-15',
    deadlineLabel: '15 mai 2026',
    href: '/carrieres/controleur-gestion-senior',
  },
  {
    id: 'j4',
    title: 'Technicien·ne de supervision HSE',
    department: 'Exploitation & Maintenance',
    location: 'Kasaï',
    type: 'emploi',
    contract: 'cdd',
    summary:
      'Surveillance opérationnelle des installations, audits HSE et reporting terrain.',
    deadline: '2026-06-10',
    deadlineLabel: '10 juin 2026',
    href: '/carrieres/technicien-hse',
  },
  {
    id: 's1',
    title: 'Stage — Ingénierie des données',
    department: 'Systèmes d’information',
    location: 'Kinshasa',
    type: 'stage',
    contract: 'stage',
    summary:
      'Participation à la construction du jumeau numérique du réseau national — 6 mois.',
    deadline: '2026-05-31',
    deadlineLabel: '31 mai 2026',
    href: '/carrieres/stage-ingenierie-donnees',
  },
  {
    id: 's2',
    title: 'Stage — Communication institutionnelle',
    department: 'Communication',
    location: 'Kinshasa',
    type: 'stage',
    contract: 'stage',
    summary:
      'Appui à la production éditoriale, événementiel et relations presse — 4 à 6 mois.',
    deadline: '2026-06-15',
    deadlineLabel: '15 juin 2026',
    href: '/carrieres/stage-communication',
  },
  {
    id: 's3',
    title: 'Alternance — Analyste financier junior',
    department: 'Finances',
    location: 'Kinshasa',
    type: 'stage',
    contract: 'alternance',
    summary:
      'Immersion complète dans les activités de contrôle de gestion et d’analyse budgétaire.',
    href: '/carrieres/alternance-analyste-financier',
  },
]

export default function CarrieresPage() {
  return (
    <main>
      <PageHero
        eyebrow="Carrières"
        title="Rejoignez une institution au service du pays"
        description="Construire les infrastructures nationales de demain, c’est un engagement collectif. Nous recrutons des talents à tous les niveaux et dans toutes nos directions."
        breadcrumbs={[{ label: 'Carrières' }]}
      />

      {/* Chiffres RH */}
      <section className="container py-14 md:py-16">
        <StatBlock
          stats={[
            { value: '2 400', unit: '+', label: 'Collaborateurs' },
            { value: '28', label: 'Métiers représentés' },
            { value: '12', unit: '%', label: 'Alternants & stagiaires' },
            { value: '45', unit: '+', label: 'Recrutements / an' },
          ]}
        />
      </section>

      {/* Pourquoi nous rejoindre */}
      <section id="valeurs" className="bg-muted/40 border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Pourquoi nous rejoindre"
            title="Un employeur engagé, exigeant et formateur"
            description="Quatre raisons de nous rejoindre pour construire une carrière utile, stimulante et porteuse de sens."
          />
          <div className="mt-12">
            <PillarsGrid
              pillars={[
                {
                  icon: Target,
                  title: 'Un impact concret',
                  description:
                    'Contribuer à des projets structurants au service du développement économique et de la souveraineté.',
                },
                {
                  icon: Handshake,
                  title: 'Un cadre de confiance',
                  description:
                    'Un environnement institutionnel stable, des valeurs fortes et une gouvernance transparente.',
                },
                {
                  icon: GraduationCap,
                  title: 'Formation continue',
                  description:
                    'Un plan de développement ambitieux, des parcours d’évolution et des passerelles métiers.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Offres */}
      <section id="offres" className="bg-background border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Offres d’emploi & stages"
            title="Postes actuellement ouverts"
            description="Consultez les offres en cours, filtrez par type et par direction, et candidatez directement en ligne."
          />
          <div className="mt-10">
            <JobsList jobs={JOBS} />
          </div>
        </div>
      </section>

      {/* Dépôt de CV */}
      <section id="depot-cv" className="bg-muted/40 border-y border-border">
        <div className="container py-16 md:py-20 grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
          <div>
            <SectionHeading
              eyebrow="Candidature spontanée"
              title="Déposez votre CV"
              description="Aucune offre ne correspond à votre profil ? Transmettez-nous votre candidature : notre direction des ressources humaines l’étudiera avec attention."
            />
            <ul className="mt-6 space-y-3 text-sm text-foreground/85">
              {[
                'Votre dossier est traité dans le respect de la confidentialité.',
                'Nous revenons vers chaque candidat dans un délai raisonnable.',
                'Vos données sont conservées selon notre politique de confidentialité.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 block w-1.5 h-1.5 bg-secondary shrink-0"
                    aria-hidden
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-5 bg-background border-l-4 border-primary">
              <div className="flex items-start gap-3">
                <Rocket
                  className="w-5 h-5 text-primary mt-0.5 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="text-sm text-foreground/85 leading-relaxed">
                  Les profils recherchés couvrent l’ingénierie, l’exploitation, les
                  systèmes d’information, les finances, les ressources humaines et les
                  fonctions institutionnelles.
                </p>
              </div>
            </div>
          </div>
          <SpontaneousApplicationForm />
        </div>
      </section>
    </main>
  )
}
