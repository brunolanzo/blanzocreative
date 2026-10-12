'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { useIsDesktop, useReducedMotion } from '@/lib/environment'
import { useInView } from '@/lib/use-in-view'

export type ClientItem = {
  _id: string
  name: string | null
  url: string | null
  logoColor: 'mono' | 'original' | null
  logo: { url: string | null; mimeType: string | null; width: number | null; height: number | null } | null
}

const CELLS_DESKTOP = 15 // 5 por linha × 3 linhas (padrão da parede de logos da Buff)
const CELLS_MOBILE = 9 // 3 por linha × 3 linhas
const CYCLE_MS = 2400

/**
 * Parede de logos: 5 por linha no computador, 3 no celular.
 * Monocromático (padrão): o logo vira uma máscara pintada na cor do DS.
 * Com mais clientes do que células, uma célula por vez troca de logo.
 */
export function ClientWall({ clients }: { clients: ClientItem[] }) {
  const root = useRef<HTMLUListElement>(null)
  const inView = useInView(root)
  const reduced = useReducedMotion()
  const desktop = useIsDesktop()
  const cells = Math.min(clients.length, desktop ? CELLS_DESKTOP : CELLS_MOBILE)
  const [slots, setSlots] = useState<number[]>(() => clients.map((_, index) => index))
  const [changing, setChanging] = useState<number | null>(null)
  const cycles = clients.length > cells && inView && !reduced

  useEffect(() => {
    if (!cycles) return
    const timer = window.setInterval(() => {
      const cell = Math.floor(Math.random() * cells)
      setSlots((current) => swapIntoCell(current, cell, cells))
      setChanging(cell)
    }, CYCLE_MS)
    return () => window.clearInterval(timer)
  }, [cycles, cells])

  return (
    <ul ref={root} className="grid grid-cols-3 md:grid-cols-5">
      {slots.slice(0, cells).map((clientIndex, cell) => {
        const client = clients[clientIndex]
        return (
          <li
            key={cell}
            className={cn('aspect-card', changing === cell && 'motion-safe:animate-[client-in_var(--dur-slow)_var(--ease-out)]')}
            onAnimationEnd={() => setChanging(null)}
          >
            <ClientLogo client={client} />
          </li>
        )
      })}
    </ul>
  )
}

/** Troca o logo da célula pelo próximo cliente que está fora da tela (o que saiu vai para o fim da fila). */
function swapIntoCell(order: number[], cell: number, cells: number): number[] {
  if (order.length <= cells) return order
  const next = [...order]
  const [incoming] = next.splice(cells, 1)
  next.push(next[cell])
  next[cell] = incoming
  return next
}

function ClientLogo({ client }: { client: ClientItem }) {
  const logo = client.logo?.url ? client.logo : null
  const name = client.name ?? ''
  const linked = Boolean(client.url)
  const ratio = logo?.width && logo?.height ? `${logo.width} / ${logo.height}` : undefined

  const content = logo ? (
    client.logoColor === 'original' ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logo.url ?? ''} alt={name} loading="lazy" className="max-h-[45%] max-w-[65%] object-contain" />
    ) : (
      <span
        role="img"
        aria-label={name}
        className={cn(
          'block max-h-[45%] w-[65%] bg-fg-secondary',
          linked && 'transition-colors duration-220 ease-out group-hover:bg-flash-500',
        )}
        style={{
          aspectRatio: ratio,
          maskImage: `url(${logo.url})`,
          WebkitMaskImage: `url(${logo.url})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      />
    )
  ) : (
    // Sem logo, o nome do cliente: menor no celular e quebrando dentro da célula, sem vazar da tela.
    <span
      className={cn(
        'min-w-0 px-4 text-center text-body-s font-medium text-fg-secondary [overflow-wrap:anywhere] hyphens-auto md:px-8 md:text-h3',
        linked && 'transition-colors duration-220 ease-out group-hover:text-flash-500',
      )}
    >
      {name}
    </span>
  )

  const box = 'group flex size-full items-center justify-center'
  if (linked && client.url) {
    return (
      <a href={client.url} target="_blank" rel="noreferrer" className={box}>
        {content}
      </a>
    )
  }
  return <div className={box}>{content}</div>
}
