import Image from 'next/image'
import { AppLink } from '@/components/navigation/AppLink'
import { Button } from '@/components/ui/Button'
import { Display } from '@/components/ui/Display'
import type { ResolvedSettings } from '@/sanity/lib/settings'
import { CopyEmail } from './CopyEmail'
import { HideOnHome } from './HomeGate'
import { Reveal } from '@/components/motion/Reveal'

/** Rodapé do DS: chamada grande + botão, linha fina, redes em texto, monograma e copyright. */
export function SiteFooter({ data }: { data: ResolvedSettings }) {
  const { settings, ui, socials, siteName } = data
  const year = new Date().getFullYear()
  const cta = settings?.ctaHeading
  const hideCtaOnHome = settings?.sections?.contact === false

  return (
    <footer className="border-t border-hairline">
      <div className="container-site flex flex-col gap-48 pt-64 pb-32">
        {cta && (
          <HideOnHome hide={hideCtaOnHome}>
            <Reveal className="flex flex-wrap items-end justify-between gap-32">
              <Display as="p" size="m" accent className="max-w-[16ch]">
                {cta}
              </Display>
              <Button href="/contato" size="lg">
                {ui.startProject}
              </Button>
            </Reveal>
          </HideOnHome>
        )}

        <div className="flex flex-wrap items-center justify-between gap-24 text-body-s text-fg-secondary">
          <div className="flex flex-wrap items-center gap-x-24 gap-y-8">
            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-24">
                {socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="lowercase transition-colors duration-220 ease-out hover:text-flash-500"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {settings?.email && (
              <CopyEmail email={settings.email} copyLabel={ui.copyEmail} copiedLabel={ui.copied} />
            )}
          </div>

          <AppLink
            href="/"
            aria-label={`${siteName}: ${ui.home}`}
            className="opacity-60 transition-opacity duration-220 hover:opacity-100"
          >
            <Image src="/brand/monogram-white.png" width={120} height={128} alt="" className="h-20 w-auto" />
          </AppLink>

          <span>
            © {year} {settings?.copyright ?? siteName}
          </span>
        </div>
      </div>
    </footer>
  )
}
