import { SplitVerticalIcon } from '@sanity/icons/SplitVertical'
import { defineField, defineType } from 'sanity'
import { titleOf } from '../shared/options'
import { videoMedia } from '../shared/preview'

const RATIOS = [
  { title: '50 / 50', value: '50-50' },
  { title: '60 / 40', value: '60-40' },
  { title: '40 / 60', value: '40-60' },
]

export const splitBlock = defineType({
  name: 'splitBlock',
  title: 'Lado a lado',
  type: 'object',
  icon: SplitVerticalIcon,
  description: 'Duas mídias lado a lado (imagem, GIF ou vídeo). No celular, uma embaixo da outra.',
  fields: [
    defineField({
      name: 'ratio',
      title: 'Divisão',
      type: 'string',
      initialValue: '50-50',
      options: { list: RATIOS, layout: 'radio', direction: 'horizontal' },
    }),
    defineField({ name: 'left', title: 'Mídia da esquerda', type: 'media', validation: (rule) => rule.required() }),
    defineField({ name: 'right', title: 'Mídia da direita', type: 'media', validation: (rule) => rule.required() }),
    defineField({ name: 'options', title: 'Opções do bloco', type: 'blockOptions' }),
  ],
  preview: {
    select: {
      ratio: 'ratio',
      image: 'left.image',
      poster: 'left.video.poster',
      playbackId: 'left.video.mux.asset.playbackId',
    },
    prepare({ ratio, image, poster, playbackId }) {
      return {
        title: `Lado a lado · ${titleOf(RATIOS, ratio ?? '50-50')}`,
        media: image ?? videoMedia({ poster, playbackId }) ?? SplitVerticalIcon,
      }
    },
  },
})
