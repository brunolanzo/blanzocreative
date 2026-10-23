'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { beginPageTransition } from '@/lib/page-transition'

type AppLinkProps = ComponentProps<typeof Link>

/**
 * Link interno do site (no lugar do next/link): troca de página com o painel de transição.
 * Ctrl/Cmd+clique, nova aba e mudanças só de filtro seguem o comportamento normal.
 *
 * Links filtrados (/work?tag=…) não são pré-carregados. O rewrite de next.config.ts depende
 * da query, mas o pré-carregamento do Next reaproveita a estrutura de /work sem filtro e pede
 * ao servidor um trecho que não existe (404 no console depois de cada publicação). O clique navega normalmente.
 */
export function AppLink({ href, onNavigate, prefetch, ...props }: AppLinkProps) {
  const filtered = typeof href === 'string' && /[?&]tag=/.test(href)
  return (
    <Link
      href={href}
      prefetch={filtered ? false : prefetch}
      onNavigate={(event) => {
        onNavigate?.(event)
        if (beginPageTransition(typeof href === 'string' ? href : (href.pathname ?? '/'))) event.preventDefault()
      }}
      {...props}
    />
  )
}
