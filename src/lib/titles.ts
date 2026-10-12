/** Título da aba: "Página · Nome do site". O layout usa o mesmo modelo, com "%s" no lugar da página. */
export const pageTitle = (title: string, siteName: string) => `${title} · ${siteName}`

/** "Trabalhos" ou, com filtro, "Trabalhos: Motion Design". */
export const workTitle = (base: string, tagName?: string | null) => (tagName ? `${base}: ${tagName}` : base)
