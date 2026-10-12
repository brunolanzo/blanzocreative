import { ImageIcon } from '@sanity/icons/Image'
import { defineField, defineType } from 'sanity'
import { imageQuality } from '../shared/validation'

export const accessibleImage = defineType({
  name: 'accessibleImage',
  title: 'Imagem',
  type: 'image',
  icon: ImageIcon,
  description: 'JPG, PNG, WebP ou GIF. GIFs continuam animados no site.',
  options: {
    hotspot: true,
    accept: 'image/jpeg,image/png,image/webp,image/gif',
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      description:
        'Descreva o que aparece, em uma frase. Serve para quem usa leitor de tela e para o Google. Ex.: "Modelo em contraluz segurando a lata, fundo preto".',
      validation: (rule) =>
        rule.required().error('Escreva o texto alternativo: ele descreve a imagem para quem não consegue vê-la.'),
    }),
  ],
  validation: (rule) => rule.custom(imageQuality(1000)).warning(),
})
