import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'
import { readToken } from '@/sanity/lib/token'

/**
 * Liga a pré-visualização (rascunhos) quando o painel abre o site na aba "Pré-visualizar".
 * O painel manda um segredo temporário, conferido aqui com o token de leitura.
 */
const draftMode = readToken ? defineEnableDraftMode({ client: client.withConfig({ token: readToken }) }) : null

export async function GET(request: Request) {
  if (!draftMode) {
    return new Response('Pré-visualização desligada: falta SANITY_API_READ_TOKEN (veja .env.example).', {
      status: 500,
    })
  }
  return draftMode.GET(request)
}
