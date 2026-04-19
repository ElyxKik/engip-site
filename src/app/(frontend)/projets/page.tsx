import type { Metadata } from 'next'
import React from 'react'
import { TrendingUp, Users, Leaf, ShieldCheck } from 'lucide-react'

import { PageHero } from '@/components/institutional/PageHero'
import { SectionHeading } from '@/components/institutional/SectionHeading'
import { StatBlock } from '@/components/institutional/StatBlock'
import { ProjectCard, type Project } from '@/components/institutional/ProjectCard'
import { MediaGallery, type MediaItem } from '@/components/institutional/MediaGallery'
import { PillarsGrid } from '@/components/institutional/PillarsGrid'
import { CTABanner } from '@/components/institutional/CTABanner'

export const metadata: Metadata = {
  title: 'Projets stratégiques — ENGIP',
  description:
    'Projets en cours, projets futurs, impact économique et national, galerie média terrain.',
}

const PROJECTS_EN_COURS: Project[] = [
  {
    id: 'p1',
    title: 'Modernisation du pipeline Nord',
    summary:
      'Renforcement du linéaire principal, remplacement des équipements critiques et mise à niveau des systèmes de supervision.',
    status: 'en-cours',
    location: 'Nord-Kivu',
    period: '2024 — 2027',
    budget: '180 M$',
    href: '/projets/modernisation-pipeline-nord',
  },
  {
    id: 'p2',
    title: 'Extension du dépôt Central',
    summary:
      'Augmentation de la capacité de stockage stratégique de 80 000 m³ et mise en service de nouvelles unités de distribution.',
    status: 'en-cours',
    location: 'Kasaï',
    period: '2025 — 2027',
    budget: '95 M$',
    href: '/projets/extension-depot-central',
  },
  {
    id: 'p3',
    title: 'Centre national de supervision',
    summary:
      'Construction d’un centre de commande unifié, plateforme numérique de supervision temps réel pour l’ensemble du réseau.',
    status: 'en-cours',
    location: 'Kinshasa',
    period: '2025 — 2026',
    budget: '60 M$',
    href: '/projets/centre-supervision-national',
  },
]

const PROJECTS_FUTURS: Project[] = [
  {
    id: 'f1',
    title: 'Corridor Sud-Ouest',
    summary:
      'Nouveau corridor de transport reliant les zones industrielles stratégiques du Sud-Ouest au réseau national principal.',
    status: 'futur',
    location: 'Haut-Katanga-Ouest',
    period: '2027 — 2030',
    budget: '320 M$',
    href: '/projets/corridor-sud-ouest',
  },
  {
    id: 'f2',
    title: 'Terminal portuaire Est',
    summary:
      'Construction d’un nouveau terminal stratégique pour diversifier les points d’entrée et renforcer la souveraineté.',
    status: 'futur',
    location: 'Port Est',
    period: '2028 — 2031',
    budget: '410 M$',
    href: '/projets/terminal-portuaire-est',
  },
  {
    id: 'f3',
    title: 'Digitalisation des opérations',
    summary:
      'Programme pluriannuel de transformation numérique : IoT, jumeau numérique, cybersécurité industrielle.',
    status: 'futur',
    location: 'National',
    period: '2027 — 2032',
    budget: '140 M$',
    href: '/projets/digitalisation-operations',
  },
]

const MEDIA: MediaItem[] = [
  { id: 'm1', type: 'photo', title: 'Chantier pipeline Nord — Phase 1' },
  { id: 'm2', type: 'photo', title: 'Inauguration du dépôt central étendu' },
  { id: 'm3', type: 'video', title: 'Survol aérien du corridor stratégique' },
  { id: 'm4', type: 'photo', title: 'Équipes terrain en intervention' },
  { id: 'm5', type: 'photo', title: 'Centre de supervision — maquette' },
  { id: 'm6', type: 'video', title: 'Mise en service — cérémonie officielle' },
  { id: 'm7', type: 'photo', title: 'Site de stockage — vue d’ensemble' },
  { id: 'm8', type: 'photo', title: 'Installation portuaire — étude terrain' },
]

export default function ProjetsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Projets stratégiques"
        title="Bâtir les infrastructures de demain"
        description="Des investissements structurants qui renforcent la souveraineté nationale, soutiennent l’économie et préparent la transition durable."
        breadcrumbs={[{ label: 'Projets' }]}
      />

      {/* Chiffres clés projets */}
      <section className="container py-14 md:py-16">
        <StatBlock
          stats={[
            { value: '12', label: 'Projets stratégiques' },
            { value: '6', label: 'En cours' },
            { value: '1.2', unit: 'Md$', label: 'Investissement global' },
            { value: '4 500', unit: '+', label: 'Emplois générés' },
          ]}
        />
      </section>

      {/* Projets en cours */}
      <section id="en-cours" className="bg-muted/40 border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Projets en cours"
            title="Les chantiers actuellement déployés"
            description="Des projets majeurs qui renforcent dès aujourd’hui la performance et la résilience du réseau national."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS_EN_COURS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Projets futurs */}
      <section id="futurs" className="bg-background border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Projets futurs"
            title="La vision à long terme"
            description="Des projets ambitieux planifiés pour étendre, moderniser et sécuriser les infrastructures nationales."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS_FUTURS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Impact économique et national */}
      <section id="impact" className="bg-muted/40 border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Impact national"
            title="Un effet structurant sur l’économie et le territoire"
            description="Nos projets génèrent un impact direct et indirect mesurable sur la croissance, l’emploi et la souveraineté."
          />
          <div className="mt-12">
            <PillarsGrid
              pillars={[
                {
                  icon: TrendingUp,
                  title: 'Retombées économiques',
                  description:
                    'Effet multiplicateur sur les filières nationales, dynamisation des territoires et attractivité des investissements.',
                },
                {
                  icon: Users,
                  title: 'Création d’emplois',
                  description:
                    'Des milliers d’emplois directs et indirects soutenus, avec une priorité donnée aux compétences locales.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Souveraineté',
                  description:
                    'Renforcement de l’autonomie stratégique et sécurisation des approvisionnements critiques du pays.',
                },
                {
                  icon: Leaf,
                  title: 'Transition durable',
                  description:
                    'Intégration systématique des standards environnementaux et des objectifs de décarbonation.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Galerie média */}
      <section id="galerie" className="bg-background">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Galerie média"
            title="Photos et vidéos terrain"
            description="Découvrez les chantiers, installations et temps forts des projets en images."
          />
          <div className="mt-10">
            <MediaGallery items={MEDIA} />
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Transparence & suivi"
        title="Consultez nos publications officielles"
        description="Rapports détaillés, bilans d’étape et communiqués liés aux projets stratégiques."
        primaryCta={{ label: 'Publications', href: '/publications' }}
        secondaryCta={{ label: 'Nous contacter', href: '/contact' }}
      />
    </main>
  )
}
