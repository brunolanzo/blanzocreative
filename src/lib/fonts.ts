import { Manrope } from 'next/font/google'

/**
 * Manrope: fonte gratuita (SIL Open Font License) no lugar do Aeonik Pro (docs/tokens.md §8).
 * O next/font baixa a fonte no build e a serve do próprio site, com fonte reserva de métricas ajustadas.
 */
export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})
