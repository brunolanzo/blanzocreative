'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { useAutoplayAllowed } from '@/lib/environment'
import { resolveVideo, type VideoData, videoPoster } from '@/lib/media'
import { useSound } from '@/lib/sound'
import type { UiStrings } from '@/lib/ui-strings'
import { useInView } from '@/lib/use-in-view'
import { ControlPill } from './ControlPill'
import { LoopVideo, type LoopVideoHandle } from './LoopVideo'
import { VimeoFrame } from './VimeoFrame'

type VideoPlayerProps = {
  video: VideoData
  /** Largura ÷ altura do quadro. */
  ratio: number
  rounded?: boolean
  /** Mídia principal da página (abertura do projeto): o poster carrega antes de tudo. */
  priority?: boolean
  /** Controles completos do navegador (tempo, volume, tela cheia). Nesse caso não toca sozinho. */
  controls?: boolean
  loop?: boolean
  soundButton?: boolean
  ui: Pick<UiStrings, 'soundOn' | 'soundOff' | 'play'>
  className?: string
}

/**
 * Vídeo das páginas (abertura do projeto e bloco de vídeo).
 * Sem controles: toca sozinho, sem som e em loop enquanto aparece na tela; o único controle
 * é o de som, discreto, como no reel da home.
 * Com controles: mostra o poster e a barra do navegador, e a pessoa dá o play (com som).
 * Um som por vez: ligar o som aqui silencia os outros vídeos da página.
 */
export function VideoPlayer({
  video,
  ratio,
  rounded = true,
  priority = false,
  controls = false,
  loop = true,
  soundButton = true,
  ui,
  className,
}: VideoPlayerProps) {
  const box = useRef<HTMLDivElement>(null)
  const player = useRef<LoopVideoHandle>(null)
  const hadSound = useRef(false)
  const visible = useInView(box, { threshold: 0.2 })
  // Player com controles fica montado depois de aparecer: rolar a página não interrompe quem está assistindo.
  const seen = useInView(box, { threshold: 0.2, once: true })
  const autoplay = useAutoplayAllowed()
  const sound = useSound()
  // A pessoa já interagiu (ativou o som ou tocou no vídeo depois de o navegador recusar o autoplay).
  const [started, setStarted] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [playing, setPlaying] = useState(false)

  const source = resolveVideo(video, controls ? 'player' : 'loop')
  const poster = videoPoster(video, priority ? 2400 : 1920)
  const play = !controls && visible && (autoplay || started) && !blocked
  const showSound = !controls && soundButton && video.hasAudio !== false && source?.kind !== 'vimeo'

  // Com controles, o endereço entra quando o vídeo aparece: o play nativo precisa dele.
  useEffect(() => {
    if (controls && seen) player.current?.prime()
  }, [controls, seen])

  // Outro vídeo ligou o som: o vídeo com controles que tocava com som pausa.
  useEffect(() => {
    if (!controls) return
    if (!sound.muted) {
      hadSound.current = true
    } else if (hadSound.current) {
      hadSound.current = false
      player.current?.pause()
    }
  }, [controls, sound.muted])

  function toggleSound() {
    const turningOn = sound.muted
    sound.toggle()
    // Direto no vídeo, ainda dentro do clique: o iPhone só libera o som assim.
    player.current?.setMuted(!turningOn)
    // Se ainda não tocava (movimento reduzido, economia de dados, autoplay recusado), ativar o som dá o play.
    if (turningOn && visible) {
      setBlocked(false)
      setStarted(true)
      player.current?.playNow()
    }
  }

  function retry() {
    setBlocked(false)
    setStarted(true)
    player.current?.playNow()
  }

  const fill = 'absolute inset-0 size-full'

  return (
    <div
      ref={box}
      className={cn('relative overflow-hidden bg-raised', rounded && 'rounded-md', className)}
      style={{ aspectRatio: ratio }}
    >
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className={cn(fill, 'object-cover')}
        />
      )}

      {source?.kind === 'vimeo'
        ? (controls ? seen : visible && autoplay) && (
            <VimeoFrame
              id={source.id}
              title={video.label ?? ''}
              variant={controls ? 'player' : 'background'}
              className={fill}
            />
          )
        : source && (
            <LoopVideo
              ref={player}
              video={video}
              mode={controls ? 'player' : 'loop'}
              play={play}
              muted={controls ? false : sound.muted}
              loop={loop}
              controls={controls}
              preload={controls ? 'metadata' : 'none'}
              onPlaying={(value) => {
                setPlaying(value)
                if (value && controls) sound.claim()
              }}
              onBlocked={() => setBlocked(true)}
              className={cn(
                fill,
                controls
                  ? 'object-contain'
                  : cn('object-cover transition-opacity duration-800 ease-out', !playing && 'opacity-0'),
              )}
            />
          )}

      {showSound && (
        <ControlPill onClick={toggleSound} active={!sound.muted} overlay className="right-16 bottom-16">
          {sound.muted ? ui.soundOn : ui.soundOff}
        </ControlPill>
      )}

      {blocked && (
        <button
          type="button"
          onClick={retry}
          aria-label={ui.play}
          // Anel de foco por dentro: por fora, o canto arredondado do quadro cortaria.
          className="absolute inset-0 grid place-items-center rounded-[inherit] focus-visible:-outline-offset-4"
        >
          <span className="glass-control rounded-pill px-12 py-4 text-label-s font-medium text-paper uppercase">
            {ui.play}
          </span>
        </button>
      )}
    </div>
  )
}
