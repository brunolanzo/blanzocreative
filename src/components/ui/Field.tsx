'use client'

import { useId } from 'react'
import { cn } from '@/lib/cn'

/** Rótulo do DS: maiúsculas acima da linha; fica vermelho-rosado quando o campo está em foco. */
const LABEL =
  'text-label-s font-medium text-fg-secondary uppercase transition-colors duration-220 ease-out group-focus-within:text-flash-500'

/** Campo do DS: sem caixa, só a linha de baixo, que fica vermelho-rosado no foco (ela é o indicador de foco). */
const CONTROL =
  'w-full rounded-none border-0 border-b border-hairline bg-transparent px-0 pt-8 pb-12 text-body-l text-fg outline-none ' +
  'transition-colors duration-220 ease-out placeholder:text-fg-muted focus:border-flash-500 focus-visible:outline-none ' +
  'autofill:shadow-[inset_0_0_0_1000px_var(--surface-page)] autofill:[-webkit-text-fill-color:var(--text-primary)]'

type FieldProps = {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel'
  /** Com linhas, vira caixa de texto de várias linhas. */
  rows?: number
  required?: boolean
  autoComplete?: string
}

/** Campo de formulário do DS (componente Field). */
export function Field({ label, name, type = 'text', rows, required = false, autoComplete }: FieldProps) {
  const id = useId()
  return (
    <div className="group flex flex-col gap-4">
      <label htmlFor={id} className={LABEL}>
        {label}
        {required && ' *'}
      </label>
      {rows ? (
        <textarea id={id} name={name} rows={rows} required={required} className={cn(CONTROL, 'resize-y')} />
      ) : (
        <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} className={CONTROL} />
      )}
    </div>
  )
}

type SelectFieldProps = {
  label: string
  name: string
  options: string[]
  placeholder: string
}

/** Lista de opções no mesmo desenho do campo. O "+" é o sinal de "abre" da marca (o DS não usa ícones). */
export function SelectField({ label, name, options, placeholder }: SelectFieldProps) {
  const id = useId()
  return (
    <div className="group relative flex flex-col gap-4">
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <select id={id} name={name} defaultValue="" className={cn(CONTROL, 'appearance-none pr-24 [&>option]:bg-ink-900')}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-0 bottom-12 text-body-l text-fg-secondary">
        +
      </span>
    </div>
  )
}
