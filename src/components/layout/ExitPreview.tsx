'use client'

import { usePathname } from 'next/navigation'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * Aviso de pré-visualização aberta fora do painel (ex.: o link ficou salvo no navegador).
 * Dentro do painel o site roda num quadro (iframe) e o aviso some: lá a pré-visualização é o normal.
 * (Não usa o hook do next-sanity para isso: ele traria ~200 KB de JavaScript para todas as visitas.)
 */
export function ExitPreview({ label }: { label: string }) {
  const pathname = usePathname()
  const framed = useSyncExternalStore(
    subscribe,
    () => window.self !== window.top,
    () => true,
  )
  if (framed) return null
  return (
    <a
      href={`/api/draft-mode/disable?to=${encodeURIComponent(pathname)}`}
      className="fixed bottom-16 left-1/2 z-(--z-modal) -translate-x-1/2 rounded-pill bg-paper px-16 py-8 text-label-s font-medium text-ink-1000 uppercase transition-colors duration-220 ease-out hover:bg-flash-500 hover:text-paper"
    >
      {label}
    </a>
  )
}
