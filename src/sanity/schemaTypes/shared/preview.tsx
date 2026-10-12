import type { ReactElement } from 'react'
import type { PreviewValue } from 'sanity'

type PreviewMedia = PreviewValue['media']

/** Miniatura de um vídeo do Mux para as listas do painel. */
export function muxThumbnail(playbackId: string): ReactElement {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://image.mux.com/${playbackId}/thumbnail.jpg?width=160&fit_mode=smartcrop`}
      alt=""
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
    />
  )
}

/** Escolhe a melhor miniatura disponível para um vídeo: poster ou quadro do Mux. */
export function videoMedia({ poster, playbackId }: { poster?: PreviewMedia; playbackId?: string }): PreviewMedia {
  if (poster) return poster
  if (playbackId) return muxThumbnail(playbackId)
  return undefined
}
