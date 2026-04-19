'use client'

import React, { useState } from 'react'
import { Upload, Send, CheckCircle2 } from 'lucide-react'

const DEPARTMENTS = [
  'Exploitation & Maintenance',
  'Ingénierie',
  'Finances',
  'Ressources humaines',
  'Juridique',
  'Systèmes d’information',
  'Communication',
  'Autre',
]

/**
 * Formulaire de dépôt de candidature spontanée.
 * Soumission actuellement simulée côté client — sera relié à l'endpoint
 * Payload (collection `CandidaturesSpontanees`) en Phase 3.
 */
export const SpontaneousApplicationForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const form = e.currentTarget
    const fd = new FormData(form)
    const cv = fd.get('cv') as File | null
    try {
      if (!cv || !cv.size) throw new Error('CV manquant')

      // 1) Upload du CV dans la collection Media
      const mediaFd = new FormData()
      mediaFd.set('file', cv)
      mediaFd.set('alt', `CV ${fd.get('firstName')} ${fd.get('lastName')}`)
      const mediaRes = await fetch('/api/media', { method: 'POST', body: mediaFd })
      if (!mediaRes.ok) throw new Error(`Upload échoué (HTTP ${mediaRes.status})`)
      const mediaDoc = await mediaRes.json()
      const cvId = mediaDoc?.doc?.id ?? mediaDoc?.id
      if (!cvId) throw new Error('ID CV introuvable après upload')

      // 2) Création de la candidature référençant le media
      const candidatureRes = await fetch('/api/candidatures-spontanees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lastName: fd.get('lastName'),
          firstName: fd.get('firstName'),
          email: fd.get('email'),
          phone: fd.get('phone') || undefined,
          department: fd.get('department'),
          message: fd.get('message') || undefined,
          cv: cvId,
          consent: true,
        }),
      })
      if (!candidatureRes.ok) throw new Error(`HTTP ${candidatureRes.status}`)
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
          Candidature transmise
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Merci pour votre intérêt. Notre direction des ressources humaines étudiera
          votre dossier et reviendra vers vous dans les meilleurs délais.
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
        <Field label="Adresse e-mail" name="email" type="email" required />
        <Field label="Téléphone" name="phone" type="tel" />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.14em] font-semibold text-foreground/80">
          Direction visée <Required />
        </label>
        <select
          name="department"
          required
          defaultValue=""
          className="mt-2 w-full px-3 py-2.5 text-sm bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="" disabled>
            Sélectionnez une direction
          </option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.14em] font-semibold text-foreground/80">
          Message de motivation
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="Présentez-vous brièvement et décrivez votre projet professionnel…"
          className="mt-2 w-full px-3 py-2.5 text-sm bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.14em] font-semibold text-foreground/80">
          CV (PDF) <Required />
        </label>
        <label className="mt-2 flex items-center justify-between gap-4 border border-dashed border-border bg-muted/30 px-4 py-4 cursor-pointer hover:border-primary transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <Upload className="w-5 h-5 text-primary shrink-0" aria-hidden />
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground truncate">
                {file ? file.name : 'Déposer votre CV ou cliquez pour parcourir'}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Formats acceptés : PDF — max 5 Mo
              </div>
            </div>
          </div>
          <input
            type="file"
            name="cv"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="sr-only"
          />
          <span className="shrink-0 text-xs uppercase tracking-[0.14em] font-semibold text-primary">
            Parcourir
          </span>
        </label>
      </div>

      <label className="flex items-start gap-3 text-xs text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 w-4 h-4 accent-primary"
        />
        <span>
          J’accepte que mes données soient traitées dans le cadre du processus de
          recrutement et conservées selon la politique de confidentialité en vigueur.
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
        {submitting ? 'Envoi en cours…' : 'Envoyer ma candidature'}
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
