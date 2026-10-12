import { RemoveIcon } from '@sanity/icons/Remove'
import { defineField, defineType } from 'sanity'
import { SPACINGS, titleOf } from '../shared/options'

/** Único bloco sem as "Opções do bloco": o tamanho e a linha já são as opções dele. */
export const spacerBlock = defineType({
  name: 'spacerBlock',
  title: 'Espaçador / divisor',
  type: 'object',
  icon: RemoveIcon,
  fields: [
    defineField({
      name: 'size',
      title: 'Tamanho do espaço',
      type: 'string',
      initialValue: 'md',
      options: { list: [...SPACINGS], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'divider',
      title: 'Mostrar linha divisória',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { size: 'size', divider: 'divider' },
    prepare({ size, divider }) {
      return {
        title: divider ? 'Divisor' : 'Espaçador',
        subtitle: titleOf(SPACINGS, size ?? 'md'),
        media: RemoveIcon,
      }
    },
  },
})
