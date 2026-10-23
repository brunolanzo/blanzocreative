import { BlockquoteIcon } from '@sanity/icons/Blockquote'
import { defineField, defineType } from 'sanity'

export const quoteBlock = defineType({
  name: 'quoteBlock',
  title: 'Citação',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Frase',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'author', title: 'Autor', type: 'string' }),
    defineField({ name: 'role', title: 'Cargo e empresa', type: 'string', description: 'Ex.: Head of Marketing, Ondina Bebidas.' }),
    defineField({ name: 'options', title: 'Opções do bloco', type: 'blockOptions' }),
  ],
  preview: {
    select: { quote: 'quote', author: 'author' },
    prepare({ quote, author }) {
      return { title: quote ? `“${quote}”` : 'Citação', subtitle: author, media: BlockquoteIcon }
    },
  },
})
