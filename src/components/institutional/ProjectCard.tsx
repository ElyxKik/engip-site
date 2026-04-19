import React from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Calendar } from 'lucide-react'

export type ProjectStatus = 'en-cours' | 'futur' | 'livre'

export interface Project {
  id: string
  title: string
  summary: string
  status: ProjectStatus
  location: string
  period: string
  budget?: string
  coverUrl?: string
  href: string
}

const STATUS_META: Record<ProjectStatus, { label: string; dot: string; bg: string }> = {
  'en-cours': { label: 'En cours', dot: 'bg-secondary', bg: 'bg-secondary text-secondary-foreground' },
  futur: { label: 'À venir', dot: 'bg-primary', bg: 'bg-primary text-primary-foreground' },
  livre: { label: 'Livré', dot: 'bg-foreground/70', bg: 'bg-foreground/80 text-background' },
}

/** Carte projet — couverture, statut en badge, titre serif, méta (lieu, période, budget). */
export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const meta = STATUS_META[project.status]
  return (
    <Link
      href={project.href}
      className="group flex flex-col bg-background border border-border hover:border-primary transition-colors"
    >
      <div className="relative aspect-[16/10] bg-muted overflow-hidden">
        {project.coverUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.coverUrl}
            alt=""
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10" />
        )}
        <span
          className={
            'absolute top-4 left-4 px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] font-semibold ' +
            meta.bg
          }
        >
          {meta.label}
        </span>
      </div>
      <div className="p-6 flex-1 flex flex-col gap-3">
        <h3 className="font-serif text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.summary}
        </p>
        <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary/70 shrink-0" aria-hidden />
            <span className="truncate">{project.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary/70 shrink-0" aria-hidden />
            <span className="truncate">{project.period}</span>
          </div>
          {project.budget && (
            <div className="col-span-2 flex items-center gap-1.5">
              <span className="text-[0.68rem] uppercase tracking-[0.14em] font-semibold text-secondary">
                Budget
              </span>
              <span className="font-medium text-foreground">{project.budget}</span>
            </div>
          )}
        </dl>
        <span className="mt-auto pt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Consulter le projet
          <ArrowRight
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  )
}
