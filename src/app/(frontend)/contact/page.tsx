import type { Metadata } from 'next'
import React from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Newspaper,
  Briefcase,
  Building2,
  Navigation,
} from 'lucide-react'

import { PageHero } from '@/components/institutional/PageHero'
import { SectionHeading } from '@/components/institutional/SectionHeading'
import { ContactForm } from '@/components/institutional/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — ENGIP',
  description:
    'Formulaire de contact officiel, contacts institutionnels, relations presse et localisation du siège.',
}

const INSTITUTIONAL_CONTACTS = [
  {
    icon: Building2,
    title: 'Siège institutionnel',
    email: 'contact@engip.cd',
    phone: '+243 810 00 00 00',
    description: 'Pour toute demande d’information générale.',
  },
  {
    icon: Newspaper,
    title: 'Relations presse',
    email: 'presse@engip.cd',
    phone: '+243 810 00 00 01',
    description: 'Demandes médias, interviews, dossiers de presse.',
    id: 'presse',
  },
  {
    icon: Briefcase,
    title: 'Fournisseurs & marchés',
    email: 'fournisseurs@engip.cd',
    phone: '+243 810 00 00 02',
    description: 'Appels d’offres, référencement fournisseurs.',
  },
]

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Une institution à votre écoute"
        description="Utilisez le formulaire officiel ci-dessous ou contactez directement le service concerné. Nos équipes s’engagent à traiter chaque demande avec rigueur."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      {/* Formulaire + contacts institutionnels */}
      <section className="bg-background">
        <div className="container py-16 md:py-20 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
          <div>
            <SectionHeading
              eyebrow="Formulaire officiel"
              title="Nous écrire"
              description="Renseignez les informations ci-dessous et sélectionnez l’objet correspondant à votre demande."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:pt-14">
            <h3 className="text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-secondary">
              <span className="inline-block w-6 h-px bg-secondary align-middle mr-2" />
              Contacts institutionnels
            </h3>
            <ul className="mt-5 space-y-4">
              {INSTITUTIONAL_CONTACTS.map(({ icon: Icon, title, email, phone, description, id }) => (
                <li
                  key={title}
                  id={id}
                  className="bg-background border border-border p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 inline-flex items-center justify-center w-11 h-11 bg-primary/5 text-primary">
                      <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-base font-semibold text-foreground leading-snug">
                        {title}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                      <dl className="mt-3 space-y-1.5 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-primary/70 shrink-0" aria-hidden />
                          <a
                            href={`mailto:${email}`}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                          >
                            {email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-primary/70 shrink-0" aria-hidden />
                          <a
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                          >
                            {phone}
                          </a>
                        </div>
                      </dl>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-5 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] font-semibold">
                <Clock className="w-4 h-4" aria-hidden />
                Horaires d’ouverture
              </div>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
                <dt className="text-white/75">Lundi — Jeudi</dt>
                <dd className="font-medium">08h30 — 17h30</dd>
                <dt className="text-white/75">Vendredi</dt>
                <dd className="font-medium">08h30 — 16h00</dd>
                <dt className="text-white/75">Weekend</dt>
                <dd className="font-medium">Fermé</dd>
              </dl>
            </div>
          </aside>
        </div>
      </section>

    </main>
  )
}
