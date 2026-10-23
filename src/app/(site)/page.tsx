import type { Metadata } from 'next'
import { stegaClean } from 'next-sanity'
import { AboutSummary } from '@/components/home/AboutSummary'
import { ClientWall } from '@/components/home/ClientWall'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeIntro } from '@/components/home/HomeIntro'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { FilterableWork } from '@/components/work/FilterableWork'
import { jsonLd, SITE_URL } from '@/lib/site-url'
import { sanityFetch } from '@/sanity/lib/fetch'
import { HOME_QUERY } from '@/sanity/lib/queries'
import { getSettings } from '@/sanity/lib/settings'
import { Reveal } from '@/components/motion/Reveal'

/**
 * Home: reel em tela cheia → trabalhos (tags + 8 destaques) → clientes → sobre.
 * A chamada para contato e o rodapé vêm do layout. Clientes, Sobre e Contato
 * podem ser desligados em Configurações → Home.
 */
export const metadata: Metadata = { alternates: { canonical: '/' } }

export default async function HomePage() {
  const [{ settings, siteName, ui, socials }, data] = await Promise.all([
    getSettings(),
    sanityFetch({ query: HOME_QUERY, tags: ['siteSettings', 'project', 'tag', 'client', 'aboutPage', 'mux.videoAsset'] }),
  ])

  const home = data.home
  const sections = home?.sections
  const showClients = sections?.clients !== false && data.clients.length > 0
  const showAbout = sections?.about !== false && Boolean(home?.aboutSummary?.text || home?.aboutSummary?.media)
  const sectionNumber = (position: number) => String(position).padStart(2, '0')
  const logo = settings?.logo

  // Dados estruturados para o Google: quem é o estúdio, onde encontrar.
  const organization = stegaClean({
    '@type': 'Organization',
    name: siteName,
    url: SITE_URL,
    logo: logo?.image?.url ?? `${SITE_URL}/brand/wordmark-white.png`,
    description: settings?.seo?.description ?? undefined,
    email: settings?.email ?? undefined,
    sameAs: socials.map((social) => social.href),
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organization) }} />
      {home?.introEnabled !== false && (logo?.video || logo?.image?.url) && (
        <HomeIntro
          logoVideo={logo?.video ?? null}
          logoImage={
            logo?.image?.url
              ? { url: logo.image.url, width: logo.image.width ?? 480, height: logo.image.height ?? 229 }
              : null
          }
          siteName={siteName}
        />
      )}

      <HomeHero reel={home?.reel ?? null} siteName={siteName} ui={ui} />

      <section id="work" className="container-site py-section">
        <Eyebrow index={sectionNumber(1)} as="h2" className="mb-32">
          {ui.sectionWork}
        </Eyebrow>
        <FilterableWork mode="home" projects={data.projects} featured={home?.featured ?? []} tags={data.tags} ui={ui} />
      </section>

      {showClients && (
        <Reveal as="section" className="container-site border-t border-hairline py-section">
          <Eyebrow index={sectionNumber(2)} as="h2" className="mb-48">
            {ui.sectionClients}
          </Eyebrow>
          <ClientWall clients={data.clients} />
        </Reveal>
      )}

      {showAbout && (
        <AboutSummary
          index={sectionNumber(showClients ? 3 : 2)}
          label={ui.sectionAbout}
          linkLabel={ui.aboutLink}
          title={data.about?.title ?? null}
          text={home?.aboutSummary?.text ?? null}
          media={home?.aboutSummary?.media ?? null}
          disciplines={data.about?.disciplines ?? []}
        />
      )}
    </>
  )
}
