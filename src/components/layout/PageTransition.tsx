'use client'

import { gsap } from 'gsap'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/environment'
import { DURATION, EASE } from '@/lib/motion'
import { setTransitionPhase, setTransitionsEnabled, usePageTransitionState } from '@/lib/page-transition'
import { jumpToTop, lockScroll, unlockScroll } from '@/lib/smooth-scroll'

/** Se a página nova demorar demais, o painel sai mesmo assim (a navegação continua por baixo). */
const MAX_WAIT_MS = 6000
/** O traço do logo (~1,4s no MP4 do DS) acelerado para terminar enquanto o painel cobre a tela. */
const DRAW_SPEED = 2

/**
 * Painel de transição entre páginas (padrão da Buff com o movimento do DS):
 * cobre a tela de baixo para cima (--dur-slow, --ease-draw) com o logo se desenhando no centro,
 * troca a rota por baixo, volta ao topo e sai pelo alto enquanto a página nova sobe.
 * Voltar/avançar do navegador não cobre: a página nova só aparece com um fade rápido.
 * Com movimento reduzido, nada disso acontece.
 */
export function PageTransition({ logoVideo }: { logoVideo: string | null }) {
  const router = useRouter()
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const { phase, target, from } = usePageTransitionState()
  const panel = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const lastPath = useRef(pathname)
  // O vídeo do logo só entra depois que a página carregou, para não disputar banda com o conteúdo.
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  useEffect(() => {
    setTransitionsEnabled(!reduced)
    return () => setTransitionsEnabled(false)
  }, [reduced])

  // O CSS usa a fase para segurar a entrada dos títulos enquanto a tela está coberta.
  useEffect(() => {
    document.documentElement.dataset.transition = phase
  }, [phase])

  useEffect(() => {
    if (!logoVideo) return
    const load = () => setVideoSrc(logoVideo)
    if (document.readyState === 'complete') {
      const timer = window.setTimeout(load, 1500)
      return () => window.clearTimeout(timer)
    }
    window.addEventListener('load', load, { once: true })
    return () => window.removeEventListener('load', load)
  }, [logoVideo])

  // 1. Cobre a tela e, coberta, troca a rota.
  useEffect(() => {
    const element = panel.current
    if (phase !== 'covering' || !element || !target) return
    lockScroll()
    const media = video.current
    if (media?.getAttribute('src')) {
      media.currentTime = 0
      media.playbackRate = DRAW_SPEED
      media.play().catch(() => {})
    }
    gsap.fromTo(
      element,
      { yPercent: 100, visibility: 'visible' },
      {
        yPercent: 0,
        duration: DURATION.slow,
        ease: EASE.draw,
        onComplete: () => {
          jumpToTop()
          setTransitionPhase('covered')
          router.push(target, { scroll: false })
        },
      },
    )
  }, [phase, target, router])

  // 2. A rota nova chegou (ou demorou demais): o painel sai e a página sobe.
  useEffect(() => {
    const element = panel.current
    if (phase !== 'covered' || !element) return
    const reveal = () => {
      setTransitionPhase('revealing')
      jumpToTop()
      const main = document.getElementById('conteudo')
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(element, { visibility: 'hidden' })
            unlockScroll()
            setTransitionPhase('idle')
          },
        })
        .to(element, { yPercent: -100, duration: DURATION.slow, ease: EASE.draw })
        .fromTo(main, { y: 48 }, { y: 0, duration: DURATION.slow, ease: EASE.out, clearProps: 'transform' }, 0.1)
    }
    if (pathname !== from) {
      reveal()
      return
    }
    const timer = window.setTimeout(reveal, MAX_WAIT_MS)
    return () => window.clearTimeout(timer)
  }, [phase, pathname, from])

  // 3. Voltar/avançar (troca de rota sem o painel): fade rápido da página nova.
  useEffect(() => {
    if (pathname === lastPath.current) return
    lastPath.current = pathname
    if (phase !== 'idle' || reduced) return
    const main = document.getElementById('conteudo')
    gsap.fromTo(main, { opacity: 0 }, { opacity: 1, duration: DURATION.base, ease: EASE.out, clearProps: 'opacity' })
  }, [pathname, phase, reduced])

  return (
    <div
      ref={panel}
      aria-hidden
      className="invisible fixed inset-0 z-(--z-transition) grid place-items-center bg-raised"
    >
      {/* O arquivo é baixado antes (prefetch, depois que a página carregou) e o vídeo só existe durante
          a troca: parado e escondido, ele contaria como "maior elemento" da página no Lighthouse. */}
      {videoSrc && <link rel="prefetch" href={videoSrc} />}
      {videoSrc && phase !== 'idle' && (
        <video
          ref={video}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          // O MP4 do traço tem fundo preto: com "screen", o preto some sobre o painel.
          className="w-[min(48vw,320px)] mix-blend-screen"
        />
      )}
    </div>
  )
}
