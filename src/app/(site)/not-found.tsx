import { Button } from '@/components/ui/Button'
import { Display } from '@/components/ui/Display'
import { getSettings } from '@/sanity/lib/settings'

/** Página 404 dentro do layout do site (header e rodapé). */
export default async function NotFound() {
  const { ui } = await getSettings()
  return (
    <section className="container-site flex min-h-[70svh] flex-col items-start justify-end gap-32 pt-144 pb-section">
      <p className="text-label font-medium text-accent uppercase">404</p>
      <Display size="l" accent>
        {ui.notFoundTitle}
      </Display>
      <Button href="/" variant="outline">
        {ui.notFoundLink}
      </Button>
    </section>
  )
}
