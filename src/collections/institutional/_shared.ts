import type { Field } from 'payload'

/** Champs SEO réutilisables — titre + description + image. */
export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'Référencement (SEO)',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: { description: 'Titre SEO (≤ 60 caractères recommandés).' },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: { description: 'Description SEO (≤ 160 caractères recommandés).' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

/** Métadonnées de publication (état + date). */
export const publishingFields: Field[] = [
  {
    name: 'status',
    type: 'select',
    defaultValue: 'draft',
    required: true,
    options: [
      { label: 'Brouillon', value: 'draft' },
      { label: 'Publié', value: 'published' },
      { label: 'Archivé', value: 'archived' },
    ],
    admin: { position: 'sidebar' },
  },
  {
    name: 'publishedAt',
    type: 'date',
    admin: {
      position: 'sidebar',
      date: { pickerAppearance: 'dayAndTime' },
    },
  },
]
