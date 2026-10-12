import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

type VimeoFrameProps = {
  id: string
  title: string
  /** "background": loop mudo sem controles; "player": player completo. */
  variant: 'background' | 'player'
  autoplay?: boolean
  className?: string
  style?: CSSProperties
}

/** Vídeo do Vimeo. No modo fundo, o próprio Vimeo toca em loop, sem som e sem controles. */
export function VimeoFrame({ id, title, variant, autoplay = false, className, style }: VimeoFrameProps) {
  const params =
    variant === 'background'
      ? 'background=1&autoplay=1&loop=1&muted=1&dnt=1'
      : `autoplay=${autoplay ? 1 : 0}&dnt=1&title=0&byline=0&portrait=0`
  return (
    <iframe
      src={`https://player.vimeo.com/video/${id}?${params}`}
      title={title}
      allow="autoplay; fullscreen; picture-in-picture"
      loading="lazy"
      className={cn('border-0', className)}
      style={style}
    />
  )
}
