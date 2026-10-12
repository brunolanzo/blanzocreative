import { AppLink } from '@/components/navigation/AppLink'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const BASE =
  'inline-flex items-center justify-center gap-8 whitespace-nowrap rounded-pill border font-medium uppercase ' +
  'transition-[background-color,color,border-color,transform] duration-220 ease-out active:scale-[.97] ' +
  'disabled:cursor-not-allowed disabled:opacity-35'

/** Tamanhos do componente Button do DS. */
const SIZES = {
  sm: 'px-16 py-8 text-label-s',
  md: 'px-[26px] py-[13px] text-label',
  lg: 'px-[36px] py-[18px] text-[0.8125rem] tracking-label',
} as const

/** Variantes do DS: primary (branco que vira vermelho-rosado), accent, outline, ghost. */
const VARIANTS = {
  primary:
    'border-paper bg-paper text-ink-1000 hover:border-flash-500 hover:bg-flash-500 hover:text-paper active:border-flash-600 active:bg-flash-600',
  accent: 'border-flash-500 bg-flash-500 text-paper hover:border-flash-400 hover:bg-flash-400 active:bg-flash-600',
  outline: 'border-strong bg-transparent text-fg hover:border-paper',
  ghost: 'border-transparent bg-transparent text-fg hover:text-flash-500',
} as const

type Common = {
  children: ReactNode
  variant?: keyof typeof VARIANTS
  size?: keyof typeof SIZES
  full?: boolean
  className?: string
}

type AsLink = Common & { href: string } & Omit<ComponentPropsWithoutRef<typeof AppLink>, 'href' | 'className' | 'children'>
type AsButton = Common & { href?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>

/** Botão em pílula do DS. Com `href`, vira link. Rótulos curtos (1 a 3 palavras), em maiúsculas. */
export function Button(props: AsLink | AsButton) {
  const { children, variant = 'primary', size = 'md', full = false, className, ...rest } = props
  const classes = cn(BASE, SIZES[size], VARIANTS[variant], full && 'w-full', className)

  if ('href' in rest && rest.href !== undefined) {
    return (
      <AppLink className={classes} {...(rest as Omit<AsLink, keyof Common>)}>
        {children}
      </AppLink>
    )
  }
  return (
    <button type="button" className={classes} {...(rest as Omit<AsButton, keyof Common>)}>
      {children}
    </button>
  )
}
