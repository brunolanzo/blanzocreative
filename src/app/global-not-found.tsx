import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Button } from '@/components/ui/Button'
import { Display } from '@/components/ui/Display'
import { manrope } from '@/lib/fonts'
import { getSettings } from '@/sanity/lib/settings'

export const metadata: Metadata = {
  title: '404',
  robots: { index: false },
}

/** 404 para endereços que não existem em lugar nenhum (fora do layout do site e do painel). */
export default async function GlobalNotFound() {
  const { ui } = await getSettings()
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body>
        <main className="container-site flex min-h-svh flex-col items-start justify-end gap-32 py-section">
          <p className="text-label font-medium text-accent uppercase">404</p>
          <Display size="l" accent>
            {ui.notFoundTitle}
          </Display>
          <Button href="/" variant="outline">
            {ui.notFoundLink}
          </Button>
        </main>
      </body>
    </html>
  )
}
