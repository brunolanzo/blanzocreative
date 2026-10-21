import { PlayIcon } from '@sanity/icons/Play'
import { defineField, defineType } from 'sanity'
import { ASPECT_RATIOS, BLOCK_WIDTHS, titleOf } from '../shared/options'
import { videoMedia } from '../shared/preview'

export const videoBlock = defineType({
  name: 'videoBlock',
  title: 'Vídeo',
  type: 'object',
  icon: PlayIcon,
  description: 'Toca sozinho, sem som e em loop, e só enquanto aparece na tela. Ativar o som de um vídeo silencia os outros.',
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
    }),
    defineField({
      name: 'controls',
      title: 'Mostrar controles completos',
      type: 'boolean',
      initialValue: false,
      description:
        'Barra com tempo, volume e tela cheia. Com ela, o vídeo não toca sozinho: espera a pessoa dar o play, já com som. Bom para vídeos longos, que a pessoa assiste do começo ao fim.',
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
