import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { CaseIcon } from '@sanity/icons/Case'
import { CogIcon } from '@sanity/icons/Cog'
import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { ProjectsIcon } from '@sanity/icons/Projects'
import { TagIcon } from '@sanity/icons/Tag'
import { UserIcon } from '@sanity/icons/User'
import type { ComponentType } from 'react'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'

function singleton(S: StructureBuilder, id: string, title: string, icon: ComponentType) {
  return S.listItem()
    .title(title)
    .id(id)
    .icon(icon)
    .child(S.document().schemaType(id).documentId(id).title(title))
}

/** Barra lateral do painel: Projetos, Tags, Clientes, Sobre, Contato, Configurações. */
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Conteúdo')
    .items([
      orderableDocumentListDeskItem({ type: 'project', title: 'Projetos', icon: ProjectsIcon, S, context }),
      orderableDocumentListDeskItem({ type: 'tag', title: 'Tags', icon: TagIcon, S, context }),
      orderableDocumentListDeskItem({ type: 'client', title: 'Clientes', icon: CaseIcon, S, context }),
      S.divider(),
      singleton(S, 'aboutPage', 'Página Sobre', UserIcon),
      singleton(S, 'contactPage', 'Página Contato', EnvelopeIcon),
      singleton(S, 'siteSettings', 'Configurações do site', CogIcon),
    ])
