'use client'

import { cn } from '@/lib/cn'

export type FilterTag = { _id: string; name: string | null; slug: string | null; description: string | null }

type TagFilterProps = {
  tags: FilterTag[]
  active: string | null
  allLabel: string
  groupLabel: string
  onChange: (slug: string | null) => void
  className?: string
}

const pill =
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-pill border px-16 py-8 text-label-s font-medium uppercase ' +
  'transition-[background-color,color,border-color] duration-220 ease-out'

/**
 * Barra de tags: "Todos" + uma pílula por tag, uma ativa por vez.
 * Visual do DS: a ativa fica vermelho-rosado; as outras, contorno fino.
 * No celular vira uma linha com rolagem lateral; no computador quebra em linhas.
 */
export function TagFilter({ tags, active, allLabel, groupLabel, onChange, className }: TagFilterProps) {
  const items = [{ slug: null, label: allLabel }, ...tags.map((tag) => ({ slug: tag.slug, label: tag.name ?? '' }))]
  const description = tags.find((tag) => tag.slug === active)?.description

  return (
    <div className={className}>
      <div
        role="group"
        aria-label={groupLabel}
        className="-mx-gutter flex gap-8 overflow-x-auto px-gutter pb-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const selected = item.slug === active
          return (
            <button
              key={item.slug ?? 'todos'}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(item.slug)}
              className={cn(
                pill,
                selected
                  ? 'border-flash-500 bg-flash-500 text-paper'
                  : 'border-strong text-fg hover:border-paper hover:text-flash-500',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <p aria-live="polite" className="mt-16 min-h-[1.5em] max-w-prose text-body text-fg-secondary">
        {description ?? ''}
      </p>
    </div>
  )
}
