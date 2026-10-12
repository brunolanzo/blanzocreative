import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { BlockOptions } from './types'
import { Reveal } from '@/components/motion/Reveal'

export type BlockWidth = 'full' | 'content' | 'narrow'

/** Espaço acima/abaixo (escala do DS): dois blocos no "Médio" ficam a 96px um do outro. */
const SPACE_TOP = { sm: 'pt-24', md: 'pt-48', lg: 'pt-96' } as const
const SPACE_BOTTOM = { sm: 'pb-24', md: 'pb-48', lg: 'pb-96' } as const

/** Fundos permitidos (só tokens do DS). "Branco" liga o tema claro do DS só dentro do bloco. */
const BACKGROUND = { page: '', card: 'bg-card', raised: 'bg-raised', light: 'bg-page text-fg' } as const

/** Largura que a mídia ocupa na tela, para o `sizes` das imagens. */
export const BLOCK_SIZES: Record<BlockWidth, string> = {
  full: '100vw',
  content: '(min-width: 1568px) 1440px, 92vw',
  narrow: '(min-width: 1568px) 960px, (min-width: 768px) 62vw, 92vw',
}

/**
 * Mídia sozinha no bloco cabe na tela: até 85% da altura (ou a tela toda, se for ponta a ponta).
 * Assim um vídeo vertical não vira uma coluna gigante, e um 16:9 ponta a ponta encosta nas bordas.
 */
export function fitToScreen(ratio: number, width: BlockWidth = 'content'): string {
  const height = width === 'full' ? '100svh' : '85svh'
  return `min(100%, calc(${height} * ${ratio.toFixed(4)}))`
}

export function blockWidth(options: BlockOptions): BlockWidth {
  const width = options?.width
  return width === 'full' || width === 'narrow' ? width : 'content'
}

function pick<T extends Record<string, string>>(map: T, value: string | null | undefined, fallback: keyof T): string {
  return value && value in map ? map[value as keyof T] : map[fallback]
}

/**
 * Moldura comum dos blocos: largura (ponta a ponta, conteúdo ou estreita), espaço acima e
 * abaixo, cor de fundo e legenda. Com fundo colorido, o espaço vira respiro dentro da faixa.
 */
export function BlockShell({ options, children }: { options: BlockOptions; children: ReactNode }) {
  const width = blockWidth(options)
  const background = options?.background ?? 'page'
  const caption = options?.caption ? (
    <p className={cn('mt-12 text-body-s text-fg-secondary', width === 'full' && 'container-site')}>{options.caption}</p>
  ) : null

  return (
    // Reveal: o conteúdo do bloco aparece ao rolar; a faixa de fundo fica parada.
    <Reveal
      data-theme={background === 'light' ? 'light' : undefined}
      className={cn(
        pick(BACKGROUND, background, 'page'),
        pick(SPACE_TOP, options?.spaceTop, 'md'),
        pick(SPACE_BOTTOM, options?.spaceBottom, 'md'),
      )}
    >
      {width === 'full' ? (
        <>
          {children}
          {caption}
        </>
      ) : (
        <div className="container-site">
          <div className={cn(width === 'narrow' && 'md:mx-auto md:w-2/3')}>
            {children}
            {caption}
          </div>
        </div>
      )}
    </Reveal>
  )
}
