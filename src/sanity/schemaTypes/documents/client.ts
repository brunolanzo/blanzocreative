import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { CaseIcon } from '@sanity/icons/Case'
import { defineField, defineType } from 'sanity'

export const client = defineType({
  name: 'client',
  title: 'Cliente',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description:
        'SVG ou PNG com fundo transparente, de preferência a versão de uma cor só. Enquanto não houver logo, o site mostra o nome em texto.',
      options: { accept: 'image/svg+xml,image/png' },
    }),
    defineField({
      name: 'logoColor',
      title: 'Cor do logo',
      type: 'string',
      initialValue: 'mono',
      options: {
        list: [
          { title: 'Monocromático (padrão: todos os logos na mesma cor do site)', value: 'mono' },
          { title: 'Cores originais', value: 'original' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'url', title: 'Link (opcional)', type: 'url' }),
    defineField({
      name: 'showOnHome',
      title: 'Mostrar na faixa de clientes da home',
      type: 'boolean',
      initialValue: true,
    }),
    orderRankField({ type: 'client' }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: 'name', media: 'logo', showOnHome: 'showOnHome' },
    prepare({ title, media, showOnHome }) {
      return { title, media: media ?? CaseIcon, subtitle: showOnHome === false ? 'Fora da home' : 'Aparece na home' }
    },
  },
})
