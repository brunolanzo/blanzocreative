'use client'

import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)

/** Curvas do design system (tokens/motion.css) em formato GSAP. */
export const EASE = {
  /** --ease-draw: a curva do traço do logo, assinatura da marca. */
  draw: CustomEase.create('ds-draw', 'M0,0 C0.65,0 0.35,1 1,1'),
  /** --ease-out: revelações e hover. */
  out: CustomEase.create('ds-out', 'M0,0 C0.16,1 0.3,1 1,1'),
  /** --ease-in-out: trocas neutras. */
  inOut: CustomEase.create('ds-in-out', 'M0,0 C0.4,0 0.2,1 1,1'),
}

/** Durações do DS, em segundos. */
export const DURATION = {
  instant: 0.12,
  fast: 0.22,
  base: 0.4,
  slow: 0.8,
  draw: 2.4,
}

/** Intervalo entre itens irmãos (--stagger). */
export const STAGGER = 0.08

/** Distância da revelação no scroll (DS: "fade + rise ~16px"). */
export const REVEAL_DISTANCE = 16

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
