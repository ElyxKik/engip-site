import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import {
  Download,
  FileText,
  ShieldCheck,
  ClipboardList,
  UserRoundCog,
  ArrowRight,
  Lock,
} from 'lucide-react'

import { PageHero } from '@/components/institutional/PageHero'
import { SectionHeading } from '@/components/institutional/SectionHeading'
import { TenderCard, type Tender } from '@/components/institutional/TenderCard'

export const metadata: Metadata = {
  title: 'Appels d’offres — ENGIP',
  description:
    'Appels d’offres en cours, résultats attribués, documentation téléchargeable et accès à l’espace fournisseurs sécurisé.',
}

const OPEN_TENDERS: Tender[] = [
  {
    id: 't1',
    reference: 'AO-2026-014',
    title: 'Travaux de modernisation du tronçon pipeline Nord — Lot 1',
    description:
      'Renforcement du linéaire principal, remplacement d’équipements critiques, mise à niveau des capteurs et des systèmes SCADA.',
    status: 'ouvert',
    deadline: '2026-06-15',
    deadlineLabel: '15 juin 2026',
    category: 'Travaux',
    estimatedAmount: '18 — 22 M$',
    documentsCount: 7,
    href: '/appels-offres/ao-2026-014',
  },
  {
    id: 't2',
    reference: 'AO-2026-015',
    title: 'Fourniture d’équipements de supervision industrielle',
    description:
      'Acquisition et mise en service d’un système de supervision temps réel pour le centre national de supervision à Kinshasa.',
    status: 'ouvert',
    deadline: '2026-05-28',
    deadlineLabel: '28 mai 2026',
    category: 'Fournitures',
    estimatedAmount: '4 — 5 M$',
    documentsCount: 5,
    href: '/appels-offres/ao-2026-015',
  },
  {
    id: 't3',
    reference: 'AO-2026-016',
    title: 'Prestations d’audit HSE — sites de stockage',
    description:
      'Audit indépendant des sites de stockage stratégiques : conformité HSE, plans d’urgence, certifications.',
    status: 'ouvert',
    deadline: '2026-06-05',
    deadlineLabel: '5 juin 2026',
    category: 'Services',
    estimatedAmount: '600 — 800 k$',
    documentsCount: 4,
    href: '/appels-offres/ao-2026-016',
  },
]

const RESULTS: Tender[] = [
  {
    id: 'r1',
    reference: 'AO-2025-087',
    title: 'Extension du dépôt Central — Génie civil',
    description:
      'Marché de travaux pour l’extension de 80 000 m³ de capacité, conformément au cahier des charges publié.',
    status: 'attribue',
    deadline: '2025-12-20',
    deadlineLabel: '20 décembre 2025',
    category: 'Travaux',
    estimatedAmount: '28 M$',
    awardedTo: 'Consortium BTP Congolais',
    awardedOn: '15 janvier 2026',
    href: '/appels-offres/ao-2025-087',
  },
  {
    id: 'r2',
    reference: 'AO-2025-091',
    title: 'Prestations d’inspection non destructive',
    description:
      'Contrat cadre pour les prestations d’inspection périodique des ouvrages linéaires.',
    status: 'attribue',
    deadline: '2025-11-10',
    deadlineLabel: '10 novembre 2025',
    category: 'Services',
    estimatedAmount: '3,2 M$',
    awardedTo: 'Société Congolaise d’Inspection Industrielle',
    awardedOn: '5 décembre 2025',
    href: '/appels-offres/ao-2025-091',
  },
  {
    id: 'r3',
    reference: 'AO-2025-096',
    title: 'Fourniture de pièces de rechange critiques',
    description:
      'Accord-cadre pluriannuel pour la fourniture de pièces de rechange stratégiques.',
    status: 'clos',
    deadline: '2026-02-28',
    deadlineLabel: '28 février 2026',
    category: 'Fournitures',
    href: '/appels-offres/ao-2025-096',
  },
]

const DOCUMENTS = [
  {
    icon: ClipboardList,
    title: 'Règlement général des marchés publics',
    description: 'Cadre juridique, procédures, obligations et délais.',
    fileSize: '1,2 Mo',
  },
  {
    icon: UserRoundCog,
    title: 'Guide du fournisseur',
    description: 'Modalités d’inscription, dépôt d’offre, évaluation et notification.',
    fileSize: '860 Ko',
  },
  {
    icon: FileText,
    title: 'Modèles de soumission',
    description: 'Formulaires officiels à compléter (DC1, DC2, attestations).',
    fileSize: '540 Ko',
  },
  {
    icon: ShieldCheck,
    title: 'Charte éthique et anti-corruption',
    description: 'Engagements attendus des partenaires contractuels.',
    fileSize: '320 Ko',
  },
]

export default function AppelsOffresPage() {
  return (
    <main>
      <PageHero
        eyebrow="Appels d’offres"
        title="Marchés publics et consultations en cours"
        description="Consultez les offres ouvertes, les résultats publiés et accédez à la documentation officielle dédiée aux fournisseurs."
        breadcrumbs={[{ label: 'Appels d’offres' }]}
      />

      {/* Offres en cours */}
      <section id="en-cours" className="bg-background">
        <div className="container py-14 md:py-16">
          <SectionHeading
            eyebrow="Offres en cours"
            title="Consultations ouvertes"
            description="Les offres actuellement ouvertes à candidature. Respectez les délais et les modalités de dépôt."
          />
          <div className="mt-8 space-y-4">
            {OPEN_TENDERS.map((t) => (
              <TenderCard key={t.id} tender={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section id="resultats" className="bg-muted/40 border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Résultats"
            title="Marchés attribués et offres clôturées"
            description="Transparence sur l’issue des consultations et les attributaires retenus."
          />
          <div className="mt-8 space-y-4">
            {RESULTS.map((t) => (
              <TenderCard key={t.id} tender={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Documentation téléchargeable */}
      <section id="documentation" className="bg-background border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Documentation"
            title="Documents de référence à télécharger"
            description="Règlements, guides et modèles pour accompagner votre candidature."
          />
          <ul className="mt-10 grid gap-0 md:grid-cols-2 border border-border">
            {DOCUMENTS.map(({ icon: Icon, title, description, fileSize }, i) => (
              <li
                key={i}
                className={
                  'group bg-background p-6 flex items-start gap-5 ' +
                  'md:[&:nth-child(odd)]:border-r md:border-border ' +
                  '[&:not(:last-child)]:border-b md:[&:nth-last-child(2)]:border-b-0 md:[&:nth-last-child(2)]:md:border-b'
                }
              >
                <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 bg-primary/5 text-primary">
                  <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg font-semibold text-foreground leading-snug">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>PDF · {fileSize}</span>
                  </div>
                </div>
                <a
                  href="#"
                  aria-disabled
                  className="shrink-0 inline-flex items-center gap-2 border border-primary text-primary px-4 py-2.5 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Download className="w-4 h-4" aria-hidden />
                  Télécharger
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Espace fournisseurs */}
      <section id="fournisseurs" className="bg-primary text-primary-foreground">
        <div className="container py-16 md:py-20 grid gap-10 lg:grid-cols-[1.5fr_1fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-white/80">
              <span className="block w-6 h-px bg-secondary" aria-hidden />
              <span>Espace fournisseurs</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold leading-tight">
              Un accès sécurisé dédié aux partenaires contractuels
            </h2>
            <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
              Déposez vos offres, suivez l’état de vos dossiers, recevez les notifications
              officielles et consultez les marchés restreints via un portail
              authentifié et sécurisé.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/90">
              {[
                'Dépôt dématérialisé des offres',
                'Suivi des candidatures en temps réel',
                'Échanges officiels tracés',
                'Accès aux consultations restreintes',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 block w-1.5 h-1.5 bg-secondary shrink-0"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background text-foreground p-8 border-l-4 border-secondary">
            <div className="inline-flex items-center gap-2 text-primary">
              <Lock className="w-5 h-5" aria-hidden />
              <span className="text-sm font-semibold uppercase tracking-[0.14em]">
                Accès sécurisé
              </span>
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold">
              Se connecter à l’espace fournisseurs
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Identifiant transmis lors de votre enregistrement officiel en tant que
              fournisseur agréé.
            </p>
            <div className="mt-6 space-y-3">
              <Link
                href="/appels-offres/fournisseurs"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Se connecter
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
              <Link
                href="/appels-offres/fournisseurs/inscription"
                className="flex items-center justify-center gap-2 border border-primary text-primary px-4 py-3 text-sm font-semibold hover:bg-primary/5 transition-colors"
              >
                Demander un accès
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
