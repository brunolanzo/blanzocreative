import type { Metadata, Viewport } from 'next'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import type { ReactNode } from 'react'
import '@/styles/globals.css'
import { SiteLogo } from '@/components/brand/SiteLogo'
import { INTRO_GATE_SCRIPT } from '@/components/home/intro-gate'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { ExitPreview } from '@/components/layout/ExitPreview'
import { PageTransition } from '@/components/layout/PageTransition'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { manrope } from '@/lib/fonts'
import { SITE_URL } from '@/lib/site-url'
import { pageTitle } from '@/lib/titles'
import { getSettings } from '@/sanity/lib/settings'

export async function generateMetadata(): Promise<Metadata> {
  const { settings, siteName } = await getSettings()
  const title = settings?.seo?.title || siteName
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: pageTitle('%s', siteName) },
    description: settings?.seo?.description ?? undefined,
    icons: {
      icon: settings?.favicon ?? '/brand/favicon.png',
      apple: '/brand/apple-touch-icon.png',
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName,
      images: settings?.seo?.image ? [{ url: settings.seo.image }] : undefined,
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000000', // --ink-1000
  colorScheme: 'dark',
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [data, preview] = await Promise.all([getSettings(), draftMode()])
  const { settings, ui, siteName, socials, whatsappUrl } = data
  const nav = [
    { href: '/trabalhos', label: ui.navWork },
    { href: '/sobre', label: ui.navAbout },
    { href: '/contato', label: ui.navContact },
  ]

  return (
    // suppressHydrationWarning: a intro da home marca o <html> (data-intro) antes da hidratação.
    <html lang="pt-BR" className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* Decide antes da primeira pintura se a intro da home aparece (ver intro-gate.ts). */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_GATE_SCRIPT }} />
      </head>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-16 focus:left-16 focus:z-(--z-cursor) focus:rounded-pill focus:bg-paper focus:px-16 focus:py-8 focus:text-label focus:font-medium focus:text-ink-1000 focus:uppercase"
        >
          {ui.skipToContent}
        </a>
        <SmoothScroll />
        <SiteHeader
          logo={<SiteLogo logo={settings?.logo} siteName={siteName} priority />}
          siteName={siteName}
          nav={nav}
          socials={socials}
          email={settings?.email ?? null}
          whatsappUrl={whatsappUrl}
          ui={ui}
        />
        <main id="conteudo">{children}</main>
        <SiteFooter data={data} />
        <PageTransition logoVideo={settings?.logo?.video ?? null} />
        {settings?.cursor?.enabled && <CustomCursor cursor={settings.cursor} dragLabel={ui.cursorDrag} />}
        {/* Só na pré-visualização do painel: rascunhos, atualização ao vivo e o "clique para editar". */}
        {preview.isEnabled && (
          <>
            <VisualEditing />
            <ExitPreview label={ui.exitPreview} />
          </>
        )}
      </body>
    </html>
  )
}
