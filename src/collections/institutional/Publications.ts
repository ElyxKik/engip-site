import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { seoFields } from './_shared'

export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: { singular: 'Publication', plural: 'Publications officielles' },
  access: {
    create: authenticated,
    delete: authenticated,
    update: authenticated,
    read: anyone,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'publishedAt', 'pages'],
    group: 'Institutionnel',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField({ position: undefined }),
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'rapport',
      options: [
        { label: 'Rapport annuel', value: 'rapport' },
        { label: 'Communiqué de presse', value: 'communique' },
        { label: 'Étude', value: 'etude' },
        { label: 'Statistiques', value: 'statistiques' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
    },
    { name: 'file', type: 'upload', relationTo: 'media' },
    {
      name: 'pages',
      type: 'number',
      admin: { description: 'Nombre de pages du document.' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'downloadCount',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true, position: 'sidebar' },
    },
    seoFields,
  ],
}
