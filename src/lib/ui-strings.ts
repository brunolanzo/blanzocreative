/**
 * Textos fixos da interface (botões, rótulos, mensagens). O site é só em inglês.
 *
 * O valor real vem do painel: Configurações do site → Textos da interface.
 * Cada texto tem o nome do campo no painel (`label`, em português, dizendo onde ele aparece)
 * e o texto em inglês (`text`), que vale quando o campo está vazio e é o valor inicial do campo.
 * Tom do design system: rótulos curtos, verbo primeiro quando agem, sem ponto de exclamação.
 * Agrupados por tema, na mesma ordem do painel.
 */
export const UI_STRING_GROUPS = [
  {
    name: 'navigation',
    title: 'Navegação',
    strings: {
      skipToContent: { label: 'Pular para o conteúdo (teclado)', text: 'Skip to content' },
      menuOpen: { label: 'Abrir o menu', text: 'Menu' },
      menuClose: { label: 'Fechar o menu', text: 'Close' },
      navWork: { label: 'Trabalhos (menu)', text: 'Work' },
      navAbout: { label: 'Sobre (menu)', text: 'About' },
      navContact: { label: 'Contato (menu)', text: 'Contact' },
      home: { label: 'Início', text: 'Home' },
    },
  },
  {
    name: 'work',
    title: 'Trabalhos e filtros',
    strings: {
      sectionWork: { label: 'Título da seção de trabalhos (home)', text: 'Selected work' },
      filterLabel: { label: 'Filtrar trabalhos por disciplina (leitor de tela)', text: 'Filter work by discipline' },
      allTags: { label: 'Todos (filtro)', text: 'All' },
      viewAllWork: { label: 'Ver todos os trabalhos', text: 'All projects' },
      loadMore: { label: 'Carregar mais', text: 'Load more' },
      viewProject: { label: 'Ver projeto', text: 'View project' },
      emptyFilter: { label: 'Filtro sem trabalhos', text: 'Nothing under that filter yet.' },
    },
  },
  {
    name: 'project',
    title: 'Página de projeto',
    strings: {
      client: { label: 'Cliente', text: 'Client' },
      agency: { label: 'Agência', text: 'Agency' },
      year: { label: 'Ano', text: 'Year' },
      role: { label: 'Função', text: 'Role' },
      credits: { label: 'Créditos', text: 'Credits' },
      nextProject: { label: 'Próximo projeto', text: 'Next project' },
      related: { label: 'Relacionados', text: 'Related' },
      backToWork: { label: 'Voltar para os trabalhos', text: 'Back to work' },
      before: { label: 'Antes (antes e depois)', text: 'Before' },
      after: { label: 'Depois (antes e depois)', text: 'After' },
      compare: { label: 'Arraste para comparar (antes e depois)', text: 'Drag to compare' },
      gallery: { label: 'Galeria (leitor de tela)', text: 'Gallery' },
      previous: { label: 'Anterior (galeria)', text: 'Previous' },
      next: { label: 'Próximo (galeria)', text: 'Next' },
    },
  },
  {
    name: 'video',
    title: 'Vídeo',
    strings: {
      soundOn: { label: 'Ativar som', text: 'Sound on' },
      soundOff: { label: 'Desativar som', text: 'Sound off' },
      play: { label: 'Tocar', text: 'Play' },
      pause: { label: 'Pausar', text: 'Pause' },
    },
  },
  {
    name: 'homeSections',
    title: 'Seções da home',
    strings: {
      sectionClients: { label: 'Título da seção de clientes', text: 'Clients' },
      sectionAbout: { label: 'Título da seção Sobre', text: 'About' },
      aboutLink: { label: 'Link para a página Sobre', text: 'Meet the studio' },
    },
  },
  {
    name: 'about',
    title: 'Página Sobre',
    strings: {
      sectionTimeline: { label: 'Título da trajetória', text: 'Experience' },
      sectionAwards: { label: 'Título dos prêmios', text: 'Awards' },
    },
  },
  {
    name: 'contact',
    title: 'Contato e formulário',
    strings: {
      startProject: { label: 'Começar um projeto (botão do rodapé)', text: 'Start a project' },
      copyEmail: { label: 'Copiar e-mail', text: 'Copy email' },
      copied: { label: 'Copiado', text: 'Copied' },
      whatsapp: { label: 'WhatsApp', text: 'WhatsApp' },
      socialNetworks: { label: 'Redes', text: 'Social' },
      formName: { label: 'Formulário: nome', text: 'Name' },
      formEmail: { label: 'Formulário: e-mail', text: 'Email' },
      formCompany: { label: 'Formulário: empresa', text: 'Company' },
      formMessage: { label: 'Formulário: mensagem', text: 'The brief' },
      formProjectType: { label: 'Formulário: tipo de projeto', text: 'Project type' },
      formChoose: { label: 'Formulário: escolha uma opção', text: 'Choose one' },
      formOther: { label: 'Formulário: outro', text: 'Other' },
      formSend: { label: 'Formulário: enviar', text: 'Send it' },
      formSending: { label: 'Formulário: enviando', text: 'Sending…' },
      formError: {
        label: 'Formulário: erro ao enviar',
        text: 'That didn’t go through. Try again or write to the email above.',
      },
      formSendAnother: { label: 'Formulário: enviar outra mensagem', text: 'Send another' },
      formThanks: { label: 'Formulário: mensagem enviada', text: 'Got it. I’ll come back to you within two days.' },
      formSubject: { label: 'Assunto do e-mail que chega para você', text: 'New message from the website' },
      downloadCv: { label: 'Baixar CV', text: 'Download CV' },
    },
  },
  {
    name: 'misc',
    title: 'Outros',
    strings: {
      notFoundTitle: { label: 'Página não encontrada (título)', text: 'page not found' },
      notFoundLink: { label: 'Página não encontrada (link)', text: 'Back to home' },
      exitPreview: { label: 'Sair da pré-visualização', text: 'Exit preview' },
      cursorDrag: { label: 'Cursor sobre galeria e antes e depois', text: 'Drag' },
    },
  },
] as const

type Groups = typeof UI_STRING_GROUPS
type KeysOf<Group> = Group extends { strings: infer Strings } ? keyof Strings : never
export type UiStringKey = KeysOf<Groups[number]>
export type UiStrings = Record<UiStringKey, string>

export const DEFAULT_UI_STRINGS = Object.fromEntries(
  UI_STRING_GROUPS.flatMap((group) => Object.entries(group.strings).map(([key, { text }]) => [key, text])),
) as UiStrings

/** Junta os textos do painel com os padrões, ignorando campos vazios. */
export function resolveUiStrings(fromCms: Partial<Record<string, string | null>> | null | undefined): UiStrings {
  const resolved: UiStrings = { ...DEFAULT_UI_STRINGS }
  if (!fromCms) return resolved
  for (const key of Object.keys(resolved) as UiStringKey[]) {
    const value = fromCms[key]
    if (typeof value === 'string' && value.trim() !== '') resolved[key] = value
  }
  return resolved
}
