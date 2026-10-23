import { MediaView } from '@/components/media/MediaView'
import { Button } from '@/components/ui/Button'
import { Display } from '@/components/ui/Display'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Tag } from '@/components/ui/Tag'
import type { MediaData } from '@/lib/media'
import { Reveal } from '@/components/motion/Reveal'

type AboutSummaryProps = {
  index: string
  label: string
  linkLabel: string
  title: string | null
  text: string | null
  media: MediaData | null
  disciplines: Array<{ _key: string; label: string | null; tag: string | null }>
}

/** Resumo do Sobre na home: mídia à esquerda, título, frases, disciplinas e link (texto na metade direita, ritmo da Buff). */
export function AboutSummary({ index, label, linkLabel, title, text, media, disciplines }: AboutSummaryProps) {
  return (
    <section className="container-site border-t border-hairline py-section">
      <Eyebrow index={index} as="h2" className="mb-48">
        {label}
      </Eyebrow>
      <Reveal className="grid gap-48 md:grid-cols-12 md:gap-x-32">
        {media && (
          <MediaView
            media={media}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5] rounded-md bg-raised md:col-span-5"
          />
        )}
        <div className="flex flex-col justify-end gap-24 md:col-span-6 md:col-start-7">
          {title && (
            <Display as="p" size="m" accent>
              {title}
            </Display>
          )}
          {text && <p className="max-w-prose text-body-l text-fg-secondary">{text}</p>}
          {disciplines.length > 0 && (
            <ul className="flex flex-wrap gap-8">
              {disciplines.map(
                (item) =>
                  item.label && (
                    <li key={item._key}>
                      <Tag size="sm" href={item.tag ? `/work?tag=${item.tag}` : undefined}>
                        {item.label}
                      </Tag>
                    </li>
                  ),
              )}
            </ul>
          )}
          <div>
            <Button href="/about" variant="ghost" className="-ml-[26px]">
              {linkLabel} →
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
