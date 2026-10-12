type LoaderArgs = { src: string; width: number; quality?: number }

const SANITY_CDN = 'https://cdn.sanity.io/images/'

/**
 * Loader do next/image. Imagens do Sanity são redimensionadas e convertidas
 * (WebP/AVIF) no CDN do Sanity. GIFs continuam animados: testado em 11/10/2026,
 * o CDN devolve WebP animado com todos os quadros (e menos da metade do peso).
 * Arquivos locais (/public) passam direto.
 */
export default function sanityImageLoader({ src, width, quality }: LoaderArgs): string {
  if (src.startsWith(SANITY_CDN)) {
    const url = new URL(src)
    url.searchParams.set('w', String(width))
    url.searchParams.set('q', String(quality ?? 75))
    url.searchParams.set('fit', 'max')
    url.searchParams.set('auto', 'format')
    return url.toString()
  }
  return `${src}${src.includes('?') ? '&' : '?'}w=${width}`
}
