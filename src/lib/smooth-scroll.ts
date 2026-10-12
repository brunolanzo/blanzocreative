import type Lenis from 'lenis'

/**
 * Acesso ao scroll suave (Lenis) de qualquer componente.
 * Fica nulo quando o scroll suave está desligado (ex.: movimento reduzido).
 */
let instance: Lenis | null = null
/** Quantas travas estão ativas (menu, intro…): o scroll só volta quando todas soltam. */
let locks = 0

export function setLenis(lenis: Lenis | null) {
  instance = lenis
  // Trava pedida antes de o scroll suave existir (a intro da home trava antes dele) vale para ele também.
  if (lenis && locks > 0) lenis.stop()
}

/** Trava o scroll da página (menu aberto, intro da home). Cada trava precisa do seu unlockScroll. */
export function lockScroll() {
  locks += 1
  instance?.stop()
  document.documentElement.style.overflow = 'hidden'
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1)
  if (locks > 0) return
  document.documentElement.style.overflow = ''
  instance?.start()
}

/** Volta ao topo na hora (troca de página por baixo do painel de transição), mesmo com o scroll travado. */
export function jumpToTop() {
  instance?.scrollTo(0, { immediate: true, force: true })
  window.scrollTo(0, 0)
}

/** Rola até um elemento (suave com Lenis; instantâneo para quem pede menos animação). */
export function scrollToElement(element: HTMLElement, offset = -96) {
  if (instance) {
    instance.scrollTo(element, { offset })
    return
  }
  const top = element.getBoundingClientRect().top + window.scrollY + offset
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
}
