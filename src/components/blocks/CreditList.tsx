type Credit = { _key: string; role: string | null; name: string | null; url: string | null }

/** Ficha técnica: função à esquerda, nome à direita, separados por linhas finas (DS: linhas, não caixas). */
export function CreditList({ credits }: { credits: Credit[] | null | undefined }) {
  const list = credits?.filter((credit) => credit.name) ?? []
  if (list.length === 0) return null
  return (
    <dl className="border-t border-hairline">
      {list.map((credit) => (
        <div key={credit._key} className="grid grid-cols-2 gap-16 border-b border-hairline py-12">
          <dt className="text-body text-fg-secondary">{credit.role}</dt>
          <dd className="text-right text-body text-fg">
            {credit.url ? (
              <a href={credit.url} target="_blank" rel="noreferrer" className="link">
                {credit.name}
              </a>
            ) : (
              credit.name
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
