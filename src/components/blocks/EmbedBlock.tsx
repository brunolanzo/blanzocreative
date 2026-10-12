import { parseRatio, vimeoId } from '@/lib/media'
import { BlockShell, blockWidth, fitToScreen } from './BlockShell'
import { EmbedPlayer } from './EmbedPlayer'
import type { BlockOf, BlockUi } from './types'

function youtubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/)
  return match ? match[1] : null
}

/** Imagem do vídeo no Vimeo (pela API pública oEmbed). Se falhar, o bloco fica sem imagem. */
async function vimeoThumbnail(url: string): Promise<string | null> {
  try {
    const response = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}&width=1920`, {
      next: { revalidate: 60 * 60 * 24 },
    })
    if (!response.ok) return null
    const data = (await response.json()) as { thumbnail_url?: string }
    return data.thumbnail_url ?? null
  } catch {
    return null
  }
}

/** Vídeo do Vimeo ou do YouTube; o player só carrega no clique. */
export async function EmbedBlock({ block, ui }: { block: BlockOf<'embedBlock'>; ui: BlockUi }) {
  const url = block.url ?? ''
  const vimeo = vimeoId(url)
  const youtube = vimeo ? null : youtubeId(url)
  if (!vimeo && !youtube) return null

  const src = vimeo
    ? `https://player.vimeo.com/video/${vimeo}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`
    : `https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0&playsinline=1`
  const thumbnail = vimeo ? await vimeoThumbnail(url) : `https://i.ytimg.com/vi/${youtube}/maxresdefault.jpg`
  const fallbackThumbnail = youtube ? `https://i.ytimg.com/vi/${youtube}/hqdefault.jpg` : null
  const ratio = parseRatio(block.aspect) ?? 16 / 9

  return (
    <BlockShell options={block.options}>
      <div className="mx-auto" style={{ width: fitToScreen(ratio, blockWidth(block.options)) }}>
        <EmbedPlayer
          src={src}
          title={block.title ?? ''}
          thumbnail={thumbnail}
          fallbackThumbnail={fallbackThumbnail}
          ratio={ratio}
          rounded={blockWidth(block.options) !== 'full'}
          playLabel={ui.play}
        />
      </div>
    </BlockShell>
  )
}
