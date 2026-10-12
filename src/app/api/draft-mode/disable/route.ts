import { draftMode } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

/** Sai da pré-visualização e volta para a mesma página, já com o conteúdo publicado. */
export async function GET(request: NextRequest) {
  ;(await draftMode()).disable()
  // Só páginas do próprio site. Comparar a origem já resolvida (e não o texto) barra truques
  // como "/\outro-site.com" ou caracteres invisíveis, que o navegador transforma em outro domínio.
  let target = new URL('/', request.url)
  try {
    const requested = new URL(request.nextUrl.searchParams.get('to') ?? '/', request.url)
    if (requested.origin === request.nextUrl.origin) target = requested
  } catch {
    // Endereço inválido: volta para o início.
  }
  // Redireciona para o endereço completo já conferido (reinterpretar só o caminho reabriria o truque com "//").
  return NextResponse.redirect(target)
}
