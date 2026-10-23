'use client'

import { useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/Button'
import { lastListUrl } from '@/lib/last-list'

const subscribe = () => () => {}

/** Volta para a lista de onde a pessoa veio, com o mesmo filtro (ou /work). */
export function BackToWork({ label }: { label: string }) {
  const href = useSyncExternalStore(subscribe, lastListUrl, () => '/work')
  return (
    <Button href={href} variant="outline">
      ← {label}
    </Button>
  )
}
