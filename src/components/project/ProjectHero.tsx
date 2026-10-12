import { BLOCK_SIZES, fitToScreen } from '@/components/blocks/BlockShell'
import { SanityImage } from '@/components/media/SanityImage'
import { VideoPlayer } from '@/components/media/VideoPlayer'
import { hasVideo, imageRatio, type MediaData, videoRatio } from '@/lib/media'
import type { UiStrings } from '@/lib/ui-strings'

/**
 * Mídia de abertura, na largura do conteúdo e no formato dela. É a imagem principal da página
 * (carrega primeiro). Vídeo toca sozinho, sem som, com o botão de som discreto.
 */
export function ProjectHero({ media, ui }: { media: MediaData | null; ui: Pick<UiStrings, 'soundOn' | 'soundOff' | 'play'> }) {
  if (media?.kind === 'video' && hasVideo(media.video)) {
    const ratio = videoRatio(media.video)
    return (
      <div className="container-site mt-64">
        <div className="mx-auto" style={{ width: fitToScreen(ratio) }}>
          <VideoPlayer video={media.video} ratio={ratio} priority ui={ui} />
        </div>
      </div>
    )
  }
  if (media?.image?.asset) {
    const ratio = imageRatio(media.image) ?? 16 / 9
    return (
      <div className="container-site mt-64">
        <div
          className="mx-auto overflow-hidden rounded-md bg-raised"
          style={{ width: fitToScreen(ratio), aspectRatio: ratio }}
        >
          <SanityImage image={media.image} sizes={BLOCK_SIZES.content} priority className="size-full object-cover" />
        </div>
      </div>
    )
  }
  return null
}
