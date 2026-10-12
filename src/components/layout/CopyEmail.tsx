'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

type CopyEmailProps = {
  email: string
  copyLabel: string
  copiedLabel: string
  className?: string
}

/** E-mail como link mailto + botão de copiar, com aviso "copiado" para leitores de tela. */
export function CopyEmail({ email, copyLabel, copiedLabel, className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <span className={cn('inline-flex flex-wrap items-baseline gap-12', className)}>
      <a href={`mailto:${email}`} className="link">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className={cn(
          'text-label-s font-medium uppercase transition-colors duration-220 ease-out hover:text-flash-500',
          copied ? 'text-accent' : 'text-fg-secondary',
        )}
      >
        {copied ? copiedLabel : copyLabel}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ''}
      </span>
    </span>
  )
}
