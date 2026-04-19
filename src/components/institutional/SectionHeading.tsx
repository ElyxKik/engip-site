import React from 'react'
import clsx from 'clsx'

interface Props {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

/** Titres de section institutionnels — eyebrow + titre serif + filet rouge. */
export const SectionHeading: React.FC<Props> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}) => {
  const isCenter = align === 'center'
  return (
    <header
      className={clsx(
        'max-w-3xl',
        isCenter && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <div
          className={clsx(
            'inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] font-semibold text-secondary',
          )}
        >
          <span className="block w-6 h-px bg-secondary" aria-hidden />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-foreground leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </header>
  )
}
