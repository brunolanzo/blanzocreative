import type { CustomValidator } from 'sanity'
import { apiVersion } from '../../env'

export type ImageLike = { asset?: { _ref?: string } } | undefined
type MediaLike = { kind?: string; image?: ImageLike } | undefined

const GIF_WARNING_BYTES = 8 * 1024 * 1024

/** O _ref de uma imagem do Sanity já traz largura, altura e extensão: image-<id>-<L>x<A>-<ext>. */
function parseImageRef(ref: string) {
  const match = /^image-[\w]+-(\d+)x(\d+)-([a-z0-9]+)$/i.exec(ref)
  if (!match) return null
  return { width: Number(match[1]), height: Number(match[2]), ext: match[3].toLowerCase() }
}

/**
 * Avisos (não bloqueiam a publicação) para imagem pequena demais
 * ou GIF pesado demais. Use com `.warning()`.
 */
export function imageQuality(minWidth: number): CustomValidator<ImageLike> {
  return async (value, context) => {
    const ref = value?.asset?._ref
    if (!ref) return true
    const info = parseImageRef(ref)
    if (!info) return true

    if (info.ext === 'gif') {
      const size = await context
        .getClient({ apiVersion })
        .fetch<number | null>('*[_id == $id][0].size', { id: ref })
      if (size && size > GIF_WARNING_BYTES) {
        const mb = (size / 1024 / 1024).toFixed(1).replace('.', ',')
        return `Este GIF tem ${mb} MB. Acima de ~8 MB, prefira um vídeo curto em loop: fica mais leve e com a mesma aparência.`
      }
    }

    if (info.width < minWidth) {
      return `Imagem com ${info.width}px de largura. Para este lugar, o ideal é pelo menos ${minWidth}px, senão ela pode ficar sem nitidez.`
    }
    return true
  }
}

/** Mesmo aviso, aplicado à imagem de um campo do tipo "Mídia" (imagem ou vídeo). */
export function mediaImageQuality(minWidth: number): CustomValidator<MediaLike> {
  const check = imageQuality(minWidth)
  return (value, context) => (value?.kind === 'video' ? true : check(value?.image, context))
}

/** Largura mínima recomendada para cada largura de bloco. */
export const MIN_WIDTH_BY_BLOCK_WIDTH: Record<string, number> = {
  full: 2400,
  content: 1800,
  narrow: 1200,
}
