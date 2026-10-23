'use client'

import { useCallback, useEffect, useId, useSyncExternalStore } from 'react'

/**
 * Só um vídeo com som por vez: ativar o som de um silencia os outros.
 */
let owner: string | null = null
// A pessoa desligou o som de um vídeo: nesta visita, os próximos começam sem som.
let optedOut = false
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

export function claimSound(id: string) {
  owner = id
  emit()
}

export function releaseSound(id: string) {
  if (owner !== id) return
  owner = null
  emit()
}

/** A pessoa desligou o som de algum vídeo nesta visita (então nenhum outro começa com som). */
export function soundOptedOut() {
  return optedOut
}

/** Estado de som de um vídeo: `muted`, `toggle()` e `claim()` (que silenciam os demais). */
export function useSound() {
  const id = useId()
  const isOwner = useSyncExternalStore(
    subscribe,
    () => owner === id,
    () => false,
  )
  // Vídeo que sai da página devolve o som: ao voltar, nada recomeça com som sozinho.
  useEffect(() => () => releaseSound(id), [id])
  // Escolha da pessoa (botão de som ou barra do navegador): vale também para os próximos vídeos.
  const choose = useCallback(
    (on: boolean) => {
      optedOut = !on
      if (on) claimSound(id)
      else releaseSound(id)
    },
    [id],
  )
  const toggle = useCallback(() => choose(owner !== id), [choose, id])
  const claim = useCallback(() => claimSound(id), [id])
  const release = useCallback(() => releaseSound(id), [id])
  return { muted: !isOwner, toggle, choose, claim, release, id }
}
