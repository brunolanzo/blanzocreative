import { MediaFrame } from '@/components/media/MediaFrame'
import { MediaView } from '@/components/media/MediaView'
import { cn } from '@/lib/cn'
import { BlockShell, blockWidth } from './BlockShell'
import type { BlockOf } from './types'

const GAP = { none: 'gap-0', sm: 'gap-8', md: 'gap-16', lg: 'gap-32' } as const
const MASONRY_GAP = { none: 'gap-x-0', sm: 'gap-x-8', md: 'gap-x-16', lg: 'gap-x-32' } as const
const MASONRY_SPACE = { none: 'mb-0', sm: 'mb-8', md: 'mb-16', lg: 'mb-32' } as const

const COLUMNS = {
  'cols-2': { grid: 'sm:grid-cols-2', sizes: '(min-width: 640px) 50vw, 100vw' },
  'cols-3': { grid: 'sm:grid-cols-2 md:grid-cols-3', sizes: '(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw' },
  'cols-4': { grid: 'sm:grid-cols-2 md:grid-cols-4', sizes: '(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw' },
} as const

/** Destaque + menores: o destaque ocupa 2×2 e todos os quadros são quadrados (com o ponto focal do painel). */
const FEATURE = {
  'feature-2': { grid: 'md:grid-cols-3', big: '(min-width: 768px) 66vw, 100vw', small: '(min-width: 768px) 33vw, 100vw' },
  'feature-4': { grid: 'md:grid-cols-4', big: '(min-width: 768px) 50vw, 100vw', small: '(min-width: 768px) 25vw, 100vw' },
} as const

type GapKey = keyof typeof GAP

/** Várias imagens, GIFs ou vídeos curtos. No celular viram uma coluna. */
export function MosaicBlock({ block }: { block: BlockOf<'mosaicBlock'> }) {
  const items = block.items ?? []
  if (items.length === 0) return null
  const gap: GapKey = block.gap && block.gap in GAP ? (block.gap as GapKey) : 'md'
  const flush = gap === 'none'
  const full = blockWidth(block.options) === 'full'
  // Sem espaço entre os itens, quem arredonda é o conjunto; com espaço, cada item.
  const itemRounded = !flush && !full
  const groupClass = cn(flush && !full && 'overflow-hidden rounded-md')
  const layout = block.layout ?? 'cols-3'

  let content
  if (layout === 'masonry') {
    content = (
      <div className={cn('columns-1 sm:columns-2 md:columns-3', MASONRY_GAP[gap], groupClass)}>
        {items.map((item) => (
          <MediaFrame
            key={item._key}
            media={item}
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            rounded={itemRounded}
            className={cn('break-inside-avoid', MASONRY_SPACE[gap])}
          />
        ))}
      </div>
    )
  } else if (layout === 'feature-2' || layout === 'feature-4') {
    const feature = FEATURE[layout]
    content = (
      <div className={cn('grid', feature.grid, GAP[gap], groupClass)}>
        {items.map((item, index) => (
          <MediaView
            key={item._key}
            media={item}
            sizes={index === 0 ? feature.big : feature.small}
            className={cn(
              'aspect-square bg-raised',
              index === 0 && 'md:col-span-2 md:row-span-2 md:aspect-auto',
              itemRounded && 'rounded-md',
            )}
          />
        ))}
      </div>
    )
  } else {
    const columns = COLUMNS[layout as keyof typeof COLUMNS] ?? COLUMNS['cols-3']
    content = (
      <div className={cn('grid items-start', columns.grid, GAP[gap], groupClass)}>
        {items.map((item) => (
          <MediaFrame key={item._key} media={item} sizes={columns.sizes} rounded={itemRounded} />
        ))}
      </div>
    )
  }

  return <BlockShell options={block.options}>{content}</BlockShell>
}
