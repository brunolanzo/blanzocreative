import { PlayIcon } from '@sanity/icons/Play'
import { defineField, defineType } from 'sanity'
import { ASPECT_RATIOS, BLOCK_WIDTHS, titleOf } from '../shared/options'
import { videoMedia } from '../shared/preview'

export const videoBlock = defineType({
  name: 'videoBlock',
  title: 'Vídeo',
  type: 'object',
  icon: PlayIcon,
  description:
    'Toca sozinho enquanto aparece na tela. Começa com som quando o navegador deixa (a pessoa já clicou em algo do site); senão, sem som, com o botão "Ativar som". Um som por vez.',
  fields: [
    defineField({ name: 'video', title: 'Vídeo', type: 'videoSource', validation: (rule) => rule.required() }),
    defineField({
      name: 'aspect',
      title: 'Proporção',
      type: 'string',
      initialValue: '16:9',
      options: { list: [...ASPECT_RATIOS] },
    }),
    defineField({
      name: 'soundButton',
      title: 'Mostrar botão de som',
      type: 'boolean',
      initialValue: true,
      description: 'Sem o botão (e sem os controles completos), o vídeo toca sempre sem som.',
    }),
    defineField({
      name: 'controls',
      title: 'Mostrar controles completos',
      type: 'boolean',
      initialValue: false,
      description:
        'Barra do navegador com tempo, volume e tela cheia, no lugar do botão de som. O vídeo continua tocando sozinho. Bom para vídeos longos, que a pessoa assiste do começo ao fim.',
    }),
    defineField({ name: 'loop', title: 'Repetir (loop)', type: 'boolean', initialValue: true }),
    defineField({ name: 'options', title: 'Opções do bloco', type: 'blockOptions' }),
  ],
  preview: {
    select: {
      aspect: 'aspect',
      width: 'options.width',
      label: 'video.label',
      poster: 'video.poster',
      playbackId: 'video.mux.asset.playbackId',
    },
    prepare({ aspect, width, label, poster, playbackId }) {
      return {
        title: `Vídeo · ${aspect ?? '16:9'}`,
        subtitle: [label, titleOf(BLOCK_WIDTHS, width)].filter(Boolean).join(' · '),
        media: videoMedia({ poster, playbackId }) ?? PlayIcon,
      }
    },
  },
})
