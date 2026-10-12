import { Display } from '@/components/ui/Display'
import type { UiStrings } from '@/lib/ui-strings'

type ProjectHeaderProps = {
  title: string
  subtitle: string | null
  client: string | null
  agency: string | null
  year: number | null
  role: string | null
  ui: Pick<UiStrings, 'client' | 'agency' | 'year' | 'role'>
}

/**
 * Topo do projeto: título grande (com o ponto da marca) e subtítulo à esquerda; ficha à direita.
 * Campos vazios da ficha somem. No celular, a ficha vira duas colunas curtas.
 */
export function ProjectHeader({ title, subtitle, client, agency, year, role, ui }: ProjectHeaderProps) {
  const facts = [
    [ui.client, client],
    [ui.agency, agency],
    [ui.year, year ? String(year) : null],
    [ui.role, role],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]))

  return (
    <header className="container-site pt-[calc(var(--section-y)+var(--space-9))]">
      <div className="grid gap-48 md:grid-cols-12 md:gap-x-32">
        <div className="flex flex-col gap-24 md:col-span-8">
          <Display as="h1" size="l" accent>
            {title}
          </Display>
          {subtitle && <p className="max-w-prose text-body-l text-fg-secondary">{subtitle}</p>}
        </div>
        {facts.length > 0 && (
          <dl className="grid grid-cols-2 gap-x-24 gap-y-16 self-end md:col-span-4 md:grid-cols-[auto_1fr] md:gap-y-12">
            {facts.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-4 md:contents">
                <dt className="text-label-s font-medium text-fg-secondary uppercase md:pt-4">{label}</dt>
                <dd className="text-body text-fg">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  )
}
