import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { publishingFields, seoFields } from './_shared'

export const Actualites: CollectionConfig = {
  slug: 'actualites',
  labels: { singular: 'Actualité', plural: 'Actualités' },
  access: {
    create: authenticated,
    delete: authenticated,
    update: authenticated,
    read: anyone,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'status'],
    group: 'Institutionnel',
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField({ position: undefined }),
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'actualite',
      options: [
        { label: 'Actualité', value: 'actualite' },
        { label: 'Communiqué officiel', value: 'communique' },
        { label: 'Rapport', value: 'rapport' },
        { label: 'Événement', value: 'evenement' },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Résumé affiché sur les cartes (1–2 phrases).' },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Image de couverture (ratio 16:9 recommandé).' },
    },
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Mettre en vedette sur l’accueil.',
      },
    },
    ...publishingFields,
    seoFields,
  ],
}
