import { defineDocuments, defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

/**
 * Pré-visualização no painel: qual documento editar em cada página do site e,
 * no formulário de cada documento, em quais páginas ele aparece.
 */
export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    { route: '/', filter: '_id == "siteSettings"' },
    { route: '/work', filter: '_id == "siteSettings"' },
    { route: '/work/:slug', filter: '_type == "project" && slug.current == $slug' },
    { route: '/about', filter: '_id == "aboutPage"' },
    { route: '/contact', filter: '_id == "contactPage"' },
  ]),
  locations: {
    project: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          ...(doc?.slug ? [{ title: doc.title || 'Projeto', href: `/work/${doc.slug}` }] : []),
          { title: 'Trabalhos', href: '/work' },
          { title: 'Início', href: '/' },
        ],
      }),
    }),
    tag: defineLocations({
      select: { name: 'name', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          ...(doc?.slug ? [{ title: `Trabalhos: ${doc.name || 'tag'}`, href: `/work?tag=${doc.slug}` }] : []),
          { title: 'Início', href: '/' },
        ],
      }),
    }),
    client: defineLocations({ locations: [{ title: 'Início', href: '/' }] }),
    siteSettings: defineLocations({
      locations: [
        { title: 'Início', href: '/' },
        { title: 'Trabalhos', href: '/work' },
      ],
    }),
    aboutPage: defineLocations({
      locations: [
        { title: 'Sobre', href: '/about' },
        { title: 'Início', href: '/' },
      ],
    }),
    contactPage: defineLocations({ locations: [{ title: 'Contato', href: '/contact' }] }),
  },
}
