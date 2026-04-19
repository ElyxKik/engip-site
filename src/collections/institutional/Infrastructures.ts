import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Infrastructures: CollectionConfig = {
  slug: 'infrastructures',
  labels: { singular: 'Infrastructure', plural: 'Infrastructures' },
  access: {
    create: authenticated,
    delete: authenticated,
    update: authenticated,
    read: anyone,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'region', 'active'],
    group: 'Institutionnel',
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    slugField({ position: undefined }),
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Pipeline', value: 'pipeline' },
        { label: 'Site de stockage', value: 'stockage' },
        { label: 'Installation stratégique', value: 'installation' },
      ],
    },
    { name: 'region', type: 'text', localized: true },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: { description: 'Courte description (1 phrase).' },
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'Coordonnées carte',
      fields: [
        {
          name: 'x',
          type: 'number',
          admin: { description: 'Position X sur la carte (0–100).' },
          min: 0,
          max: 100,
        },
        {
          name: 'y',
          type: 'number',
          admin: { description: 'Position Y sur la carte (0–100).' },
          min: 0,
          max: 100,
        },
      ],
    },
    {
      name: 'details',
      type: 'group',
      fields: [
        { name: 'capacity', type: 'text', localized: true },
        { name: 'length', type: 'text', localized: true },
        { name: 'commissioning', type: 'text' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
