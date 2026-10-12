/**
 * Formatos de mídia que chegam do Sanity (ver fragmentos em src/sanity/lib/queries.ts)
 * e a escolha de como cada vídeo toca.
 */

export type ImageData = {
  asset?: { _ref: string } | null
  crop?: { top?: number; bottom?: number; left?: number; right?: number } | null
  hotspot?: { x?: number; y?: number } | null
  alt?: string | null
  dimensions?: { width?: number | null; height?: number | null; aspectRatio?: number | null } | null
  lqip?: string | null
  mimeType?: string | null
}

export type VideoProvider = 'mux' | 'file' | 'url' | 'vimeo'

export type VideoData = {
  provider?: VideoProvider | null
  label?: string | null
  posterUrl?: string | null
  /** Largura ÷ altura do poster (é ele que diz o formato de um MP4 antes de tocar). */
  posterAspect?: number | null
  playbackId?: string | null
  /** Formato informado pelo Mux, ex.: "16:9". */
  muxAspect?: string | null
  /** O Mux diz se o vídeo tem áudio; nos outros casos não dá para saber (null). */
  hasAudio?: boolean | null
  fileUrl?: string | null
  url?: string | null
  vimeo?: string | null
}

export type MediaData = {
  kind?: 'image' | 'video' | null
  image?: ImageData | null
  video?: VideoData | null
}

export type PlayableSource =
  | { kind: 'file'; src: string; fallback?: PlayableSource }
  | { kind: 'hls'; src: string; fallback?: undefined }
  | { kind: 'vimeo'; id: string; fallback?: undefined }

/**
 * "loop": vídeo que toca sozinho, sem som (MP4 quando existe, sem JS extra).
 * "player": vídeo para assistir com som e controles (streaming adaptativo).
 */
export type PlaybackMode = 'loop' | 'player'

const muxHls = (id: string) => `https://stream.mux.com/${id}.m3u8`
const muxMp4 = (id: string) => `https://stream.mux.com/${id}/highest.mp4`

export function vimeoId(url: string | null | undefined): string | null {
  const match = url?.match(/vimeo\.com\/(?:.*\/)?(\d+)/)
  return match ? match[1] : null
}

export function resolveVideo(video: VideoData | null | undefined, mode: PlaybackMode): PlayableSource | null {
  if (!video) return null
  switch (video.provider) {
    case 'file':
      return video.fileUrl ? { kind: 'file', src: video.fileUrl } : null
    case 'url':
      if (!video.url) return null
      return /\.m3u8(\?|$)/i.test(video.url) ? { kind: 'hls', src: video.url } : { kind: 'file', src: video.url }
    case 'mux': {
      const id = video.playbackId
      if (!id) return null
      // O MP4 do Mux fica pronto depois do HLS: se ainda não existir, cai para o HLS.
      return mode === 'loop'
        ? { kind: 'file', src: muxMp4(id), fallback: { kind: 'hls', src: muxHls(id) } }
        : { kind: 'hls', src: muxHls(id) }
    }
    case 'vimeo': {
      const id = vimeoId(video.vimeo)
      return id ? { kind: 'vimeo', id } : null
    }
    default:
      return null
  }
}

/** Poster do vídeo: o do painel ou, no Mux, um quadro gerado automaticamente. */
export function videoPoster(video: VideoData | null | undefined, width = 1920): string | undefined {
  if (!video) return undefined
  if (video.posterUrl) return `${video.posterUrl}?w=${width}&fit=max&auto=format`
  if (video.provider === 'mux' && video.playbackId) {
    return `https://image.mux.com/${video.playbackId}/thumbnail.webp?width=${width}&fit_mode=preserve`
  }
  return undefined
}

export function hasVideo(video: VideoData | null | undefined): video is VideoData {
  return resolveVideo(video, 'loop') !== null
}

/** Vídeo que toca no <video> do próprio site (tudo menos Vimeo, que precisa do player dele). */
export function isNativeVideo(video: VideoData | null | undefined): video is VideoData {
  const source = resolveVideo(video, 'loop')
  return source !== null && source.kind !== 'vimeo'
}

/** "16:9" → 1,777… (aceita também "16/9"). */
export function parseRatio(value: string | null | undefined): number | null {
  const match = value?.match(/^(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)$/)
  if (!match) return null
  const ratio = Number(match[1]) / Number(match[2])
  return Number.isFinite(ratio) && ratio > 0 ? ratio : null
}

/** Formato da imagem já com o recorte feito no painel. */
export function imageRatio(image: ImageData | null | undefined): number | null {
  const width = image?.dimensions?.width
  const height = image?.dimensions?.height
  if (!width || !height) return null
  const crop = image.crop ?? {}
  const croppedWidth = width * (1 - (crop.left ?? 0) - (crop.right ?? 0))
  const croppedHeight = height * (1 - (crop.top ?? 0) - (crop.bottom ?? 0))
  return croppedWidth > 0 && croppedHeight > 0 ? croppedWidth / croppedHeight : null
}

const FALLBACK_RATIO = 16 / 9

/** Formato do vídeo: o do poster, o do Mux ou 16:9. */
export function videoRatio(video: VideoData | null | undefined): number {
  return video?.posterAspect || parseRatio(video?.muxAspect) || FALLBACK_RATIO
}

/** Formato (largura ÷ altura) de qualquer mídia, para reservar o espaço antes de carregar. */
export function mediaRatio(media: MediaData | null | undefined): number {
  if (media?.kind === 'video') return videoRatio(media.video)
  return imageRatio(media?.image) ?? FALLBACK_RATIO
}
