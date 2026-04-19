import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

/**
 * Global "Accueil" — contenu piloté de la page d'accueil :
 * hero (avec image de fond), message du CEO, chiffres clés.
 * Les actualités sont tirées automatiquement de la collection `actualites`.
 */
export const Accueil: GlobalConfig = {
  slug: 'accueil',
  label: 'Page d’accueil',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Configuration' },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero — bandeau principal',
      fields: [
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
        {
          name: 'primaryCta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text' },
          ],
        },
        {
          name: 'secondaryCta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'ceoMessage',
      type: 'group',
      label: 'Message du CEO / État',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true, localized: true },
        { name: 'portrait', type: 'upload', relationTo: 'media' },
        {
          name: 'excerpt',
          type: 'textarea',
          required: true,
          localized: true,
        },
        { name: 'fullMessageHref', type: 'text' },
      ],
    },
    {
      name: 'keyFigures',
      type: 'array',
      label: 'Chiffres clés',
      localized: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'unit', type: 'text' },
      ],
    },
    {
      name: 'quickAccess',
      type: 'array',
      label: 'Accès rapide',
      localized: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Document / Fichier', value: 'FileText' },
            { label: 'Mallette', value: 'Briefcase' },
            { label: 'Carte', value: 'Map' },
            { label: 'Bouclier', value: 'Shield' },
            { label: 'Utilisateurs', value: 'Users' },
            { label: 'Courriel', value: 'Mail' },
          ],
        },
      ],
    },
  ],
}
