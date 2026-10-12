import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

/** URL de uma imagem do Sanity respeitando recorte e ponto focal escolhidos no painel. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
