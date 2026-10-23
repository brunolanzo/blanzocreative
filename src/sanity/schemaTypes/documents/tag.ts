import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { TagIcon } from '@sanity/icons/Tag'
import { defineField, defineType } from 'sanity'

export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  description: 'Disciplinas que filtram os trabalhos. Tags sem projeto publicado não aparecem no site.',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      description: 'Como aparece no botão do filtro. Ex.: Motion design.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Endereço (slug)',
      type: 'slug',
      description: 'Vai no link filtrado: /work?tag=este-texto. Curto e sem acento (ex.: ai, motion-design).',
      options: { source: 'name', maxLength: 40 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição curta (opcional)',
      type: 'text',
      rows: 2,
      description: 'Uma frase que aparece quando a tag está ativa.',
      validation: (rule) => rule.max(160).warning('Prefira até 160 caracteres.'),
    }),
    orderRankField({ type: 'tag' }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: 'name', subtitle: 'description' },
  },
})
