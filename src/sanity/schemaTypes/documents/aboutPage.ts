import { UserIcon } from '@sanity/icons/User'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Página Sobre',
  type: 'document',
  icon: UserIcon,
  groups: [
    { name: 'content', title: 'Conteúdo', default: true },
    { name: 'career', title: 'Trajetória e prêmios' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título da página',
      type: 'string',
      group: 'content',
      description: 'Aparece grande, em minúsculas, no topo. Ex.: "um generalista, de propósito".',
    }),
    defineField({ name: 'media', title: 'Foto ou vídeo', type: 'media', group: 'content' }),
    defineField({ name: 'bio', title: 'Bio', type: 'richText', group: 'content' }),
    defineField({
      name: 'disciplines',
      title: 'Disciplinas',
      type: 'array',
      group: 'content',
      description: 'Se você ligar uma disciplina a uma tag, ela vira link para os trabalhos daquela tag.',
      of: [
        defineArrayMember({
          name: 'discipline',
          title: 'Disciplina',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Nome', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'tag', title: 'Tag (opcional)', type: 'reference', to: [{ type: 'tag' }] }),
          ],
          preview: { select: { title: 'label', subtitle: 'tag.name' } },
        }),
      ],
    }),
    defineField({
      name: 'timeline',
      title: 'Trajetória',
      type: 'array',
      group: 'career',
      description: 'Da mais recente para a mais antiga. Arraste para reordenar.',
      of: [
        defineArrayMember({
          name: 'role',
          title: 'Experiência',
          type: 'object',
          fields: [
            defineField({ name: 'company', title: 'Empresa', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'position', title: 'Função', type: 'string' }),
            defineField({ name: 'period', title: 'Período', type: 'string', description: 'Ex.: 2021 — 2023, ou 2024 — hoje.' }),
          ],
          preview: {
            select: { company: 'company', position: 'position', period: 'period' },
            prepare({ company, position, period }) {
              return { title: company, subtitle: [position, period].filter(Boolean).join(' · ') }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'clients',
      title: 'Clientes',
      type: 'array',
      group: 'career',
      description: 'Escolha entre os clientes cadastrados, na ordem em que devem aparecer.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'client' }] })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'awards',
      title: 'Prêmios e reconhecimentos (opcional)',
      type: 'array',
      group: 'career',
      of: [
        defineArrayMember({
          name: 'award',
          title: 'Prêmio',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Prêmio', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'organization', title: 'Festival ou instituição', type: 'string' }),
            defineField({ name: 'year', title: 'Ano', type: 'number' }),
            defineField({ name: 'url', title: 'Link (opcional)', type: 'url' }),
          ],
          preview: {
            select: { title: 'title', organization: 'organization', year: 'year' },
            prepare({ title, organization, year }) {
              return { title, subtitle: [organization, year].filter(Boolean).join(' · ') }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'cv',
      title: 'CV em PDF (opcional)',
      type: 'file',
      group: 'career',
      description: 'Se existir, aparece um link para baixar.',
      options: { accept: 'application/pdf' },
    }),
    defineField({ name: 'seo', title: 'SEO e compartilhamento', type: 'seo', group: 'seo' }),
  ],
  preview: {
    prepare() {
      return { title: 'Página Sobre' }
    },
  },
})
