import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  /** 'dark' for use on light backgrounds, 'light' for use on dark backgrounds */
  variant?: 'dark' | 'light'
}

/**
 * Logo officiel ENGIP-RDC — image transparente `public/logo-officiel.png`.
 * Le fond transparent permet d'utiliser le logo tel quel aussi bien sur
 * fond clair (header) que sur fond sombre (footer).
 */
export const Logo = (props: Props) => {
  const { className, loading = 'eager', priority = 'high' } = props
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-officiel.png"
      alt="ENGIP-RDC — Logo officiel"
      loading={loading}
      fetchPriority={priority}
      className={clsx('h-12 w-auto select-none', className)}
    />
  )
}
