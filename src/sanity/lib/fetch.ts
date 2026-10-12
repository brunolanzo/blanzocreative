import { draftMode } from 'next/headers'
import type { QueryParams } from 'next-sanity'
import { client } from './client'
import { readToken } from './token'

/**
 * Busca conteúdo com cache do Next marcado por tags.
 * Quando algo é publicado no painel, o webhook (/api/revalidate) expira as tags
 * do tipo publicado e a página é refeita na próxima visita.
 *
 * Tags usadas: o tipo do documento ("project", "tag", "client", "siteSettings"…)
 * e, para projetos, "project:<slug>".
 *
 * Em desenvolvimento (npm run dev) não há cache: o webhook não alcança o seu
 * computador, então cada recarregamento busca o conteúdo mais recente.
 *
 * Na pré-visualização do painel (draft mode), busca os rascunhos, sem cache, com a
 * marcação do "clique para editar" nos textos.
 */
const isDev = process.env.NODE_ENV === 'development'

async function isDraftMode(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled
  } catch {
    // Fora de uma visita (ex.: lista de páginas gerada no build): só o conteúdo publicado.
    return false
  }
}

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  tags,
}: {
  query: QueryString
  params?: QueryParams
  tags: string[]
}) {
  if (readToken && (await isDraftMode())) {
    return client.fetch(query, params, {
      perspective: 'drafts',
      token: readToken,
      stega: true,
      useCdn: false,
      cache: 'no-store',
    })
  }
  return client.fetch(query, params, isDev ? { cache: 'no-store' } : { cache: 'force-cache', next: { tags } })
}
