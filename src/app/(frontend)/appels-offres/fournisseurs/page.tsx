import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import {
  Lock,
  ShieldCheck,
  UserRoundPlus,
  FileCheck2,
  BellRing,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  FileText,
  Download,
} from 'lucide-react'

import { PageHero } from '@/components/institutional/PageHero'
import { SectionHeading } from '@/components/institutional/SectionHeading'

export const metadata: Metadata = {
  title: 'Espace fournisseurs — ENGIP-RDC',
  description:
    'Portail sécurisé dédié aux fournisseurs et partenaires d’ENGIP-RDC : connexion, inscription, dépôt d’offres, suivi des appels d’offres et documentation réglementaire.',
}

const BENEFITS: Array<{ icon: React.ElementType; title: string; desc: string }> = [
  {
    icon: BellRing,
    title: 'Alertes personnalisées',
    desc: 'Recevez en temps réel les nouveaux appels d’offres correspondant à vos domaines d’activité.',
  },
  {
    icon: FileCheck2,
    title: 'Dépôt dématérialisé',
    desc: 'Soumettez vos candidatures et offres techniques/financières en toute sécurité via le portail.',
  },
  {
    icon: ShieldCheck,
    title: 'Conformité & traçabilité',
    desc: 'Signatures électroniques, horodatage et piste d’audit complète conformes aux standards RDC.',
  },
  {
    icon: Headphones,
    title: 'Support dédié',
    desc: 'Une équipe achats à votre écoute pour vous accompagner dans chaque étape de la procédure.',
  },
]

const STEPS: Array<{ n: string; title: string; desc: string }> = [
  {
    n: '01',
    title: 'Créer votre compte fournisseur',
    desc: 'Renseignez les informations de votre entreprise et téléversez vos documents légaux (RCCM, ID national, attestations fiscales).',
  },
  {
    n: '02',
    title: 'Validation du dossier',
    desc: 'Notre équipe conformité vérifie vos justificatifs sous 5 à 10 jours ouvrés et vous notifie par email.',
  },
  {
    n: '03',
    title: 'Accès aux appels d’offres',
    desc: 'Consultez les AO ouverts, téléchargez les DAO et déposez vos offres dans les délais impartis.',
  },
  {
    n: '04',
    title: 'Suivi & notifications',
    desc: 'Suivez l’avancement de vos dossiers, échangez avec les équipes projet et recevez les décisions officielles.',
  },
]

const DOCUMENTS: Array<{ label: string; format: string; size: string; href: string }> = [
  {
    label: 'Guide du fournisseur ENGIP-RDC',
    format: 'PDF',
    size: '2.4 Mo',
    href: '#',
  },
  {
    label: 'Code de conduite des fournisseurs',
    format: 'PDF',
    size: '1.1 Mo',
    href: '#',
  },
  {
    label: 'Conditions générales d’achat',
    format: 'PDF',
    size: '860 Ko',
    href: '#',
  },
  {
    label: 'Formulaire de pré-qualification',
    format: 'DOCX',
    size: '180 Ko',
    href: '#',
  },
]

export default function FournisseursPage() {
  return (
    <main>
      <PageHero
        eyebrow="Achats & Marchés"
        title="Espace fournisseurs"
        description="Portail sécurisé dédié à nos partenaires économiques. Accédez aux appels d’offres, déposez vos candidatures et suivez vos dossiers en toute transparence."
        breadcrumbs={[
          { label: 'Appels d’offres', href: '/appels-offres' },
          { label: 'Espace fournisseurs' },
        ]}
      />

      {/* Connexion + Inscription */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container grid lg:grid-cols-2 gap-6">
          {/* Connexion */}
          <div className="border border-border bg-card p-8 md:p-10">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-primary">
              <Lock className="w-3.5 h-3.5" aria-hidden />
              Accès sécurisé
            </div>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl font-semibold text-foreground">
              Se connecter
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Accédez à votre tableau de bord, consultez les appels d’offres et déposez vos offres.
            </p>

            <form className="mt-6 space-y-4" method="post" action="#">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5">
                  Email professionnel
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="contact@entreprise.cd"
                  className="w-full px-3.5 py-2.5 bg-background border border-input text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-background border border-input text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <label className="inline-flex items-center gap-2 text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="accent-primary" />
                  Se souvenir de moi
                </label>
                <Link href="#" className="font-medium text-primary hover:text-secondary transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Se connecter
                <ArrowRight className="w-4 h-4" aria-hidden />
              </button>
            </form>

            <p className="mt-5 text-xs text-muted-foreground flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden />
              Connexion chiffrée TLS 1.3. Vos données sont protégées conformément à la politique de sécurité d’ENGIP-RDC.
            </p>
          </div>

          {/* Inscription */}
          <div className="border border-border bg-muted/40 p-8 md:p-10 flex flex-col">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-secondary">
              <UserRoundPlus className="w-3.5 h-3.5" aria-hidden />
              Nouveau partenaire
            </div>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl font-semibold text-foreground">
              Devenir fournisseur ENGIP-RDC
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Rejoignez notre panel de partenaires et accédez aux opportunités d’affaires du secteur
              pétrolier et énergétique en République Démocratique du Congo.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                'Accès au catalogue complet des appels d’offres',
                'Notifications automatiques selon vos catégories',
                'Dépôt électronique des candidatures et offres',
                'Suivi transparent des décisions d’attribution',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Link
                href="#inscription"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-5 py-3 text-sm font-semibold hover:bg-secondary/90 transition-colors w-full"
              >
                Créer un compte fournisseur
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
              <p className="mt-3 text-xs text-muted-foreground text-center">
                Traitement du dossier sous 5 à 10 jours ouvrés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-14 md:py-20 bg-muted/30 border-y border-border">
        <div className="container">
          <SectionHeading
            eyebrow="Avantages du portail"
            title="Un espace conçu pour simplifier vos démarches"
            description="ENGIP-RDC déploie un portail achats moderne, transparent et sécurisé pour l’ensemble de ses partenaires économiques."
            align="center"
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-background border border-border p-6 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 text-primary inline-flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" aria-hidden />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground leading-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section id="inscription" className="py-14 md:py-20 bg-background">
        <div className="container">
          <SectionHeading
            eyebrow="Processus d’intégration"
            title="De l’inscription à l’attribution en 4 étapes"
            description="Un parcours clair et dématérialisé pour rejoindre notre panel de fournisseurs agréés."
            align="center"
          />
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-border bg-card">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={
                  'p-6 md:p-8 relative ' +
                  (i < STEPS.length - 1 ? 'lg:border-r border-border ' : '') +
                  (i < 2 ? 'md:border-r md:border-border ' : '') +
                  (i < 2 ? 'border-b md:border-b lg:border-b-0 border-border ' : '')
                }
              >
                <div className="font-serif text-3xl font-semibold text-primary/30">{s.n}</div>
                <h3 className="mt-3 font-serif text-lg font-semibold text-foreground leading-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-14 md:py-20 bg-muted/30 border-t border-border">
        <div className="container grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div>
            <SectionHeading
              eyebrow="Documentation"
              title="Ressources à télécharger"
              description="Tous les documents de référence pour préparer vos candidatures et comprendre nos exigences."
              align="left"
            />
          </div>
          <ul className="divide-y divide-border border border-border bg-background">
            {DOCUMENTS.map((d) => (
              <li key={d.label}>
                <a
                  href={d.href}
                  className="flex items-center gap-4 p-4 md:p-5 hover:bg-muted/60 transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary/10 text-primary inline-flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {d.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {d.format} · {d.size}
                    </div>
                  </div>
                  <Download
                    className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors shrink-0"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Support */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container">
          <div className="bg-primary text-primary-foreground p-8 md:p-12 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-primary-foreground/80">
                <Headphones className="w-3.5 h-3.5" aria-hidden />
                Support fournisseurs
              </div>
              <h2 className="mt-3 font-serif text-2xl md:text-3xl font-semibold leading-tight">
                Besoin d’aide pour votre candidature ?
              </h2>
              <p className="mt-3 text-sm md:text-base text-primary-foreground/85 leading-relaxed max-w-2xl">
                Notre cellule Achats & Marchés accompagne les fournisseurs tout au long du processus.
                Disponible du lundi au vendredi, de 8h à 17h (heure de Kinshasa).
              </p>
            </div>
            <div className="space-y-3">
              <a
                href="mailto:fournisseurs@engip-rdc.cd"
                className="flex items-center gap-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 px-4 py-3 transition-colors"
              >
                <Mail className="w-5 h-5 shrink-0" aria-hidden />
                <div className="min-w-0">
                  <div className="text-[0.65rem] uppercase tracking-[0.15em] opacity-80">Email</div>
                  <div className="text-sm font-semibold truncate">fournisseurs@engip-rdc.cd</div>
                </div>
              </a>
              <a
                href="tel:+243000000000"
                className="flex items-center gap-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 px-4 py-3 transition-colors"
              >
                <Phone className="w-5 h-5 shrink-0" aria-hidden />
                <div className="min-w-0">
                  <div className="text-[0.65rem] uppercase tracking-[0.15em] opacity-80">Téléphone</div>
                  <div className="text-sm font-semibold">+243 (0) 000 000 000</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
