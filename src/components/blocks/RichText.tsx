import { AppLink } from '@/components/navigation/AppLink'
import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity'
import { cn } from '@/lib/cn'
import type { RichText as RichTextValue } from '@/sanity/sanity.types'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3: ({ children }) => <h3 className="mt-8 text-h3 font-medium text-fg lowercase">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-24 marker:text-fg-muted">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-24 marker:text-fg-secondary">{children}</ol>,
  },
  listItem: ({ children }) => <li className="pl-4">{children}</li>,
  marks: {
    strong: ({ children }) => <strong className="font-medium text-fg">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? ''
      if (href.startsWith('/')) {
        return (
          <AppLink href={href} className="link">
            {children}
          </AppLink>
        )
      }
      const external = /^https?:/.test(href)
      return (
        <a href={href} className="link" {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {children}
        </a>
      )
    },
  },
}

/** Texto formatado do painel (parágrafos, subtítulos, listas e links), no estilo de texto corrido do DS. */
export function RichText({ value, className }: { value: RichTextValue | null | undefined; className?: string }) {
  if (!value?.length) return null
  return (
    <div className={cn('flex flex-col gap-16', className)}>
      {/* O tipo gerado deixa "children" opcional; o Sanity sempre grava os filhos do bloco. */}
      <PortableText value={value as PortableTextBlock[]} components={components} />
    </div>
  )
}
