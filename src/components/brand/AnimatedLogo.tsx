'use client'

import type { AnimationItem } from 'lottie-web'
import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { useCanHover, useReducedMotion } from '@/lib/environment'

/** Quando o logo anima (Configurações do site → Logo). */
export type LogoAnimation = 'always' | 'hover' | 'once'

type Common = {
  mode: LogoAnimation
  siteName: string
  className?: string
  style?: CSSProperties
}

/**
 * Parado, o logo fica no último quadro (o desenho completo): no modo "só no hover"
 * e para quem pediu ao sistema menos animação.
 */
function useRests(mode: LogoAnimation) {
  const reduced = useReducedMotion()
  const canHover = useCanHover()
  return { rests: reduced || mode === 'hover', playsOnHover: mode === 'hover' && !reduced && canHover }
}

type VideoLogoProps = Common & {
  mp4: string | null
  webm: string | null
  hevc: string | null
}

/**
 * Logo em vídeo. Sem versão com transparência, o MP4 de fundo preto usa mesclagem "screen"
 * (o preto some sobre o site preto), como os vídeos de traço do DS.
 */
export function VideoLogo({ mp4, webm, hevc, mode, siteName, className, style }: VideoLogoProps) {
  const element = useRef<HTMLVideoElement>(null)
  const { rests, playsOnHover } = useRests(mode)
  const hasAlpha = Boolean(webm || hevc)

  // Em repouso, vai para o último quadro. O vídeo pode ter carregado antes de o React assumir
  // a página (aí o evento já passou), então confere também na montagem.
  useEffect(() => {
    const media = element.current
    if (!rests || !media) return
    const rest = () => {
      media.pause()
      media.currentTime = Math.max(0, media.duration - 0.05)
    }
    if (media.readyState >= HTMLMediaElement.HAVE_METADATA) rest()
    else media.addEventListener('loadedmetadata', rest, { once: true })
    return () => media.removeEventListener('loadedmetadata', rest)
  }, [rests])

  return (
    <video
      ref={element}
      className={[className, !hasAlpha && 'mix-blend-screen'].filter(Boolean).join(' ')}
      style={style}
      muted
      playsInline
      preload="auto"
      autoPlay={!rests}
      loop={mode === 'always' && !rests}
      aria-label={siteName}
      onPointerEnter={
        playsOnHover
          ? (event) => {
              const media = event.currentTarget
              media.currentTime = 0
              media.play().catch(() => {})
            }
          : undefined
      }
    >
      {hevc && <source src={hevc} type='video/mp4; codecs="hvc1"' />}
      {webm && <source src={webm} type="video/webm" />}
      {mp4 && <source src={mp4} type="video/mp4" />}
    </video>
  )
}

type LottieLogoProps = Common & {
  src: string
  /** Formato (largura ÷ altura) até o arquivo carregar; depois vale o do próprio Lottie. */
  ratio: number
}

/**
 * Logo em Lottie. A biblioteca (versão leve, só SVG) e o arquivo só carregam quando o logo
 * é Lottie; quem não usa não baixa nada.
 */
export function LottieLogo({ src, ratio: initialRatio, mode, siteName, className, style }: LottieLogoProps) {
  const box = useRef<HTMLDivElement>(null)
  const animation = useRef<AnimationItem | null>(null)
  const { rests, playsOnHover } = useRests(mode)
  const [ratio, setRatio] = useState(initialRatio)

  useEffect(() => {
    let cancelled = false
    let instance: AnimationItem | null = null
    ;(async () => {
      try {
        const [{ default: lottie }, data] = await Promise.all([
          import('lottie-web/build/player/lottie_light'),
          fetch(src).then((response) => response.json() as Promise<{ w?: number; h?: number }>),
        ])
        if (cancelled || !box.current) return
        if (data.w && data.h) setRatio(data.w / data.h)
        const current = lottie.loadAnimation({
          container: box.current,
          renderer: 'svg',
          loop: mode === 'always' && !rests,
          autoplay: !rests,
          animationData: data,
          rendererSettings: { preserveAspectRatio: 'xMinYMid meet' },
        })
        if (rests) current.addEventListener('DOMLoaded', () => current.goToAndStop(current.totalFrames - 1, true))
        instance = current
        animation.current = current
      } catch {
        // Arquivo inválido ou fora do ar: o espaço do logo fica vazio, o resto do site segue normal.
      }
    })()
    return () => {
      cancelled = true
      instance?.destroy()
      animation.current = null
    }
  }, [src, mode, rests])

  return (
    <div
      ref={box}
      role="img"
      aria-label={siteName}
      className={className}
      style={{ ...style, aspectRatio: ratio }}
      onPointerEnter={playsOnHover ? () => animation.current?.goToAndPlay(0, true) : undefined}
    />
  )
}
