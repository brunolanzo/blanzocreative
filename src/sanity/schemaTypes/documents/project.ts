import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { ProjectsIcon } from '@sanity/icons/Projects'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { pageBuilderMembers } from '../blocks'
import { videoMedia } from '../shared/preview'
import { mediaImageQuality } from '../shared/validation'

const currentYear = new Date().getFullYear()

/** Endereços usados pelas rotas do site (/work/filter/…). */
const RESERVED_SLUGS = new Set(['filter'])

export const project = defineType({
  name: 'project',
  title: 'Projeto',
  type: 'document',
  icon: ProjectsIcon,
  groups: [
    { name: 'content', title: 'Conteúdo', default: true },
    { name: 'media', title: 'Mídia' },
    { name: 'page', title: 'Página' },
    { name: 'credits', title: 'Créditos' },
    { name: 'publish', title: 'Publicação e SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Endereço (slug)',
      type: 'slug',
      group: 'content',
      description: 'Final do link do projeto: blanzo…/work/este-texto. Clique em "Gerar" para criar a partir do título.',
      options: { source: 'title', maxLength: 80 },
      validation: (rule) => [
        rule.required().error('Gere o endereço do projeto (botão "Gerar").'),
        rule.custom((value: { current?: string } | undefined) =>
          RESERVED_SLUGS.has(value?.current ?? '')
            ? `"${value?.current}" é usado pelo próprio site. Escolha outro endereço.`
            : true,
        ),
      ],
    }),
    defineField({ name: 'subtitle', title: 'Subtítulo', type: 'string', group: 'content' }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'reference',
      to: [{ type: 'client' }],
      group: 'content',
      description: 'Projetos autorais podem ficar sem cliente.',
    }),
    defineField({ name: 'agency', title: 'Agência (opcional)', type: 'string', group: 'content' }),
    defineField({
      name: 'year',
      title: 'Ano',
      type: 'number',
      group: 'content',
      validation: (rule) => rule.required().integer().min(1990).max(currentYear + 1),
    }),
    defineField({
      name: 'role',
      title: 'Minha função no projeto',
      type: 'string',
      group: 'content',
      description: 'Ex.: Creative direction and motion design.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      description: 'As disciplinas do projeto. São elas que fazem o filtro do site funcionar.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'tag' }] })],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({ name: 'intro', title: 'Descrição de abertura', type: 'richText', group: 'content' }),

    defineField({
      name: 'thumbnail',
      title: 'Thumb do card',
      type: 'media',
      group: 'media',
      description:
        'Aparece nos grids (home e /work). Imagem, GIF ou vídeo curto em loop (sem som). Proporção 3:2, pelo menos 1800 × 1200 px.',
      validation: (rule) => [
        rule.required().error('A thumb é obrigatória: sem ela o projeto não aparece bem nos grids.'),
        rule.custom(mediaImageQuality(1800)).warning(),
      ],
    }),
    defineField({
      name: 'previewVideo',
      title: 'Vídeo de preview (opcional)',
      type: 'videoSource',
      group: 'media',
      description:
        'Toca por cima da thumb quando o mouse passa no card (no celular, quando o card está no centro da tela). Use um loop curto de 5 a 10 segundos, sem som.',
    }),
    defineField({
      name: 'heroMedia',
      title: 'Mídia de abertura',
      type: 'media',
      group: 'media',
      description: 'Primeira mídia da página do projeto, logo abaixo do título. Imagem com pelo menos 2400px de largura, ou vídeo.',
      validation: (rule) => [
        rule.required().warning('Sem mídia de abertura, a página começa direto pelo texto.'),
        rule.custom(mediaImageQuality(2400)).warning(),
      ],
    }),

    defineField({
      name: 'body',
      title: 'Corpo da página',
      type: 'array',
      group: 'page',
      description: 'Monte a página com blocos. Arraste pelo ícone de pontinhos para mudar a ordem.',
      of: pageBuilderMembers,
    }),

    defineField({
      name: 'credits',
      title: 'Créditos / ficha técnica',
      type: 'array',
      group: 'credits',
      of: [defineArrayMember({ type: 'credit' })],
    }),

    defineField({
      name: 'visibility',
      title: 'Visibilidade',
      type: 'string',
      group: 'publish',
      initialValue: 'listed',
      options: {
        list: [
          { title: 'Publicado: aparece nos grids do site', value: 'listed' },
          { title: 'Não listado: só abre pelo link direto (bom para mandar a um cliente)', value: 'unlisted' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'seo', title: 'SEO e compartilhamento', type: 'seo', group: 'publish' }),
    orderRankField({ type: 'project', newItemPosition: 'before' }),
  ],
  orderings: [
    orderRankOrdering,
    { title: 'Ano (mais recente)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
    { title: 'Título', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client.name',
      year: 'year',
      visibility: 'visibility',
      image: 'thumbnail.image',
      poster: 'thumbnail.video.poster',
      playbackId: 'thumbnail.video.mux.asset.playbackId',
    },
    prepare({ title, client, year, visibility, image, poster, playbackId }) {
      const details = [client, year, visibility === 'unlisted' ? 'não listado' : null].filter(Boolean)
      return {
        title: title || 'Projeto sem título',
        subtitle: details.join(' · '),
        media: image ?? videoMedia({ poster, playbackId }) ?? ProjectsIcon,
      }
    },
  },
})
