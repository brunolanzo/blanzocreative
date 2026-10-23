import type { Metadata } from 'next'
import { type PortableTextBlock, stegaClean, toPlainText } from 'next-sanity'
import { cache } from 'react'
import { RichText } from '@/components/blocks/RichText'
import { ClientWall } from '@/components/home/ClientWall'
import { MediaFrame } from '@/components/media/MediaFrame'
import { Button } from '@/components/ui/Button'
import { Display } from '@/components/ui/Display'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Tag } from '@/components/ui/Tag'
import { sanityFetch } from '@/sanity/lib/fetch'
import { ABOUT_QUERY } from '@/sanity/lib/queries'
import { getSettings } from '@/sanity/lib/settings'
import { Reveal } from '@/components/motion/Reveal'

const getAbout = cache(() => sanityFetch({ query: ABOUT_QUERY, tags: ['aboutPage', 'client', 'tag', 'mux.videoAsset'] }))

export async function generateMetadata(): Promise<Metadata> {
  const [about, { ui, siteName, settings }] = await Promise.all([getAbout(), getSettings()])
  const title = stegaClean(about?.seo?.title) || ui.navAbout
  const bio = about?.bio ? toPlainText(about.bio as PortableTextBlock[]) : ''
  const description = stegaClean(about?.seo?.description || bio).slice(0, 160) || undefined
  // O openGraph da página substitui o do site inteiro: sem imagem própria, repete a imagem padrão.
  const image = about?.seo?.image || settings?.seo?.image
  return {
    title,
    description,
    alternates: { canonical: '/about' },
    openGraph: {
      type: 'profile',
      locale: 'en_US',
      siteName,
      title,
      description,
      images: image ? [{ url: `${image}?w=1200&h=630&fit=crop&fm=jpg&q=80`, width: 1200, height: 630 }] : undefined,
    },
  }
}

/**
 * Página Sobre (padrão da tela "about" do DS, com a ordem das páginas internas da Buff):
 * título, bio, disciplinas e foto/vídeo; depois trajetória, clientes e prêmios.
 * Seção vazia no painel não aparece, e a numeração se ajusta.
 */
export default async function AboutPage() {
  const [about, { ui }] = await Promise.all([getAbout(), getSettings()])
  const disciplines = about?.disciplines?.filter((item) => item.label) ?? []
  const timeline = about?.timeline?.filter((item) => item.company) ?? []
  const clients = about?.clients?.filter((client) => client?.name) ?? []
  const awards = about?.awards?.filter((award) => award.title) ?? []

  const sections = [
    timeline.length > 0 && 'timeline',
    clients.length > 0 && 'clients',
    awards.length > 0 && 'awards',
  ].filter(Boolean)
  const number = (name: string) => String(sections.indexOf(name) + 1).padStart(2, '0')

  return (
    <article>
      <header className="container-site pt-[calc(var(--section-y)+var(--space-9))] pb-section">
        <div className="grid gap-48 md:grid-cols-12 md:gap-x-32">
          <div className="flex flex-col gap-32 md:col-span-7">
            <Display as="h1" size="l" accent>
              {about?.title || ui.navAbout}
            </Display>
            {/* Como no DS: o primeiro parágrafo em branco, os seguintes em cinza. */}
            <RichText value={about?.bio} className="max-w-prose text-body-l text-fg-secondary [&>p:first-child]:text-fg" />
            {disciplines.length > 0 && (
              <ul className="flex flex-wrap gap-8">
                {disciplines.map((discipline) => (
                  <li key={discipline._key}>
                    <Tag href={discipline.tag ? `/work?tag=${discipline.tag}` : undefined}>{discipline.label}</Tag>
                  </li>
                ))}
              </ul>
            )}
            {about?.cv && (
              <div>
                {/* "?dl=" faz o CDN do Sanity baixar o arquivo em vez de abrir. */}
                <Button href={`${about.cv}?dl=`} variant="outline">
                  {ui.downloadCv} ↓
                </Button>
              </div>
            )}
          </div>
          {about?.media && (
            <MediaFrame
              media={about.media}
              sizes="(min-width: 768px) 40vw, 100vw"
              priority
              className="self-start md:col-span-5"
            />
          )}
        </div>
      </header>

      {timeline.length > 0 && (
        <section className="container-site border-t border-hairline py-section">
          <Eyebrow index={number('timeline')} as="h2" className="mb-32">
            {ui.sectionTimeline}
          </Eyebrow>
          <Reveal as="ol" className="border-t border-hairline">
            {timeline.map((item) => (
              <li
                key={item._key}
                className="grid gap-4 border-b border-hairline py-16 md:grid-cols-12 md:items-baseline md:gap-x-32"
              >
                <span className="text-h3 font-medium md:col-span-5">{item.company}</span>
                <span className="text-body text-fg-secondary md:col-span-4">{item.position}</span>
                <span className="text-label-s font-medium text-fg-secondary uppercase md:col-span-3 md:text-right">
                  {item.period}
                </span>
              </li>
            ))}
          </Reveal>
        </section>
      )}

      {clients.length > 0 && (
        <Reveal as="section" className="container-site border-t border-hairline py-section">
          <Eyebrow index={number('clients')} as="h2" className="mb-48">
            {ui.sectionClients}
          </Eyebrow>
          <ClientWall clients={clients} />
        </Reveal>
      )}

      {awards.length > 0 && (
        <section className="container-site border-t border-hairline py-section">
          <Eyebrow index={number('awards')} as="h2" className="mb-32">
            {ui.sectionAwards}
          </Eyebrow>
          <Reveal as="ul" className="border-t border-hairline">
            {awards.map((award) => (
              <li
                key={award._key}
                className="grid gap-4 border-b border-hairline py-16 md:grid-cols-12 md:items-baseline md:gap-x-32"
              >
                <span className="text-h3 font-medium md:col-span-6">
                  {award.url ? (
                    <a href={award.url} target="_blank" rel="noreferrer" className="link">
                      {award.title}
                    </a>
                  ) : (
                    award.title
                  )}
                </span>
                <span className="text-body text-fg-secondary md:col-span-4">{award.organization}</span>
                <span className="text-label-s font-medium text-fg-secondary tabular-nums md:col-span-2 md:text-right">
                  {award.year}
                </span>
              </li>
            ))}
          </Reveal>
        </section>
      )}
    </article>
  )
}
