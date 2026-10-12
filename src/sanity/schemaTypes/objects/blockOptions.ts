import { ControlsIcon } from '@sanity/icons/Controls'
import { defineField, defineType } from 'sanity'
import { BACKGROUNDS, BLOCK_WIDTHS, SPACINGS } from '../shared/options'

/** Opções comuns a todos os blocos do construtor de página. */
export const blockOptions = defineType({
  name: 'blockOptions',
  title: 'Opções do bloco',
  type: 'object',
  icon: ControlsIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'width',
      title: 'Largura',
      type: 'string',
      initialValue: 'content',
      options: { list: [...BLOCK_WIDTHS], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'spaceTop',
      title: 'Espaço acima',
      type: 'string',
      initialValue: 'md',
      options: { list: [...SPACINGS], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'spaceBottom',
      title: 'Espaço abaixo',
      type: 'string',
      initialValue: 'md',
      options: { list: [...SPACINGS], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'background',
      title: 'Cor de fundo',
      type: 'string',
      initialValue: 'page',
      options: { list: [...BACKGROUNDS], layout: 'radio' },
    }),
    defineField({
      name: 'caption',
      title: 'Legenda (opcional)',
      type: 'string',
      description: 'Texto pequeno que aparece logo abaixo do bloco.',
    }),
  ],
})
