import type { Metadata } from 'next'
import React from 'react'
import {
  FileText,
  Briefcase,
  Mail,
  Map as MapIcon,
  Shield,
  Users,
  type LucideIcon,
} from 'lucide-react'

import { InstitutionalHeroSlider, type HeroSlide } from '@/components/institutional/InstitutionalHeroSlider'
import { StatBlock } from '@/components/institutional/StatBlock'
import { SectionHeading } from '@/components/institutional/SectionHeading'
import { QuickAccessCards } from '@/components/institutional/QuickAccessCards'
import { CTABanner } from '@/components/institutional/CTABanner'
import { CEOMessage } from '@/components/institutional/CEOMessage'
import { LatestNews, type NewsItem } from '@/components/institutional/LatestNews'
import {
  getAccueil,
  getActualites,
} from '@/utilities/institutional'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

/** Mapping icône string (valeur CMS) → composant Lucide. */
const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Briefcase,
  Map: MapIcon,
  Shield,
  Users,
  Mail,
}

/** Retourne l'URL d'un upload Payload (ou `undefined`). */
const mediaUrl = (m: Any): string | undefined =>
  typeof m === 'object' && m?.url ? (m.url as string) : undefined

const FR_DATE = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export const metadata: Metadata = {
  title: 'ENGIP-RDC — Entreprise Nationale de Gestion des Infrastructures Pétrolières',
  description:
    'Portail officiel de l’ENGIP-RDC : logistique pétrolière, infrastructures stratégiques, projets, publications et appels d’offres au service de la souveraineté énergétique de la République Démocratique du Congo.',
}

// Fallbacks statiques — utilisés tant que le CMS Payload n'est pas peuplé.
const FALLBACK_QUICK_ACCESS = [
  {
    icon: FileText,
    title: 'Publications officielles',
    description:
      'Rapports annuels, communiqués de presse, études et statistiques publiques.',
    href: '/publications',
  },
  {
    icon: Briefcase,
    title: 'Appels d’offres',
    description: 'Offres en cours, documentation, résultats et espace fournisseurs.',
    href: '/appels-offres',
  },
  {
    icon: MapIcon,
    title: 'Infrastructures',
    description:
      'Carte interactive des pipelines, sites de stockage et installations stratégiques.',
    href: '/infrastructures',
  },
  {
    icon: Shield,
    title: 'Sécurité & conformité',
    description:
      'Normes HSE, certifications, politiques environnementales et gestion des risques.',
    href: '/securite-conformite',
  },
  {
    icon: Users,
    title: 'Carrières',
    description: 'Offres d’emploi, stages et dépôt de candidatures spontanées.',
    href: '/carrieres',
  },
  {
    icon: Mail,
    title: 'Contact & presse',
    description: 'Formulaire officiel, contacts institutionnels et relations presse.',
    href: '/contact',
  },
]

const FALLBACK_LATEST_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title:
      'Signature d’un accord stratégique pour le renforcement du réseau national',
    excerpt:
      'L’institution a conclu un partenariat majeur destiné à moderniser les infrastructures de transport et à consolider la souveraineté énergétique de la République Démocratique du Congo.',
    date: '2026-04-12',
    dateLabel: '12 avril 2026',
    category: 'Communiqué officiel',
    href: '/publications/signature-accord-reseau-national',
  },
  {
    id: 'n2',
    title: 'Publication du rapport annuel 2025',
    excerpt:
      'Bilan complet des activités, des indicateurs de performance et des engagements environnementaux de l’exercice écoulé.',
    date: '2026-03-28',
    dateLabel: '28 mars 2026',
    category: 'Rapport',
    href: '/publications/rapport-annuel-2025',
  },
  {
    id: 'n3',
    title: 'Inauguration d’un nouveau site stratégique',
    excerpt:
      'Mise en service officielle d’une installation clé pour la sécurité d’approvisionnement du territoire.',
    date: '2026-03-15',
    dateLabel: '15 mars 2026',
    category: 'Actualité',
    href: '/publications/inauguration-site-strategique',
  },
]

/**
 * Page d'accueil institutionnelle — pilotée par Payload CMS.
 * Globals : `accueil` (hero, CEO, chiffres clés, accès rapide) + `parametres`.
 * Collections : `actualites` (3 dernières publiées) + `infrastructures` (carte).
 * Fallbacks statiques si le CMS est vide.
 */
export default async function HomePage() {
  const [accueilRaw, actualitesRaw] = await Promise.all([
    getAccueil() as Promise<Any>,
    getActualites({ limit: 3 }) as Promise<Any[]>,
  ])

  const accueil = accueilRaw ?? {}
  const hero = accueil.hero ?? {}
  const ceo = accueil.ceoMessage ?? {}
  const figures: Any[] = Array.isArray(accueil.keyFigures) ? accueil.keyFigures : []
  const quickAccess: Any[] = Array.isArray(accueil.quickAccess) ? accueil.quickAccess : []

  // --- Actualités (CMS → carte) ---
  const newsItems: NewsItem[] = actualitesRaw.length
    ? actualitesRaw.map((a) => ({
        id: String(a.id),
        title: a.title,
        excerpt: a.excerpt,
        date: a.publishedAt ?? a.createdAt,
        dateLabel: FR_DATE(a.publishedAt ?? a.createdAt),
        category:
          a.category === 'communique'
            ? 'Communiqué officiel'
            : a.category === 'rapport'
              ? 'Rapport'
              : a.category === 'evenement'
                ? 'Événement'
                : 'Actualité',
        href: `/publications/${a.slug ?? a.id}`,
      }))
    : FALLBACK_LATEST_NEWS


  // --- Quick access (CMS → cartes) ---
  const quickAccessItems = quickAccess.length
    ? quickAccess.map((q) => ({
        icon: ICON_MAP[q.icon] ?? FileText,
        title: q.title,
        description: q.description,
        href: q.href,
      }))
    : FALLBACK_QUICK_ACCESS

  // --- Hero slides : slide n°1 piloté par le CMS, les suivants sont institutionnels par défaut ---
  const heroBgDefault = mediaUrl(hero.backgroundImage) ?? '/hero-accueil.jpeg'
  const cmsSlides: Any[] = Array.isArray(hero.slides) ? hero.slides : []

  const heroSlides: HeroSlide[] = cmsSlides.length
    ? cmsSlides.map((s) => ({
        eyebrow: s.eyebrow ?? undefined,
        title: s.title ?? '',
        description: s.description ?? undefined,
        primaryCta:
          s.primaryCta?.label && s.primaryCta?.href
            ? { label: s.primaryCta.label, href: s.primaryCta.href }
            : undefined,
        secondaryCta:
          s.secondaryCta?.label && s.secondaryCta?.href
            ? { label: s.secondaryCta.label, href: s.secondaryCta.href }
            : undefined,
        backgroundImage: mediaUrl(s.backgroundImage) ?? heroBgDefault,
      }))
    : [
        {
          eyebrow: hero.eyebrow ?? 'Institution publique',
          title:
            hero.title ??
            'Au service de la sécurité et de la souveraineté énergétiques',
          description:
            hero.description ??
            'L’ENGIP conduit la conception, exploitation, maintenance et développement des installations stratégiques sur l’ensemble du territoire.',
          primaryCta:
            hero.primaryCta?.label && hero.primaryCta?.href
              ? { label: hero.primaryCta.label, href: hero.primaryCta.href }
              : { label: 'Découvrir l’institution', href: '/institution' },
          secondaryCta:
            hero.secondaryCta?.label && hero.secondaryCta?.href
              ? { label: hero.secondaryCta.label, href: hero.secondaryCta.href }
              : { label: 'Nos infrastructures', href: '/infrastructures' },
          backgroundImage: heroBgDefault,
        },
        {
          eyebrow: 'Infrastructures stratégiques',
          title: 'Un réseau national au service de la souveraineté énergétique',
          description:
            'Pipelines, terminaux portuaires et sites de stockage : l’ENGIP-RDC opère et modernise les infrastructures critiques qui garantissent l’approvisionnement du territoire.',
          primaryCta: { label: 'Explorer la carte', href: '/infrastructures' },
          secondaryCta: { label: 'Nos projets', href: '/projets' },
          backgroundImage: heroBgDefault,
        },
        {
          eyebrow: 'Transparence & service public',
          title: 'Publications officielles, appels d’offres et reporting institutionnel',
          description:
            'Accédez à nos rapports, communiqués, données ouvertes et procédures d’appels d’offres — un accès direct à l’action publique de l’institution.',
          primaryCta: { label: 'Consulter les publications', href: '/publications' },
          secondaryCta: { label: 'Voir les appels d’offres', href: '/appels-offres' },
          backgroundImage: heroBgDefault,
        },
      ]

  return (
    <main>
      <InstitutionalHeroSlider slides={heroSlides} />

      <CEOMessage
        name={ceo.name ?? 'Prénom NOM'}
        role={ceo.role ?? 'Directeur Général'}
        portraitUrl={mediaUrl(ceo.portrait)}
        excerpt={
          ceo.excerpt ??
          'Notre institution porte une mission d’intérêt général : bâtir et exploiter des infrastructures nationales fiables, sûres et pérennes, au service du développement économique et de la souveraineté de la République Démocratique du Congo. Transparence, rigueur et responsabilité guident chacune de nos actions.'
        }
        readMoreHref={ceo.fullMessageHref}
      />

      <section className="container py-16 md:py-20 border-t border-border">
        <SectionHeading
          eyebrow="Chiffres clés"
          title="Une présence structurante à l’échelle nationale"
          description="Les principaux indicateurs de notre action publique, mis à jour chaque trimestre."
        />
        <div className="mt-10">
          <StatBlock
            stats={
              figures.length
                ? figures.map((f) => ({
                    value: f.value,
                    unit: f.unit ?? undefined,
                    label: f.label,
                  }))
                : [
                    { value: '3 200', unit: 'km', label: 'Réseau de transport' },
                    { value: '48', label: 'Sites de stockage' },
                    { value: '12', label: 'Projets stratégiques' },
                    { value: '100', unit: '%', label: 'Couverture nationale' },
                  ]
            }
          />
        </div>
      </section>

      <LatestNews items={newsItems} />

      <section className="bg-muted/40 border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Accès rapide"
            title="Services et ressources institutionnels"
            description="Consultez les principales ressources mises à disposition du public, des fournisseurs et des partenaires institutionnels."
          />
          <div className="mt-10">
            <QuickAccessCards items={quickAccessItems} />
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Transparence & service public"
        title="Accéder à l’information institutionnelle officielle"
        description="Consultez nos publications, suivez nos projets stratégiques et engagez-vous avec notre institution via des canaux sécurisés."
        primaryCta={{ label: 'Consulter les publications', href: '/publications' }}
        secondaryCta={{ label: 'Nous contacter', href: '/contact' }}
      />
    </main>
  )
}
