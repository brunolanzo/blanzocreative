/** Listas de opções reaproveitadas pelos blocos do construtor. */

export type Option<V extends string = string> = { title: string; value: V }

export const BLOCK_WIDTHS = [
  { title: 'Ponta a ponta', value: 'full' },
  { title: 'Largura do conteúdo', value: 'content' },
  { title: 'Estreita', value: 'narrow' },
] as const satisfies readonly Option[]

export const SPACINGS = [
  { title: 'Pequeno', value: 'sm' },
  { title: 'Médio', value: 'md' },
  { title: 'Grande', value: 'lg' },
] as const satisfies readonly Option[]

/** Fundos permitidos: só tokens do design system. */
export const BACKGROUNDS = [
  { title: 'Preto (padrão)', value: 'page' },
  { title: 'Preto elevado', value: 'card' },
  { title: 'Superfície', value: 'raised' },
  { title: 'Branco (tema claro do DS, para peças impressas)', value: 'light' },
] as const satisfies readonly Option[]

export const ASPECT_RATIOS = [
  { title: '16:9 (horizontal)', value: '16:9' },
  { title: '9:16 (vertical, stories)', value: '9:16' },
  { title: '1:1 (quadrado)', value: '1:1' },
  { title: '4:5 (vertical, feed)', value: '4:5' },
  { title: '21:9 (cinema)', value: '21:9' },
  { title: 'Original (proporção do arquivo)', value: 'original' },
] as const satisfies readonly Option[]

export const GAPS = [
  { title: 'Sem espaço', value: 'none' },
  { title: 'Pequeno', value: 'sm' },
  { title: 'Médio', value: 'md' },
  { title: 'Grande', value: 'lg' },
] as const satisfies readonly Option[]

export function titleOf(list: readonly Option[], value: unknown): string {
  return list.find((item) => item.value === value)?.title ?? ''
}
