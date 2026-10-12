'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

type EmbedPlayerProps = {
  /** Endereço do player (já com autoplay), carregado só depois do clique. */
  src: string
  title: string
  thumbnail: string | null
  /** Imagem menor, se a principal não existir (o YouTube não tem a versão grande de todo vídeo). */
  fallbackThumbnail?: string | null
  ratio: number
  rounded: boolean
  playLabel: string
}

/**
 * Vimeo ou YouTube: até a pessoa clicar, só a imagem do vídeo (o player pesa e
 * carrega rastreadores). No clique, o player entra e começa a tocar.
 */
export function EmbedPlayer({ src, title, thumbnail, fallbackThumbnail, ratio, rounded, playLabel }: EmbedPlayerProps) {
  const [active, setActive] = useState(false)
  const [image, setImage] = useState(thumbnail)
  return (
    <div className={cn('relative overflow-hidden bg-raised', rounded && 'rounded-md')} style={{ aspectRatio: ratio }}>
      {active ? (
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={title ? `${playLabel}: ${title}` : playLabel}
          // Anel de foco por dentro: por fora, o canto arredondado do quadro cortaria.
          className="group absolute inset-0 rounded-[inherit] focus-visible:-outline-offset-4"
        >
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              // Quando a imagem grande não existe, o YouTube devolve um quadradinho cinza de 120px.
              onLoad={(event) => {
                if (fallbackThumbnail && event.currentTarget.naturalWidth <= 120) setImage(fallbackThumbnail)
              }}
              onError={() => fallbackThumbnail && setImage(fallbackThumbnail)}
              className="absolute inset-0 size-full object-cover"
            />
          )}
          {/* Texto sobre imagem sempre sobre o degradê de proteção do DS. */}
          <span aria-hidden className="protect-gradient absolute inset-0" />
          <span className="glass-control absolute right-16 bottom-16 rounded-pill px-12 py-4 text-label-s font-medium text-paper uppercase transition-colors duration-220 ease-out group-hover:text-flash-500">
            {playLabel}
          </span>
        </button>
      )}
    </div>
  )
}
