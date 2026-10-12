'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type ComponentPropsWithoutRef, type ReactNode, type RefObject, useRef } from 'react'
import { DURATION, EASE, prefersReducedMotion, REVEAL_DISTANCE, STAGGER } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

type RevealTag = 'div' | 'section' | 'ul' | 'ol' | 'header' | 'footer' | 'dl'

type RevealProps = { as?: RevealTag; children: ReactNode } & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

/**
 * Grupo que aparece ao rolar (padrão da Buff com os valores do DS): cada filho sobe 16px com fade,
 * em --dur-base, --ease-out e 80ms entre irmãos, quando chega a ~85% da altura da tela. Uma vez só.
 * O que já está na tela quando a página abre fica como está (não pisca e não atrasa a primeira pintura).
 * Com movimento reduzido, nada se mexe.
 */
export function Reveal({ as = 'div', children, ...props }: RevealProps) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const element = root.current
      if (!element || prefersReducedMotion()) return
      const items = Array.from(element.children).filter(
        (item): item is HTMLElement => item instanceof HTMLElement && item.getBoundingClientRect().top > window.innerHeight,
      )
      if (items.length === 0) return
      gsap.set(items, { opacity: 0, y: REVEAL_DISTANCE })
      ScrollTrigger.batch(items, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
            ease: EASE.out,
            stagger: STAGGER,
            overwrite: true,
            clearProps: 'opacity,transform',
          }),
      })
    },
    { scope: root },
  )

  // Todas as tags aceitas são elementos de bloco comuns: tipar como div basta para o ref.
  const Tag = as as 'div'
  return (
    <Tag ref={root as RefObject<HTMLDivElement>} {...props}>
      {children}
    </Tag>
  )
}
