import Image from 'next/image'
import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import type { SiteLogoData } from '@/sanity/lib/settings'
import { type LogoAnimation, LottieLogo, VideoLogo } from './AnimatedLogo'

type SiteLogoProps = {
  logo: SiteLogoData | null | undefined
  siteName: string
  className?: string
  /** Logo acima da dobra: carrega com prioridade. */
  priority?: boolean
}

const FALLBACK = { url: '/brand/wordmark-white.png', width: 480, height: 229 }

/**
 * Logo configurado no painel: imagem (SVG, PNG ou GIF, que anima sozinho), vídeo curto ou Lottie.
 * Altura diferente no celular e no computador. Vídeo e Lottie animam sempre, só no hover
 * ou uma vez ao carregar.
 */
export function SiteLogo({ logo, siteName, className, priority = false }: SiteLogoProps) {
  const style = {
    '--logo-h-mobile': `${logo?.heightMobile ?? 22}px`,
    '--logo-h-desktop': `${logo?.heightDesktop ?? 28}px`,
  } as CSSProperties
  const sizing = 'block h-(--logo-h-mobile) w-auto md:h-(--logo-h-desktop)'
  const mode: LogoAnimation = logo?.animation ?? 'always'
  const image = logo?.image?.url ? logo.image : FALLBACK

  if (logo?.kind === 'lottie' && logo.lottie) {
    return (
      <LottieLogo
        src={logo.lottie}
        ratio={(image.width ?? FALLBACK.width) / (image.height ?? FALLBACK.height)}
        mode={mode}
        siteName={siteName}
        className={cn(sizing, className)}
        style={style}
      />
    )
  }

  if (logo?.kind === 'video' && (logo.video || logo.videoWebm || logo.videoHevc)) {
    return (
      <VideoLogo
        mp4={logo.video}
        webm={logo.videoWebm}
        hevc={logo.videoHevc}
        mode={mode}
        siteName={siteName}
        className={cn(sizing, className)}
        style={style}
      />
    )
  }

  const isVector = /\.svg(\?|$)/.test(image.url)
  return (
    <Image
      src={image.url}
      width={image.width ?? FALLBACK.width}
      height={image.height ?? FALLBACK.height}
      alt={siteName}
      preload={priority}
      unoptimized={isVector}
      sizes="160px"
      className={cn(sizing, className)}
      style={style}
    />
  )
}
