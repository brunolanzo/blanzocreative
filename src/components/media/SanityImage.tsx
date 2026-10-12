import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { ImageData } from '@/lib/media'
import { urlFor } from '@/sanity/lib/image'

type SanityImageProps = {
  image: ImageData | null | undefined
  /** Largura da imagem na tela em cada tamanho de tela, ex.: "(min-width: 768px) 50vw, 100vw". */
  sizes: string
  /** Preenche o elemento pai (que precisa ter posição e tamanho). */
  fill?: boolean
  /** Imagem principal da página (LCP): carrega antes de tudo. */
  priority?: boolean
  quality?: number
  /** Imagem decorativa (o texto ao lado já diz o que é): leitores de tela pulam. */
  decorative?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Imagem do Sanity com recorte e ponto focal escolhidos no painel, desfoque enquanto
 * carrega e tamanhos responsivos (o CDN do Sanity entrega WebP/AVIF).
 */
export function SanityImage({
  image,
  sizes,
  fill = false,
  priority = false,
  quality,
  decorative = false,
  className,
  style,
}: SanityImageProps) {
  if (!image?.asset?._ref) return null

  const crop = image.crop ?? {}
  const fullWidth = image.dimensions?.width ?? 1600
  const fullHeight = image.dimensions?.height ?? 900
  const width = Math.round(fullWidth * (1 - (crop.left ?? 0) - (crop.right ?? 0)))
  const height = Math.round(fullHeight * (1 - (crop.top ?? 0) - (crop.bottom ?? 0)))
  const src = urlFor({ asset: image.asset, crop: image.crop ?? undefined }).url()
  // O ponto focal vem medido na imagem inteira; o arquivo já chega recortado, então converte para o recorte.
  const focal = image.hotspot
    ? `${focalPercent(image.hotspot.x, crop.left, crop.right)}% ${focalPercent(image.hotspot.y, crop.top, crop.bottom)}%`
    : undefined

  return (
    <Image
      src={src}
      alt={decorative ? '' : (image.alt ?? '')}
      sizes={sizes}
      quality={quality}
      {...(fill ? { fill: true } : { width, height })}
      placeholder={image.lqip ? 'blur' : 'empty'}
      blurDataURL={image.lqip ?? undefined}
      preload={priority}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      style={focal ? { objectPosition: focal, ...style } : style}
    />
  )
}

/** Posição do ponto focal (0–1 na imagem inteira) dentro da parte recortada, em %. */
function focalPercent(point = 0.5, cropStart = 0, cropEnd = 0): number {
  const visible = 1 - cropStart - cropEnd
  if (visible <= 0) return 50
  return Math.round(Math.min(1, Math.max(0, (point - cropStart) / visible)) * 100)
}
