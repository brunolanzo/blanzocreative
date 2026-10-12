import { ThLargeIcon } from '@sanity/icons/ThLarge'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { GAPS, titleOf } from '../shared/options'
import { videoMedia } from '../shared/preview'

const LAYOUTS = [
  { title: '2 colunas', value: 'cols-2' },
  { title: '3 colunas', value: 'cols-3' },
  { title: '4 colunas', value: 'cols-4' },
  { title: 'Masonry (alturas livres)', value: 'masonry' },
  { title: 'Destaque + 2 menores', value: 'feature-2' },
  { title: 'Destaque + 4 menores', value: 'feature-4' },
]

const EXPECTED_ITEMS: Record<string, number> = { 'feature-2': 3, 'feature-4': 5 }

type MosaicValue = { layout?: string; items?: unknown[] }

export const mosaicBlock = defineType({
  name: 'mosaicBlock',
  title: 'Mosaico',
  type: 'object',
  icon: ThLargeIcon,
  description: 'Várias imagens, GIFs ou vídeos curtos juntos. No celular, vira uma coluna.',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'cols-3',
      options: { list: LAYOUTS, layout: 'radio' },
    }),
    defineField({
      name: 'gap',
      title: 'Espaço entre os itens',
      type: 'string',
      initialValue: 'md',
      options: { list: [...GAPS], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'items',
      title: 'Itens',
      type: 'array',
      of: [defineArrayMember({ type: 'media' })],
      validation: (rule) => rule.min(2).error('Coloque pelo menos 2 itens no mosaico.'),
    }),
    defineField({ name: 'options', title: 'Opções do bloco', type: 'blockOptions' }),
  ],
  validation: (rule) =>
    rule
      .custom((value: MosaicValue | undefined) => {
        const expected = value?.layout ? EXPECTED_ITEMS[value.layout] : undefined
        const count = value?.items?.length ?? 0
        if (expected && count !== expected) {
          return `O layout "${titleOf(LAYOUTS, value?.layout)}" funciona com ${expected} itens (agora são ${count}).`
        }
        return true
      })
      .warning(),
  preview: {
    select: {
      layout: 'layout',
      items: 'items',
      image: 'items.0.image',
      poster: 'items.0.video.poster',
      playbackId: 'items.0.video.mux.asset.playbackId',
    },
    prepare({ layout, items, image, poster, playbackId }) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: `Mosaico · ${titleOf(LAYOUTS, layout ?? 'cols-3')}`,
        subtitle: `${count} ${count === 1 ? 'item' : 'itens'}`,
        media: image ?? videoMedia({ poster, playbackId }) ?? ThLargeIcon,
      }
    },
  },
})
