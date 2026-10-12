import { AppLink } from '@/components/navigation/AppLink'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const SIZES = {
  sm: 'px-[10px] py-4 text-label-s',
  md: 'px-[14px] py-[6px] text-label',
} as const

const TONES = {
  default: 'border-hairline text-fg-secondary',
  accent: 'border-flash-500 text-accent',
  solid: 'border-paper bg-paper text-ink-1000',
} as const

type TagProps = {
  children: ReactNode
  size?: keyof typeof SIZES
  tone?: keyof typeof TONES
  /** Com href, a tag vira link (fica vermelho-rosado no hover, regra do DS). */
  href?: string
  className?: string
}

/** Pílula de disciplina do DS (contorno fino, maiúsculas). */
export function Tag({ children, size = 'md', tone = 'default', href, className }: TagProps) {
  const classes = cn(
    'inline-flex items-center rounded-pill border font-medium uppercase leading-none',
    SIZES[size],
    TONES[tone],
    href && 'transition-colors duration-220 ease-out hover:border-flash-500 hover:text-flash-500',
    className,
  )
  if (href) {
    return (
      <AppLink href={href} className={classes}>
        {children}
      </AppLink>
    )
  }
  return <span className={classes}>{children}</span>
}
