import { TextIcon } from '@sanity/icons/Text'
import { defineField, defineType } from 'sanity'

type Span = { text?: string }
type Block = { children?: Span[] }

function firstText(body: unknown): string {
  if (!Array.isArray(body)) return ''
  const block = (body as Block[]).find((item) => item.children?.length)
  return block?.children?.map((child) => child.text ?? '').join('') ?? ''
}

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Texto',
  type: 'object',
  icon: TextIcon,
  initialValue: { options: { width: 'narrow', spaceTop: 'md', spaceBottom: 'md', background: 'page' } },
  fields: [
    defineField({ name: 'heading', title: 'Título da seção', type: 'string' }),
    defineField({ name: 'body', title: 'Texto', type: 'richText' }),
    defineField({
      name: 'align',
      title: 'Alinhamento',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          { title: 'Esquerda', value: 'left' },
          { title: 'Centro', value: 'center' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({ name: 'options', title: 'Opções do bloco', type: 'blockOptions' }),
  ],
  preview: {
    select: { heading: 'heading', body: 'body' },
    prepare({ heading, body }) {
      return { title: heading || firstText(body) || 'Texto', subtitle: 'Texto', media: TextIcon }
    },
  },
})
