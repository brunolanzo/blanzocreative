'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/** Esconde o conteúdo só na home (ex.: chamada de contato desligada em Configurações → Home). */
export function HideOnHome({ hide, children }: { hide: boolean; children: ReactNode }) {
  const pathname = usePathname()
  if (hide && pathname === '/') return null
  return children
}
