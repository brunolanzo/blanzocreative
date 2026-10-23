import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Página Contato',
  type: 'document',
  icon: EnvelopeIcon,
  description: 'O e-mail, o WhatsApp e as redes ficam em Configurações do site → Contato e redes (um lugar só para o site todo).',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da página',
      type: 'string',
      description: 'Aparece grande, em minúsculas. Ex.: "tell me what it should feel like".',
    }),
    defineField({ name: 'intro', title: 'Texto de introdução', type: 'text', rows: 3 }),
    defineField({
      name: 'show',
      title: 'O que mostrar nesta página',
      type: 'object',
      options: { columns: 2 },
      fields: [
        defineField({ name: 'email', title: 'E-mail', type: 'boolean', initialValue: true }),
        defineField({ name: 'whatsapp', title: 'WhatsApp', type: 'boolean', initialValue: true }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'boolean', initialValue: true }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'boolean', initialValue: true }),
        defineField({ name: 'vimeo', title: 'Vimeo', type: 'boolean', initialValue: true }),
        defineField({ name: 'behance', title: 'Behance', type: 'boolean', initialValue: true }),
      ],
    }),
    defineField({
      name: 'formIntro',
      title: 'Texto acima do formulário',
      type: 'text',
      rows: 2,
      description: 'O formulário só aparece se a chave do Web3Forms estiver configurada no site (veja o README).',
    }),
    defineField({
      name: 'formSuccess',
      title: 'Mensagem depois do envio',
      type: 'text',
      rows: 2,
    }),
    defineField({ name: 'seo', title: 'SEO e compartilhamento', type: 'seo' }),
  ],
  preview: {
    prepare() {
      return { title: 'Página Contato' }
    },
  },
})
