import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { seoFields } from './_shared'

export const OffresEmploi: CollectionConfig = {
  slug: 'offres-emploi',
  labels: { singular: 'Offre d’emploi', plural: 'Offres d’emploi & stages' },
  access: {
    create: authenticated,
    delete: authenticated,
    update: authenticated,
    read: anyone,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'jobType', 'contract', 'department', 'deadline'],
    group: 'Institutionnel',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField({ position: undefined }),
    {
      name: 'jobType',
      type: 'select',
      required: true,
      defaultValue: 'emploi',
      options: [
        { label: 'Offre d’emploi', value: 'emploi' },
        { label: 'Stage', value: 'stage' },
      ],
    },
    {
      name: 'contract',
      type: 'select',
      required: true,
      defaultValue: 'cdi',
      options: [
        { label: 'CDI', value: 'cdi' },
        { label: 'CDD', value: 'cdd' },
        { label: 'Stage', value: 'stage' },
        { label: 'Alternance', value: 'alternance' },
      ],
    },
    { name: 'department', type: 'text', required: true, localized: true },
    { name: 'location', type: 'text', required: true, localized: true },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
    },
    { name: 'description', type: 'richText', localized: true },
    {
      name: 'deadline',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    seoFields,
  ],
}
