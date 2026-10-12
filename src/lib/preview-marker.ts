/**
 * Na pré-visualização do painel, cada texto vem com uma marcação invisível no fim
 * (é ela que faz o "clique para editar"). Fora da pré-visualização não existe.
 * Mesmo conjunto de caracteres do @vercel/stega, usado pelo Sanity.
 */
const PREVIEW_MARKER = /[\u{200b}\u{200c}\u{200d}\u{2060}-\u{2063}\u{feff}\u{1d173}-\u{1d17a}]{4,}$/u

/** Separa o texto visível da marcação invisível do fim. */
export function splitPreviewMarker(text: string): { visible: string; marker: string } {
  const match = PREVIEW_MARKER.exec(text)
  return match ? { visible: text.slice(0, match.index), marker: match[0] } : { visible: text, marker: '' }
}

/** O texto tem algo visível? (ignora espaços e a marcação). */
export function hasVisibleText(text: string | null | undefined): text is string {
  return Boolean(text && splitPreviewMarker(text).visible.trim())
}
