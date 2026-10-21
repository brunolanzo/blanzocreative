'use client'

import { type Ref, useEffect, useImperativeHandle, useRef } from 'react'
import { type PlayableSource, type PlaybackMode, resolveVideo, type VideoData } from '@/lib/media'

type HlsInstance = { destroy(): void; startLoad(startPosition?: number): void }

export type LoopVideoHandle = {
  /** Toca agora, dentro do gesto da pessoa: serve quando o navegador recusou tocar sozinho. */
  playNow: () => void
  /** Liga ou desliga o som na hora, dentro do clique (o iPhone só libera o som assim). */
  setMuted: (muted: boolean) => void
  /** Prepara o vídeo sem tocar (vídeo com controles: o play nativo precisa do endereço). */
  prime: () => void
  pause: () => void
}

type LoopVideoProps = {
  video: VideoData
  mode?: PlaybackMode
  /** Deve tocar agora? (visível, em hover, centralizado…). */
  play: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  /** "metadata" só para vídeo com controles (mostra a duração); o resto não baixa nada antes de tocar. */
  preload?: 'none' | 'metadata'
  className?: string
  /** Mudou de "tocando" para "parado" ou o contrário. */
  onPlaying?: (playing: boolean) => void
  /** O navegador recusou tocar sozinho (ex.: iPhone em economia de energia). */
  onBlocked?: () => void
  ref?: Ref<LoopVideoHandle>
}

type Attachment = 'none' | 'primary' | 'fallback'

/**
 * HLS nativo só no Safari (inclusive os navegadores do iPhone, que são Safari por dentro) ou sem MSE.
 * O Chrome recente responde "maybe" ao HLS, mas não toca os vídeos do Mux (erro 4, testado no 152 e no 155):
 * fora do Safari, quem toca é o hls.js.
 */
const supportsNativeHls = (media: HTMLVideoElement) =>
  media.canPlayType('application/vnd.apple.mpegurl') !== '' &&
  (/^((?!chrome|chromium|android).)*safari/i.test(navigator.userAgent) || typeof MediaSource === 'undefined')

/**
 * Vídeo nativo que só baixa quando precisa tocar pela primeira vez.
 * MP4 toca direto; HLS usa o suporte nativo (Safari) ou carrega o hls.js sob demanda.
 * Vimeo não passa por aqui (ver VimeoFrame).
 */
export function LoopVideo({
  video,
  mode = 'loop',
  play,
  muted = true,
  loop = true,
  controls = false,
  preload = 'none',
  className,
  onPlaying,
  onBlocked,
  ref,
}: LoopVideoProps) {
  const element = useRef<HTMLVideoElement>(null)
  const attached = useRef<Attachment>('none')
  const hls = useRef<HlsInstance | null>(null)
  // hls.js preparado sem baixar nada: o download só começa no primeiro play.
  const loadPending = useRef(false)
  // A carga do hls.js é assíncrona: quando ela termina, valem a vontade de tocar e a montagem de agora.
  const wantsPlay = useRef(play)
  const alive = useRef(false)
  // Cada preparo de fonte ganha um número; só o mais recente pode terminar de ligar o vídeo.
  const generation = useRef(0)
  const source = resolveVideo(video, mode)
  const callbacks = useRef({ onPlaying, onBlocked })

  useEffect(() => {
    callbacks.current = { onPlaying, onBlocked }
  })

  useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
      generation.current += 1
      hls.current?.destroy()
      hls.current = null
      // Se o componente voltar a montar, prepara a fonte de novo.
      attached.current = 'none'
    }
  }, [])

  async function attach(which: Exclude<Attachment, 'none'>, { deferLoad = false } = {}) {
    const media = element.current
    const target: PlayableSource | undefined = which === 'primary' ? (source ?? undefined) : source?.fallback
    if (!media || !target || target.kind === 'vimeo') return
    const current = ++generation.current
    attached.current = which
    hls.current?.destroy()
    hls.current = null
    loadPending.current = false
    if (target.kind === 'hls' && !supportsNativeHls(media)) {
      // A versão completa, não a "light": o Mux manda o áudio numa faixa separada, que a light não carrega.
      const { default: Hls } = await import('hls.js')
      // Saiu da página ou trocou de fonte enquanto a biblioteca carregava: não liga mais nada.
      if (!alive.current || generation.current !== current || element.current !== media) return
      if (Hls.isSupported()) {
        const instance = new Hls({ capLevelToPlayerSize: true, autoStartLoad: !deferLoad })
        instance.loadSource(target.src)
        instance.attachMedia(media)
        hls.current = instance
        loadPending.current = deferLoad
        return
      }
    }
    media.src = target.src
  }

  function tryPlay() {
    element.current?.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'NotAllowedError') callbacks.current.onBlocked?.()
    })
  }

  useImperativeHandle(ref, () => ({
    setMuted(value) {
      if (element.current) element.current.muted = value
    },
    prime() {
      if (attached.current === 'none') void attach('primary', { deferLoad: true })
    },
    pause() {
      element.current?.pause()
    },
    playNow() {
      if (attached.current !== 'none') return tryPlay()
      const ready = attach('primary')
      // MP4 e HLS nativo recebem o endereço na hora: o play sai ainda dentro do clique.
      // Com hls.js, a biblioteca carrega antes (Chrome e Firefox não exigem o gesto).
      if (element.current?.getAttribute('src')) tryPlay()
      else void ready.then(tryPlay)
    },
  }))

  useEffect(() => {
    wantsPlay.current = play
    const media = element.current
    if (!media) return
    if (!play) {
      media.pause()
      return
    }
    if (attached.current === 'none') {
      void attach('primary').then(() => {
        if (wantsPlay.current) tryPlay()
      })
    } else {
      tryPlay()
    }
    // attach/tryPlay usam refs; só a vontade de tocar dispara este efeito.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play])

  useEffect(() => {
    if (element.current) element.current.muted = muted
  }, [muted])

  function onPlay() {
    // Vídeo preparado sem baixar (com controles): o play, nosso ou da barra do navegador, libera o download.
    if (loadPending.current) {
      loadPending.current = false
      hls.current?.startLoad()
    }
  }

  function onError() {
    if (attached.current === 'primary' && source?.fallback) {
      void attach('fallback').then(() => {
        if (wantsPlay.current) tryPlay()
      })
    }
  }

  return (
    <video
      ref={element}
      className={className}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline
      preload={preload}
      aria-label={video.label ?? undefined}
      onPlay={onPlay}
      onPlaying={() => callbacks.current.onPlaying?.(true)}
      onPause={() => callbacks.current.onPlaying?.(false)}
      onError={onError}
    />
  )
}
