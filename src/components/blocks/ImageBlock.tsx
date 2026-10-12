import { SanityImage } from '@/components/media/SanityImage'
import { cn } from '@/lib/cn'
import { imageRatio } from '@/lib/media'
import { BLOCK_SIZES, BlockShell, blockWidth, fitToScreen } from './BlockShell'
import type { BlockOf } from './types'

/** Imagem ou GIF (o GIF continua animado). Ponta a ponta sem cantos arredondados, como no DS. */
export function ImageBlock({ block }: { block: BlockOf<'imageBlock'> }) {
  if (!block.image?.asset) return null
  const width = blockWidth(block.options)
  const ratio = imageRatio(block.image) ?? 16 / 9
  return (
    <BlockShell options={block.options}>
      <div
        className={cn('mx-auto overflow-hidden bg-raised', width !== 'full' && 'rounded-md')}
        style={{ width: fitToScreen(ratio, width), aspectRatio: ratio }}
      >
        <SanityImage image={block.image} sizes={BLOCK_SIZES[width]} className="size-full object-cover" />
      </div>
    </BlockShell>
  )
}
