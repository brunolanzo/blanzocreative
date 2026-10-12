import { PlayIcon } from '@sanity/icons/Play'
import { defineField, defineType } from 'sanity'
import { videoMedia } from '../shared/preview'

export type VideoProvider = 'mux' | 'file' | 'url' | 'vimeo'

type VideoSourceValue = {
  provider?: VideoProvider
  mux?: { asset?: { _ref?: string } }
  file?: { asset?: { _ref?: string } }
  url?: string
  vimeo?: string
  poster?: { asset?: { _ref?: string } }
}

const PROVIDERS = [
  { title: 'Upload no Mux (vídeos com som, longos ou com controles)', value: 'mux' },
  { title: 'Arquivo MP4 (loops curtos, até ~15 MB)', value: 'file' },
  { title: 'Link de MP4 ou HLS (.m3u8)', value: 'url' },
  { title: 'Vimeo', value: 'vimeo' },
] satisfies { title: string; value: VideoProvider }[]

/** Campos em que o vídeo preenche um quadro de formato fixo (reel da home, thumb e preview dos cards). */
const FIXED_FRAME_FIELDS = new Set(['reel', 'thumbnail', 'previewVideo'])

const hiddenUnless =
  (provider: VideoProvider) =>
  ({ parent }: { parent?: unknown }) =>
    (parent as VideoSourceValue | undefined)?.provider !== provider

function hasSource(value: VideoSourceValue): boolean {
  switch (value.provider) {
    case 'mux':
      return Boolean(value.mux?.asset?._ref)
    case 'file':
      return Boolean(value.file?.asset?._ref)
    case 'url':
      return Boolean(value.url)
    case 'vimeo':
      return Boolean(value.vimeo)
    default:
      return false
  }
}

export const videoSource = defineType({
  name: 'videoSource',
  title: 'Vídeo',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'provider',
      title: 'De onde vem o vídeo',
      type: 'string',
      initialValue: 'mux',
      options: { list: PROVIDERS, layout: 'radio' },
    }),
    defineField({
      name: 'mux',
      title: 'Vídeo no Mux',
      type: 'mux.video',
      description: 'Arraste o arquivo aqui. O Mux prepara versões para cada conexão e gera o poster sozinho.',
      hidden: hiddenUnless('mux'),
    }),
    defineField({
      name: 'file',
      title: 'Arquivo de vídeo',
      type: 'file',
      description: 'MP4 (H.264) de até ~15 MB, ideal para loops curtos sem som. Para vídeos maiores ou com som, use o Mux.',
      options: { accept: 'video/mp4,video/webm' },
      hidden: hiddenUnless('file'),
    }),
    defineField({
      name: 'url',
      title: 'Link do vídeo',
      type: 'url',
      description: 'Link direto para um arquivo .mp4 ou .m3u8 (HLS), por exemplo do Cloudflare R2 ou do Bunny.',
      hidden: hiddenUnless('url'),
      validation: (rule) => rule.uri({ scheme: ['https', 'http'] }),
    }),
    defineField({
      name: 'vimeo',
      title: 'Link do Vimeo',
      type: 'url',
      description: 'Ex.: https://vimeo.com/123456789',
      hidden: hiddenUnless('vimeo'),
      validation: (rule) =>
        rule
          .custom((value: string | undefined) =>
            !value || /vimeo\.com\/(?:.*\/)?\d+/.test(value) ? true : 'Esse link não parece ser de um vídeo do Vimeo.',
          )
          .warning(),
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: { hotspot: true },
      description:
        'Imagem mostrada enquanto o vídeo carrega (e quando o celular não deixa o vídeo tocar sozinho). No Mux, se ficar vazio, usamos um quadro do próprio vídeo.',
    }),
    defineField({
      name: 'label',
      title: 'Descrição do vídeo',
      type: 'string',
      description: 'Uma frase sobre o que acontece no vídeo, para leitores de tela. Ex.: "Reel 2026 com trabalhos de motion e 3D".',
    }),
  ],
  validation: (rule) =>
    rule
      .custom((value: VideoSourceValue | undefined, context) => {
        if (!value || !value.provider) return true
        if (!hasSource(value)) return 'Escolha ou envie o vídeo. Sem ele, este campo é ignorado no site.'
        // Mux e Vimeo informam o formato sozinhos; arquivo e link, não. No reel e nos cards o
        // quadro já tem formato fixo, então lá o poster é opcional.
        const fixedFrame = FIXED_FRAME_FIELDS.has(String(context.path?.[0] ?? ''))
        if (!fixedFrame && (value.provider === 'file' || value.provider === 'url') && !value.poster?.asset?._ref) {
          return 'Envie um poster (um quadro do vídeo). Sem ele, o site não sabe o formato e mostra o vídeo em 16:9.'
        }
        return true
      })
      .warning(),
  preview: {
    select: { provider: 'provider', label: 'label', poster: 'poster', playbackId: 'mux.asset.playbackId' },
    prepare({ provider, label, poster, playbackId }) {
      const origin = PROVIDERS.find((item) => item.value === provider)?.title.split(' (')[0] ?? 'Vídeo'
      return { title: label || 'Vídeo', subtitle: origin, media: videoMedia({ poster, playbackId }) ?? PlayIcon }
    },
  },
})
