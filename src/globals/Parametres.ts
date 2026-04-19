import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

/**
 * Global "Paramètres du site" — coordonnées institutionnelles, réseaux,
 * horaires, message de pied de page. Accessible en lecture publique.
 */
export const Parametres: GlobalConfig = {
  slug: 'parametres',
  label: 'Paramètres du site',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Configuration' },
  fields: [
    {
      name: 'institutionName',
      type: 'text',
      required: true,
      defaultValue: 'ENGIP',
      localized: true,
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: { description: 'Baseline courte affichée sous le logo.' },
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'address', type: 'textarea', localized: true },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'pressEmail', type: 'email' },
        { name: 'suppliersEmail', type: 'email' },
      ],
    },
    {
      name: 'openingHours',
      type: 'array',
      label: 'Horaires d’ouverture',
      fields: [
        { name: 'days', type: 'text', required: true, localized: true },
        { name: 'hours', type: 'text', required: true },
      ],
    },
    {
      name: 'social',
      type: 'array',
      label: 'Réseaux sociaux',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'X / Twitter', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Facebook', value: 'facebook' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'footerDescription',
      type: 'textarea',
      localized: true,
    },
  ],
}
