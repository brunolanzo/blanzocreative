/**
 * Endereço público do site (sem barra no fim). Vem de NEXT_PUBLIC_SITE_URL; sem ela, no Netlify,
 * usa o endereço principal do próprio site (variável URL, que o Netlify preenche no build).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || 'http://localhost:3000').replace(
  /\/+$/,
  '',
)

/** Dados estruturados (JSON-LD) prontos para um <script>, sem deixar o texto do painel fechar a tag. */
export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c')
}
