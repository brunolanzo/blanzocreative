import { cache } from 'react'
import { resolveUiStrings } from '@/lib/ui-strings'
import type { SETTINGS_QUERY_RESULT } from '../sanity.types'
import { sanityFetch } from './fetch'
import { SETTINGS_QUERY } from './queries'

export type SiteSettings = NonNullable<SETTINGS_QUERY_RESULT>
export type SiteLogoData = SiteSettings['logo']
export type SocialLink = { label: string; href: string }

function socialLinks(settings: SETTINGS_QUERY_RESULT): SocialLink[] {
  const networks: Array<[string, string | null | undefined]> = [
    ['LinkedIn', settings?.linkedin],
    ['Instagram', settings?.instagram],
    ['Vimeo', settings?.vimeo],
    ['Behance', settings?.behance],
  ]
  return networks.flatMap(([label, href]) => (href ? [{ label, href }] : []))
}

/** Configurações do site (uma busca por página, com cache por tag "siteSettings"). */
export const getSettings = cache(async () => {
  const settings = await sanityFetch({ query: SETTINGS_QUERY, tags: ['siteSettings'] })
  return {
    settings,
    siteName: settings?.siteName ?? '',
    ui: resolveUiStrings(settings?.ui),
    socials: socialLinks(settings),
    whatsappUrl: settings?.whatsapp ? `https://wa.me/${settings.whatsapp}` : null,
  }
})

export type ResolvedSettings = Awaited<ReturnType<typeof getSettings>>
