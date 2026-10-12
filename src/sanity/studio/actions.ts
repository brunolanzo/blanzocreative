import type { DocumentActionComponent, DocumentActionProps, DocumentActionsResolver, SanityDocument } from 'sanity'
import { SINGLETON_TYPES } from '../schemaTypes'

const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

type DuplicateProps = DocumentActionProps & { mapDocument?: (document: SanityDocument) => SanityDocument }

/** A cópia ganha "(cópia)" no título, fica sem endereço e entra logo abaixo do original. */
function cleanProjectCopy(document: SanityDocument): SanityDocument {
  const rank = document.orderRank
  return {
    ...document,
    title: typeof document.title === 'string' ? `${document.title} (cópia)` : document.title,
    slug: undefined,
    orderRank: typeof rank === 'string' ? `${rank}i` : undefined,
  }
}

function withCleanCopy(original: DocumentActionComponent): DocumentActionComponent {
  const DuplicateProject: DocumentActionComponent = (props) =>
    original({ ...props, mapDocument: cleanProjectCopy } as DuplicateProps)
  DuplicateProject.action = original.action
  return DuplicateProject
}

export const resolveActions: DocumentActionsResolver = (previous, context) => {
  if (SINGLETON_TYPES.has(context.schemaType)) {
    return previous.filter(({ action }) => action !== undefined && SINGLETON_ACTIONS.has(action))
  }
  if (context.schemaType === 'project') {
    return previous.map((action) => (action.action === 'duplicate' ? withCleanCopy(action) : action))
  }
  return previous
}
