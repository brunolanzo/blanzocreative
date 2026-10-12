import { Eyebrow } from '@/components/ui/Eyebrow'
import { BlockShell } from './BlockShell'
import { CreditList } from './CreditList'
import type { BlockOf, BlockUi } from './types'

/** Ficha técnica no meio da página (além dos créditos do projeto, no fim). */
export function CreditsBlock({ block, ui }: { block: BlockOf<'creditsBlock'>; ui: BlockUi }) {
  if (!block.credits?.length) return null
  return (
    <BlockShell options={block.options}>
      <div className="grid gap-24 md:grid-cols-12 md:gap-x-32">
        <Eyebrow as="h2" className="self-start md:col-span-4 md:pt-16">
          {block.heading || ui.credits}
        </Eyebrow>
        <div className="md:col-span-8">
          <CreditList credits={block.credits} />
        </div>
      </div>
    </BlockShell>
  )
}
