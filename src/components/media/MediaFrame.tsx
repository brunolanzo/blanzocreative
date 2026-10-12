import { cn } from '@/lib/cn'
import { type MediaData, mediaRatio } from '@/lib/media'
import { MediaView } from './MediaView'

type MediaFrameProps = {
  media: MediaData | null | undefined
  sizes: string
  /** Força um formato (largura ÷ altura). Sem ele, usa o da própria mídia, sem cortar. */
  ratio?: number
  rounded?: boolean
  priority?: boolean
  className?: string
}

/** Mídia no próprio formato, com o espaço reservado antes de carregar (a página não "pula"). */
export function MediaFrame({ media, sizes, ratio, rounded = true, priority = false, className }: MediaFrameProps) {
  if (!media) return null
  return (
    <MediaView
      media={media}
      sizes={sizes}
      priority={priority}
      className={cn('bg-raised', rounded && 'rounded-md', className)}
      style={{ aspectRatio: ratio ?? mediaRatio(media) }}
    />
  )
}
