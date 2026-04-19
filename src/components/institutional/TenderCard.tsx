import React from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Hash, FileText, Award } from 'lucide-react'

export type TenderStatus = 'ouvert' | 'clos' | 'attribue'

export interface Tender {
  id: string
  reference: string
  title: string
  description: string
  status: TenderStatus
  /** Date de clôture (ISO). */
  deadline: string
  deadlineLabel: string
  category: string
  estimatedAmount?: string
  awardedTo?: string
  awardedOn?: string
  href: string
  documentsCount?: number
}

const STATUS_META: Record<
  TenderStatus,
  { label: string; bg: string; border: string }
> = {
  ouvert: {
    label: 'Offre ouverte',
    bg: 'bg-secondary text-secondary-foreground',
    border: 'border-secondary',
  },
  clos: {
    label: 'Clôturée',
    bg: 'bg-muted text-muted-foreground',
    border: 'border-border',
  },
  attribue: {
    label: 'Attribuée',
    bg: 'bg-primary text-primary-foreground',
    border: 'border-primary',
  },
}

export const TenderCard: React.FC<{ tender: Tender }> = ({ tender }) => {
  const meta = STATUS_META[tender.status]
  return (
    <article
      className={
        'group bg-background border-l-[3px] border border-border hover:border-primary transition-colors ' +
        'pl-5 md:pl-6 p-6'
      }
      style={{
        borderLeftColor:
          tender.status === 'ouvert'
            ? '#C8102E'
            : tender.status === 'attribue'
              ? '#0A3D91'
              : '#E5E7EB',
      }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span
              className={
                'inline-flex items-center px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.14em] font-semibold ' +
                meta.bg
              }
            >
              {meta.label}
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Hash className="w-3.5 h-3.5" aria-hidden />
              <span className="font-mono">{tender.reference}</span>
            </span>
            <span className="text-muted-foreground/50">·</span>
            <span className="text-muted-foreground font-medium">
              {tender.category}
            </span>
          </div>
          <h3 className="mt-3 font-serif text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
            {tender.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {tender.description}
          </p>

          <dl className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <dt className="uppercase tracking-[0.14em] text-[0.66rem] font-semibold text-muted-foreground">
                {tender.status === 'ouvert' ? 'Clôture' : 'Clôturée le'}
              </dt>
              <dd className="mt-1 inline-flex items-center gap-1.5 font-medium text-foreground">
                <Calendar className="w-3.5 h-3.5 text-primary/70" aria-hidden />
                <time dateTime={tender.deadline}>{tender.deadlineLabel}</time>
              </dd>
            </div>
            {tender.estimatedAmount && (
              <div>
                <dt className="uppercase tracking-[0.14em] text-[0.66rem] font-semibold text-muted-foreground">
                  Montant estimé
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {tender.estimatedAmount}
                </dd>
              </div>
            )}
            {tender.documentsCount !== undefined && (
              <div>
                <dt className="uppercase tracking-[0.14em] text-[0.66rem] font-semibold text-muted-foreground">
                  Documents
                </dt>
                <dd className="mt-1 inline-flex items-center gap-1.5 font-medium text-foreground">
                  <FileText className="w-3.5 h-3.5 text-primary/70" aria-hidden />
                  {tender.documentsCount} fichier{tender.documentsCount > 1 ? 's' : ''}
                </dd>
              </div>
            )}
            {tender.awardedTo && (
              <div className="sm:col-span-3">
                <dt className="uppercase tracking-[0.14em] text-[0.66rem] font-semibold text-muted-foreground">
                  Attributaire
                </dt>
                <dd className="mt-1 inline-flex items-center gap-2 font-medium text-primary">
                  <Award className="w-3.5 h-3.5" aria-hidden />
                  {tender.awardedTo}
                  {tender.awardedOn && (
                    <span className="text-muted-foreground font-normal">
                      — attribuée le {tender.awardedOn}
                    </span>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="shrink-0 flex md:flex-col gap-2 md:items-end">
          <Link
            href={tender.href}
            className={
              'inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors ' +
              (tender.status === 'ouvert'
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground')
            }
          >
            {tender.status === 'ouvert' ? 'Consulter l’offre' : 'Voir le détail'}
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  )
}
