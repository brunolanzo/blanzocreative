'use client'

import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { setLenis } from '@/lib/smooth-scroll'

/**
 * Scroll suave com os valores da referência (Buff): lerp 0.165, roda ×1,25.
 * Sincronizado com o ScrollTrigger pelo relógio do GSAP.
 * Desligado para quem pede menos animação; no toque o celular usa o scroll nativo.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ lerp: 0.165, wheelMultiplier: 1.25 })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
