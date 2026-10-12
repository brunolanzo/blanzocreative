'use client'

/**
 * Configuração do painel (Sanity Studio), aberto em /admin.
 */
import { ptBRLocale } from '@sanity/locale-pt-br'
import { defineConfig } from 'sanity'
import { muxInput } from 'sanity-plugin-mux-input'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { dataset, projectId, studioPath } from './src/sanity/env'
import { resolve } from './src/sanity/presentation'
import { SINGLETON_TYPES, schemaTypes } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'
import { resolveActions } from './src/sanity/studio/actions'
import { resolveBadges } from './src/sanity/studio/badges'

export default defineConfig({
  name: 'blanzo',
  title: 'Blanzo · painel',
  basePath: studioPath,
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  plugins: [
    structureTool({ title: 'Conteúdo', structure }),
    // Site e formulário lado a lado, com os rascunhos aparecendo ao vivo.
    presentationTool({
      title: 'Pré-visualizar',
      resolve,
      previewUrl: { initial: '/', previewMode: { enable: '/api/draft-mode/enable' } },
    }),
    muxInput({
      // "basic" não cobra codificação no Mux. O MP4 extra (static_renditions: ['highest']) é um adicional
      // pago no Mux e fica desligado: os vídeos tocam em streaming. Se ligar, o site passa a usar o MP4 sozinho.
      video_quality: 'basic',
      tool: { title: 'Vídeos (Mux)' },
    }),
    ptBRLocale(),
  ],
  document: {
    actions: resolveActions,
    badges: resolveBadges,
    newDocumentOptions: (previous, { creationContext }) =>
      creationContext.type === 'global'
        ? previous.filter((template) => !SINGLETON_TYPES.has(template.templateId))
        : previous,
  },
})
