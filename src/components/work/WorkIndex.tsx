import { stegaClean } from 'next-sanity'
import { Display } from '@/components/ui/Display'
import { hasVisibleText } from '@/lib/preview-marker'
import { pageTitle, workTitle } from '@/lib/titles'
import { sanityFetch } from '@/sanity/lib/fetch'
import { WORK_QUERY } from '@/sanity/lib/queries'
import { getSettings } from '@/sanity/lib/settings'
import { FilterableWork } from './FilterableWork'

export async function getWorkData() {
  return sanityFetch({ query: WORK_QUERY, tags: ['siteSettings', 'project', 'tag', 'mux.videoAsset'] })
}

/**
 * Página /trabalhos: título e introdução (Configurações → Página Trabalhos),
 * barra de tags e o grid com "carregar mais". Já sai do servidor com o filtro aplicado.
 */
export async function WorkIndex({ tag }: { tag: string | null }) {
  const [{ ui, siteName }, data] = await Promise.all([getSettings(), getWorkData()])
  const title = hasVisibleText(data.page?.title) ? data.page.title : ui.navWork
  // O filtro troca só a URL; o título da aba acompanha no navegador (chave '' = sem filtro).
  const documentTitles: Record<string, string> = { '': pageTitle(workTitle(ui.navWork), siteName) }
  for (const item of data.tags) {
    if (item.slug) documentTitles[item.slug] = pageTitle(workTitle(ui.navWork, stegaClean(item.name)), siteName)
  }

  return (
    <section className="container-site pt-[calc(var(--section-y)+var(--space-9))] pb-section">
      <div className="mb-64 grid gap-24 md:grid-cols-12 md:gap-x-32">
        <Display size="l" accent className="md:col-span-7">
          {title}
        </Display>
        {data.page?.intro && (
          <p className="max-w-prose self-end text-body-l text-fg-secondary md:col-span-5 md:col-start-8">{data.page.intro}</p>
        )}
      </div>
      <FilterableWork
        mode="index"
        projects={data.projects}
        tags={data.tags}
        initialTag={tag}
        documentTitles={documentTitles}
        ui={ui}
      />
    </section>
  )
}
