import React from 'react'

export interface TimelineEntry {
  year: string
  title: string
  description: string
}

/** Frise chronologique institutionnelle — ligne verticale bleue, points rouges aux dates clés. */
export const Timeline: React.FC<{ entries: TimelineEntry[] }> = ({ entries }) => {
  return (
    <ol className="relative ml-3 md:ml-0">
      {entries.map((e, i) => (
        <li key={i} className="relative md:grid md:grid-cols-[120px_1fr] md:gap-8 pb-10 last:pb-0">
          {/* Vertical line */}
          <span
            className="absolute left-[-0.75rem] md:left-[120px] top-2 bottom-0 w-px bg-border"
            aria-hidden
          />
          {/* Dot */}
          <span
            className="absolute left-[-1.05rem] md:left-[calc(120px-0.375rem)] top-1.5 w-3 h-3 bg-secondary rounded-full ring-4 ring-background"
            aria-hidden
          />
          <div className="font-serif text-2xl font-semibold text-primary md:text-right md:pr-8">
            {e.year}
          </div>
          <div className="mt-1 md:mt-0 md:pl-8 md:border-l md:border-border md:-ml-[1px]">
            <h3 className="font-serif text-lg font-semibold text-foreground leading-snug">
              {e.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {e.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
