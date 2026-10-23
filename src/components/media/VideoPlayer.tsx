'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { useAutoplayAllowed } from '@/lib/environment'
import { resolveVideo, type VideoData, videoPoster } from '@/lib/media'
import { soundOptedOut, useSound } from '@/lib/sound'
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
  /** Controles completos do navegador (tempo, volume, tela cheia), além do play automático. */
  controls?: boolean
  loop?: boolean
  soundButton?: boolean
  ui: Pick<UiStrings, 'soundOn' | 'soundOff' | 'play'>
  className?: string
}

/**
 * Vídeo das páginas (abertura do projeto e bloco de vídeo).
 * Toca sozinho enquanto aparece na tela. Vídeo com som tenta começar com som: o navegador só deixa
 * depois de a pessoa clicar ou tocar em algo do site (quem chega pelo card do projeto já clicou).
 * Se recusar, toca sem som e o "Ativar som" liga o áudio.
 * Sem controles, o único controle é o de som, discreto, como no reel da home.
 * Com controles, a barra do navegador também aparece (tempo, volume, tela cheia).
 * Um som por vez: o vídeo que liga o som silencia os outros. Quem desliga o som de um vídeo
 * não ouve os próximos começarem com som.
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
  const source = resolveVideo(video, controls ? 'player' : 'loop')
  const wantsSound = video.hasAudio !== false && source?.kind !== 'vimeo' && (controls || soundButton)
  // Vídeo com som só toca com metade dele na tela: o áudio não começa com um pedacinho aparecendo.
  const visible = useInView(box, { threshold: wantsSound ? 0.5 : 0.2 })
  const seen = useInView(box, { threshold: 0.2, once: true })
  const autoplay = useAutoplayAllowed()
  const sound = useSound()
  // A pessoa já interagiu (ativou o som, deu play ou tocou no vídeo depois de o navegador recusar o autoplay).
  const [started, setStarted] = useState(false)
  const [blocked, setBlocked] = useState(false)
  // Pausou na barra do navegador (ou o vídeo sem loop terminou): não volta a tocar sozinho.
  const [userPaused, setUserPaused] = useState(false)
  const [playing, setPlaying] = useState(false)

  const poster = videoPoster(video, priority ? 2400 : 1920)
  const play = visible && (autoplay || started) && !blocked && !userPaused
  const showSound = !controls && soundButton && video.hasAudio !== false && source?.kind !== 'vimeo'
  // O "pause" chega depois da renderização: compara com o pedido de tocar daquele momento.
  const playRef = useRef(play)
  useEffect(() => {
    playRef.current = play
  })

  // Com controles, o endereço entra quando o vídeo aparece: o play da barra precisa dele
  // (movimento reduzido ou economia de dados, quando nada toca sozinho).
  useEffect(() => {
    if (controls && seen) player.current?.prime()
  }, [controls, seen])

  function handlePlaying(value: boolean) {
    setPlaying(value)
    if (value) {
      // Play dado na barra do navegador: com o clique, o som pode vir junto.
      if (controls && !playRef.current && wantsSound && !soundOptedOut()) sound.claim()
      setStarted(true)
      setUserPaused(false)
    } else if (controls && playRef.current) {
      setUserPaused(true)
    }
  }

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
              muted={sound.muted}
              autoSound={wantsSound && !soundOptedOut()}
              loop={loop}
              controls={controls}
              poster={controls ? poster : undefined}
              preload={controls ? 'metadata' : 'none'}
              onPlaying={handlePlaying}
              onBlocked={() => setBlocked(true)}
              onAutoSound={(withSound) => {
                if (withSound) sound.claim()
              }}
              onUserMute={(muted) => sound.choose(!muted)}
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
