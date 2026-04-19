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

      {/* Carte + localisation */}
      <section id="localisation" className="bg-muted/40 border-y border-border">
        <div className="container py-16 md:py-20">
          <SectionHeading
            eyebrow="Localisation"
            title="Nous rendre visite"
            description="Siège institutionnel accessible sur rendez-vous. Merci de contacter préalablement nos équipes."
          />
          <div className="mt-10 grid gap-0 lg:grid-cols-[1fr_1.5fr] border border-border bg-background">
            {/* Address block */}
            <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/5 text-primary mb-5">
                <MapPin className="w-6 h-6" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Siège institutionnel ENGIP
              </h3>
              <address className="mt-3 not-italic text-sm text-foreground/85 leading-relaxed">
                Boulevard du 30 Juin
                <br />
                Bâtiment principal
                <br />
                Commune de la Gombe, Kinshasa
              </address>
              <dl className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary/70 shrink-0" aria-hidden />
                  <a
                    href="tel:+000000000"
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    +243 810 00 00 00
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary/70 shrink-0" aria-hidden />
                  <a
                    href="mailto:contact@engip.cd"
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    contact@engip.cd
                  </a>
                </div>
              </dl>
              <a
                href="https://www.openstreetmap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Navigation className="w-4 h-4" aria-hidden />
                Calculer un itinéraire
              </a>
            </div>

            {/* Map placeholder */}
            <div className="relative min-h-[320px] lg:min-h-[460px] overflow-hidden">
              <svg
                viewBox="0 0 800 500"
                className="w-full h-full"
                role="img"
                aria-label="Carte de localisation du siège"
              >
                <defs>
                  <pattern
                    id="map-grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="800" height="500" fill="#F9FAFB" />
                <rect width="800" height="500" fill="url(#map-grid)" />

                {/* Streets (abstract) */}
                <path
                  d="M 0 260 L 800 230"
                  stroke="#CBD5E1"
                  strokeWidth="8"
                  fill="none"
                />
                <path
                  d="M 0 340 L 800 360"
                  stroke="#CBD5E1"
                  strokeWidth="5"
                  fill="none"
                />
                <path
                  d="M 400 0 L 420 500"
                  stroke="#CBD5E1"
                  strokeWidth="6"
                  fill="none"
                />
                <path
                  d="M 580 0 L 600 500"
                  stroke="#CBD5E1"
                  strokeWidth="4"
                  fill="none"
                />

                {/* Blocks */}
                <rect x="60" y="80" width="200" height="120" fill="#F1F5F9" />
                <rect x="300" y="80" width="80" height="120" fill="#F1F5F9" />
                <rect x="450" y="80" width="110" height="120" fill="#F1F5F9" />
                <rect x="620" y="80" width="160" height="140" fill="#F1F5F9" />
                <rect x="60" y="380" width="340" height="100" fill="#F1F5F9" />
                <rect x="440" y="390" width="140" height="90" fill="#F1F5F9" />
                <rect x="620" y="380" width="160" height="100" fill="#F1F5F9" />

                {/* Pin */}
                <g transform="translate(400, 250)">
                  <circle r="28" fill="#0A3D91" fillOpacity="0.12" />
                  <circle r="16" fill="#0A3D91" fillOpacity="0.18" />
                  <path
                    d="M 0 -22 C -12 -22 -20 -12 -20 0 C -20 14 0 30 0 30 C 0 30 20 14 20 0 C 20 -12 12 -22 0 -22 Z"
                    fill="#C8102E"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                  />
                  <circle cy="-2" r="5" fill="#FFFFFF" />
                </g>

                {/* Label */}
                <g transform="translate(420, 228)">
                  <rect
                    x="0"
                    y="-18"
                    width="170"
                    height="26"
                    fill="#0A1F44"
                  />
                  <text
                    x="10"
                    y="0"
                    fill="#FFFFFF"
                    fontSize="12"
                    fontFamily="var(--font-sans), sans-serif"
                    fontWeight="600"
                  >
                    Siège ENGIP
                  </text>
                </g>
              </svg>
              <div className="absolute bottom-3 right-3 text-[0.66rem] uppercase tracking-[0.14em] font-semibold text-muted-foreground bg-background/90 px-2 py-1">
                Carte simplifiée
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
