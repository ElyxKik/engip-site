import React from 'react'
import { Linkedin } from 'lucide-react'

export interface Leader {
  name: string
  role: string
  /** Placeholder affiché si aucune photo n'est fournie. */
  portraitUrl?: string
  linkedinUrl?: string
}

/** Grille de dirigeants — portrait en ratio 4/5, nom serif, rôle, lien LinkedIn optionnel. */
export const LeadershipGrid: React.FC<{ leaders: Leader[] }> = ({ leaders }) => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {leaders.map((l, i) => (
        <article key={i} className="group">
          <div className="relative aspect-[4/5] bg-muted border border-border overflow-hidden">
            {l.portraitUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={l.portraitUrl}
                alt={`Portrait de ${l.name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif text-5xl font-semibold text-primary/15 select-none">
                  {l.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </span>
              </div>
            )}
            <span
              className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform"
              aria-hidden
            />
          </div>
          <div className="mt-4">
            <h3 className="font-serif text-lg font-semibold text-foreground leading-snug">
              {l.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{l.role}</p>
            {l.linkedinUrl && (
              <a
                href={l.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-secondary transition-colors"
                aria-label={`Profil LinkedIn de ${l.name}`}
              >
                <Linkedin className="w-3.5 h-3.5" aria-hidden />
                LinkedIn
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
