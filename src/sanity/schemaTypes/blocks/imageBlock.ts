import { ImageIcon } from '@sanity/icons/Image'
import { defineField, defineType } from 'sanity'
import { BLOCK_WIDTHS, titleOf } from '../shared/options'
import { type ImageLike, imageQuality, MIN_WIDTH_BY_BLOCK_WIDTH } from '../shared/validation'

type Parent = { options?: { width?: string } }

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Imagem',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Imagem ou GIF',
      type: 'accessibleImage',
      description: 'Ponta a ponta: pelo menos 2400px de largura. Largura do conteúdo: 1800px. Estreita: 1200px.',
      validation: (rule) => [
        rule.required(),
        rule
          .custom((value, context) => {
            const width = (context.parent as Parent | undefined)?.options?.width ?? 'content'
            return imageQuality(MIN_WIDTH_BY_BLOCK_WIDTH[width] ?? 1800)(value as ImageLike, context)
          })
          .warning(),
      ],
    }),
    defineField({ name: 'options', title: 'Opções do bloco', type: 'blockOptions' }),
  ],
  preview: {
    select: { media: 'image', alt: 'image.alt', width: 'options.width' },
    prepare({ media, alt, width }) {
      return { title: `Imagem · ${titleOf(BLOCK_WIDTHS, width ?? 'content')}`, subtitle: alt, media }
    },
  },
})
