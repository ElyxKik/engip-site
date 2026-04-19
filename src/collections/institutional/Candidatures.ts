import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

/**
 * Candidatures spontanées — dépôts de CV via le formulaire public.
 * Création ouverte à tous (POST), lecture/modification réservées aux admins.
 */
export const Candidatures: CollectionConfig = {
  slug: 'candidatures-spontanees',
  labels: { singular: 'Candidature', plural: 'Candidatures spontanées' },
  access: {
    create: () => true,
    delete: authenticated,
    update: authenticated,
    read: authenticated,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['lastName', 'firstName', 'email', 'department', 'createdAt'],
    group: 'Soumissions',
  },
  fields: [
    { name: 'lastName', type: 'text', required: true },
    { name: 'firstName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'department', type: 'text', required: true },
    { name: 'message', type: 'textarea' },
    { name: 'cv', type: 'upload', relationTo: 'media', required: true },
    { name: 'consent', type: 'checkbox', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'nouveau',
      options: [
        { label: 'Nouveau', value: 'nouveau' },
        { label: 'En cours d’examen', value: 'en-examen' },
        { label: 'Retenue', value: 'retenue' },
        { label: 'Non retenue', value: 'non-retenue' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
