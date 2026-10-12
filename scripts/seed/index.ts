/**
 * Popula o Sanity com o conteúdo de exemplo e as mídias provisórias.
 *
 * Uso: npm run seed
 * (usa o seu login do Sanity: `npx sanity login` uma vez, antes)
 *
 * Pode rodar quantas vezes quiser: os documentos têm IDs fixos e são substituídos;
 * arquivos iguais não são enviados duas vezes.
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { LexoRank } from 'lexorank'
import { getCliClient } from 'sanity/cli'
import { DEFAULT_UI_STRINGS } from '../../src/lib/ui-strings'
import {
  ABOUT,
  type BlockSpec,
  CONTACT,
  type CreditSpec,
  FEATURED,
  FICTIONAL_CLIENTS,
  type MediaSpec,
  PROJECTS,
  REAL_CLIENTS,
  SETTINGS,
  TAGS,
} from './content'

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'scripts/placeholders/out')
const DS_ASSETS = path.join(ROOT, 'design-system/project/assets')

const client = getCliClient({ apiVersion: '2026-10-01' })

// ── Utilidades ───────────────────────────────────────────────────────────────

type Reference = { _type: 'reference'; _ref: string }
const ref = (id: string): Reference => ({ _type: 'reference', _ref: id })
const keyed = <T extends object>(items: T[], prefix: string) =>
  items.map((item, index) => ({ _key: `${prefix}${index + 1}`, ...item }))

/** Texto formatado (Portable Text) a partir de parágrafos simples. */
function richText(paragraphs: string[], prefix: string) {
  return paragraphs.map((text, index) => ({
    _type: 'block',
    _key: `${prefix}p${index + 1}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${prefix}s${index + 1}`, text, marks: [] }],
  }))
}

function ranks(count: number): string[] {
  const out: string[] = []
  let rank = LexoRank.min()
  for (let i = 0; i < count; i += 1) {
    rank = rank.genNext().genNext()
    out.push(rank.toString())
  }
  return out
}

// ── Upload das mídias ────────────────────────────────────────────────────────

const assetIds = new Map<string, string>()

function placeholderFile(key: string): string {
  for (const ext of ['jpg', 'gif', 'mp4']) {
    const file = path.join(OUT_DIR, `${key}.${ext}`)
    if (fs.existsSync(file)) return file
  }
  throw new Error(`Mídia provisória não encontrada: ${key}`)
}

async function upload(key: string, file: string): Promise<string> {
  const cached = assetIds.get(key)
  if (cached) return cached
  const isVideo = file.endsWith('.mp4')
  const asset = await client.assets.upload(isVideo ? 'file' : 'image', fs.createReadStream(file), {
    filename: path.basename(file),
    contentType: isVideo ? 'video/mp4' : undefined,
  })
  assetIds.set(key, asset._id)
  process.stdout.write('.')
  return asset._id
}

const uploadPlaceholder = (key: string) => upload(key, placeholderFile(key))

// ── Construtores de campos ───────────────────────────────────────────────────

async function accessibleImage(key: string, alt: string) {
  return { _type: 'accessibleImage', asset: ref(await uploadPlaceholder(key)), alt }
}

async function videoSource(key: string, label: string, posterKey?: string) {
  // Sem poster escolhido, usa um quadro do próprio vídeo (gerado junto com as mídias provisórias).
  const poster = posterKey ?? (fs.existsSync(path.join(OUT_DIR, `${key}-poster.jpg`)) ? `${key}-poster` : undefined)
  return {
    _type: 'videoSource',
    provider: 'file',
    file: { _type: 'file', asset: ref(await uploadPlaceholder(key)) },
    label,
    ...(poster ? { poster: { _type: 'image', asset: ref(await uploadPlaceholder(poster)) } } : {}),
  }
}

async function media(spec: MediaSpec) {
  if (spec.kind === 'image') return { _type: 'media', kind: 'image', image: await accessibleImage(spec.key, spec.alt) }
  return { _type: 'media', kind: 'video', video: await videoSource(spec.key, spec.label, spec.poster) }
}

const options = (width = 'content') => ({
  _type: 'blockOptions',
  width,
  spaceTop: 'md',
  spaceBottom: 'md',
  background: 'page',
})

const credits = (list: CreditSpec[], prefix: string) => keyed(list.map((credit) => ({ _type: 'credit', ...credit })), prefix)

async function block(spec: BlockSpec, key: string) {
  switch (spec.type) {
    case 'videoBlock':
      return {
        _type: spec.type,
        _key: key,
        video: await videoSource(spec.video, spec.label),
        aspect: spec.aspect ?? '16:9',
        soundButton: true,
        controls: spec.controls ?? false,
        loop: true,
        options: options(spec.width),
      }
    case 'imageBlock':
      return { _type: spec.type, _key: key, image: await accessibleImage(spec.image, spec.alt), options: options(spec.width) }
    case 'mosaicBlock':
      return {
        _type: spec.type,
        _key: key,
        layout: spec.layout,
        gap: spec.gap ?? 'md',
        items: keyed(await Promise.all(spec.items.map(media)), `${key}m`),
        options: options(spec.width),
      }
    case 'splitBlock':
      return {
        _type: spec.type,
        _key: key,
        ratio: spec.ratio,
        left: await media(spec.left),
        right: await media(spec.right),
        options: options(spec.width),
      }
    case 'beforeAfterBlock':
      return {
        _type: spec.type,
        _key: key,
        before: await accessibleImage(spec.before, `${spec.alt} (antes)`),
        after: await accessibleImage(spec.after, `${spec.alt} (depois)`),
        start: spec.start ?? 50,
        orientation: spec.orientation ?? 'horizontal',
        options: options(),
      }
    case 'compositionBlock':
      return {
        _type: spec.type,
        _key: key,
        items: keyed(
          await Promise.all(
            spec.items.map(async ({ colStart, colSpan, offset, ...item }) => ({
              _type: 'compositionItem',
              media: await media(item),
              colStart,
              colSpan,
              offset,
            })),
          ),
          `${key}c`,
        ),
        options: options(),
      }
    case 'galleryBlock':
      return {
        _type: spec.type,
        _key: key,
        items: keyed(await Promise.all(spec.items.map(media)), `${key}g`),
        height: spec.height ?? 'md',
        options: options(),
      }
    case 'textBlock':
      return {
        _type: spec.type,
        _key: key,
        heading: spec.heading,
        body: richText(spec.paragraphs, key),
        align: spec.align ?? 'left',
        options: options('narrow'),
      }
    case 'quoteBlock':
      return { _type: spec.type, _key: key, quote: spec.quote, author: spec.author, role: spec.role, options: options() }
    case 'creditsBlock':
      return { _type: spec.type, _key: key, heading: spec.heading, credits: credits(spec.credits, `${key}cr`), options: options('narrow') }
    case 'embedBlock':
      return { _type: spec.type, _key: key, url: spec.url, title: spec.title, aspect: '16:9', options: options() }
    case 'spacerBlock':
      return { _type: spec.type, _key: key, size: spec.size, divider: spec.divider }
  }
}

// ── Seed ─────────────────────────────────────────────────────────────────────

async function main() {
  const { projectId, dataset } = client.config()
  console.log(`Seed no projeto ${projectId}, dataset "${dataset}".`)

  if (!fs.existsSync(path.join(OUT_DIR, 'reel-loop.mp4'))) {
    console.log('Gerando mídias provisórias…')
    execFileSync('node', ['scripts/placeholders/generate.mjs'], { stdio: 'inherit' })
  }
  // Thumbs com o título de cada projeto
  execFileSync(
    'node',
    [
      '--input-type=module',
      '-e',
      `const m = await import('./scripts/placeholders/generate.mjs'); await m.generateAll(${JSON.stringify(
        PROJECTS.map(({ slug, title }) => ({ slug, title })),
      )})`,
    ],
    { stdio: 'inherit' },
  )

  process.stdout.write('Enviando mídias ')
  const documents: Array<{ _id: string; _type: string; [key: string]: unknown }> = []

  // Tags
  const tagRanks = ranks(TAGS.length)
  TAGS.forEach((tag, index) => {
    documents.push({
      _id: `tag-${tag.slug}`,
      _type: 'tag',
      name: tag.name,
      slug: { _type: 'slug', current: tag.slug },
      description: tag.description,
      orderRank: tagRanks[index],
    })
  })

  // Clientes (reais primeiro: são os que aparecem na home)
  const allClients = [...REAL_CLIENTS.map((c) => ({ ...c, real: true })), ...FICTIONAL_CLIENTS.map((c) => ({ ...c, real: false }))]
  const clientRanks = ranks(allClients.length)
  allClients.forEach((item, index) => {
    documents.push({
      _id: `client-${item.id}`,
      _type: 'client',
      name: item.name,
      logoColor: 'mono',
      showOnHome: item.real,
      orderRank: clientRanks[index],
    })
  })

  // Projetos
  const projectRanks = ranks(PROJECTS.length)
  for (const [index, project] of PROJECTS.entries()) {
    const thumbnail = project.thumbnail
      ? await media(project.thumbnail)
      : await media({ kind: 'image', key: `thumb-${project.slug}`, alt: `Thumb do projeto ${project.title}` })
    const body = []
    for (const [blockIndex, spec] of project.body.entries()) {
      body.push(await block(spec, `b${blockIndex + 1}`))
    }
    documents.push({
      _id: `project-${project.slug}`,
      _type: 'project',
      title: project.title,
      slug: { _type: 'slug', current: project.slug },
      subtitle: project.subtitle,
      ...(project.client ? { client: ref(`client-${project.client}`) } : {}),
      ...(project.agency ? { agency: project.agency } : {}),
      year: project.year,
      role: project.role,
      tags: keyed(project.tags.map((slug) => ref(`tag-${slug}`)), 't'),
      intro: richText(project.intro, 'i'),
      heroMedia: await media(project.hero),
      thumbnail,
      ...(project.preview ? { previewVideo: await videoSource(project.preview, `Preview de ${project.title}`) } : {}),
      body,
      credits: credits(project.credits, 'c'),
      visibility: 'listed',
      orderRank: projectRanks[index],
    })
  }

  // Página Sobre
  documents.push({
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: ABOUT.title,
    media: await media({ kind: 'image', key: 'about-portrait', alt: 'Retrato (foto provisória)' }),
    bio: richText(ABOUT.bio, 'bio'),
    disciplines: keyed(
      ABOUT.disciplines.map((item) => ({ _type: 'discipline', label: item.label, tag: ref(`tag-${item.tag}`) })),
      'd',
    ),
    timeline: keyed(ABOUT.timeline.map((item) => ({ _type: 'role', ...item })), 'r'),
    clients: keyed(REAL_CLIENTS.map((item) => ref(`client-${item.id}`)), 'cl'),
  })

  // Página Contato
  documents.push({
    _id: 'contactPage',
    _type: 'contactPage',
    title: CONTACT.title,
    intro: CONTACT.intro,
    show: { email: true, whatsapp: true, linkedin: true, instagram: true, vimeo: true, behance: true },
    formIntro: CONTACT.formIntro,
    formSuccess: CONTACT.formSuccess,
  })

  // Configurações do site
  const logoImage = await upload('ds-wordmark', path.join(DS_ASSETS, 'logo/wordmark-white.png'))
  const logoVideo = await upload('ds-logo-video', path.join(DS_ASSETS, 'motion/logo-full-animated.mp4'))
  const favicon = await upload('ds-favicon', path.join(DS_ASSETS, 'favicon/blanzo-edge.png'))
  documents.push({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: SETTINGS.siteName,
    logo: {
      kind: 'image',
      image: { _type: 'image', asset: ref(logoImage) },
      video: { _type: 'file', asset: ref(logoVideo) },
      animation: 'always',
      heightDesktop: 28,
      heightMobile: 22,
    },
    favicon: { _type: 'image', asset: ref(favicon) },
    reel: {
      loop: await videoSource('reel-loop', 'Demo reel (vídeo provisório)'),
      poster: { _type: 'image', asset: ref(await uploadPlaceholder('reel-poster')) },
      phrase: SETTINGS.reelPhrase,
    },
    featuredProjects: keyed(FEATURED.map((slug) => ref(`project-${slug}`)), 'f'),
    introEnabled: true,
    sections: { clients: true, about: true, contact: true },
    workPage: { title: SETTINGS.workTitle, intro: SETTINGS.workIntro },
    aboutSummary: {
      media: await media({ kind: 'image', key: 'about-portrait', alt: 'Retrato (foto provisória)' }),
      text: SETTINGS.aboutSummary,
    },
    email: SETTINGS.email,
    whatsapp: SETTINGS.whatsapp,
    linkedin: SETTINGS.linkedin,
    instagram: SETTINGS.instagram,
    vimeo: SETTINGS.vimeo,
    behance: SETTINGS.behance,
    ctaHeading: SETTINGS.ctaHeading,
    copyright: SETTINGS.copyright,
    cursor: { enabled: false, size: 32, hotspotX: 0, hotspotY: 0, hoverMode: 'text', hoverText: 'ver', smoothing: 'smooth' },
    seo: {
      _type: 'seo',
      title: SETTINGS.seoTitle,
      description: SETTINGS.seoDescription,
      image: { _type: 'image', asset: ref(await uploadPlaceholder('share-default')) },
    },
    ui: { ...DEFAULT_UI_STRINGS },
  })

  console.log(`\nGravando ${documents.length} documentos…`)
  const transaction = client.transaction()
  for (const document of documents) transaction.createOrReplace(document)
  await transaction.commit({ visibility: 'sync' })

  console.log(`Pronto: ${TAGS.length} tags, ${allClients.length} clientes, ${PROJECTS.length} projetos, Sobre, Contato e Configurações.`)
}

main().catch((error: unknown) => {
  console.error('\nO seed falhou:', error instanceof Error ? error.message : error)
  process.exitCode = 1
})
