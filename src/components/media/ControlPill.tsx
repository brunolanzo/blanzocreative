import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'

type ControlPillProps = ComponentPropsWithoutRef<'button'> & {
  /** Controle ligado (ex.: som ativo): o texto acende em branco. */
  active?: boolean
  /** Por cima do vídeo, posicionado pelo pai (ex.: right-16 bottom-16). */
  overlay?: boolean
}

/**
 * Controle sobre vídeo do DS (VideoFrame): pílula de texto com contorno branco a 40% sobre desfoque.
 * Versão discreta: pequena e em cinza, acende em branco quando ligada. A área de toque é maior
 * que o desenho (40px de altura). Sem ícones: a marca usa rótulos.
 */
export function ControlPill({ active = false, overlay = false, className, children, ...props }: ControlPillProps) {
  return (
    <button
      type="button"
      className={cn(
        'glass-control inline-flex min-h-24 items-center rounded-pill px-12 text-label-s font-medium uppercase',
        overlay ? 'absolute' : 'relative',
        "before:absolute before:-inset-8 before:content-['']",
        'transition-colors duration-220 ease-out hover:text-flash-500',
        active ? 'text-paper' : 'text-fg-secondary',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
