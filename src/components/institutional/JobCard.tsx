import React from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Briefcase, GraduationCap } from 'lucide-react'

export type JobType = 'emploi' | 'stage'
export type ContractType = 'cdi' | 'cdd' | 'stage' | 'alternance'

export interface Job {
  id: string
  title: string
  department: string
  location: string
  type: JobType
  contract: ContractType
  /** Résumé court pour la carte. */
  summary: string
  /** Date limite de candidature (ISO). */
  deadline?: string
  deadlineLabel?: string
  href: string
}

const CONTRACT_LABEL: Record<ContractType, string> = {
  cdi: 'CDI',
  cdd: 'CDD',
  stage: 'Stage',
  alternance: 'Alternance',
}

/** Carte offre d'emploi / stage — compacte, avec badge type, méta et CTA. */
export const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const isStage = job.type === 'stage'
  const TypeIcon = isStage ? GraduationCap : Briefcase
  return (
    <Link
      href={job.href}
      className="group flex flex-col bg-background border border-border hover:border-primary transition-colors p-6"
    >
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className={
            'inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.14em] font-semibold ' +
            (isStage
              ? 'bg-secondary text-secondary-foreground'
              : 'bg-primary text-primary-foreground')
          }
        >
          <TypeIcon className="w-3 h-3" aria-hidden />
          {isStage ? 'Stage' : 'Emploi'}
        </span>
        <span className="text-[0.7rem] uppercase tracking-[0.14em] font-medium text-muted-foreground">
          {CONTRACT_LABEL[job.contract]}
        </span>
      </div>
      <h3 className="mt-4 font-serif text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
        {job.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {job.summary}
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Briefcase className="w-3.5 h-3.5 text-primary/70 shrink-0" aria-hidden />
          <span className="truncate">{job.department}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary/70 shrink-0" aria-hidden />
          <span className="truncate">{job.location}</span>
        </div>
        {job.deadlineLabel && (
          <div className="col-span-2 flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden />
            <span>Candidature jusqu’au {job.deadlineLabel}</span>
          </div>
        )}
      </dl>
      <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        Consulter l’offre
        <ArrowRight
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          aria-hidden
        />
      </span>
    </Link>
  )
}
