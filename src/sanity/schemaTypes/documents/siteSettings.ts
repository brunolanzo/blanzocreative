import { CogIcon } from '@sanity/icons/Cog'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { UI_STRING_GROUPS } from '../../../lib/ui-strings'

type LogoValue = { kind?: 'image' | 'video' | 'lottie' }
type CursorValue = { enabled?: boolean; hoverMode?: 'image' | 'text' }

const logoKindIs =
  (...kinds: NonNullable<LogoValue['kind']>[]) =>
  ({ parent }: { parent?: unknown }) =>
    !kinds.includes((parent as LogoValue | undefined)?.kind ?? 'image')

const uiStringFields = UI_STRING_GROUPS.flatMap((group) =>
  Object.entries(group.strings).map(([name, { label, text }]) =>
    defineField({ name, title: label, description: `Padrão: ${text}`, type: 'string', initialValue: text, fieldset: group.name }),
  ),
)

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configurações do site',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'identity', title: 'Logo e favicon', default: true },
    { name: 'home', title: 'Home' },
    { name: 'work', title: 'Página Trabalhos' },
    { name: 'contact', title: 'Contato e redes' },
    { name: 'footer', title: 'Rodapé' },
    { name: 'cursor', title: 'Cursor' },
    { name: 'seo', title: 'SEO padrão' },
    { name: 'texts', title: 'Textos da interface' },
  ],
  fields: [
    // ── Logo e favicon ────────────────────────────────────────────────────────
    defineField({
      name: 'siteName',
      title: 'Nome do site',
      type: 'string',
      group: 'identity',
      initialValue: 'Blanzo Creative Studio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'object',
      group: 'identity',
      fields: [
        defineField({
          name: 'kind',
          title: 'Tipo de logo',
          type: 'string',
          initialValue: 'image',
          options: {
            list: [
              { title: 'Imagem: SVG, PNG ou GIF animado', value: 'image' },
              { title: 'Vídeo curto em loop', value: 'video' },
              { title: 'Animação Lottie (JSON)', value: 'lottie' },
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'image',
          title: 'Logo para fundo escuro',
          type: 'image',
          description: 'Versão clara do logo (o site é preto). SVG é o ideal; PNG com fundo transparente também serve.',
          options: { accept: 'image/svg+xml,image/png,image/gif' },
          hidden: logoKindIs('image'),
        }),
        defineField({
          name: 'imageOnLight',
          title: 'Logo para fundo claro (opcional)',
          type: 'image',
          description: 'Versão escura, usada sobre blocos brancos.',
          options: { accept: 'image/svg+xml,image/png,image/gif' },
          hidden: logoKindIs('image'),
        }),
        defineField({
          name: 'video',
          title: 'Vídeo do logo (MP4)',
          type: 'file',
          description:
            'MP4 curto com fundo preto: sobre o site preto, o fundo desaparece. Os vídeos de traço do design system funcionam assim.',
          options: { accept: 'video/mp4' },
          hidden: logoKindIs('video'),
        }),
        defineField({
          name: 'videoWebm',
          title: 'Vídeo com transparência para Chrome e Firefox (WebM, opcional)',
          type: 'file',
          description: 'Só se o vídeo tiver fundo transparente de verdade. Nesse caso, envie também a versão para Safari.',
          options: { accept: 'video/webm' },
          hidden: logoKindIs('video'),
        }),
        defineField({
          name: 'videoHevc',
          title: 'Vídeo com transparência para Safari (HEVC/MOV, opcional)',
          type: 'file',
          description: 'O Safari não mostra transparência em WebM. Se isso der trabalho, prefira Lottie, GIF ou APNG.',
          options: { accept: 'video/quicktime,video/mp4' },
          hidden: logoKindIs('video'),
        }),
        defineField({
          name: 'lottie',
          title: 'Arquivo Lottie (JSON)',
          type: 'file',
          description: 'Exportado do After Effects com o Bodymovin/LottieFiles.',
          options: { accept: 'application/json,.json' },
          hidden: logoKindIs('lottie'),
        }),
        defineField({
          name: 'animation',
          title: 'Quando animar',
          type: 'string',
          initialValue: 'always',
          options: {
            list: [
              { title: 'Sempre (em loop)', value: 'always' },
              { title: 'Só quando o mouse passa por cima', value: 'hover' },
              { title: 'Uma vez, quando a página carrega', value: 'once' },
            ],
            layout: 'radio',
          },
          hidden: logoKindIs('video', 'lottie'),
        }),
        defineField({
          name: 'heightDesktop',
          title: 'Altura no computador (px)',
          type: 'number',
          initialValue: 28,
          validation: (rule) => rule.min(12).max(120),
        }),
        defineField({
          name: 'heightMobile',
          title: 'Altura no celular (px)',
          type: 'number',
          initialValue: 22,
          validation: (rule) => rule.min(12).max(80),
        }),
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'identity',
      description: 'Ícone da aba do navegador. PNG quadrado de 512 × 512 px.',
      options: { accept: 'image/png,image/svg+xml' },
    }),

    // ── Home ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'reel',
      title: 'Demo reel',
      type: 'object',
      group: 'home',
      fields: [
        defineField({
          name: 'loop',
          title: 'Reel (toca sozinho no topo da home)',
          type: 'videoSource',
          description:
            'Toca sozinho, em loop, atrás de tudo. Começa sem som; o visitante liga no botão "Ativar som". Pode ser o reel completo.',
        }),
        defineField({
          name: 'poster',
          title: 'Poster do reel',
          type: 'image',
          options: { hotspot: true },
          description:
            'Primeira coisa que a home mostra, antes do vídeo carregar. Horizontal, pelo menos 2400 px de largura. Importante para o site abrir rápido.',
          validation: (rule) => rule.required().warning('Sem poster, a home fica preta até o vídeo carregar.'),
        }),
        defineField({
          name: 'phrase',
          title: 'Frase sobreposta (opcional)',
          type: 'string',
          description:
            'Aparece grande sobre o reel, em minúsculas, com um ponto vermelho no fim. Com frase, o vídeo fica mais escuro para o texto aparecer.',
        }),
      ],
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Projetos em destaque',
      type: 'array',
      group: 'home',
      description: 'Os projetos do grid da home, na ordem que você arrastar. Até 8.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
          options: { filter: 'visibility != "unlisted"', disableNew: true },
        }),
      ],
      validation: (rule) => rule.max(8).unique(),
    }),
    defineField({
      name: 'introEnabled',
      title: 'Animação de entrada (logo se desenhando antes do reel)',
      type: 'boolean',
      group: 'home',
      initialValue: true,
      description: 'Roda uma vez por visita. Nunca roda para quem pediu ao sistema menos animação.',
    }),
    defineField({
      name: 'sections',
      title: 'Seções da home',
      type: 'object',
      group: 'home',
      options: { columns: 3 },
      fields: [
        defineField({ name: 'clients', title: 'Clientes', type: 'boolean', initialValue: true }),
        defineField({ name: 'about', title: 'Sobre (resumo)', type: 'boolean', initialValue: true }),
        defineField({ name: 'contact', title: 'Chamada para contato', type: 'boolean', initialValue: true }),
      ],
    }),
    defineField({
      name: 'aboutSummary',
      title: 'Sobre (resumo na home)',
      type: 'object',
      group: 'home',
      fields: [
        defineField({ name: 'media', title: 'Foto ou vídeo curto', type: 'media' }),
        defineField({
          name: 'text',
          title: 'Texto (2 ou 3 frases)',
          type: 'text',
          rows: 3,
        }),
      ],
    }),

    // ── Página Trabalhos ──────────────────────────────────────────────────────
    defineField({
      name: 'workPage',
      title: 'Página Trabalhos',
      type: 'object',
      group: 'work',
      description: 'Topo da página /work. Os projetos aparecem na ordem da lista "Projetos".',
      fields: [
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          description: 'Aparece grande, em minúsculas, com ponto vermelho no fim. Se ficar vazio, usamos "Trabalhos".',
        }),
        defineField({
          name: 'intro',
          title: 'Texto de introdução',
          type: 'text',
          rows: 3,
          description: 'Uma ou duas frases ao lado do título.',
        }),
      ],
    }),

    // ── Contato e redes ───────────────────────────────────────────────────────
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      group: 'contact',
      description: 'Número com DDI e DDD, só números. Ex.: 5511999998888.',
      validation: (rule) =>
        rule.custom((value: string | undefined) =>
          !value || /^\d{12,13}$/.test(value) ? true : 'Use só números: 55 + DDD + número (12 ou 13 dígitos).',
        ),
    }),
    defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url', group: 'contact' }),
    defineField({ name: 'instagram', title: 'Instagram', type: 'url', group: 'contact' }),
    defineField({ name: 'vimeo', title: 'Vimeo', type: 'url', group: 'contact' }),
    defineField({ name: 'behance', title: 'Behance', type: 'url', group: 'contact' }),

    // ── Rodapé ────────────────────────────────────────────────────────────────
    defineField({
      name: 'ctaHeading',
      title: 'Chamada para contato',
      type: 'string',
      group: 'footer',
      description: 'Frase grande no fim das páginas, antes do rodapé. Em minúsculas, com ponto vermelho no fim.',
    }),
    defineField({
      name: 'copyright',
      title: 'Nome no copyright',
      type: 'string',
      group: 'footer',
      initialValue: 'Blanzo Creative Studio',
      description: 'O ano é colocado automaticamente.',
    }),

    // ── Cursor ────────────────────────────────────────────────────────────────
    defineField({
      name: 'cursor',
      title: 'Cursor customizado',
      type: 'object',
      group: 'cursor',
      description:
        'Nunca aparece em celular/tablet nem para quem pediu menos animação. Sobre campos de texto, o cursor normal continua.',
      fields: [
        defineField({ name: 'enabled', title: 'Usar cursor customizado', type: 'boolean', initialValue: false }),
        defineField({
          name: 'image',
          title: 'Imagem do cursor',
          type: 'image',
          description: 'SVG, PNG ou GIF animado, com fundo transparente.',
          options: { accept: 'image/svg+xml,image/png,image/gif' },
        }),
        defineField({ name: 'size', title: 'Tamanho (px)', type: 'number', initialValue: 32, validation: (rule) => rule.min(8).max(160) }),
        defineField({
          name: 'hotspotX',
          title: 'Ponto de clique: horizontal (%)',
          type: 'number',
          initialValue: 0,
          description: '0 = borda esquerda da imagem, 50 = centro, 100 = borda direita.',
          validation: (rule) => rule.min(0).max(100),
        }),
        defineField({
          name: 'hotspotY',
          title: 'Ponto de clique: vertical (%)',
          type: 'number',
          initialValue: 0,
          description: '0 = topo da imagem, 50 = centro, 100 = base.',
          validation: (rule) => rule.min(0).max(100),
        }),
        defineField({
          name: 'hoverMode',
          title: 'Sobre links e cards',
          type: 'string',
          initialValue: 'text',
          options: {
            list: [
              { title: 'Mostrar um texto curto', value: 'text' },
              { title: 'Trocar por outra imagem', value: 'image' },
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'hoverText',
          title: 'Texto sobre links e cards',
          type: 'string',
          initialValue: 'ver',
          hidden: ({ parent }) => (parent as CursorValue | undefined)?.hoverMode === 'image',
        }),
        defineField({
          name: 'hoverImage',
          title: 'Imagem sobre links e cards',
          type: 'image',
          options: { accept: 'image/svg+xml,image/png,image/gif' },
          hidden: ({ parent }) => (parent as CursorValue | undefined)?.hoverMode !== 'image',
        }),
        defineField({
          name: 'smoothing',
          title: 'Movimento',
          type: 'string',
          initialValue: 'smooth',
          options: {
            list: [
              { title: 'Colado ao mouse', value: 'none' },
              { title: 'Seguindo com um leve atraso', value: 'smooth' },
            ],
            layout: 'radio',
          },
        }),
      ],
      validation: (rule) =>
        rule
          .custom((value: (CursorValue & { image?: unknown }) | undefined) =>
            value?.enabled && !value.image ? 'Envie a imagem do cursor, ou ele não aparece.' : true,
          )
          .warning(),
    }),

    // ── SEO padrão ────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO padrão',
      type: 'seo',
      group: 'seo',
      description: 'Usado quando uma página não tem SEO próprio.',
      options: { collapsible: false },
    }),

    // ── Textos da interface ───────────────────────────────────────────────────
    defineField({
      name: 'ui',
      title: 'Textos da interface',
      type: 'object',
      group: 'texts',
      description:
        'Todos os textos fixos de botões e rótulos, em inglês (o site é só em inglês). O nome de cada campo diz onde o texto aparece; mude o valor para trocar no site.',
      fieldsets: UI_STRING_GROUPS.map((group) => ({
        name: group.name,
        title: group.title,
        options: { collapsible: true, collapsed: true },
      })),
      fields: uiStringFields,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configurações do site' }
    },
  },
})
