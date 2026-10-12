import { SearchIcon } from '@sanity/icons/Search'
import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO e compartilhamento',
  type: 'object',
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  description: 'Como a página aparece no Google e quando o link é compartilhado. Se ficar vazio, usamos o título, o texto e a imagem da própria página.',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Títulos com mais de 60 caracteres aparecem cortados no Google.'),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Descrições com mais de 160 caracteres aparecem cortadas no Google.'),
    }),
    defineField({
      name: 'image',
      title: 'Imagem de compartilhamento',
      type: 'image',
      description: '1200 × 630 px. Aparece no WhatsApp, LinkedIn etc.',
    }),
  ],
})
