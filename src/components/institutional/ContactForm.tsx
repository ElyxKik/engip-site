'use client'

import React, { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

const SUBJECTS = [
  'Demande d’information générale',
  'Relations presse',
  'Partenariats institutionnels',
  'Fournisseurs & appels d’offres',
  'Carrières & recrutement',
  'Autre',
]

/**
 * Formulaire de contact officiel — soumission simulée côté client.
 * Sera relié à l'endpoint Payload (collection `MessagesContact`) en Phase 3.
 */
export const ContactForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      lastName: fd.get('lastName'),
      firstName: fd.get('firstName'),
      organization: fd.get('organization') || undefined,
      role: fd.get('role') || undefined,
      email: fd.get('email'),
      phone: fd.get('phone') || undefined,
      subject: fd.get('subject'),
      message: fd.get('message'),
      consent: true,
    }
    try {
      const res = await fetch('/api/messages-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setSubmitted(true)
    } catch {
      setError('L’envoi a échoué. Merci de réessayer dans quelques instants.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-background border border-border p-8 text-center">
        <CheckCircle2
          className="w-10 h-10 text-primary mx-auto"
          strokeWidth={1.5}
          aria-hidden
        />
        <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
          Message transmis
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Merci pour votre message. Nos équipes reviendront vers vous dans les meilleurs
          délais.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background border border-border p-6 md:p-8 grid gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" name="lastName" required />
        <Field label="Prénom" name="firstName" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Organisation" name="organization" />
        <Field label="Fonction" name="role" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Adresse e-mail" name="email" type="email" required />
        <Field label="Téléphone" name="phone" type="tel" />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.14em] font-semibold text-foreground/80">
          Objet <Required />
        </label>
        <select
          name="subject"
          required
          defaultValue=""
          className="mt-2 w-full px-3 py-2.5 text-sm bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="" disabled>
            Sélectionnez un objet
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.14em] font-semibold text-foreground/80">
          Message <Required />
        </label>
        <textarea
          name="message"
          rows={6}
          required
          placeholder="Décrivez votre demande…"
          className="mt-2 w-full px-3 py-2.5 text-sm bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
        />
      </div>

      <label className="flex items-start gap-3 text-xs text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 w-4 h-4 accent-primary"
        />
        <span>
          J’accepte le traitement de mes données personnelles pour le traitement de
          cette demande, conformément à la politique de confidentialité.
        </span>
      </label>

      {error && (
        <div role="alert" className="bg-primary/5 border border-primary/30 text-primary text-sm p-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {submitting ? 'Envoi en cours…' : 'Envoyer le message'}
        <Send className="w-4 h-4" aria-hidden />
      </button>
    </form>
  )
}

const Required: React.FC = () => <span className="text-secondary">*</span>

interface FieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
}

const Field: React.FC<FieldProps> = ({ label, name, type = 'text', required }) => (
  <div>
    <label className="block text-xs uppercase tracking-[0.14em] font-semibold text-foreground/80">
      {label} {required && <Required />}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      className="mt-2 w-full px-3 py-2.5 text-sm bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    />
  </div>
)
