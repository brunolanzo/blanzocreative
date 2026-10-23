import { UserIcon } from '@sanity/icons/User'
import { defineField, defineType } from 'sanity'

export const credit = defineType({
  name: 'credit',
  title: 'Crédito',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'role',
      title: 'Função',
      type: 'string',
      description: 'Ex.: Creative direction, 3D animation, Photography.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link (opcional)',
      type: 'url',
      description: 'Portfólio, Instagram ou LinkedIn da pessoa.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
})
