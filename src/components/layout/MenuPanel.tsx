'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { AppLink } from '@/components/navigation/AppLink'
import { type KeyboardEvent, type ReactNode, useRef } from 'react'
import { cn } from '@/lib/cn'
import { DURATION, EASE, prefersReducedMotion, STAGGER } from '@/lib/motion'
import { lockScroll, unlockScroll } from '@/lib/smooth-scroll'
import type { UiStrings } from '@/lib/ui-strings'
import type { SocialLink } from '@/sanity/lib/settings'
import { CopyEmail } from './CopyEmail'

export type NavItem = { href: string; label: string }

type MenuPanelProps = {
  id: string
  open: boolean
  logo: ReactNode
  siteName: string
  nav: NavItem[]
  pathname: string
  socials: SocialLink[]
  email: string | null
  whatsappUrl: string | null
  ui: UiStrings
  onClose: () => void
  /** Chamado quando a animação de saída termina (o painel pode sair da tela). */
  onExited: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Menu da referência (Buff): painel lateral pela direita (tela cheia no celular),
 * fundo escurecido, Esc fecha, scroll da página travado. Visual do DS: preto,
 * hairline, links grandes em minúsculas, vermelho-rosado só no hover e na página atual.
 */
export function MenuPanel({
  id,
  open,
  logo,
  siteName,
  nav,
  pathname,
  socials,
  email,
  whatsappUrl,
  ui,
  onClose,
  onExited,
}: MenuPanelProps) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduce = prefersReducedMotion()
      const q = gsap.utils.selector(root)

      if (open) {
        lockScroll()
        root.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus()
        if (reduce) return
        gsap
          .timeline()
          .fromTo(q('[data-overlay]'), { opacity: 0 }, { opacity: 1, duration: DURATION.base, ease: EASE.out })
          .fromTo(q('[data-panel]'), { xPercent: 100 }, { xPercent: 0, duration: DURATION.slow, ease: EASE.draw }, 0)
          .fromTo(
            q('[data-item]'),
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: DURATION.base, ease: EASE.out, stagger: STAGGER },
            DURATION.slow * 0.45,
          )
        return
      }

      const finish = () => {
        unlockScroll()
        onExited()
      }
      if (reduce) {
        finish()
        return
      }
      gsap
        .timeline({ onComplete: finish })
        .to(q('[data-panel]'), { xPercent: 100, duration: DURATION.base * 1.5, ease: EASE.draw })
        .to(q('[data-overlay]'), { opacity: 0, duration: DURATION.base, ease: EASE.out }, 0)
    },
    { dependencies: [open], scope: root },
  )

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab' || !root.current) return
    const items = Array.from(root.current.querySelectorAll<HTMLElement>(FOCUSABLE))
    if (items.length === 0) return
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      ref={root}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label={ui.menuOpen}
      className="fixed inset-0 z-(--z-menu)"
      onKeyDown={onKeyDown}
    >
      <div data-overlay aria-hidden className="absolute inset-0 bg-[var(--overlay-scrim)]" onClick={onClose} />

      <div
        data-panel
        className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto bg-page md:w-[clamp(34em,42vw,60em)] md:border-l md:border-hairline"
        data-lenis-prevent
      >
        <div className="flex items-center justify-between px-gutter py-20">
          <AppLink href="/" onClick={onClose} aria-label={`${siteName}: ${ui.home}`}>
            {logo}
          </AppLink>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            className="inline-flex min-h-44 items-center gap-12 rounded-pill border border-hairline px-16 text-label font-medium uppercase transition-colors duration-220 ease-out hover:text-flash-500"
          >
            <span>{ui.menuClose}</span>
            <span aria-hidden className="inline-block rotate-45 text-h3 leading-none">
              +
            </span>
          </button>
        </div>

        <nav aria-label={ui.menuOpen} className="flex flex-1 flex-col justify-between gap-64 px-gutter pt-48 pb-32">
          <ul className="flex flex-col gap-8">
            {nav.map((item) => {
              const current = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href} data-item>
                  <AppLink
                    href={item.href}
                    onClick={onClose}
                    aria-current={current ? 'page' : undefined}
                    className={cn(
                      'text-display-m font-medium lowercase transition-colors duration-220 ease-out hover:text-flash-500',
                      current && 'text-accent',
                    )}
                  >
                    {item.label}
                  </AppLink>
                </li>
              )
            })}
          </ul>

          <div data-item className="flex flex-col gap-16 border-t border-hairline pt-24 text-body-s text-fg-secondary">
            {email && <CopyEmail email={email} copyLabel={ui.copyEmail} copiedLabel={ui.copied} />}
            <ul className="flex flex-wrap gap-x-24 gap-y-8">
              {whatsappUrl && (
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="lowercase transition-colors duration-220 hover:text-flash-500">
                    {ui.whatsapp}
                  </a>
                </li>
              )}
              {socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} target="_blank" rel="noreferrer" className="lowercase transition-colors duration-220 hover:text-flash-500">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}
