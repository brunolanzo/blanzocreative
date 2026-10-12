import { BlockShell, blockWidth } from './BlockShell'
import { GalleryTrack } from './GalleryTrack'
import type { BlockOf, BlockUi } from './types'

/** Alturas da faixa (a largura de cada item sai do formato dele). */
const HEIGHT = {
  sm: 'h-[clamp(200px,32svh,360px)]',
  md: 'h-[clamp(260px,48svh,560px)]',
  lg: 'h-[clamp(320px,64svh,760px)]',
} as const

/** Galeria / carrossel horizontal. */
export function GalleryBlock({ block, ui }: { block: BlockOf<'galleryBlock'>; ui: BlockUi }) {
  const items = block.items ?? []
  if (items.length === 0) return null
  const full = blockWidth(block.options) === 'full'
  return (
    <BlockShell options={block.options}>
      <GalleryTrack
        items={items}
        heightClass={HEIGHT[(block.height ?? 'md') as keyof typeof HEIGHT] ?? HEIGHT.md}
        rounded
        bleed={full}
        labels={{ gallery: ui.gallery, previous: ui.previous, next: ui.next }}
      />
    </BlockShell>
  )
}
