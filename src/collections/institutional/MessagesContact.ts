import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const MessagesContact: CollectionConfig = {
  slug: 'messages-contact',
  labels: { singular: 'Message de contact', plural: 'Messages de contact' },
  access: {
    create: () => true,
    delete: authenticated,
    update: authenticated,
    read: authenticated,
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['lastName', 'firstName', 'email', 'subject', 'createdAt'],
    group: 'Soumissions',
  },
  fields: [
    { name: 'lastName', type: 'text', required: true },
    { name: 'firstName', type: 'text', required: true },
    { name: 'organization', type: 'text' },
    { name: 'role', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'consent', type: 'checkbox', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'nouveau',
      options: [
        { label: 'Nouveau', value: 'nouveau' },
        { label: 'Traité', value: 'traite' },
        { label: 'Archivé', value: 'archive' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
