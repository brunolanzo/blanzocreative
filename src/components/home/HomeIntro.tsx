'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { DURATION, EASE } from '@/lib/motion'
import { lockScroll, unlockScroll } from '@/lib/smooth-scroll'
import { INTRO_STORAGE_KEY } from './intro-gate'

/**
 * A intro inteira cabe em 1,2s (plano, §4.5, para não atrasar o LCP):
 * 0,4s com o logo parado e 0,8s do painel subindo. A entrada do logo é em CSS, sem esperar o JS.
 */
const HOLD_SECONDS = DURATION.base
/** O traço do logo leva ~1,4s; acelerado, termina quando o painel começa a subir. */
const DRAW_SPEED = 2.5

type HomeIntroProps = {
  logoVideo: string | null
  logoImage: { url: string; width: number; height: number } | null
  siteName: string
}

function speedUp(media: HTMLVideoElement | null) {
  if (!media) return
  media.defaultPlaybackRate = DRAW_SPEED
  media.playbackRate = DRAW_SPEED
}

/**
 * Entrada da home (padrão da Buff com a marca da Blanzo): o logo se desenha sobre
 * o preto e o painel sobe revelando o reel. Uma vez por visita; qualquer clique,
 * tecla ou rolagem acelera a saída. Se o JS falhar, o CSS some com a intro sozinho.
 */
export function HomeIntro({ logoVideo, logoImage, siteName }: HomeIntroProps) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const element = root.current
      if (!element || document.documentElement.dataset.intro === 'done') return

      lockScroll()
      // Solta uma vez só: quando a intro termina ou, se sair antes, quando o componente sai.
      let locked = true
      const release = () => {
        if (!locked) return
        locked = false
        unlockScroll()
      }
      // A intro já aparece no HTML: conta o tempo desde a primeira pintura, não desde a hidratação.
      const paint = performance.getEntriesByName('first-contentful-paint')[0]?.startTime
      const elapsed = paint === undefined ? 0 : (performance.now() - paint) / 1000
      const timeline = gsap.timeline({
        delay: Math.max(0, HOLD_SECONDS - elapsed),
        onComplete: () => {
          document.documentElement.dataset.intro = 'done'
          release()
        },
      })
      // Sobe em pixels inteiros: com frações, alguns navegadores deixam uma linha fina aparecendo.
      timeline.to(element, { y: () => -element.offsetHeight, snap: 'y', duration: DURATION.slow, ease: EASE.draw })

      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, '1')
      } catch {
        // Sem sessionStorage, a intro roda de novo na próxima visita à home.
      }

      const hurry = () => {
        if (timeline.progress() === 0) timeline.delay(0).restart()
        timeline.timeScale(2)
      }
      const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
      for (const name of events) window.addEventListener(name, hurry, { once: true, passive: true })
      return () => {
        for (const name of events) window.removeEventListener(name, hurry)
        timeline.kill()
        release()
      }
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      data-home-intro
      aria-hidden
      className="fixed inset-0 z-(--z-transition) grid place-items-center bg-ink-1000"
    >
      <div data-intro-logo>
        {logoVideo ? (
          <video
            ref={speedUp}
            src={logoVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="w-[min(64vw,440px)]"
          />
        ) : (
          logoImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoImage.url}
              width={logoImage.width}
              height={logoImage.height}
              alt={siteName}
              className="h-auto w-[min(48vw,320px)]"
            />
          )
        )}
      </div>
    </div>
  )
}
