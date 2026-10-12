function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Variável de ambiente ausente: ${name}. Copie .env.example para .env.local e preencha (veja o README).`,
    )
  }
  return value
}

export const projectId = required(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 'NEXT_PUBLIC_SANITY_PROJECT_ID')
export const dataset = required(process.env.NEXT_PUBLIC_SANITY_DATASET, 'NEXT_PUBLIC_SANITY_DATASET')

/** Versão da API do Sanity (data fixa para o comportamento não mudar sozinho). */
export const apiVersion = '2026-10-01'

/** Rota do painel dentro do site. */
export const studioPath = '/admin'
