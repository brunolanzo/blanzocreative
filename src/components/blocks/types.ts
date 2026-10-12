import type { UiStrings } from '@/lib/ui-strings'
import type { PROJECT_QUERY_RESULT } from '@/sanity/sanity.types'

export type ProjectData = NonNullable<PROJECT_QUERY_RESULT>
export type PageBlock = NonNullable<ProjectData['body']>[number]
export type BlockOf<Type extends PageBlock['_type']> = Extract<PageBlock, { _type: Type }>

/** Opções comuns a quase todos os blocos (largura, espaços, fundo e legenda). */
export type BlockOptions = BlockOf<'imageBlock'>['options']

/** Textos da interface usados pelos blocos. */
export type BlockUi = Pick<
  UiStrings,
  'soundOn' | 'soundOff' | 'play' | 'before' | 'after' | 'compare' | 'gallery' | 'previous' | 'next' | 'credits'
>
