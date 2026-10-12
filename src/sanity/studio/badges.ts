import { useEffect, useState } from 'react'
import { type DocumentBadgeComponent, type DocumentBadgesResolver, useClient } from 'sanity'
import { apiVersion } from '../env'

const FEATURED_QUERY = '*[_id == "siteSettings"][0].featuredProjects[]._ref'

/** Mostra "Destaque na home · 3" no topo do projeto, conforme a lista em Configurações → Home. */
const FeaturedBadge: DocumentBadgeComponent = ({ id }) => {
  const client = useClient({ apiVersion })
  const [position, setPosition] = useState<number>(-1)

  useEffect(() => {
    let active = true
    client.fetch<string[] | null>(FEATURED_QUERY).then((refs) => {
      if (active) setPosition(refs ? refs.indexOf(id) : -1)
    })
    return () => {
      active = false
    }
  }, [client, id])

  if (position < 0) return null
  return {
    label: `Destaque na home · ${position + 1}`,
    color: 'primary',
    title: 'Este projeto está nos destaques da home. Para mudar, vá em Configurações do site → Home.',
  }
}

const UnlistedBadge: DocumentBadgeComponent = ({ draft, published }) => {
  const visibility = (draft ?? published)?.visibility
  if (visibility !== 'unlisted') return null
  return {
    label: 'Não listado',
    color: 'warning',
    title: 'Fora dos grids e do sitemap. Só abre pelo link direto.',
  }
}

export const resolveBadges: DocumentBadgesResolver = (previous, context) =>
  context.schemaType === 'project' ? [...previous, FeaturedBadge, UnlistedBadge] : previous
