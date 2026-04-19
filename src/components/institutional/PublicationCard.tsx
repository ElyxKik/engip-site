import React from 'react'
import { FileText, Download, Calendar, FileArchive, BarChart3 } from 'lucide-react'

export type PublicationType = 'rapport' | 'communique' | 'etude' | 'statistiques'

export interface Publication {
  id: string
  title: string
  summary: string
  type: PublicationType
  date: string
  dateLabel: string
  fileSize?: string
  pages?: number
  fileUrl?: string
}

const TYPE_META: Record<
  PublicationType,
  { label: string; color: string; icon: typeof FileText }
> = {
  rapport: { label: 'Rapport', color: 'text-primary border-primary', icon: FileText },
  communique: { label: 'Communiqué', color: 'text-secondary border-secondary', icon: FileArchive },
  etude: { label: 'Étude', color: 'text-primary border-primary', icon: FileText },
  statistiques: { label: 'Statistiques', color: 'text-foreground border-foreground', icon: BarChart3 },
}

/** Carte publication — rangée en liste : type + date + titre + résumé + téléchargement PDF. */
export const PublicationCard: React.FC<{ publication: Publication }> = ({ publication }) => {
  const meta = TYPE_META[publication.type]
  const Icon = meta.icon
  return (
    <article className="group bg-background border border-border hover:border-primary transition-colors">
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <div className="shrink-0 flex md:flex-col items-center md:items-start md:w-28 gap-3">
          <div
            className={
              'inline-flex items-center justify-center w-12 h-12 border-2 ' +
              meta.color +
              ' bg-background'
            }
          >
            <Icon className="w-5 h-5" strokeWidth={1.6} aria-hidden />
          </div>
          <span className="text-[0.68rem] uppercase tracking-[0.14em] font-semibold text-muted-foreground">
            {meta.label}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden />
              <time dateTime={publication.date}>{publication.dateLabel}</time>
            </span>
            {publication.pages && <span>· {publication.pages} pages</span>}
            {publication.fileSize && <span>· {publication.fileSize}</span>}
          </div>
          <h3 className="mt-2 font-serif text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
            {publication.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {publication.summary}
          </p>
        </div>
        <div className="shrink-0 flex md:items-center">
          <a
            href={publication.fileUrl ?? '#'}
            className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2.5 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            {...(publication.fileUrl
              ? { download: true, target: '_blank', rel: 'noopener noreferrer' }
              : { 'aria-disabled': true })}
          >
            <Download className="w-4 h-4" aria-hidden />
            Télécharger
          </a>
        </div>
      </div>
    </article>
  )
}
