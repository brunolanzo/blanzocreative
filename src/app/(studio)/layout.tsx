import type { ReactNode } from 'react'

/** Layout raiz do painel: sem o CSS, as fontes e as animações do site. */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
