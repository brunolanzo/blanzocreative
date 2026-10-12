import { cn } from '@/lib/cn'
import { BlockShell } from './BlockShell'
import { RichText } from './RichText'
import type { BlockOf } from './types'

/** Texto corrido: título de seção em minúsculas e parágrafos na largura de leitura do DS. */
export function TextBlock({ block }: { block: BlockOf<'textBlock'> }) {
  if (!block.heading && !block.body?.length) return null
  const centered = block.align === 'center'
  return (
    <BlockShell options={block.options}>
      <div className={cn('flex max-w-prose flex-col gap-24', centered && 'mx-auto items-center text-center')}>
        {block.heading && <h2 className="text-h2 font-medium lowercase">{block.heading}</h2>}
        <RichText value={block.body} className="text-body-l text-fg-secondary" />
      </div>
    </BlockShell>
  )
}
