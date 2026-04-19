import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const AppelsOffres: CollectionConfig = {
  slug: 'appels-offres',
  labels: { singular: 'Appel d’offres', plural: 'Appels d’offres' },
  access: {
    create: authenticated,
    delete: authenticated,
    update: authenticated,
    read: anyone,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['reference', 'title', 'tenderStatus', 'deadline'],
    group: 'Institutionnel',
  },
  fields: [
    {
      name: 'reference',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Ex. "AO-2026-014".' },
    },
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'tenderStatus',
      type: 'select',
      required: true,
      defaultValue: 'ouvert',
      options: [
        { label: 'Offre ouverte', value: 'ouvert' },
        { label: 'Clôturée', value: 'clos' },
        { label: 'Attribuée', value: 'attribue' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Travaux', value: 'travaux' },
        { label: 'Fournitures', value: 'fournitures' },
        { label: 'Services', value: 'services' },
        { label: 'Études', value: 'etudes' },
      ],
    },
    {
      name: 'deadline',
      type: 'date',
      required: true,
      admin: {
        description: 'Date limite de dépôt des candidatures.',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    { name: 'estimatedAmount', type: 'text', admin: { description: 'Ex. "18 — 22 M$".' } },
    {
      name: 'documents',
      type: 'array',
      label: 'Documents à télécharger',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'file', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'awardedTo',
      type: 'text',
      admin: { description: 'Nom de l’attributaire (si applicable).' },
    },
    { name: 'awardedAt', type: 'date' },
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'restricted',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Marché restreint — visible uniquement depuis l’espace fournisseurs.',
      },
    },
  ],
}
