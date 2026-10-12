import { cn } from '@/lib/cn'
import type { BlockOf } from './types'

const HEIGHT = { sm: 'h-48', md: 'h-96', lg: 'h-144' } as const

/** Espaço vazio entre blocos, com linha fina opcional no meio. */
export function SpacerBlock({ block }: { block: BlockOf<'spacerBlock'> }) {
  const height = HEIGHT[(block.size ?? 'md') as keyof typeof HEIGHT] ?? HEIGHT.md
  return (
    <div aria-hidden className={cn('container-site flex items-center', height)}>
      {block.divider && <div className="h-px w-full bg-hairline" />}
    </div>
  )
}
