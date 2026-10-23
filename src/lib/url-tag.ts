'use client'

import { useSyncExternalStore } from 'react'

/**
 * A tag ativa de /work vive na URL (?tag=ia): o link filtrado pode ser enviado
 * a alguém e voltar/avançar do navegador funcionam. A troca usa history.pushState,
 * que o Next integra ao roteador sem recarregar a página.
 */
const listeners = new Set<() => void>()
const beforeChange = new Set<() => void>()

function emit() {
  for (const callback of beforeChange) callback()
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) window.addEventListener('popstate', emit)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener('popstate', emit)
  }
}

function readTag(): string | null {
  return new URLSearchParams(window.location.search).get('tag')
}

/** Tag da URL; no servidor (e na hidratação), a tag com que a página foi gerada. */
export function useUrlTag(serverTag: string | null): string | null {
  return useSyncExternalStore(subscribe, readTag, () => serverTag)
}

export function pushUrlTag(tag: string | null) {
  const url = new URL(window.location.href)
  if (tag) url.searchParams.set('tag', tag)
  else url.searchParams.delete('tag')
  window.history.pushState(null, '', url)
  emit()
}

/** Chamado logo antes de a tag mudar (inclusive pelo voltar/avançar), para animar a troca. */
export function onBeforeUrlTagChange(callback: () => void): () => void {
  beforeChange.add(callback)
  return () => {
    beforeChange.delete(callback)
  }
}
