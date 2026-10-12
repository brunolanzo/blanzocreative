/**
 * Painel de conteúdo (Sanity Studio) em /admin. O acesso exige login no Sanity.
 * metadata/viewport do next-sanity já marcam a página como noindex.
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../../sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
