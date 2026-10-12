import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type PortableTextBlock, stegaClean, toPlainText } from 'next-sanity'
import { cache } from 'react'
import { CreditList } from '@/components/blocks/CreditList'
import { PageBlocks } from '@/components/blocks/PageBlocks'
import { RichText } from '@/components/blocks/RichText'
import type { ProjectData } from '@/components/blocks/types'
import { BackToWork } from '@/components/project/BackToWork'
import { NextProject } from '@/components/project/NextProject'
import { ProjectHeader } from '@/components/project/ProjectHeader'
import { ProjectHero } from '@/components/project/ProjectHero'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Tag } from '@/components/ui/Tag'
import { ProjectCard } from '@/components/work/ProjectCard'
import { jsonLd, SITE_URL } from '@/lib/site-url'
import { sanityFetch } from '@/sanity/lib/fetch'
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from '@/sanity/lib/queries'
import { getSettings } from '@/sanity/lib/settings'
import { Reveal } from '@/components/motion/Reveal'

type Props = { params: Promise<{ slug: string }> }

const RELATED_COUNT = 3

export async function generateStaticParams() {
  const projects = await sanityFetch({ query: PROJECT_SLUGS_QUERY, tags: ['project'] })
  return projects.flatMap((project) => (project.slug ? [{ slug: project.slug }] : []))
}

/** Uma busca por página (a mesma serve aos metadados e ao conteúdo). */
const getProject = cache((slug: string) =>
  sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
    // O próximo e os relacionados mudam quando outro projeto muda; nomes de cliente e tag também aparecem aqui.
    tags: ['project', `project:${slug}`, 'client', 'tag', 'mux.videoAsset'],
  }),
)

/** Relacionados: mais tags em comum primeiro (empate: ordem do painel), sem repetir o "próximo". */
function pickRelated(project: ProjectData) {
  const own = new Set(project.tags?.map((tag) => tag._id))
  return project.related
    .filter((item) => item._id !== project.next?._id)
    .map((item, index) => ({ item, index, shared: item.tagIds?.filter((id) => own.has(id)).length ?? 0 }))
    .sort((a, b) => b.shared - a.shared || a.index - b.index)
    .slice(0, RELATED_COUNT)
    .map(({ item }) => item)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [project, { siteName, settings }] = await Promise.all([getProject(slug), getSettings()])
  if (!project) return {}
  const title = stegaClean(project.seo?.title || project.title)
  const intro = project.intro ? toPlainText(project.intro as PortableTextBlock[]) : ''
  const description = stegaClean(project.seo?.description || intro).slice(0, 160) || undefined
  const share = project.shareImage || settings?.seo?.image
  const image = share ? `${share}?w=1200&h=630&fit=crop&fm=jpg&q=80` : undefined
  return {
    title,
    description,
    alternates: { canonical: `/trabalhos/${slug}` },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      siteName,
      title,
      description,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    robots: project.visibility === 'unlisted' ? { index: false, follow: false } : undefined,
  }
}

/**
 * Página do projeto: título e ficha, mídia de abertura, descrição, blocos do construtor,
 * créditos e tags, próximo projeto, relacionados e o "voltar" para a lista de onde a pessoa veio.
 */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const [project, { ui, siteName }] = await Promise.all([getProject(slug), getSettings()])
  if (!project) notFound()

  const credits = project.credits ?? []
  const tags = project.tags?.filter((tag) => tag.slug) ?? []
  const related = pickRelated(project)
  const intro = project.intro ? toPlainText(project.intro as PortableTextBlock[]) : ''
  // Dados estruturados para o Google: o projeto como obra criativa do estúdio.
  const creativeWork = stegaClean({
    '@type': 'CreativeWork',
    name: project.title,
    description: (project.seo?.description || intro).slice(0, 300) || undefined,
    url: `${SITE_URL}/trabalhos/${slug}`,
    image: project.shareImage ?? undefined,
    dateCreated: project.year ? String(project.year) : undefined,
    keywords: tags.map((tag) => tag.name).join(', ') || undefined,
    creator: { '@type': 'Organization', name: siteName, url: SITE_URL },
  })

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(creativeWork) }} />
      <ProjectHeader
        title={project.title}
        subtitle={project.subtitle}
        client={project.client}
        agency={project.agency}
        year={project.year}
        role={project.role}
        ui={ui}
      />

      <ProjectHero media={project.heroMedia} ui={ui} />

      {project.intro && project.intro.length > 0 && (
        <div className="container-site mt-48 grid md:mt-64 md:grid-cols-12 md:gap-x-32">
          <RichText value={project.intro} className="text-body-l text-fg md:col-span-6 md:col-start-7" />
        </div>
      )}

      <div className="mt-48 md:mt-64">
        <PageBlocks blocks={project.body} ui={ui} />
      </div>

      {(credits.length > 0 || tags.length > 0) && (
        <section className="container-site py-section">
          <Reveal className="grid gap-32 md:grid-cols-12 md:gap-x-32">
            {credits.length > 0 && (
              <>
                <Eyebrow as="h2" className="self-start md:col-span-4 md:pt-16">
                  {ui.credits}
                </Eyebrow>
                <div className="md:col-span-8">
                  <CreditList credits={credits} />
                </div>
              </>
            )}
            {tags.length > 0 && (
              <ul className="flex flex-wrap gap-8 md:col-span-8 md:col-start-5">
                {tags.map((tag) => (
                  <li key={tag._id}>
                    <Tag href={`/trabalhos?tag=${tag.slug}`}>{tag.name}</Tag>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </section>
      )}

      {project.next && <NextProject project={project.next} ui={ui} />}

      {related.length > 0 && (
        <section className="container-site pb-section">
          <Eyebrow as="h2" className="mb-32">
            {ui.related}
          </Eyebrow>
          <Reveal as="ul" className="grid gap-x-32 gap-y-48 md:grid-cols-3">
            {related.map((item) => (
              <li key={item._id}>
                <ProjectCard project={item} sizes="(min-width: 768px) 33vw, 100vw" />
              </li>
            ))}
          </Reveal>
        </section>
      )}

      <div className="container-site pb-section">
        <BackToWork label={ui.backToWork} />
      </div>
    </article>
  )
}
