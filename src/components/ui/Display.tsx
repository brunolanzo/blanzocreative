import { Fragment, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { splitPreviewMarker } from '@/lib/preview-marker'

const SIZES = {
  xl: 'text-display-xl',
  l: 'text-display-l',
  m: 'text-display-m',
} as const

type DisplayProps = {
  children: ReactNode
  size?: keyof typeof SIZES
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  /** Ponto final vermelho-rosado: o único floreio de pontuação da marca. */
  accent?: boolean
  /** Palavras entram em sequência ao abrir a página (padrão da Buff). Ligado nos títulos de página (h1). */
  animate?: boolean
  className?: string
}

/** Intervalo entre palavras (--stagger do DS). */
const WORD_STAGGER_MS = 80

/** Título grande do DS: sempre em minúsculas, entrelinha 0.92, tracking −0.04em. */
export function Display({ children, size = 'l', as: Tag = 'h1', accent = false, animate, className }: DisplayProps) {
  const classes = cn('font-medium lowercase', SIZES[size], className)
  const words = (animate ?? Tag === 'h1') && typeof children === 'string' ? splitWords(children, accent) : null
  if (words) {
    return (
      <Tag className={classes}>
        {words.map((word, index) => (
          <Fragment key={index}>
            {index > 0 && ' '}
            <span data-word className="inline-block" style={{ animationDelay: `${index * WORD_STAGGER_MS}ms` }}>
              {word}
              {accent && index === words.length - 1 && <span className="text-accent">.</span>}
            </span>
          </Fragment>
        ))}
      </Tag>
    )
  }

  let text = children
  if (accent && typeof children === 'string') {
    // Tira o ponto final digitado (o ponto da marca entra depois), mantendo a marcação da pré-visualização.
    const { visible, marker } = splitPreviewMarker(children)
    text = visible.replace(/[.\s]+$/, '') + marker
  }
  return (
    <Tag className={classes}>
      {text}
      {accent && <span className="text-accent">.</span>}
    </Tag>
  )
}

/**
 * Palavras do título, sem o ponto final digitado (o da marca entra depois).
 * Na pré-visualização do painel o texto não é dividido: a marcação do "clique para editar"
 * precisa do texto inteiro num lugar só.
 */
function splitWords(text: string, accent: boolean): string[] | null {
  const { visible, marker } = splitPreviewMarker(text)
  if (marker) return null
  const clean = accent ? visible.replace(/[.\s]+$/, '') : visible
  const words = clean.split(/\s+/).filter(Boolean)
  return words.length > 0 ? words : null
}
