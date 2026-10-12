import { blockSchemaTypes } from './blocks'
import { aboutPage } from './documents/aboutPage'
import { client } from './documents/client'
import { contactPage } from './documents/contactPage'
import { project } from './documents/project'
import { siteSettings } from './documents/siteSettings'
import { tag } from './documents/tag'
import { accessibleImage } from './objects/accessibleImage'
import { blockOptions } from './objects/blockOptions'
import { credit } from './objects/credit'
import { media } from './objects/media'
import { richText } from './objects/richText'
import { seo } from './objects/seo'
import { videoSource } from './objects/videoSource'

export const schemaTypes = [
  // Documentos
  project,
  tag,
  client,
  aboutPage,
  contactPage,
  siteSettings,
  // Objetos
  accessibleImage,
  videoSource,
  media,
  credit,
  seo,
  blockOptions,
  richText,
  // Blocos do construtor de página
  ...blockSchemaTypes,
]

/** Documentos únicos: não aparecem em "Criar novo" nem podem ser apagados/duplicados. */
export const SINGLETON_TYPES = new Set(['aboutPage', 'contactPage', 'siteSettings'])
