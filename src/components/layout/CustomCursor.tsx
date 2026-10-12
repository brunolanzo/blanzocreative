'use client'

import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { useCanHover, useReducedMotion } from '@/lib/environment'
import type { SiteSettings } from '@/sanity/lib/settings'

type CursorSettings = NonNullable<SiteSettings['cursor']>
type CursorState = 'hidden' | 'default' | 'hover' | 'drag' | 'field'

const FIELDS = 'input, textarea, select, [contenteditable="true"]'
const DRAGGABLE = '[data-cursor-drag]'
const INTERACTIVE = 'a, button, [role="button"], [role="slider"], summary'

/**
 * Cursor customizado (Configurações do site → Cursor). É um elemento que segue o mouse, e não
 * `cursor: url()` do CSS, porque assim GIF anima. Sobre links e cards troca por um texto curto
 * ou outra imagem; sobre galeria e antes/depois mostra "arraste". Nunca aparece em tela de toque
 * nem para quem pediu menos animação; sobre campos de texto, volta o cursor do sistema.
 */
export function CustomCursor({ cursor, dragLabel }: { cursor: CursorSettings; dragLabel: string }) {
  const canHover = useCanHover()
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('hidden')
  const image = cursor.image
  const active = Boolean(cursor.enabled && image?.url && canHover && !reduced)

  useEffect(() => {
    const element = root.current
    if (!active || !element) return
    const html = document.documentElement
    html.dataset.customCursor = ''
    // "Seguindo com atraso": o cursor alcança o mouse em ~0,25s; "colado": vai direto.
    const smooth = cursor.smoothing !== 'none'
    const moveX = smooth ? gsap.quickTo(element, 'x', { duration: 0.25, ease: 'power3.out' }) : gsap.quickSetter(element, 'x', 'px')
    const moveY = smooth ? gsap.quickTo(element, 'y', { duration: 0.25, ease: 'power3.out' }) : gsap.quickSetter(element, 'y', 'px')
    let placed = false

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      if (!placed) {
        // Primeira aparição: nasce já no lugar, sem deslizar do canto da tela.
        gsap.set(element, { x: event.clientX, y: event.clientY })
        placed = true
      }
      moveX(event.clientX)
      moveY(event.clientY)
      const target = event.target instanceof Element ? event.target : null
      const next: CursorState = !target
        ? 'default'
        : target.closest(FIELDS)
          ? 'field'
          : target.closest(DRAGGABLE)
            ? 'drag'
            : target.closest(INTERACTIVE)
              ? 'hover'
              : 'default'
      setState((previous) => (previous === next ? previous : next))
    }
    // Saiu da janela ou entrou num vídeo do Vimeo/YouTube (o iframe tem o próprio cursor).
    const onOut = (event: PointerEvent) => {
      if (!event.relatedTarget) setState('hidden')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onOut)
    return () => {
      delete html.dataset.customCursor
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onOut)
      gsap.killTweensOf(element)
    }
  }, [active, cursor.smoothing])

  if (!active || !image?.url) return null

  const size = cursor.size ?? 32
  const hotspot = `translate(-${cursor.hotspotX ?? 0}%, -${cursor.hotspotY ?? 0}%)`
  const hoverImage = cursor.hoverMode === 'image' ? cursor.hoverImage : null
  const label = state === 'drag' ? dragLabel : state === 'hover' && !hoverImage ? cursor.hoverText : null
  const showHoverImage = state === 'hover' && Boolean(hoverImage?.url)
  const showImage = !label && !showHoverImage

  return (
    <div
      ref={root}
      aria-hidden
      className={cn(
        'pointer-events-none fixed top-0 left-0 z-(--z-cursor) transition-opacity duration-220 ease-out',
        state === 'hidden' || state === 'field' ? 'opacity-0' : 'opacity-100',
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt=""
        className={cn('absolute top-0 left-0 max-w-none transition-opacity duration-120', !showImage && 'opacity-0')}
        style={{ width: size, height: 'auto', transform: hotspot }}
      />
      {hoverImage?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hoverImage.url}
          alt=""
          className={cn('absolute top-0 left-0 max-w-none transition-opacity duration-120', !showHoverImage && 'opacity-0')}
          style={{ width: size, height: 'auto', transform: hotspot }}
        />
      )}
      {label && (
        <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-pill bg-paper px-12 py-4 text-label-s font-medium whitespace-nowrap text-ink-1000 uppercase">
          {label}
        </span>
      )}
    </div>
  )
}
