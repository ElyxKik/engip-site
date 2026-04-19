import React from 'react'

export interface Stat {
  value: string
  label: string
  unit?: string
}

/** Bloc chiffres clés institutionnel — mise en avant typographique serif, séparateurs fins. */
export const StatBlock: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border border-y border-border">
      {stats.map((s, i) => (
        <div key={i} className="px-6 py-8 text-center md:text-left">
          <dt className="text-[0.72rem] uppercase tracking-[0.16em] font-medium text-muted-foreground">
            {s.label}
          </dt>
          <dd className="mt-3 font-serif font-semibold text-primary leading-none">
            <span className="text-4xl md:text-5xl">{s.value}</span>
            {s.unit && (
              <span className="ml-1 text-xl md:text-2xl text-secondary font-medium">
                {s.unit}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
