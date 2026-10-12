/**
 * Celular/tablet (sem hover): só o card mais perto do centro da tela toca o preview.
 * Um controlador para todos os cards, recalculado no scroll (uma vez por quadro).
 */
type Entry = { element: HTMLElement; setActive: (active: boolean) => void }

const entries = new Set<Entry>()
let current: Entry | null = null
let frame = 0

function update() {
  frame = 0
  const middle = window.innerHeight / 2
  const maxDistance = window.innerHeight * 0.35
  let best: Entry | null = null
  let bestDistance = Infinity
  for (const entry of entries) {
    const rect = entry.element.getBoundingClientRect()
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue
    const distance = Math.abs((rect.top + rect.bottom) / 2 - middle)
    if (distance < bestDistance && distance < maxDistance) {
      best = entry
      bestDistance = distance
    }
  }
  if (best === current) return
  current?.setActive(false)
  current = best
  current?.setActive(true)
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update)
}

export function registerPreviewFocus(entry: Entry): () => void {
  entries.add(entry)
  if (entries.size === 1) {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
  }
  schedule()
  return () => {
    entries.delete(entry)
    if (current === entry) current = null
    if (entries.size === 0) {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
      frame = 0
    }
    schedule()
  }
}
