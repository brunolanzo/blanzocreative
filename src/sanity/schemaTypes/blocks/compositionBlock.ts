import { DashboardIcon } from '@sanity/icons/Dashboard'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { videoMedia } from '../shared/preview'

const OFFSETS = [
  { title: 'Nenhum', value: 'none' },
  { title: 'Pequeno', value: 'sm' },
  { title: 'Médio', value: 'md' },
  { title: 'Grande', value: 'lg' },
]

type ItemValue = { colStart?: number; colSpan?: number }

export const compositionItem = defineType({
  name: 'compositionItem',
  title: 'Mídia posicionada',
  type: 'object',
  icon: DashboardIcon,
  fields: [
    defineField({ name: 'media', title: 'Mídia', type: 'media', validation: (rule) => rule.required() }),
    defineField({
      name: 'colStart',
      title: 'Começa na coluna',
      type: 'number',
      initialValue: 1,
      description: 'O grid tem 12 colunas. 1 = encostado na esquerda.',
      validation: (rule) => rule.required().integer().min(1).max(12),
    }),
    defineField({
      name: 'colSpan',
      title: 'Largura (em colunas)',
      type: 'number',
      initialValue: 6,
      description: '12 = largura toda; 6 = metade; 4 = um terço.',
      validation: (rule) => rule.required().integer().min(1).max(12),
    }),
    defineField({
      name: 'offset',
      title: 'Deslocamento para baixo',
      type: 'string',
      initialValue: 'none',
      options: { list: OFFSETS, layout: 'radio', direction: 'horizontal' },
    }),
  ],
  validation: (rule) =>
    rule.custom((value: ItemValue | undefined) => {
      if (!value?.colStart || !value?.colSpan) return true
      const end = value.colStart + value.colSpan - 1
      return end <= 12 ? true : `Passa da coluna 12 (vai até a ${end}). Diminua a largura ou comece numa coluna antes.`
    }),
  preview: {
    select: {
      colStart: 'colStart',
      colSpan: 'colSpan',
      image: 'media.image',
      poster: 'media.video.poster',
      playbackId: 'media.video.mux.asset.playbackId',
    },
    prepare({ colStart, colSpan, image, poster, playbackId }) {
      return {
        title: `Coluna ${colStart ?? 1} · ${colSpan ?? 6} de largura`,
        media: image ?? videoMedia({ poster, playbackId }),
      }
    },
  },
})

export const compositionBlock = defineType({
  name: 'compositionBlock',
  title: 'Composição livre',
  type: 'object',
  icon: DashboardIcon,
  description:
    'Até 6 mídias posicionadas num grid de 12 colunas, para composições editoriais. No celular, elas empilham na ordem da lista.',
  fields: [
    defineField({
      name: 'items',
      title: 'Mídias',
      type: 'array',
      of: [defineArrayMember({ type: 'compositionItem' })],
      validation: (rule) => rule.min(1).max(6),
    }),
    defineField({ name: 'options', title: 'Opções do bloco', type: 'blockOptions' }),
  ],
  preview: {
    select: {
      items: 'items',
      image: 'items.0.media.image',
      poster: 'items.0.media.video.poster',
      playbackId: 'items.0.media.video.mux.asset.playbackId',
    },
    prepare({ items, image, poster, playbackId }) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: 'Composição livre',
        subtitle: `${count} ${count === 1 ? 'mídia' : 'mídias'}`,
        media: image ?? videoMedia({ poster, playbackId }) ?? DashboardIcon,
      }
    },
  },
})
