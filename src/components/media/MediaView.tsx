'use client'

import { type CSSProperties, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { useAutoplayAllowed } from '@/lib/environment'
import { type MediaData, resolveVideo, videoPoster } from '@/lib/media'
import { useInView } from '@/lib/use-in-view'
import { LoopVideo } from './LoopVideo'
import { SanityImage } from './SanityImage'
import { VimeoFrame } from './VimeoFrame'

type MediaViewProps = {
  media: MediaData | null | undefined
  sizes: string
  className?: string
  style?: CSSProperties
  /** Classe do elemento de imagem/vídeo (ex.: object-cover). */
  mediaClassName?: string
  /** Mídia principal da página: carrega antes de tudo. */
  priority?: boolean
  /** Largura do poster do vídeo, em pixels. */
  posterWidth?: number
}

/**
 * Mídia livre (imagem, GIF ou vídeo em loop sem som) que preenche o elemento pai.
 * Vídeos só tocam enquanto aparecem na tela; com movimento reduzido, fica o poster.
 */
export function MediaView({
  media,
  sizes,
  className,
  style,
  mediaClassName = 'object-cover',
  priority = false,
  posterWidth = 1280,
}: MediaViewProps) {
  const box = useRef<HTMLDivElement>(null)
  const inView = useInView(box, { rootMargin: '200px' })
  const autoplay = useAutoplayAllowed()
  const [playing, setPlaying] = useState(false)

  if (!media) return null
  const fill = cn('absolute inset-0 size-full', mediaClassName)

  if (media.kind === 'video' && media.video) {
    const source = resolveVideo(media.video, 'loop')
    const poster = videoPoster(media.video, posterWidth)
    return (
      <div ref={box} className={cn('relative overflow-hidden', className)} style={style}>
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
            className={fill}
          />
        )}
        {source?.kind === 'vimeo' ? (
          inView && autoplay && (
            <VimeoFrame id={source.id} title={media.video.label ?? ''} variant="background" className={fill} />
          )
        ) : (
          source && (
            <LoopVideo
              video={media.video}
              play={inView && autoplay}
              onPlaying={setPlaying}
              className={cn(fill, 'transition-opacity duration-400 ease-out', playing ? 'opacity-100' : 'opacity-0')}
            />
          )
        )}
      </div>
    )
  }

  return (
    <div ref={box} className={cn('relative overflow-hidden', className)} style={style}>
      <SanityImage image={media.image} sizes={sizes} fill priority={priority} className={mediaClassName} />
    </div>
  )
}
