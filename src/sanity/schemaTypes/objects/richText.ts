import { LinkIcon } from '@sanity/icons/Link'
import { defineArrayMember, defineField, defineType } from 'sanity'

/** Texto formatado simples: parágrafos, subtítulo, listas, negrito, itálico e links. */
export const richText = defineType({
  name: 'richText',
  title: 'Texto formatado',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Parágrafo', value: 'normal' },
        { title: 'Subtítulo', value: 'h3' },
      ],
      lists: [
        { title: 'Lista', value: 'bullet' },
        { title: 'Lista numerada', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Negrito', value: 'strong' },
          { title: 'Itálico', value: 'em' },
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',
            icon: LinkIcon,
            fields: [
              defineField({
                name: 'href',
                title: 'Endereço',
                type: 'url',
                description: 'Link completo (https://…), e-mail (mailto:…) ou página do site (/trabalhos).',
                validation: (rule) =>
                  rule.required().uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
              }),
            ],
          }),
        ],
      },
    }),
  ],
})
