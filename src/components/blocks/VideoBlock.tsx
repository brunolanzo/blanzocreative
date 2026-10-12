import { VideoPlayer } from '@/components/media/VideoPlayer'
import { hasVideo, parseRatio, videoRatio } from '@/lib/media'
import { BlockShell, blockWidth, fitToScreen } from './BlockShell'
import type { BlockOf, BlockUi } from './types'

/** Vídeo: toca sozinho sem som (com botão de som) ou, com controles, espera a pessoa dar o play. */
export function VideoBlock({ block, ui }: { block: BlockOf<'videoBlock'>; ui: BlockUi }) {
  if (!hasVideo(block.video)) return null
  const width = blockWidth(block.options)
  const chosen = block.aspect && block.aspect !== 'original' ? parseRatio(block.aspect) : null
  const ratio = chosen ?? videoRatio(block.video)
  return (
    <BlockShell options={block.options}>
      <div className="mx-auto" style={{ width: fitToScreen(ratio, width) }}>
        <VideoPlayer
          video={block.video}
          ratio={ratio}
          rounded={width !== 'full'}
          controls={block.controls ?? false}
          loop={block.loop ?? true}
          soundButton={block.soundButton ?? true}
          ui={ui}
        />
      </div>
    </BlockShell>
  )
}
