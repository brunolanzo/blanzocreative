'use client'

import { AppLink } from '@/components/navigation/AppLink'
import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import type { UiStrings } from '@/lib/ui-strings'
import type { SocialLink } from '@/sanity/lib/settings'
import { MenuPanel, type NavItem } from './MenuPanel'

type SiteHeaderProps = {
  logo: ReactNode
  siteName: string
  nav: NavItem[]
  socials: SocialLink[]
  email: string | null
  whatsappUrl: string | null
  ui: UiStrings
}

const MENU_ID = 'menu-principal'
const SCROLL_THRESHOLD = 24 // --nav-scroll-threshold

/**
 * Header da referência (Buff): fixo e transparente, logo à esquerda e um botão de menu.
 * Ao rolar, o logo some e o botão ganha o painel preto desfocado do DS.
 */
export function SiteHeader({ logo, siteName, nav, socials, email, whatsappUrl, ui }: SiteHeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  // O menu fica aberto só na página em que foi aberto: trocar de página fecha sozinho.
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const [panelMounted, setPanelMounted] = useState(false)
  const restoreFocus = useRef(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const open = openedOn === pathname

  useEffect(() => {
    let frame = 0
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    frame = requestAnimationFrame(update)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function openMenu() {
    setOpenedOn(pathname)
    setPanelMounted(true)
  }

  function closeMenu() {
    restoreFocus.current = true
    setOpenedOn(null)
  }

  function onPanelExited() {
    setPanelMounted(false)
    if (restoreFocus.current) buttonRef.current?.focus()
    restoreFocus.current = false
  }

  const logoHidden = scrolled && !open

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-(--z-header)">
        <div className="container-site flex items-center justify-between py-20">
          <AppLink
            href="/"
            aria-label={`${siteName}: ${ui.home}`}
            tabIndex={logoHidden ? -1 : undefined}
            aria-hidden={logoHidden || undefined}
            className={cn(
              'transition-opacity duration-400 ease-out',
              logoHidden ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100',
            )}
          >
            {logo}
          </AppLink>

          <button
            ref={buttonRef}
            type="button"
            onClick={openMenu}
            aria-expanded={open}
            aria-controls={MENU_ID}
            className={cn(
              'pointer-events-auto inline-flex min-h-44 items-center gap-12 rounded-pill border px-16 text-label font-medium uppercase',
              'transition-[background-color,border-color,color] duration-400 ease-out hover:text-flash-500',
              scrolled ? 'glass-panel border-hairline' : 'border-transparent',
            )}
          >
            <span>{ui.menuOpen}</span>
            <span aria-hidden className="inline-block text-h3 leading-none">
              +
            </span>
          </button>
        </div>
      </header>

      {panelMounted && (
        <MenuPanel
          id={MENU_ID}
          open={open}
          logo={logo}
          siteName={siteName}
          nav={nav}
          pathname={pathname}
          socials={socials}
          email={email}
          whatsappUrl={whatsappUrl}
          ui={ui}
          onClose={closeMenu}
          onExited={onPanelExited}
        />
      )}
    </>
  )
}
