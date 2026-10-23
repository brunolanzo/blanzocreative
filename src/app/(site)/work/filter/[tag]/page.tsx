import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { stegaClean } from 'next-sanity'
import { getWorkData, WorkIndex } from '@/components/work/WorkIndex'
import { workTitle } from '@/lib/titles'
import { sanityFetch } from '@/sanity/lib/fetch'
import { TAG_SLUGS_QUERY } from '@/sanity/lib/queries'
import { getSettings } from '@/sanity/lib/settings'

/**
 * /work?tag=ia é servido por esta página (regra de rewrite em next.config.ts):
 * a URL continua com ?tag=, mas o HTML já sai filtrado e pronto do cache.
 */
type Props = { params: Promise<{ tag: string }> }

export async function generateStaticParams() {
  const tags = await sanityFetch({ query: TAG_SLUGS_QUERY, tags: ['tag', 'project'] })
  return tags.flatMap((tag) => (tag.slug ? [{ tag: tag.slug }] : []))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ tag }, { ui }, data] = await Promise.all([params, getSettings(), getWorkData()])
  const current = data.tags.find((item) => item.slug === tag)
  return {
    // stegaClean: na pré-visualização, tira a marcação invisível do "clique para editar".
    title: stegaClean(workTitle(ui.navWork, current?.name)),
    description: current?.description ? stegaClean(current.description) : undefined,
    alternates: { canonical: `/work?tag=${tag}` },
  }
}

export default async function FilteredWorkPage({ params }: Props) {
  const [{ tag }, data] = await Promise.all([params, getWorkData()])
  // Tag que não existe mais (ou sem projetos publicados): mostra todos os trabalhos.
  if (!data.tags.some((item) => item.slug === tag)) redirect('/work')
  return <WorkIndex tag={tag} />
}
