import type { Metadata } from 'next'
import { stegaClean } from 'next-sanity'
import { cache } from 'react'
import { ContactForm } from '@/components/contact/ContactForm'
import { CopyEmail } from '@/components/layout/CopyEmail'
import { Display } from '@/components/ui/Display'
import { sanityFetch } from '@/sanity/lib/fetch'
import { CONTACT_QUERY } from '@/sanity/lib/queries'
import { getSettings } from '@/sanity/lib/settings'

const getContact = cache(() => sanityFetch({ query: CONTACT_QUERY, tags: ['contactPage', 'tag'] }))

/** Sem a chave do Web3Forms (variável de ambiente), o formulário não aparece. */
const FORM_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

/** "5511900000000" → "+55 11 90000-0000" (outros formatos ficam só com o +). */
function formatPhone(digits: string): string {
  const match = digits.match(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/)
  return match ? `+${match[1]} ${match[2]} ${match[3]}-${match[4]}` : `+${digits}`
}

export async function generateMetadata(): Promise<Metadata> {
  const [{ page }, { ui }] = await Promise.all([getContact(), getSettings()])
  return {
    title: stegaClean(page?.seo?.title) || ui.navContact,
    description: stegaClean(page?.seo?.description || page?.intro || '').slice(0, 160) || undefined,
    alternates: { canonical: '/contato' },
  }
}

/**
 * Página Contato (tela "contact" do DS): título e introdução, e-mail com botão de copiar,
 * WhatsApp e redes (cada um liga/desliga em Página Contato) e o formulário ao lado.
 * Os dados ficam em Configurações do site → Contato e redes.
 */
export default async function ContactPage() {
  const [{ page, projectTypes }, { settings, siteName, ui, whatsappUrl }] = await Promise.all([
    getContact(),
    getSettings(),
  ])
  const show = page?.show
  const email = show?.email !== false ? settings?.email : null
  const whatsapp = show?.whatsapp !== false && whatsappUrl && settings?.whatsapp ? settings.whatsapp : null
  const networks = (
    [
      ['LinkedIn', settings?.linkedin, show?.linkedin],
      ['Instagram', settings?.instagram, show?.instagram],
      ['Vimeo', settings?.vimeo, show?.vimeo],
      ['Behance', settings?.behance, show?.behance],
    ] as const
  ).flatMap(([label, href, visible]) => (href && visible !== false ? [{ label, href }] : []))
  const label = 'text-label-s font-medium text-fg-secondary uppercase'

  return (
    <section className="container-site pt-[calc(var(--section-y)+var(--space-9))] pb-section">
      <div className="grid gap-64 md:grid-cols-12 md:gap-x-32">
        <div className="flex flex-col gap-48 md:col-span-6">
          <div className="flex flex-col gap-24">
            <Display as="h1" size="l" accent>
              {page?.title || ui.navContact}
            </Display>
            {page?.intro && <p className="max-w-prose text-body-l text-fg-secondary">{page.intro}</p>}
          </div>

          <dl className="flex flex-col gap-32">
            {email && (
              <div className="flex flex-col gap-8">
                <dt className={label}>{ui.formEmail}</dt>
                <dd>
                  <CopyEmail email={email} copyLabel={ui.copyEmail} copiedLabel={ui.copied} className="text-h3" />
                </dd>
              </div>
            )}
            {whatsapp && whatsappUrl && (
              <div className="flex flex-col gap-8">
                <dt className={label}>{ui.whatsapp}</dt>
                <dd>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="link text-h3">
                    {formatPhone(whatsapp)}
                  </a>
                </dd>
              </div>
            )}
            {networks.length > 0 && (
              <div className="flex flex-col gap-8">
                <dt className={label}>{ui.socialNetworks}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-24 gap-y-8">
                    {networks.map((network) => (
                      <li key={network.label}>
                        <a
                          href={network.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-body-l text-fg-secondary transition-colors duration-220 ease-out hover:text-flash-500"
                        >
                          {network.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </div>

        {FORM_KEY && (
          <div className="flex flex-col gap-24 md:col-span-5 md:col-start-8">
            {page?.formIntro && <p className="text-body text-fg-secondary">{page.formIntro}</p>}
            <ContactForm
              accessKey={FORM_KEY}
              successMessage={page?.formSuccess || ui.formThanks}
              projectTypes={projectTypes}
              siteName={siteName}
              ui={ui}
            />
          </div>
        )}
      </div>
    </section>
  )
}
