import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Dirigeants: CollectionConfig = {
  slug: 'dirigeants',
  labels: { singular: 'Dirigeant·e', plural: 'Dirigeants' },
  access: {
    create: authenticated,
    delete: authenticated,
    update: authenticated,
    read: anyone,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'board', 'order'],
    group: 'Institutionnel',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true, localized: true },
    {
      name: 'board',
      type: 'select',
      required: true,
      defaultValue: 'direction',
      options: [
        { label: 'Direction générale', value: 'direction' },
        { label: 'Conseil d’administration', value: 'conseil' },
      ],
    },
    { name: 'portrait', type: 'upload', relationTo: 'media' },
    { name: 'biography', type: 'richText', localized: true },
    { name: 'linkedinUrl', type: 'text' },
    { name: 'email', type: 'email' },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Ordre d’affichage (plus petit = en premier).' },
    },
  ],
}
