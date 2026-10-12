/**
 * Lembra de qual lista (e com qual filtro) a pessoa abriu um projeto, para o
 * "Voltar para os trabalhos" da página do projeto levar de volta ao mesmo lugar.
 */
const KEY = 'blanzo:last-list'

export function rememberList(tag: string | null) {
  try {
    sessionStorage.setItem(KEY, tag ? `/trabalhos?tag=${encodeURIComponent(tag)}` : '/trabalhos')
  } catch {
    // Sem sessionStorage (modo privado restrito): o botão volta para /trabalhos.
  }
}

export function lastListUrl(): string {
  try {
    return sessionStorage.getItem(KEY) ?? '/trabalhos'
  } catch {
    return '/trabalhos'
  }
}
