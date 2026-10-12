import { UsersIcon } from '@sanity/icons/Users'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const creditsBlock = defineType({
  name: 'creditsBlock',
  title: 'Créditos',
  type: 'object',
  icon: UsersIcon,
  description: 'Ficha técnica em qualquer ponto da página (além dos créditos padrão do projeto).',
  fields: [
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
      description: 'Se ficar vazio, usamos "Créditos".',
    }),
    defineField({
      name: 'credits',
      title: 'Créditos',
      type: 'array',
      of: [defineArrayMember({ type: 'credit' })],
      validation: (rule) => rule.min(1),
    }),
    defineField({ name: 'options', title: 'Opções do bloco', type: 'blockOptions' }),
  ],
  preview: {
    select: { heading: 'heading', credits: 'credits' },
    prepare({ heading, credits }) {
      const count = Array.isArray(credits) ? credits.length : 0
      return {
        title: heading || 'Créditos',
        subtitle: `${count} ${count === 1 ? 'nome' : 'nomes'}`,
        media: UsersIcon,
      }
    },
  },
})
