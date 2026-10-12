import { ImagesIcon } from '@sanity/icons/Images'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { videoMedia } from '../shared/preview'

const HEIGHTS = [
  { title: 'Baixa', value: 'sm' },
  { title: 'Média', value: 'md' },
  { title: 'Alta', value: 'lg' },
]

export const galleryBlock = defineType({
  name: 'galleryBlock',
  title: 'Galeria / carrossel',
  type: 'object',
  icon: ImagesIcon,
  description: 'Sequência horizontal que a pessoa arrasta (ou usa as setas do teclado).',
  fields: [
    defineField({
      name: 'items',
      title: 'Itens',
      type: 'array',
      of: [defineArrayMember({ type: 'media' })],
      validation: (rule) => rule.min(2).error('Coloque pelo menos 2 itens na galeria.'),
    }),
    defineField({
      name: 'height',
      title: 'Altura',
      type: 'string',
      initialValue: 'md',
      options: { list: HEIGHTS, layout: 'radio', direction: 'horizontal' },
    }),
    defineField({ name: 'options', title: 'Opções do bloco', type: 'blockOptions' }),
  ],
  preview: {
    select: {
      items: 'items',
      image: 'items.0.image',
      poster: 'items.0.video.poster',
      playbackId: 'items.0.video.mux.asset.playbackId',
    },
    prepare({ items, image, poster, playbackId }) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: 'Galeria / carrossel',
        subtitle: `${count} ${count === 1 ? 'item' : 'itens'}`,
        media: image ?? videoMedia({ poster, playbackId }) ?? ImagesIcon,
      }
    },
  },
})
