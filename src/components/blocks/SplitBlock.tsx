import { MediaFrame } from '@/components/media/MediaFrame'
import { cn } from '@/lib/cn'
import { BlockShell, blockWidth } from './BlockShell'
import type { BlockOf } from './types'

const SPLIT = {
  '50-50': { grid: 'md:grid-cols-2', left: '50vw', right: '50vw' },
  '60-40': { grid: 'md:grid-cols-[3fr_2fr]', left: '60vw', right: '40vw' },
  '40-60': { grid: 'md:grid-cols-[2fr_3fr]', left: '40vw', right: '60vw' },
} as const

/** Duas mídias lado a lado, cada uma no próprio formato. No celular, uma embaixo da outra. */
export function SplitBlock({ block }: { block: BlockOf<'splitBlock'> }) {
  const split = SPLIT[(block.ratio ?? '50-50') as keyof typeof SPLIT] ?? SPLIT['50-50']
  const rounded = blockWidth(block.options) !== 'full'
  return (
    <BlockShell options={block.options}>
      <div className={cn('grid items-start gap-16 md:gap-32', split.grid)}>
        <MediaFrame media={block.left} sizes={`(min-width: 768px) ${split.left}, 100vw`} rounded={rounded} />
        <MediaFrame media={block.right} sizes={`(min-width: 768px) ${split.right}, 100vw`} rounded={rounded} />
      </div>
    </BlockShell>
  )
}
