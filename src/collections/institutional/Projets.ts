import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { publishingFields, seoFields } from './_shared'

export const Projets: CollectionConfig = {
  slug: 'projets',
  labels: { singular: 'Projet', plural: 'Projets stratégiques' },
  access: {
    create: authenticated,
    delete: authenticated,
    update: authenticated,
    read: anyone,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'location', 'period'],
    group: 'Institutionnel',
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField({ position: undefined }),
    {
      name: 'projectStatus',
      type: 'select',
      required: true,
      defaultValue: 'en-cours',
      options: [
        { label: 'En cours', value: 'en-cours' },
        { label: 'À venir / Futur', value: 'futur' },
        { label: 'Livré', value: 'livre' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
    },
    { name: 'location', type: 'text', localized: true },
    {
      name: 'period',
      type: 'text',
      admin: { description: 'Ex. "2024 — 2027".' },
    },
    { name: 'budget', type: 'text', admin: { description: 'Ex. "180 M$".' } },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    {
      name: 'impact',
      type: 'array',
      label: 'Impacts mesurables',
      labels: { singular: 'Impact', plural: 'Impacts' },
      localized: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galerie média',
      fields: [
        { name: 'media', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'mediaType',
          type: 'select',
          defaultValue: 'photo',
          options: [
            { label: 'Photo', value: 'photo' },
            { label: 'Vidéo', value: 'video' },
          ],
        },
        { name: 'caption', type: 'text', localized: true },
      ],
    },
    ...publishingFields,
    seoFields,
  ],
}
