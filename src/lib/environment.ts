'use client'

import { useSyncExternalStore } from 'react'

/**
 * Preferências e condições do aparelho lidas sem "piscar" na hidratação.
 * No servidor, todas assumem o caso mais comum (com animação, sem economia de dados).
 */

function mediaQueryStore(query: string) {
  return {
    subscribe(onChange: () => void) {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    get: () => window.matchMedia(query).matches,
  }
}

const reducedMotion = mediaQueryStore('(prefers-reduced-motion: reduce)')
const fineHover = mediaQueryStore('(hover: hover) and (pointer: fine)')
const desktop = mediaQueryStore('(min-width: 768px)')

/** Tela a partir de 768px (o "md" do Tailwind). */
export function useIsDesktop(): boolean {
  return useSyncExternalStore(desktop.subscribe, desktop.get, () => true)
}

/** Pessoa pediu ao sistema menos animação. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(reducedMotion.subscribe, reducedMotion.get, () => false)
}

/** Mouse de verdade (computador): hover existe. Em toque, é falso. */
export function useCanHover(): boolean {
  return useSyncExternalStore(fineHover.subscribe, fineHover.get, () => true)
}

type NetworkInformation = { saveData?: boolean }
const noop = () => () => {}

/** Modo de economia de dados ligado no navegador (Chrome/Android). */
export function useSaveData(): boolean {
  return useSyncExternalStore(
    noop,
    () => Boolean((navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData),
    () => false,
  )
}

/** A página terminou de carregar (usado para só então baixar vídeos pesados). */
export function usePageLoaded(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener('load', onChange)
      return () => window.removeEventListener('load', onChange)
    },
    () => document.readyState === 'complete',
    () => false,
  )
}

/** Animação automática de vídeos permitida (sem movimento reduzido e sem economia de dados). */
export function useAutoplayAllowed(): boolean {
  const reduced = useReducedMotion()
  const saveData = useSaveData()
  return !reduced && !saveData
}
