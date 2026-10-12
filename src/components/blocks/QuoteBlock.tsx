import { BlockShell } from './BlockShell'
import type { BlockOf } from './types'

/** Citação de cliente: frase grande e, embaixo, quem disse (rótulo em maiúsculas) e o cargo. */
export function QuoteBlock({ block }: { block: BlockOf<'quoteBlock'> }) {
  if (!block.quote) return null
  return (
    <BlockShell options={block.options}>
      <figure className="flex flex-col gap-24">
        <blockquote className="max-w-[28ch] text-h1 font-medium text-fg">“{block.quote}”</blockquote>
        {(block.author || block.role) && (
          <figcaption className="flex flex-col gap-4">
            {block.author && <span className="text-label font-medium text-fg uppercase">{block.author}</span>}
            {block.role && <span className="text-body-s text-fg-secondary">{block.role}</span>}
          </figcaption>
        )}
      </figure>
    </BlockShell>
  )
}
