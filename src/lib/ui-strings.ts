/**
 * Textos fixos da interface (botões, rótulos, mensagens).
 *
 * O valor real vem do painel: Configurações do site → Textos da interface.
 * Os textos abaixo só aparecem se o campo estiver vazio no painel, e também
 * servem de valor inicial do campo. Agrupados por tema, na mesma ordem do painel.
 */
export const UI_STRING_GROUPS = [
  {
    name: 'navigation',
    title: 'Navegação',
    strings: {
      skipToContent: 'Pular para o conteúdo',
      menuOpen: 'Menu',
      menuClose: 'Fechar',
      navWork: 'Trabalhos',
      navAbout: 'Sobre',
      navContact: 'Contato',
      home: 'Início',
    },
  },
  {
    name: 'work',
    title: 'Trabalhos e filtros',
    strings: {
      sectionWork: 'Trabalhos',
      filterLabel: 'Filtrar trabalhos por disciplina',
      allTags: 'Todos',
      viewAllWork: 'Ver todos os trabalhos',
      loadMore: 'Carregar mais',
      viewProject: 'Ver projeto',
      emptyFilter: 'Nenhum trabalho com essa tag por enquanto.',
    },
  },
  {
    name: 'project',
    title: 'Página de projeto',
    strings: {
      client: 'Cliente',
      agency: 'Agência',
      year: 'Ano',
      role: 'Função',
      credits: 'Créditos',
      nextProject: 'Próximo projeto',
      related: 'Relacionados',
      backToWork: 'Voltar para os trabalhos',
      before: 'Antes',
      after: 'Depois',
      compare: 'Arraste para comparar',
      gallery: 'Galeria',
      previous: 'Anterior',
      next: 'Próximo',
    },
  },
  {
    name: 'video',
    title: 'Vídeo',
    strings: {
      soundOn: 'Ativar som',
      soundOff: 'Desativar som',
      play: 'Tocar',
      pause: 'Pausar',
    },
  },
  {
    name: 'homeSections',
    title: 'Seções da home',
    strings: {
      sectionClients: 'Clientes',
      sectionAbout: 'Sobre',
      aboutLink: 'Conheça o estúdio',
    },
  },
  {
    name: 'about',
    title: 'Página Sobre',
    strings: {
      sectionTimeline: 'Trajetória',
      sectionAwards: 'Prêmios e reconhecimentos',
    },
  },
  {
    name: 'contact',
    title: 'Contato e formulário',
    strings: {
      startProject: 'Começar um projeto',
      copyEmail: 'Copiar e-mail',
      copied: 'Copiado',
      whatsapp: 'WhatsApp',
      socialNetworks: 'Redes',
      formName: 'Nome',
      formEmail: 'E-mail',
      formCompany: 'Empresa',
      formMessage: 'Mensagem',
      formProjectType: 'Tipo de projeto',
      formChoose: 'Escolha uma opção',
      formOther: 'Outro',
      formSend: 'Enviar',
      formSending: 'Enviando…',
      formError: 'Não deu certo. Tente de novo ou escreva direto para o e-mail.',
      formSendAnother: 'Enviar outra mensagem',
      formThanks: 'Recebido. Obrigado pela mensagem!',
      formSubject: 'Nova mensagem pelo site',
      downloadCv: 'Baixar CV',
    },
  },
  {
    name: 'misc',
    title: 'Outros',
    strings: {
      notFoundTitle: 'página não encontrada',
      notFoundLink: 'Voltar para o início',
      exitPreview: 'Sair da pré-visualização',
      cursorDrag: 'Arraste',
    },
  },
] as const

type Groups = typeof UI_STRING_GROUPS
type KeysOf<Group> = Group extends { strings: infer Strings } ? keyof Strings : never
export type UiStringKey = KeysOf<Groups[number]>
export type UiStrings = Record<UiStringKey, string>

export const DEFAULT_UI_STRINGS = Object.assign(
  {},
  ...UI_STRING_GROUPS.map((group) => group.strings),
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
