import { defineDocuments, defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

/**
 * Pré-visualização no painel: qual documento editar em cada página do site e,
 * no formulário de cada documento, em quais páginas ele aparece.
 */
export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    { route: '/', filter: '_id == "siteSettings"' },
    { route: '/trabalhos', filter: '_id == "siteSettings"' },
    { route: '/trabalhos/:slug', filter: '_type == "project" && slug.current == $slug' },
    { route: '/sobre', filter: '_id == "aboutPage"' },
    { route: '/contato', filter: '_id == "contactPage"' },
  ]),
  locations: {
    project: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          ...(doc?.slug ? [{ title: doc.title || 'Projeto', href: `/trabalhos/${doc.slug}` }] : []),
          { title: 'Trabalhos', href: '/trabalhos' },
          { title: 'Início', href: '/' },
        ],
      }),
    }),
    tag: defineLocations({
      select: { name: 'name', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          ...(doc?.slug ? [{ title: `Trabalhos: ${doc.name || 'tag'}`, href: `/trabalhos?tag=${doc.slug}` }] : []),
          { title: 'Início', href: '/' },
        ],
      }),
    }),
    client: defineLocations({ locations: [{ title: 'Início', href: '/' }] }),
    siteSettings: defineLocations({
      locations: [
        { title: 'Início', href: '/' },
        { title: 'Trabalhos', href: '/trabalhos' },
      ],
    }),
    aboutPage: defineLocations({
      locations: [
        { title: 'Sobre', href: '/sobre' },
        { title: 'Início', href: '/' },
      ],
    }),
    contactPage: defineLocations({ locations: [{ title: 'Contato', href: '/contato' }] }),
  },
}
