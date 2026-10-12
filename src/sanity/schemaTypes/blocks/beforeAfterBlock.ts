import { TransferIcon } from '@sanity/icons/Transfer'
import { defineField, defineType } from 'sanity'

const ORIENTATIONS = [
  { title: 'Horizontal (divisor arrasta para os lados)', value: 'horizontal' },
  { title: 'Vertical (divisor arrasta para cima e para baixo)', value: 'vertical' },
]

export const beforeAfterBlock = defineType({
  name: 'beforeAfterBlock',
  title: 'Antes e depois',
  type: 'object',
  icon: TransferIcon,
  description: 'Duas imagens do mesmo tamanho, com um divisor que a pessoa arrasta (mouse, toque ou teclado).',
  fields: [
    defineField({
      name: 'before',
      title: 'Imagem "antes"',
      type: 'accessibleImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'after',
      title: 'Imagem "depois"',
      type: 'accessibleImage',
      description: 'Use a mesma proporção da imagem "antes".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'labelBefore',
      title: 'Rótulo "antes"',
      type: 'string',
      description: 'Se ficar vazio, usamos o texto padrão (Textos da interface).',
    }),
    defineField({ name: 'labelAfter', title: 'Rótulo "depois"', type: 'string' }),
    defineField({
      name: 'start',
      title: 'Posição inicial do divisor (%)',
      type: 'number',
      initialValue: 50,
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: 'orientation',
      title: 'Orientação',
      type: 'string',
      initialValue: 'horizontal',
      options: { list: ORIENTATIONS, layout: 'radio' },
    }),
    defineField({ name: 'options', title: 'Opções do bloco', type: 'blockOptions' }),
  ],
  preview: {
    select: { media: 'after', orientation: 'orientation' },
    prepare({ media, orientation }) {
      return {
        title: 'Antes e depois',
        subtitle: orientation === 'vertical' ? 'Vertical' : 'Horizontal',
        media,
      }
    },
  },
})
