import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, studioPath } from '../env'

/**
 * Campos de texto livre que, na pré-visualização do painel, ganham a marcação invisível
 * do "clique para editar". Só textos: opções como layout, tipo de mídia ou proporção
 * ficam de fora, porque o site compara esses valores.
 */
const EDITABLE_TEXT = new Set([
  'title',
  'subtitle',
  'phrase',
  'intro',
  'heading',
  'text',
  'quote',
  'author',
  'role',
  'name',
  'description',
  'alt',
  'label',
  'caption',
  'labelBefore',
  'labelAfter',
  'ctaHeading',
  'copyright',
])

/**
 * Cliente de leitura do conteúdo publicado.
 * Sem CDN do Sanity: o próprio Next guarda as respostas em cache até a próxima
 * publicação (webhook → revalidateTag), então o conteúdo nunca fica velho.
 * A marcação de edição (stega) só liga na pré-visualização (ver fetch.ts).
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
  stega: {
    studioUrl: studioPath,
    filter: (props) => {
      const key = props.sourcePath.at(-1)
      return typeof key === 'string' && EDITABLE_TEXT.has(key) && props.filterDefault(props)
    },
  },
})
