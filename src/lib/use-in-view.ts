'use client'

import { type RefObject, useEffect, useState } from 'react'

/**
 * O elemento está na tela? (com margem, para começar a carregar um pouco antes).
 * `threshold` é a fração do elemento que precisa aparecer (0 = qualquer pedaço).
 * Com `once`, vira true na primeira vez que aparece e fica assim.
 */
export function useInView<T extends Element>(
  target: RefObject<T | null>,
  { rootMargin = '0px', threshold = 0, once = false }: { rootMargin?: string; threshold?: number; once?: boolean } = {},
): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = target.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        // isIntersecting já é true com 1px na tela; a fração pedida vem do intersectionRatio.
        const visible = entry.isIntersecting && entry.intersectionRatio >= threshold - 0.01
        if (once) {
          if (!visible) return
          setInView(true)
          observer.disconnect()
          return
        }
        setInView(visible)
      },
      { rootMargin, threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [target, rootMargin, threshold, once])

  return inView
}
