import { imageRatio } from '@/lib/media'
import { BLOCK_SIZES, BlockShell, blockWidth, fitToScreen } from './BlockShell'
import { BeforeAfterSlider } from './BeforeAfterSlider'
import type { BlockOf, BlockUi } from './types'

/** Antes e depois com divisor arrastável (mouse, toque e teclado). */
export function BeforeAfterBlock({ block, ui }: { block: BlockOf<'beforeAfterBlock'>; ui: BlockUi }) {
  if (!block.before?.asset || !block.after?.asset) return null
  const width = blockWidth(block.options)
  const ratio = imageRatio(block.before) ?? 16 / 9
  return (
    <BlockShell options={block.options}>
      <div className="mx-auto" style={{ width: fitToScreen(ratio, width) }}>
        <BeforeAfterSlider
          before={block.before}
          after={block.after}
          ratio={ratio}
          labelBefore={block.labelBefore || ui.before}
          labelAfter={block.labelAfter || ui.after}
          compareLabel={ui.compare}
          start={block.start ?? 50}
          vertical={block.orientation === 'vertical'}
          rounded={width !== 'full'}
          sizes={BLOCK_SIZES[width]}
        />
      </div>
    </BlockShell>
  )
}
