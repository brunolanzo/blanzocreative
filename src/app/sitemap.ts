import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-url'
import { sanityFetch } from '@/sanity/lib/fetch'
import { SITEMAP_QUERY } from '@/sanity/lib/queries'

/** /sitemap.xml: páginas fixas e projetos listados. Não listados e o painel ficam de fora. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await sanityFetch({ query: SITEMAP_QUERY, tags: ['project', 'aboutPage', 'contactPage', 'siteSettings'] })
  const date = (value: string | null | undefined) => (value ? new Date(value) : undefined)
  // A lista muda quando qualquer projeto muda: vale a data mais recente.
  const latestProject = data.projects.map((project) => project._updatedAt).sort().at(-1)
  return [
    { url: SITE_URL, lastModified: date(data.settings), priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: date(latestProject), priority: 0.9 },
    ...data.projects.flatMap((project) =>
      project.slug
        ? [{ url: `${SITE_URL}/work/${project.slug}`, lastModified: date(project._updatedAt), priority: 0.8 }]
        : [],
    ),
    { url: `${SITE_URL}/about`, lastModified: date(data.about), priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: date(data.contact), priority: 0.5 },
  ]
}
