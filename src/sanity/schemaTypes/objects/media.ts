import { ImagesIcon } from '@sanity/icons/Images'
import { defineField, defineType } from 'sanity'
import { videoMedia } from '../shared/preview'

type MediaValue = { kind?: 'image' | 'video' }

const hiddenUnless =
  (kind: 'image' | 'video') =>
  ({ parent }: { parent?: unknown }) =>
    ((parent as MediaValue | undefined)?.kind ?? 'image') !== kind

/** Imagem/GIF ou vídeo, usado em todos os lugares onde a mídia é livre. */
export const media = defineType({
  name: 'media',
  title: 'Mídia',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'kind',
      title: 'Tipo',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          { title: 'Imagem ou GIF', value: 'image' },
          { title: 'Vídeo', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'image',
      title: 'Imagem ou GIF',
      type: 'accessibleImage',
      hidden: hiddenUnless('image'),
    }),
    defineField({
      name: 'video',
      title: 'Vídeo',
      type: 'videoSource',
      hidden: hiddenUnless('video'),
    }),
  ],
  preview: {
    select: {
      kind: 'kind',
      image: 'image',
      alt: 'image.alt',
      poster: 'video.poster',
      playbackId: 'video.mux.asset.playbackId',
      label: 'video.label',
    },
    prepare({ kind, image, alt, poster, playbackId, label }) {
      if (kind === 'video') {
        return { title: label || 'Vídeo', subtitle: 'Vídeo', media: videoMedia({ poster, playbackId }) }
      }
      return { title: alt || 'Imagem', subtitle: 'Imagem', media: image }
    },
  },
})
