'use client'

import { useSyncExternalStore } from 'react'

/**
 * Transição entre páginas (padrão da Buff com o movimento do DS): um painel cobre a tela,
 * a rota troca por baixo e o painel sai revelando a página nova. Quem desenha é o
 * PageTransition (no layout); os links internos (AppLink) só pedem a troca.
 */
export type TransitionPhase = 'idle' | 'covering' | 'covered' | 'revealing'

type TransitionState = { phase: TransitionPhase; target: string | null; from: string | null }

let state: TransitionState = { phase: 'idle', target: null, from: null }
let enabled = false
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** O PageTransition liga quando está na página e a pessoa não pediu menos animação. */
export function setTransitionsEnabled(value: boolean) {
  enabled = value
}

export function setTransitionPhase(phase: TransitionPhase) {
  state = { ...state, phase, ...(phase === 'idle' ? { target: null, from: null } : {}) }
  emit()
}

/**
 * Pede a transição para `href`. Devolve true quando ela assume a navegação (o link deve
 * cancelar a dele). Só para páginas diferentes do mesmo site: trocar filtro ou âncora não cobre a tela.
 */
export function beginPageTransition(href: string): boolean {
  if (typeof window === 'undefined' || !enabled) return false
  // Já trocando de página: ignora cliques extras.
  if (state.phase !== 'idle') return true
  const url = new URL(href, window.location.href)
  if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return false
  state = { phase: 'covering', target: `${url.pathname}${url.search}${url.hash}`, from: window.location.pathname }
  emit()
  return true
}

export function usePageTransitionState(): TransitionState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  )
}
