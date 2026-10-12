'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, SelectField } from '@/components/ui/Field'
import type { UiStrings } from '@/lib/ui-strings'

type Status = 'idle' | 'sending' | 'sent' | 'error'

type ContactFormProps = {
  /** Chave pública do Web3Forms (NEXT_PUBLIC_WEB3FORMS_KEY). */
  accessKey: string
  successMessage: string
  /** Opções de "tipo de projeto": as tags do site. */
  projectTypes: string[]
  siteName: string
  ui: Pick<
    UiStrings,
    | 'formName'
    | 'formEmail'
    | 'formCompany'
    | 'formProjectType'
    | 'formChoose'
    | 'formOther'
    | 'formMessage'
    | 'formSend'
    | 'formSending'
    | 'formError'
    | 'formSendAnother'
    | 'formSubject'
  >
}

const ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * Formulário de contato pelo Web3Forms (grátis, sem servidor próprio): a mensagem chega no
 * e-mail cadastrado na chave. "Responder" no e-mail responde direto para quem escreveu.
 * Campo invisível "botcheck" contra robôs.
 */
export function ContactForm({ accessKey, successMessage, projectTypes, siteName, ui }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const result = useRef<HTMLDivElement>(null)

  // O formulário some depois do envio: o foco vai para a confirmação (teclado e leitor de tela não se perdem).
  useEffect(() => {
    if (status === 'sent') result.current?.focus()
  }, [status])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const body = new FormData(form)
    if (body.get('botcheck')) return
    body.append('access_key', accessKey)
    body.append('subject', `${ui.formSubject} · ${body.get('name') ?? ''}`)
    body.append('from_name', siteName)
    setStatus('sending')
    try {
      // Envio como formulário comum (sem cabeçalhos próprios): o navegador não precisa da consulta
      // prévia de CORS, que a proteção do Web3Forms às vezes barra. É o exemplo oficial deles para React.
      const response = await fetch(ENDPOINT, { method: 'POST', body })
      const result = (await response.json()) as { success?: boolean }
      if (!response.ok || !result.success) throw new Error('envio recusado')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div
        ref={result}
        role="status"
        tabIndex={-1}
        className="flex flex-col items-start gap-16 border-t border-flash-500 pt-24 outline-none"
      >
        <p className="text-body-l text-fg">{successMessage}</p>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
          {ui.formSendAnother}
        </Button>
      </div>
    )
  }

  const sending = status === 'sending'
  return (
    <form onSubmit={submit} className="flex flex-col gap-24">
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <Field label={ui.formName} name="name" required autoComplete="name" />
      <Field label={ui.formEmail} name="email" type="email" required autoComplete="email" />
      {/* Os nomes dos campos abaixo viram os rótulos no e-mail que chega. */}
      <Field label={ui.formCompany} name={ui.formCompany} autoComplete="organization" />
      <SelectField
        label={ui.formProjectType}
        name={ui.formProjectType}
        options={[...projectTypes, ui.formOther]}
        placeholder={ui.formChoose}
      />
      <Field label={ui.formMessage} name={ui.formMessage} rows={5} required />
      <div className="flex flex-col gap-12 pt-8">
        <Button type="submit" size="lg" full disabled={sending}>
          {sending ? ui.formSending : ui.formSend}
        </Button>
        {status === 'error' && (
          <p role="alert" className="text-body-s text-accent">
            {ui.formError}
          </p>
        )}
      </div>
    </form>
  )
}
