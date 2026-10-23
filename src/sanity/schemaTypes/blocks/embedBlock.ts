import { LaunchIcon } from '@sanity/icons/Launch'
import { defineField, defineType } from 'sanity'
import { ASPECT_RATIOS } from '../shared/options'

const EMBED_PATTERN = /(vimeo\.com\/(?:.*\/)?\d+|youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)/

function providerOf(url: string | undefined): string {
  if (!url) return ''
  if (url.includes('vimeo')) return 'Vimeo'
  if (url.includes('youtu')) return 'YouTube'
  return ''
}

export const embedBlock = defineType({
  name: 'embedBlock',
  title: 'Embed (Vimeo ou YouTube)',
  type: 'object',
  icon: LaunchIcon,
  description: 'Para vídeos que já estão no Vimeo ou no YouTube. O player só carrega quando a pessoa clica.',
  fields: [
    defineField({
      name: 'url',
      title: 'Link do vídeo',
      type: 'url',
      description: 'Ex.: https://vimeo.com/123456789 ou https://www.youtube.com/watch?v=abc123',
      validation: (rule) =>
        rule
          .required()
          .custom((value: string | undefined) =>
            !value || EMBED_PATTERN.test(value) ? true : 'Use um link do Vimeo ou do YouTube.',
          ),
    }),
    defineField({
      name: 'title',
      title: 'Título do vídeo',
      type: 'string',
      description: 'Para leitores de tela, em inglês. Ex.: "Launch film for the solar line".',
    }),
    defineField({
      name: 'aspect',
      title: 'Proporção',
      type: 'string',
      initialValue: '16:9',
      options: { list: ASPECT_RATIOS.filter((ratio) => ratio.value !== 'original') },
    }),
    defineField({ name: 'options', title: 'Opções do bloco', type: 'blockOptions' }),
  ],
  preview: {
    select: { url: 'url', title: 'title' },
    prepare({ url, title }) {
      const provider = providerOf(url)
      return { title: `Embed${provider ? ` · ${provider}` : ''}`, subtitle: title || url, media: LaunchIcon }
    },
  },
})
