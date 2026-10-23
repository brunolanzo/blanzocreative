/**
 * Lembra de qual lista (e com qual filtro) a pessoa abriu um projeto, para o
 * "Voltar para os trabalhos" da página do projeto levar de volta ao mesmo lugar.
 */
const KEY = 'blanzo:last-list'

export function rememberList(tag: string | null) {
  try {
    sessionStorage.setItem(KEY, tag ? `/work?tag=${encodeURIComponent(tag)}` : '/work')
  } catch {
    // Sem sessionStorage (modo privado restrito): o botão volta para /work.
  }
}

export function lastListUrl(): string {
  try {
    return sessionStorage.getItem(KEY) ?? '/work'
  } catch {
    return '/work'
  }
}
