import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type EyebrowProps = {
  children: ReactNode
  /** Número da seção, ex. "01". Desenha o número + uma linha antes do rótulo. */
  index?: string
  accent?: boolean
  as?: 'div' | 'p' | 'span' | 'h2'
  className?: string
}

/** Rótulo em maiúsculas com tracking largo: o único lugar do DS com caixa-alta. */
export function Eyebrow({ children, index, accent = false, as: Tag = 'div', className }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        'flex items-center gap-12 text-label font-medium uppercase',
        accent ? 'text-accent' : 'text-fg-secondary',
        className,
      )}
    >
      {index && (
        <>
          <span className="tabular-nums">{index}</span>
          <span aria-hidden className="h-px w-24 bg-current opacity-50" />
        </>
      )}
      <span>{children}</span>
    </Tag>
  )
}
