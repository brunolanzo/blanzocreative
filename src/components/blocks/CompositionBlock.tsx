import type { CSSProperties } from 'react'
import { MediaFrame } from '@/components/media/MediaFrame'
import { cn } from '@/lib/cn'
import { BlockShell, blockWidth } from './BlockShell'
import type { BlockOf } from './types'

/** Deslocamento para baixo (escala do DS), só no computador. */
const OFFSET = { none: '', sm: 'md:mt-48', md: 'md:mt-96', lg: 'md:mt-144' } as const

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/**
 * Composição livre no grid de 12 colunas: cada mídia começa numa coluna e ocupa N colunas.
 * O grid segue a ordem da lista (um item que começa mais à esquerda abre uma linha nova).
 * No celular, tudo empilha nessa mesma ordem.
 */
export function CompositionBlock({ block }: { block: BlockOf<'compositionBlock'> }) {
  const items = block.items ?? []
  if (items.length === 0) return null
  const rounded = blockWidth(block.options) !== 'full'
  return (
    <BlockShell options={block.options}>
      <div className="grid items-start gap-24 md:grid-cols-12 md:gap-x-32 md:gap-y-48">
        {items.map((item) => {
          const start = clamp(Math.round(item.colStart ?? 1), 1, 12)
          const span = clamp(Math.round(item.colSpan ?? 6), 1, 13 - start)
          const offset = OFFSET[(item.offset ?? 'none') as keyof typeof OFFSET] ?? ''
          return (
            <div
              key={item._key}
              className={cn('md:[grid-column:var(--column)]', offset)}
              style={{ '--column': `${start} / span ${span}` } as CSSProperties}
            >
              <MediaFrame
                media={item.media}
                sizes={`(min-width: 768px) ${Math.round((span / 12) * 100)}vw, 100vw`}
                rounded={rounded}
              />
            </div>
          )
        })}
      </div>
    </BlockShell>
  )
}
