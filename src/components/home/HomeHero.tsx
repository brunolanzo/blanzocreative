'use client'

import { useEffect, useRef, useState } from 'react'
import { ControlPill } from '@/components/media/ControlPill'
import { LoopVideo, type LoopVideoHandle } from '@/components/media/LoopVideo'
import { SanityImage } from '@/components/media/SanityImage'
import { VimeoFrame } from '@/components/media/VimeoFrame'
import { Display } from '@/components/ui/Display'
import { cn } from '@/lib/cn'
import { useAutoplayAllowed, usePageLoaded } from '@/lib/environment'
import { type ImageData, resolveVideo, type VideoData, videoRatio } from '@/lib/media'
import { hasVisibleText } from '@/lib/preview-marker'
import { useSound } from '@/lib/sound'
import type { UiStrings } from '@/lib/ui-strings'
import { useInView } from '@/lib/use-in-view'

export type HeroReel = {
  loop: VideoData | null
  poster: ImageData | null
  phrase: string | null
} | null

type HomeHeroProps = {
  reel: HeroReel
  siteName: string
  ui: Pick<UiStrings, 'soundOn' | 'soundOff'>
}

const GESTURES = ['click', 'touchend', 'keydown'] as const

/**
 * Topo da home: o demo reel em tela cheia, tocando sozinho, em loop e sem som.
 * O único controle é o de som. Com frase por cima, o vídeo fica a 45% com o degradê de proteção (regra do DS).
 * O vídeo só começa a baixar depois que a página carregou (o poster é o que aparece primeiro).
 * Com movimento reduzido ou economia de dados, fica o poster até a pessoa ativar o som.
 */
export function HomeHero({ reel, siteName, ui }: HomeHeroProps) {
  const section = useRef<HTMLElement>(null)
  const video = useRef<LoopVideoHandle>(null)
  const visible = useInView(section, { threshold: 0.15 })
  const loaded = usePageLoaded()
  const autoplay = useAutoplayAllowed()
  const sound = useSound()
  // A pessoa já interagiu (ativou o som ou tocou na página depois de o navegador recusar o autoplay).
  const [started, setStarted] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [playing, setPlaying] = useState(false)

  const loop = reel?.loop ?? null
  const source = resolveVideo(loop, 'loop')
  // Reel no Vimeo: toca no player de fundo do próprio Vimeo (sem som, então sem o botão de som).
  const vimeoId = source?.kind === 'vimeo' ? source.id : null
  const phrase = hasVisibleText(reel?.phrase) ? reel.phrase : null
  const play = source !== null && loaded && visible && (autoplay || started) && !blocked

  // Navegador que recusa vídeo sozinho (ex.: iPhone em economia de energia): o primeiro toque na página dá o play.
  useEffect(() => {
    if (!blocked) return
    const retry = () => {
      setBlocked(false)
      setStarted(true)
      video.current?.playNow()
    }
    for (const name of GESTURES) window.addEventListener(name, retry, { passive: true })
    return () => {
      for (const name of GESTURES) window.removeEventListener(name, retry)
    }
  }, [blocked])

  function toggleSound() {
    const turningOn = sound.muted
    sound.toggle()
    // Direto no vídeo, ainda dentro do clique: o iPhone só libera o som assim.
    video.current?.setMuted(!turningOn)
    // Se ainda não tocava (movimento reduzido, economia de dados, autoplay recusado), ativar o som dá o play.
    if (turningOn && visible) {
      setBlocked(false)
      setStarted(true)
      video.current?.playNow()
    }
  }

  return (
    <section
      ref={section}
      className="relative isolate flex h-svh min-h-[560px] flex-col justify-end overflow-hidden bg-page"
    >
      <div className={cn('absolute inset-0 -z-10', phrase && 'opacity-(--hero-video-opacity)')}>
        <SanityImage image={reel?.poster} fill sizes="100vw" priority quality={70} className="object-cover" />
        {vimeoId
          ? play && (
              <VimeoFrame
                id={vimeoId}
                title={loop?.label ?? siteName}
                variant="background"
                // Como o object-fit: cover de um <video>: o quadro passa da tela e é cortado nas bordas.
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: `max(100%, calc(100svh * ${videoRatio(loop).toFixed(4)}))`,
                  height: `max(100%, calc(100vw / ${videoRatio(loop).toFixed(4)}))`,
                }}
              />
            )
          : loop && (
              <LoopVideo
                ref={video}
                video={loop}
                play={play}
                muted={sound.muted}
                onPlaying={setPlaying}
                onBlocked={() => setBlocked(true)}
                className={cn(
                  'absolute inset-0 size-full object-cover transition-opacity duration-800 ease-out',
                  playing ? 'opacity-100' : 'opacity-0',
                )}
              />
            )}
      </div>
      {phrase && <div aria-hidden className="protect-gradient absolute inset-0 -z-10" />}

      <div className="container-site flex flex-col gap-32 pb-24 md:flex-row md:items-end md:justify-between md:gap-48">
        {phrase ? (
          <Display as="h1" size="xl" accent className="max-w-[13ch] md:pb-24">
            {phrase}
          </Display>
        ) : (
          <h1 className="sr-only">{siteName}</h1>
        )}

        {loop && !vimeoId && (
          <ControlPill onClick={toggleSound} active={!sound.muted} className="shrink-0 self-start md:self-auto">
            {sound.muted ? ui.soundOn : ui.soundOff}
          </ControlPill>
        )}
      </div>
    </section>
  )
}
