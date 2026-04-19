/**
 * Data-fetch helpers pour les collections et globals institutionnels.
 *
 * Toutes les requêtes sont cachées via `unstable_cache` avec des tags Next.js
 * permettant une revalidation à la demande (via `revalidateTag('actualites')` etc.).
 * Tous les helpers renvoient une valeur stable (jamais `null`) — utile pour
 * les fallbacks statiques.
 */
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

const getClient = async () => getPayload({ config: configPromise })

/** Récupère un global par slug, silencieusement si absent. */
async function getGlobalSafe<T = unknown>(slug: string, depth = 2): Promise<T | null> {
  try {
    const payload = await getClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await payload.findGlobal({ slug: slug as any, depth })
    return (data as T) ?? null
  } catch {
    return null
  }
}

/** Récupère les documents d'une collection, silencieusement si absente/vide. */
async function findSafe<T = unknown>(opts: {
  collection: string
  where?: Record<string, unknown>
  sort?: string
  limit?: number
  depth?: number
}): Promise<T[]> {
  try {
    const payload = await getClient()
    const res = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: opts.collection as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      where: opts.where as any,
      sort: opts.sort,
      limit: opts.limit ?? 100,
      depth: opts.depth ?? 1,
    })
    return (res.docs as T[]) ?? []
  } catch {
    return []
  }
}

// ---------- Globals ----------

export const getParametres = unstable_cache(
  async () => getGlobalSafe('parametres'),
  ['parametres'],
  { tags: ['parametres'] },
)

export const getAccueil = unstable_cache(async () => getGlobalSafe('accueil'), ['accueil'], {
  tags: ['accueil'],
})

// ---------- Actualités ----------

export const getActualites = unstable_cache(
  async (opts?: { limit?: number; featured?: boolean }) =>
    findSafe({
      collection: 'actualites',
      where: {
        status: { equals: 'published' },
        ...(opts?.featured ? { featured: { equals: true } } : {}),
      },
      sort: '-publishedAt',
      limit: opts?.limit ?? 20,
    }),
  ['actualites'],
  { tags: ['actualites'] },
)

// ---------- Dirigeants ----------

export const getDirigeants = unstable_cache(
  async (board?: 'direction' | 'conseil') =>
    findSafe({
      collection: 'dirigeants',
      where: board ? { board: { equals: board } } : undefined,
      sort: 'order',
    }),
  ['dirigeants'],
  { tags: ['dirigeants'] },
)

// ---------- Infrastructures ----------

export const getInfrastructures = unstable_cache(
  async () =>
    findSafe({
      collection: 'infrastructures',
      where: { active: { equals: true } },
      sort: 'order',
    }),
  ['infrastructures'],
  { tags: ['infrastructures'] },
)

// ---------- Projets ----------

export const getProjets = unstable_cache(
  async (status?: 'en-cours' | 'futur' | 'livre') =>
    findSafe({
      collection: 'projets',
      where: {
        status: { equals: 'published' },
        ...(status ? { projectStatus: { equals: status } } : {}),
      },
      sort: '-publishedAt',
    }),
  ['projets'],
  { tags: ['projets'] },
)

// ---------- Publications ----------

export const getPublications = unstable_cache(
  async () =>
    findSafe({
      collection: 'publications',
      sort: '-publishedAt',
    }),
  ['publications'],
  { tags: ['publications'] },
)

// ---------- Appels d'offres ----------

export const getAppelsOffres = unstable_cache(
  async (status?: 'ouvert' | 'clos' | 'attribue') =>
    findSafe({
      collection: 'appels-offres',
      where: {
        restricted: { equals: false },
        ...(status ? { tenderStatus: { equals: status } } : {}),
      },
      sort: '-deadline',
    }),
  ['appels-offres'],
  { tags: ['appels-offres'] },
)

// ---------- Offres d'emploi ----------

export const getOffresEmploi = unstable_cache(
  async () =>
    findSafe({
      collection: 'offres-emploi',
      where: { active: { equals: true } },
      sort: '-createdAt',
    }),
  ['offres-emploi'],
  { tags: ['offres-emploi'] },
)
