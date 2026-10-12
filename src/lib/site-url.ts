/** Endereço público do site (sem barra no fim). No Netlify vem de NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/+$/, '')

/** Dados estruturados (JSON-LD) prontos para um <script>, sem deixar o texto do painel fechar a tag. */
export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c')
}
