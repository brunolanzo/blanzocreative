'use client'

import { type PointerEvent, useEffect, useRef, useState } from 'react'
import { MediaView } from '@/components/media/MediaView'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/lib/environment'
import { type MediaData, mediaRatio } from '@/lib/media'

type GalleryItem = MediaData & { _key: string }

type GalleryTrackProps = {
  items: GalleryItem[]
  /** Classe de altura dos itens (a largura sai do formato de cada mídia). */
  heightClass: string
  rounded: boolean
  /** Ponta a ponta: a faixa começa na margem do conteúdo e vai até a borda da tela. */
  bleed: boolean
  labels: { gallery: string; previous: string; next: string }
}

/**
 * Galeria horizontal: arrasta com o mouse, desliza no toque, rola com as setas do teclado
 * (com a faixa em foco) e tem os botões anterior/próximo. Os quadros encaixam ao parar.
 */
export function GalleryTrack({ items, heightClass, rounded, bleed, labels }: GalleryTrackProps) {
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; left: number } | null>(null)
  const reduced = useReducedMotion()
  const [dragging, setDragging] = useState(false)
  const [edges, setEdges] = useState({ start: true, end: false })

  useEffect(() => {
    const element = track.current
    if (!element) return
    const update = () => {
      const start = element.scrollLeft <= 2
      const end = element.scrollLeft + element.clientWidth >= element.scrollWidth - 2
      // Só renderiza de novo quando uma das pontas muda (o evento de rolagem dispara o tempo todo).
      setEdges((previous) => (previous.start === start && previous.end === end ? previous : { start, end }))
    }
    const observer = new ResizeObserver(update)
    observer.observe(element)
    element.addEventListener('scroll', update, { passive: true })
    return () => {
      observer.disconnect()
      element.removeEventListener('scroll', update)
    }
  }, [])

  function step(direction: 1 | -1) {
    const element = track.current
    if (!element) return
    element.scrollBy({ left: direction * element.clientWidth * 0.8, behavior: reduced ? 'auto' : 'smooth' })
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const element = track.current
    if (!element || event.pointerType !== 'mouse' || event.button !== 0) return
    drag.current = { x: event.clientX, left: element.scrollLeft }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current
    if (!current) return
    track.current?.scrollTo({ left: current.left - (event.clientX - current.x) })
  }

  function endDrag() {
    if (!drag.current) return
    drag.current = null
    setDragging(false)
  }

  return (
    <div>
      <div
        ref={track}
        role="region"
        aria-label={labels.gallery}
        tabIndex={0}
        data-lenis-prevent-horizontal
        data-cursor-drag
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          'flex gap-16 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&_img]:pointer-events-none',
          'cursor-grab select-none',
          dragging ? 'cursor-grabbing snap-none' : 'snap-x snap-mandatory',
          bleed && 'scroll-px-gutter px-gutter',
        )}
      >
        {items.map((item) => (
          <MediaView
            key={item._key}
            media={item}
            sizes="(min-width: 768px) 50vw, 80vw"
            className={cn('shrink-0 snap-start bg-raised', heightClass, rounded && 'rounded-md')}
            style={{ aspectRatio: mediaRatio(item) }}
          />
        ))}
      </div>
      <div className={cn('mt-16 flex justify-end gap-8', bleed && 'container-site')}>
        <Button variant="ghost" size="sm" onClick={() => step(-1)} disabled={edges.start}>
          ← {labels.previous}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => step(1)} disabled={edges.end}>
          {labels.next} →
        </Button>
      </div>
    </div>
  )
}
