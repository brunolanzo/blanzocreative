import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
  _type?: string
  slug?: string | null
}

/**
 * Chamado pelo webhook do Sanity sempre que algo é publicado.
 * Expira o cache das páginas que usam aquele tipo de conteúdo: o site atualiza
 * sozinho, sem novo deploy. Configuração do webhook no README.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET não configurado' }, { status: 500 })
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(request, secret)
    if (!isValidSignature) {
      return NextResponse.json({ message: 'Assinatura inválida' }, { status: 401 })
    }
    if (!body?._type) {
      return NextResponse.json({ message: 'Payload sem _type' }, { status: 400 })
    }

    const tags = [body._type]
    if (body.slug) tags.push(`${body._type}:${body.slug}`)
    for (const tag of tags) revalidateTag(tag, { expire: 0 })

    return NextResponse.json({ revalidated: tags, now: Date.now() })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({ message }, { status: 500 })
  }
}
