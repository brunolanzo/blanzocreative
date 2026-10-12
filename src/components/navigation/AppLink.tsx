'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { beginPageTransition } from '@/lib/page-transition'

type AppLinkProps = ComponentProps<typeof Link>

/**
 * Link interno do site (no lugar do next/link): troca de página com o painel de transição.
 * Ctrl/Cmd+clique, nova aba e mudanças só de filtro seguem o comportamento normal.
 */
export function AppLink({ href, onNavigate, ...props }: AppLinkProps) {
  return (
    <Link
      href={href}
      onNavigate={(event) => {
        onNavigate?.(event)
        if (beginPageTransition(typeof href === 'string' ? href : (href.pathname ?? '/'))) event.preventDefault()
      }}
      {...props}
    />
  )
}
