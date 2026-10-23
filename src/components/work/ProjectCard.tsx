'use client'

import { AppLink } from '@/components/navigation/AppLink'
import { type MouseEvent, useEffect, useRef, useState } from 'react'
import { LoopVideo } from '@/components/media/LoopVideo'
import { SanityImage } from '@/components/media/SanityImage'
import { cn } from '@/lib/cn'
import { useAutoplayAllowed, useCanHover } from '@/lib/environment'
import { hasVideo, isNativeVideo, type MediaData, type VideoData, videoPoster } from '@/lib/media'
import { registerPreviewFocus } from './preview-focus'

export type CardTag = { _id: string; name: string | null; slug: string | null }

export type ProjectCardData = {
  _id: string
  title: string | null
  slug: string | null
  year: number | null
  client: string | null
  tags: CardTag[] | null
  thumbnail: MediaData | null
  previewVideo: VideoData | null
}

type ProjectCardProps = {
  project: ProjectCardData
  sizes?: string
  /** Card acima da dobra: imagem carrega com prioridade. */
  priority?: boolean
  /** Clique numa tag do card: filtra o grid em vez de navegar (com Ctrl/Cmd abre o link normal). */
  onTagClick?: (slug: string) => void
  /** Link que leva ao projeto (para lembrar de qual lista a pessoa veio). */
  onOpen?: () => void
  /** Nível do título: h3 sob um h2 de seção (home, relacionados); h2 direto sob o h1 (/work). */
  headingLevel?: 'h2' | 'h3'
}

/**
 * Card de projeto: proporção 3:2 (Buff) com o visual do ProjectTile do DS.
 * Hover (computador): a mídia cresce 1.04, o preview aparece e o título fica vermelho-rosado.
 * Toque (celular): o preview toca só no card mais centralizado.
 */
export function ProjectCard({
  project,
  sizes = '(min-width: 768px) 50vw, 100vw',
  priority = false,
  onTagClick,
  onOpen,
  headingLevel: Heading = 'h3',
}: ProjectCardProps) {
  const root = useRef<HTMLElement>(null)
  const canHover = useCanHover()
  const autoplay = useAutoplayAllowed()
  const [hovered, setHovered] = useState(false)
  const [centered, setCentered] = useState(false)
  const [previewPlaying, setPreviewPlaying] = useState(false)

  const thumbnail = project.thumbnail
  const thumbIsVideo = thumbnail?.kind === 'video' && hasVideo(thumbnail.video)
  // O preview do card toca no <video> do site; vídeo do Vimeo fica só no poster.
  const preview = isNativeVideo(project.previewVideo)
    ? project.previewVideo
    : thumbIsVideo && isNativeVideo(thumbnail?.video)
      ? thumbnail.video
      : null
  const usesFocus = !canHover && autoplay && preview !== null

  useEffect(() => {
    const element = root.current
    if (!usesFocus || !element) return
    return registerPreviewFocus({ element, setActive: setCentered })
  }, [usesFocus])

  const active = autoplay && (canHover ? hovered : centered)
  const href = `/work/${project.slug}`
  const posterUrl = thumbIsVideo ? videoPoster(thumbnail?.video, 1200) : undefined

  function handleTag(event: MouseEvent<HTMLAnchorElement>, slug: string) {
    if (!onTagClick || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    onTagClick(slug)
  }

  return (
    <article
      ref={root}
      className="group relative"
      onMouseEnter={canHover ? () => setHovered(true) : undefined}
      onMouseLeave={canHover ? () => setHovered(false) : undefined}
    >
      <div className="relative aspect-card overflow-hidden rounded-md bg-raised">
        <div className="absolute inset-0 transition-transform duration-800 ease-out group-hover:scale-[1.04]">
          {thumbIsVideo ? (
            posterUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={posterUrl} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
            )
          ) : (
            <SanityImage image={thumbnail?.image} sizes={sizes} fill priority={priority} className="object-cover" />
          )}
          {preview && (
            <LoopVideo
              video={preview}
              play={active}
              onPlaying={setPreviewPlaying}
              className={cn(
                'absolute inset-0 size-full object-cover transition-opacity duration-400 ease-out',
                active && previewPlaying ? 'opacity-100' : 'opacity-0',
              )}
            />
          )}
        </div>
      </div>

      <div className="mt-16 flex items-baseline justify-between gap-16">
        <div className="flex min-w-0 flex-col gap-4">
          <Heading className="text-h3 font-medium lowercase transition-colors duration-220 ease-out group-hover:text-flash-500">
            <AppLink href={href} onClick={onOpen} data-card-link className="after:absolute after:inset-0 after:content-['']">
              {project.title}
            </AppLink>
          </Heading>
          {project.client && <p className="text-body-s text-fg-secondary">{project.client}</p>}
        </div>
        {project.year && <span className="shrink-0 text-label-s text-fg-secondary tabular-nums">{project.year}</span>}
      </div>

      {project.tags && project.tags.length > 0 && (
        <ul className="relative z-1 mt-12 flex flex-wrap gap-8">
          {project.tags.map(
            (tag) =>
              tag.slug && (
                <li key={tag._id}>
                  <AppLink
                    href={`/work?tag=${tag.slug}`}
                    onClick={(event) => handleTag(event, tag.slug as string)}
                    className="inline-flex items-center rounded-pill border border-hairline px-[10px] py-4 text-label-s font-medium leading-none text-fg-secondary uppercase transition-colors duration-220 ease-out hover:border-flash-500 hover:text-flash-500"
                  >
                    {tag.name}
                  </AppLink>
                </li>
              ),
          )}
        </ul>
      )}
    </article>
  )
}
