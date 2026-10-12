'use client'

import { type KeyboardEvent, type PointerEvent, useRef, useState } from 'react'
import { SanityImage } from '@/components/media/SanityImage'
import { cn } from '@/lib/cn'
import type { ImageData } from '@/lib/media'

type BeforeAfterSliderProps = {
  before: ImageData
  after: ImageData
  ratio: number
  labelBefore: string
  labelAfter: string
  /** Nome do controle para leitores de tela. */
  compareLabel: string
  /** Posição inicial do divisor, em %. */
  start: number
  vertical: boolean
  rounded: boolean
  sizes: string
}

const clamp = (value: number) => Math.min(100, Math.max(0, value))

const KEY_STEPS: Record<string, number> = { ArrowLeft: -2, ArrowUp: -2, ArrowRight: 2, ArrowDown: 2, PageUp: -10, PageDown: 10 }

/**
 * Antes e depois: a imagem "depois" fica por cima, recortada no divisor.
 * Arrasta com mouse ou toque; pelo teclado, setas (Shift = passos maiores), Home e End.
 */
export function BeforeAfterSlider({
  before,
  after,
  ratio,
  labelBefore,
  labelAfter,
  compareLabel,
  start,
  vertical,
  rounded,
  sizes,
}: BeforeAfterSliderProps) {
  const box = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [position, setPosition] = useState(clamp(start))

  function follow(event: PointerEvent<HTMLDivElement>) {
    const rect = box.current?.getBoundingClientRect()
    if (!rect) return
    const value = vertical
      ? ((event.clientY - rect.top) / rect.height) * 100
      : ((event.clientX - rect.left) / rect.width) * 100
    setPosition(clamp(value))
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next: number | null = null
    if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = 100
    else if (event.key in KEY_STEPS) next = position + KEY_STEPS[event.key] * (event.shiftKey ? 5 : 1)
    if (next === null) return
    event.preventDefault()
    setPosition(clamp(next))
  }

  const rounded2 = Math.round(position)
  const label = 'glass-control pointer-events-none absolute rounded-pill px-12 py-4 text-label-s font-medium text-paper uppercase'

  return (
    <div
      ref={box}
      className={cn(
        'relative select-none overflow-hidden bg-raised [&_img]:pointer-events-none',
        vertical ? 'cursor-ns-resize touch-pan-x' : 'cursor-ew-resize touch-pan-y',
        rounded && 'rounded-md',
      )}
      style={{ aspectRatio: ratio }}
      data-cursor-drag
      onPointerDown={(event) => {
        dragging.current = true
        event.currentTarget.setPointerCapture(event.pointerId)
        follow(event)
      }}
      onPointerMove={(event) => {
        if (dragging.current) follow(event)
      }}
      onPointerUp={() => {
        dragging.current = false
      }}
      onPointerCancel={() => {
        dragging.current = false
      }}
    >
      <SanityImage image={before} sizes={sizes} fill className="object-cover" />
      <div
        className="absolute inset-0"
        style={{ clipPath: vertical ? `inset(${position}% 0 0 0)` : `inset(0 0 0 ${position}%)` }}
      >
        <SanityImage image={after} sizes={sizes} fill className="object-cover" />
      </div>

      <span className={cn(label, 'top-16 left-16')}>{labelBefore}</span>
      <span className={cn(label, vertical ? 'bottom-16 left-16' : 'top-16 right-16')}>{labelAfter}</span>

      <div
        aria-hidden
        className={cn('absolute bg-paper', vertical ? 'inset-x-0 h-px' : 'inset-y-0 w-px')}
        style={vertical ? { top: `${position}%` } : { left: `${position}%` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label={compareLabel}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded2}
        aria-valuetext={`${labelBefore} ${rounded2}% · ${labelAfter} ${100 - rounded2}%`}
        onKeyDown={onKeyDown}
        className="glass-control absolute size-40 -translate-x-1/2 -translate-y-1/2 rounded-pill focus-visible:-outline-offset-4"
        style={vertical ? { top: `${position}%`, left: '50%' } : { left: `${position}%`, top: '50%' }}
      />
    </div>
  )
}
