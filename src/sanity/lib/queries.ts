import { defineQuery } from 'next-sanity'

/**
 * Consultas GROQ do site. Os tipos de retorno são gerados por `npm run typegen`
 * (arquivo src/sanity/sanity.types.ts), a partir do schema do painel.
 */

// ── Fragmentos ────────────────────────────────────────────────────────────────

const IMAGE = `
  asset,
  crop,
  hotspot,
  alt,
  "dimensions": asset->metadata.dimensions{ width, height, aspectRatio },
  "lqip": asset->metadata.lqip,
  "mimeType": asset->mimeType
`

const VIDEO = `
  provider,
  label,
  "posterUrl": poster.asset->url,
  "posterAspect": poster.asset->metadata.dimensions.aspectRatio,
  "playbackId": mux.asset->playbackId,
  "muxAspect": mux.asset->data.aspect_ratio,
  "muxMp4": count(mux.asset->data.static_renditions.files[name == "highest.mp4"]) > 0,
  "hasAudio": count(mux.asset->data.tracks[type == "audio"]) > 0,
  "fileUrl": file.asset->url,
  url,
  vimeo
`

const MEDIA = `
  kind,
  image{ ${IMAGE} },
  video{ ${VIDEO} }
`

/** Dados de um card de projeto (grids da home e de /trabalhos). */
const PROJECT_CARD = `
  _id,
  title,
  "slug": slug.current,
  year,
  "client": client->name,
  "tags": tags[]->{ _id, name, "slug": slug.current },
  thumbnail{ ${MEDIA} },
  previewVideo{ ${VIDEO} }
`

const LISTED_PROJECTS = `_type == "project" && visibility != "unlisted" && defined(slug.current)`

/** Cliente da parede de logos (home e página Sobre). */
const CLIENT = `
  _id,
  name,
  url,
  logoColor,
  "logo": logo.asset->{ url, mimeType, "width": metadata.dimensions.width, "height": metadata.dimensions.height }
`

const ASSET_IMAGE = `{ url, "width": metadata.dimensions.width, "height": metadata.dimensions.height }`

const BLOCK_OPTIONS = `options{ width, spaceTop, spaceBottom, background, caption }`

/** Blocos do construtor da página de projeto (cada tipo traz só os próprios campos). */
const PAGE_BLOCKS = `
  _key,
  _type,
  _type == "videoBlock" => { video{ ${VIDEO} }, aspect, soundButton, controls, loop, ${BLOCK_OPTIONS} },
  _type == "imageBlock" => { image{ ${IMAGE} }, ${BLOCK_OPTIONS} },
  _type == "mosaicBlock" => { layout, gap, items[]{ _key, ${MEDIA} }, ${BLOCK_OPTIONS} },
  _type == "splitBlock" => { ratio, left{ ${MEDIA} }, right{ ${MEDIA} }, ${BLOCK_OPTIONS} },
  _type == "beforeAfterBlock" => {
    before{ ${IMAGE} }, after{ ${IMAGE} }, labelBefore, labelAfter, start, orientation, ${BLOCK_OPTIONS}
  },
  _type == "compositionBlock" => { items[]{ _key, colStart, colSpan, offset, media{ ${MEDIA} } }, ${BLOCK_OPTIONS} },
  _type == "galleryBlock" => { height, items[]{ _key, ${MEDIA} }, ${BLOCK_OPTIONS} },
  _type == "textBlock" => { heading, body, align, ${BLOCK_OPTIONS} },
  _type == "quoteBlock" => { quote, author, role, ${BLOCK_OPTIONS} },
  _type == "creditsBlock" => { heading, credits[]{ _key, role, name, url }, ${BLOCK_OPTIONS} },
  _type == "embedBlock" => { url, title, aspect, ${BLOCK_OPTIONS} },
  _type == "spacerBlock" => { size, divider }
`

/** Tags com pelo menos um projeto publicado, na ordem do painel. */
const TAGS_WITH_PROJECTS = `*[_type == "tag" && defined(slug.current)] | order(orderRank) {
  _id,
  name,
  "slug": slug.current,
  description,
  "count": count(*[${LISTED_PROJECTS} && references(^._id)])
}[count > 0]`

// ── Consultas ────────────────────────────────────────────────────────────────

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  siteName,
  logo{
    kind,
    animation,
    heightDesktop,
    heightMobile,
    "image": image.asset->{ url, "width": metadata.dimensions.width, "height": metadata.dimensions.height },
    "imageOnLight": imageOnLight.asset->{ url, "width": metadata.dimensions.width, "height": metadata.dimensions.height },
    "video": video.asset->url,
    "videoWebm": videoWebm.asset->url,
    "videoHevc": videoHevc.asset->url,
    "lottie": lottie.asset->url
  },
  "favicon": favicon.asset->url,
  email,
  whatsapp,
  linkedin,
  instagram,
  vimeo,
  behance,
  ctaHeading,
  copyright,
  sections,
  cursor{
    enabled,
    size,
    hotspotX,
    hotspotY,
    hoverMode,
    hoverText,
    smoothing,
    "image": image.asset->${ASSET_IMAGE},
    "hoverImage": hoverImage.asset->${ASSET_IMAGE}
  },
  ui,
  seo{ title, description, "image": image.asset->url }
}`)

export const HOME_QUERY = defineQuery(`{
  "home": *[_id == "siteSettings"][0]{
    reel{
      loop{ ${VIDEO} },
      poster{ ${IMAGE} },
      phrase
    },
    introEnabled,
    sections,
    aboutSummary{ media{ ${MEDIA} }, text },
    "featured": (featuredProjects[]->)[${LISTED_PROJECTS}]{ ${PROJECT_CARD} }
  },
  "projects": *[${LISTED_PROJECTS}] | order(orderRank) { ${PROJECT_CARD} },
  "tags": ${TAGS_WITH_PROJECTS},
  "clients": *[_type == "client" && showOnHome == true] | order(orderRank) { ${CLIENT} },
  "about": *[_id == "aboutPage"][0]{
    title,
    "disciplines": disciplines[]{ _key, label, "tag": tag->slug.current }
  }
}`)

export const WORK_QUERY = defineQuery(`{
  "page": *[_id == "siteSettings"][0].workPage{ title, intro },
  "projects": *[${LISTED_PROJECTS}] | order(orderRank) { ${PROJECT_CARD} },
  "tags": ${TAGS_WITH_PROJECTS}
}`)

export const TAG_SLUGS_QUERY = defineQuery(`${TAGS_WITH_PROJECTS}{ "slug": slug }`)

export const PROJECT_SLUGS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`)

/**
 * Página do projeto. "Próximo" segue a ordem do painel (e volta ao primeiro no fim);
 * "relacionados" são projetos com alguma tag em comum (a ordem final é feita no site).
 * Projetos não listados nunca entram em próximo/relacionados.
 */
export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  subtitle,
  year,
  role,
  agency,
  visibility,
  "client": client->name,
  "tags": tags[]->{ _id, name, "slug": slug.current },
  intro,
  heroMedia{ ${MEDIA} },
  "shareImage": coalesce(seo.image.asset->url, thumbnail.image.asset->url, thumbnail.video.poster.asset->url),
  body[]{ ${PAGE_BLOCKS} },
  credits[]{ _key, role, name, url },
  seo{ title, description },
  "next": coalesce(
    *[${LISTED_PROJECTS} && _id != ^._id && orderRank > ^.orderRank] | order(orderRank)[0]{ ${PROJECT_CARD} },
    *[${LISTED_PROJECTS} && _id != ^._id] | order(orderRank)[0]{ ${PROJECT_CARD} }
  ),
  "related": *[${LISTED_PROJECTS} && _id != ^._id && references(^.tags[]._ref)] | order(orderRank)[0...24]{
    ${PROJECT_CARD},
    "tagIds": tags[]._ref
  }
}`)

export const ABOUT_QUERY = defineQuery(`*[_type == "aboutPage" && _id == "aboutPage"][0]{
  title,
  media{ ${MEDIA} },
  bio,
  "disciplines": disciplines[]{ _key, label, "tag": tag->slug.current },
  timeline[]{ _key, company, position, period },
  "clients": clients[]->{ ${CLIENT} },
  awards[]{ _key, title, organization, year, url },
  "cv": cv.asset->url,
  seo{ title, description, "image": image.asset->url }
}`)

/** Página Contato e as tags (opções de "tipo de projeto" no formulário). */
export const CONTACT_QUERY = defineQuery(`{
  "page": *[_type == "contactPage" && _id == "contactPage"][0]{
    title,
    intro,
    show,
    formIntro,
    formSuccess,
    seo{ title, description, "image": image.asset->url }
  },
  "projectTypes": *[_type == "tag" && defined(name)] | order(orderRank).name
}`)

/** Endereços para o sitemap: só projetos listados, com a data da última mudança. */
export const SITEMAP_QUERY = defineQuery(`{
  "projects": *[${LISTED_PROJECTS}] | order(orderRank){ "slug": slug.current, _updatedAt },
  "about": *[_type == "aboutPage" && _id == "aboutPage"][0]._updatedAt,
  "contact": *[_type == "contactPage" && _id == "contactPage"][0]._updatedAt,
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]._updatedAt
}`)
