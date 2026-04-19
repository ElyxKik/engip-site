/**
 * Structure de navigation institutionnelle partagée (header + footer).
 * Chaque groupe possède un libellé et un href racine, plus une liste
 * de sous-entrées affichées dans les méga-menus (desktop) et dans le
 * panneau mobile.
 */
export interface NavSubItem {
  label: string
  href: string
  description?: string
}

export interface NavGroup {
  label: string
  href: string
  description?: string
  items: NavSubItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Accueil',
    href: '/',
    items: [],
  },
  {
    label: 'Institution',
    href: '/institution',
    description: 'Présentation, mission et gouvernance de l’institution.',
    items: [
      {
        label: 'Présentation',
        href: '/institution',
        description: 'Qui nous sommes et notre rôle public.',
      },
      {
        label: 'Mission & mandat',
        href: '/institution#mission',
        description: 'Mission, vision et mandat public.',
      },
      {
        label: 'Historique',
        href: '/institution#historique',
        description: 'Les grandes étapes de l’institution.',
      },
      {
        label: 'Gouvernance',
        href: '/institution#gouvernance',
        description: 'Direction générale et conseil d’administration.',
      },
      {
        label: 'Organisation interne',
        href: '/institution#organisation',
        description: 'Structure et organigramme.',
      },
    ],
  },
  {
    label: 'Activités',
    href: '/infrastructures',
    description: 'Infrastructures, projets et engagements opérationnels.',
    items: [
      {
        label: 'Infrastructures nationales',
        href: '/infrastructures',
        description: 'Réseau de transport, stockage et installations.',
      },
      {
        label: 'Projets stratégiques',
        href: '/projets',
        description: 'Projets en cours et projets futurs.',
      },
      {
        label: 'Sécurité & conformité',
        href: '/securite-conformite',
        description: 'Normes HSE, certifications, environnement.',
      },
      {
        label: 'Carrières',
        href: '/carrieres',
        description: 'Offres d’emploi, stages, dépôt de CV.',
      },
    ],
  },
  {
    label: 'Ressources',
    href: '/publications',
    description: 'Documents officiels et données publiques.',
    items: [
      {
        label: 'Publications officielles',
        href: '/publications',
        description: 'Rapports, études et documents PDF.',
      },
      {
        label: 'Rapports annuels',
        href: '/publications?type=rapport',
        description: 'Bilans annuels consolidés.',
      },
      {
        label: 'Communiqués de presse',
        href: '/publications?type=communique',
        description: 'Annonces et communications officielles.',
      },
      {
        label: 'Statistiques publiques',
        href: '/publications?type=statistiques',
        description: 'Données chiffrées et indicateurs.',
      },
      {
        label: 'Appels d’offres',
        href: '/appels-offres',
        description: 'Offres en cours, résultats et documentation.',
      },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
    description: 'Entrer en relation avec l’institution.',
    items: [
      {
        label: 'Nous contacter',
        href: '/contact',
        description: 'Formulaire officiel et coordonnées.',
      },
      {
        label: 'Relations presse',
        href: '/contact#presse',
        description: 'Contacts dédiés aux journalistes.',
      },
      {
        label: 'Espace fournisseurs',
        href: '/appels-offres/fournisseurs',
        description: 'Accès authentifié aux marchés publics.',
      },
      {
        label: 'Administration',
        href: '/admin',
        description: 'Accès sécurisé à la console d’édition.',
      },
    ],
  },
]
