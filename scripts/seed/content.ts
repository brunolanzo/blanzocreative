/**
 * Conteúdo de exemplo do seed. Clientes dos projetos são FICTÍCIOS, para nunca
 * atribuir um trabalho inventado a uma marca real. As marcas reais entram só como
 * documentos Cliente, com o nome (sem logo).
 */

export type MediaKey = string

export type BlockSpec =
  | { type: 'videoBlock'; video: MediaKey; label: string; aspect?: string; width?: string; controls?: boolean }
  | { type: 'imageBlock'; image: MediaKey; alt: string; width?: string }
  | { type: 'mosaicBlock'; layout: string; items: MediaSpec[]; gap?: string; width?: string }
  | { type: 'splitBlock'; ratio: string; left: MediaSpec; right: MediaSpec; width?: string }
  | { type: 'beforeAfterBlock'; before: MediaKey; after: MediaKey; alt: string; start?: number; orientation?: string }
  | { type: 'compositionBlock'; items: Array<MediaSpec & { colStart: number; colSpan: number; offset: string }> }
  | { type: 'galleryBlock'; items: MediaSpec[]; height?: string }
  | { type: 'textBlock'; heading?: string; paragraphs: string[]; align?: string }
  | { type: 'quoteBlock'; quote: string; author: string; role: string }
  | { type: 'creditsBlock'; heading: string; credits: CreditSpec[] }
  | { type: 'embedBlock'; url: string; title: string }
  | { type: 'spacerBlock'; size: string; divider: boolean }

export type MediaSpec =
  | { kind: 'image'; key: MediaKey; alt: string }
  | { kind: 'video'; key: MediaKey; label: string; poster?: MediaKey }

export type CreditSpec = { role: string; name: string; url?: string }

export type ProjectSpec = {
  slug: string
  title: string
  subtitle: string
  client?: string
  agency?: string
  year: number
  role: string
  tags: string[]
  intro: string[]
  hero: MediaSpec
  thumbnail?: MediaSpec
  preview?: MediaKey
  body: BlockSpec[]
  credits: CreditSpec[]
}

export const TAGS = [
  { slug: 'direcao-criativa', name: 'Direção Criativa', description: 'Da ideia ao último frame: conceito, roteiro e direção de equipe.' },
  { slug: 'motion-design', name: 'Motion Design', description: 'Animação 2D, tipografia em movimento e marcas que se mexem.' },
  { slug: 'ia', name: 'Inteligência Artificial', description: 'Imagens, filmes e pesquisa visual com IA, com direção de verdade.' },
  { slug: 'animacao-3d', name: 'Animação 3D', description: 'Produto, personagem e cenário em 3D, do modelo ao render.' },
  { slug: 'fotografia', name: 'Fotografia', description: 'Campanha, produto e retrato, em estúdio ou em locação.' },
  { slug: 'direcao-de-arte', name: 'Direção de Arte', description: 'Linguagem visual, referências e cuidado com cada quadro.' },
  { slug: 'campanha-publicitaria', name: 'Campanha Publicitária', description: 'Peças para TV, digital e ponto de venda, pensadas como uma família.' },
  { slug: 'producao-de-video', name: 'Produção e Captação de Vídeo', description: 'Equipe, câmera, locação, edição e finalização, de ponta a ponta.' },
]

/** Marcas reais (seção 1 da especificação): só o nome, sem logo. Aparecem na faixa de clientes. */
export const REAL_CLIENTS = [
  { id: 'uber', name: 'Uber' },
  { id: 'warner-bros-discovery', name: 'Warner Bros. Discovery' },
  { id: 'xp-investimentos', name: 'XP Investimentos' },
  { id: 'tv-globo', name: 'TV Globo' },
  { id: 'editora-abril', name: 'Editora Abril' },
  { id: 'keeta', name: 'Keeta' },
]

/** Clientes fictícios, usados só nos projetos de exemplo. Ficam fora da faixa de clientes. */
export const FICTIONAL_CLIENTS = [
  { id: 'ondina-bebidas', name: 'Ondina Bebidas' },
  { id: 'vetra-mobilidade', name: 'Vetra Mobilidade' },
  { id: 'pilar-banco-digital', name: 'Pilar Banco Digital' },
  { id: 'kairo-games', name: 'Kairo Games' },
  { id: 'solano-energia', name: 'Solano Energia' },
  { id: 'brisamar-cosmeticos', name: 'Brisamar Cosméticos' },
  { id: 'nimbo-seguros', name: 'Nimbo Seguros' },
  { id: 'tecela-moda', name: 'Tecelã Moda' },
]

const img = (key: MediaKey, alt: string): MediaSpec => ({ kind: 'image', key, alt })
const vid = (key: MediaKey, label: string, poster?: MediaKey): MediaSpec => ({ kind: 'video', key, label, poster })

/** Projeto-modelo: usa TODOS os tipos de bloco do construtor. */
const FULL_TEMPLATE: BlockSpec[] = [
  { type: 'videoBlock', video: 'video-16x9', label: 'Filme da nova marca em movimento', aspect: '16:9', width: 'full' },
  {
    type: 'textBlock',
    heading: 'O desafio',
    paragraphs: [
      'A Vetra trocou de marca e precisava que ela se mexesse do mesmo jeito em todo lugar: app, painel do carro, redes e evento.',
      'Comecei pelo comportamento do logo e só depois desenhei as telas. Primeiro o movimento, depois o layout.',
    ],
  },
  { type: 'imageBlock', image: 'img-21x9', alt: 'Quadro em formato cinema com a marca aplicada', width: 'full' },
  {
    type: 'mosaicBlock',
    layout: 'cols-3',
    gap: 'md',
    items: [
      img('img-1x1-a', 'Estudo de animação do logo, quadro 1'),
      img('img-1x1-b', 'Estudo de animação do logo, quadro 2'),
      vid('video-1x1', 'Loop do símbolo girando'),
    ],
  },
  {
    type: 'splitBlock',
    ratio: '60-40',
    left: img('img-4x5-a', 'Tela do aplicativo com a nova marca'),
    right: vid('video-9x16', 'Vinheta vertical para stories'),
  },
  { type: 'beforeAfterBlock', before: 'img-before', after: 'img-after', alt: 'Comparação entre a marca antiga e a nova', start: 50, orientation: 'horizontal' },
  {
    type: 'compositionBlock',
    items: [
      { ...img('img-4x5-b', 'Cartaz do lançamento'), colStart: 1, colSpan: 5, offset: 'none' },
      { ...img('img-3x2', 'Painel do carro com a interface animada'), colStart: 7, colSpan: 6, offset: 'md' },
      { ...img('gif-4x3', 'GIF do ícone de carregamento'), colStart: 3, colSpan: 4, offset: 'lg' },
    ],
  },
  {
    type: 'galleryBlock',
    height: 'md',
    items: [
      img('img-4x5-a', 'Peça para redes, versão 1'),
      img('img-4x5-b', 'Peça para redes, versão 2'),
      img('img-4x5-c', 'Peça para redes, versão 3'),
      img('img-1x1-c', 'Peça quadrada para o feed'),
    ],
  },
  { type: 'imageBlock', image: 'gif-4x3', alt: 'GIF animado de exemplo (deve continuar animado no site)', width: 'narrow' },
  {
    type: 'quoteBlock',
    quote: 'Pela primeira vez a marca parece a mesma em todo lugar. E parece viva.',
    author: 'Carla Menezes',
    role: 'Head de Marca, Vetra Mobilidade',
  },
  {
    type: 'creditsBlock',
    heading: 'Equipe de animação',
    credits: [
      { role: 'Animação 2D', name: 'Rafael Lima' },
      { role: 'Animação 3D', name: 'Júlia Prado' },
      { role: 'Trilha', name: 'Estúdio Grave' },
    ],
  },
  { type: 'embedBlock', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', title: 'Embed de exemplo: Big Buck Bunny (Blender Foundation)' },
  { type: 'spacerBlock', size: 'lg', divider: true },
  {
    type: 'textBlock',
    heading: 'O resultado',
    paragraphs: ['Um sistema de movimento que a equipe interna usa sozinha: 40 animações-base, um guia e arquivos prontos para cada canal.'],
  },
]

export const PROJECTS: ProjectSpec[] = [
  {
    slug: 'verao-em-movimento',
    title: 'Verão em movimento',
    subtitle: 'Campanha de lançamento do sabor maracujá',
    client: 'ondina-bebidas',
    agency: 'Agência Norte',
    year: 2025,
    role: 'Direção criativa e motion design',
    tags: ['campanha-publicitaria', 'motion-design', 'producao-de-video'],
    intro: [
      'Um verão inteiro em 30 segundos. Filmei a lata em estúdio, animei o líquido em 3D e montei uma família de peças para TV, redes e ponto de venda.',
    ],
    hero: vid('video-16x9', 'Filme de 30 segundos da campanha'),
    preview: 'preview-3x2',
    body: [
      { type: 'videoBlock', video: 'video-16x9', label: 'Versão de 15 segundos', aspect: '16:9', width: 'content' },
      {
        type: 'mosaicBlock',
        layout: 'cols-3',
        items: [
          img('img-1x1-a', 'Lata em fundo preto, quadro 1'),
          img('img-1x1-b', 'Lata em fundo preto, quadro 2'),
          img('img-1x1-c', 'Lata em fundo preto, quadro 3'),
        ],
      },
      { type: 'textBlock', heading: 'Como foi feito', paragraphs: ['Dois dias de estúdio, uma semana de 3D e uma regra: cada peça tinha de funcionar sem som.'] },
    ],
    credits: [
      { role: 'Direção criativa', name: 'Blanzo' },
      { role: 'Direção de fotografia', name: 'Marina Costa' },
      { role: 'Trilha', name: 'Estúdio Grave' },
    ],
  },
  {
    slug: 'identidade-em-movimento',
    title: 'Identidade em movimento',
    subtitle: 'Sistema de motion para a nova marca (projeto-modelo com todos os blocos)',
    client: 'vetra-mobilidade',
    year: 2025,
    role: 'Direção de arte e motion design',
    tags: ['motion-design', 'direcao-de-arte'],
    intro: [
      'Uma marca nova que precisava nascer se mexendo. Desenhei o comportamento do logo, as transições e um guia de movimento para o time interno.',
      'Este projeto usa todos os tipos de bloco do painel. Serve de modelo para montar os seus.',
    ],
    hero: img('img-16x9', 'Logo da Vetra em movimento sobre fundo preto'),
    preview: 'preview-3x2',
    body: FULL_TEMPLATE,
    credits: [
      { role: 'Direção de arte', name: 'Blanzo' },
      { role: 'Motion design', name: 'Blanzo' },
      { role: 'Animação 3D', name: 'Júlia Prado' },
    ],
  },
  {
    slug: 'o-banco-no-bolso',
    title: 'O banco no bolso',
    subtitle: 'Filme de marca com imagens geradas por IA',
    client: 'pilar-banco-digital',
    agency: 'Estúdio Faro',
    year: 2026,
    role: 'Direção criativa e IA',
    tags: ['campanha-publicitaria', 'direcao-criativa', 'ia'],
    intro: [
      'Cenas de cidade que não existem, geradas e dirigidas quadro a quadro. A IA fez o pesado; a direção decidiu o que ficava.',
    ],
    hero: vid('video-16x9', 'Filme de marca de 45 segundos'),
    preview: 'preview-3x2',
    body: [
      { type: 'imageBlock', image: 'img-16x9', alt: 'Cena gerada por IA de uma rua à noite', width: 'full' },
      { type: 'splitBlock', ratio: '50-50', left: img('img-4x5-a', 'Personagem gerado, versão inicial'), right: img('img-4x5-b', 'Personagem gerado, versão final') },
      { type: 'quoteBlock', quote: 'Parecia impossível fazer isso em três semanas.', author: 'Paulo Antunes', role: 'Diretor de Marketing, Pilar Banco Digital' },
    ],
    credits: [
      { role: 'Direção criativa', name: 'Blanzo' },
      { role: 'Montagem', name: 'Rafael Lima' },
    ],
  },
  {
    slug: 'atlas-de-texturas',
    title: 'Atlas de texturas',
    subtitle: 'Pesquisa visual com IA para o mundo de um jogo',
    client: 'kairo-games',
    year: 2025,
    role: 'Direção de arte, IA e 3D',
    tags: ['ia', 'animacao-3d'],
    intro: ['Mais de 400 texturas geradas, curadas e levadas para o 3D. O resultado virou a bíblia visual do jogo.'],
    hero: img('img-16x9', 'Painel com dezenas de texturas geradas'),
    body: [
      {
        type: 'mosaicBlock',
        layout: 'cols-4',
        gap: 'sm',
        items: [
          img('img-1x1-a', 'Textura de pedra'),
          img('img-1x1-b', 'Textura de metal'),
          img('img-1x1-c', 'Textura de tecido'),
          img('img-1x1-a', 'Textura de madeira'),
        ],
      },
      { type: 'videoBlock', video: 'video-1x1', label: 'Material aplicado num objeto 3D girando', aspect: '1:1', width: 'narrow' },
    ],
    credits: [{ role: 'Direção de arte', name: 'Blanzo' }],
  },
  {
    slug: 'linha-solar',
    title: 'Linha solar',
    subtitle: 'Lançamento de produto em 3D',
    client: 'solano-energia',
    year: 2024,
    role: 'Animação 3D e motion design',
    tags: ['animacao-3d', 'motion-design'],
    intro: ['Um painel solar explicado sem ninguém precisar ler: tudo se monta na frente da câmera.'],
    hero: vid('video-16x9', 'Animação do painel solar se montando'),
    preview: 'preview-3x2',
    body: [
      { type: 'videoBlock', video: 'video-16x9', label: 'Explodido técnico do produto', aspect: '16:9', width: 'full' },
      { type: 'textBlock', heading: 'O processo', paragraphs: ['Modelagem a partir do CAD da engenharia, luz de estúdio e um único movimento de câmera.'] },
    ],
    credits: [
      { role: 'Animação 3D', name: 'Blanzo' },
      { role: 'Sound design', name: 'Estúdio Grave' },
    ],
  },
  {
    slug: 'retratos-da-costa',
    title: 'Retratos da costa',
    subtitle: 'Campanha fotográfica de verão',
    client: 'brisamar-cosmeticos',
    year: 2024,
    role: 'Fotografia e direção de arte',
    tags: ['fotografia', 'direcao-de-arte'],
    intro: ['Três dias, duas praias e luz natural. Retratos sem retoque pesado para uma linha de protetores.'],
    hero: img('img-16x9', 'Retrato em contraluz na praia'),
    body: [
      {
        type: 'galleryBlock',
        height: 'lg',
        items: [
          img('img-4x5-a', 'Retrato 1, luz do fim da tarde'),
          img('img-4x5-b', 'Retrato 2, contraluz'),
          img('img-4x5-c', 'Retrato 3, sombra de guarda-sol'),
        ],
      },
      { type: 'imageBlock', image: 'img-3x2', alt: 'Produto na areia com luz dura', width: 'content' },
    ],
    credits: [
      { role: 'Fotografia', name: 'Blanzo' },
      { role: 'Produção de moda', name: 'Ana Ribeiro' },
    ],
  },
  {
    slug: 'sem-letra-miuda',
    title: 'Sem letra miúda',
    subtitle: 'Comerciais para TV e digital',
    client: 'nimbo-seguros',
    agency: 'Agência Norte',
    year: 2023,
    role: 'Direção e captação',
    tags: ['campanha-publicitaria', 'producao-de-video'],
    intro: ['Três filmes de 30 segundos sobre o que o seguro cobre de verdade, gravados em um dia só.'],
    hero: vid('video-16x9', 'Comercial de 30 segundos'),
    body: [
      { type: 'videoBlock', video: 'video-16x9', label: 'Filme 2 da série', aspect: '16:9', width: 'content', controls: true },
      { type: 'splitBlock', ratio: '50-50', left: vid('video-9x16', 'Corte vertical para redes'), right: img('img-4x5-c', 'Frame do set') },
    ],
    credits: [
      { role: 'Direção', name: 'Blanzo' },
      { role: 'Produção', name: 'Marina Costa' },
    ],
  },
  {
    slug: 'colecao-trama',
    title: 'Coleção Trama',
    subtitle: 'Lookbook e filme de coleção',
    client: 'tecela-moda',
    year: 2025,
    role: 'Direção criativa, fotografia e vídeo',
    tags: ['fotografia', 'direcao-criativa', 'producao-de-video'],
    intro: ['Um set, duas câmeras: o lookbook e o filme da coleção saíram do mesmo dia de gravação.'],
    hero: img('img-16x9', 'Modelo com a coleção em estúdio'),
    preview: 'preview-3x2',
    body: [
      {
        type: 'compositionBlock',
        items: [
          { ...img('img-4x5-a', 'Look 1'), colStart: 1, colSpan: 4, offset: 'none' },
          { ...img('img-4x5-b', 'Look 2'), colStart: 6, colSpan: 4, offset: 'lg' },
          { ...img('img-4x5-c', 'Look 3'), colStart: 10, colSpan: 3, offset: 'sm' },
        ],
      },
      { type: 'videoBlock', video: 'video-9x16', label: 'Filme vertical da coleção', aspect: '9:16', width: 'narrow' },
    ],
    credits: [
      { role: 'Direção criativa', name: 'Blanzo' },
      { role: 'Styling', name: 'Ana Ribeiro' },
    ],
  },
  {
    slug: 'vinhetas-de-temporada',
    title: 'Vinhetas de temporada',
    subtitle: 'Pacote de abertura para a nova temporada',
    client: 'kairo-games',
    year: 2023,
    role: 'Motion design e 3D',
    tags: ['motion-design', 'animacao-3d'],
    intro: ['Abertura, cartelas e transições para seis meses de transmissões ao vivo.'],
    hero: vid('video-16x9', 'Abertura da temporada'),
    thumbnail: vid('preview-3x2', 'Loop da abertura', 'thumb-vinhetas-de-temporada'),
    body: [
      { type: 'mosaicBlock', layout: 'cols-2', items: [vid('video-1x1', 'Cartela animada 1'), img('img-1x1-b', 'Cartela estática')] },
    ],
    credits: [{ role: 'Motion design', name: 'Blanzo' }],
  },
  {
    slug: 'manifesto',
    title: 'Manifesto',
    subtitle: 'Projeto autoral sobre fazer tudo com uma cabeça só',
    year: 2026,
    role: 'Direção, roteiro, IA e montagem',
    tags: ['direcao-criativa', 'ia'],
    intro: ['Um filme curto sobre o estúdio, feito do jeito que o estúdio trabalha: do roteiro à cor, sem repasse.'],
    hero: vid('video-16x9', 'Filme manifesto'),
    body: [
      { type: 'textBlock', heading: 'Por que um manifesto', paragraphs: ['Para explicar em dois minutos o que uma lista de serviços não explica.'], align: 'center' },
      { type: 'spacerBlock', size: 'md', divider: true },
      { type: 'imageBlock', image: 'img-21x9', alt: 'Frame do filme em formato cinema', width: 'full' },
    ],
    credits: [{ role: 'Tudo', name: 'Blanzo' }],
  },
  {
    slug: 'embalagens-que-falam',
    title: 'Embalagens que falam',
    subtitle: 'Packshots em 3D para a nova linha',
    client: 'ondina-bebidas',
    year: 2022,
    role: 'Direção de arte e 3D',
    tags: ['direcao-de-arte', 'animacao-3d'],
    intro: ['Doze sabores, doze cenas. Cada embalagem ganhou um cenário que conta o sabor sem precisar de texto.'],
    hero: img('img-16x9', 'Doze latas em cenários coloridos'),
    body: [
      { type: 'mosaicBlock', layout: 'feature-2', items: [img('img-4x3', 'Cena principal'), img('img-1x1-a', 'Detalhe 1'), img('img-1x1-b', 'Detalhe 2')] },
    ],
    credits: [{ role: 'Direção de arte', name: 'Blanzo' }],
  },
  {
    slug: 'abertura-de-evento',
    title: 'Abertura de evento',
    subtitle: 'Filme de abertura para convenção de vendas',
    client: 'vetra-mobilidade',
    year: 2024,
    role: 'Direção criativa, motion e captação',
    tags: ['motion-design', 'producao-de-video', 'direcao-criativa'],
    intro: ['Dois minutos para abrir o evento e mil pessoas no escuro. Telão de 30 metros, sem margem para erro.'],
    hero: vid('video-16x9', 'Filme de abertura'),
    preview: 'preview-3x2',
    body: [
      { type: 'imageBlock', image: 'img-21x9', alt: 'Telão do evento com o filme em exibição', width: 'full' },
      { type: 'quoteBlock', quote: 'O auditório inteiro levantou no final.', author: 'Carla Menezes', role: 'Head de Marca, Vetra Mobilidade' },
    ],
    credits: [
      { role: 'Direção criativa', name: 'Blanzo' },
      { role: 'Captação', name: 'Marina Costa' },
    ],
  },
]

/** Ordem dos destaques da home (Configurações → Home). */
export const FEATURED = [
  'verao-em-movimento',
  'identidade-em-movimento',
  'o-banco-no-bolso',
  'atlas-de-texturas',
  'linha-solar',
  'retratos-da-costa',
  'colecao-trama',
  'abertura-de-evento',
]

export const ABOUT = {
  title: 'um generalista, de propósito',
  bio: [
    'Sou um criativo generalista. Comecei no motion design e fui me espalhando: fotografia, animação 3D, direção de arte, captação de vídeo (já tive produtora) e, agora, inteligência artificial.',
    'Hoje sou diretor de criação na Live The Agency. Antes, passei por Uber, Warner Bros. Discovery, XP Investimentos, TV Globo, Editora Abril e Keeta. A Blanzo é onde junto tudo isso: um briefing, uma cabeça, sem repasse.',
  ],
  disciplines: [
    { label: 'Direção criativa', tag: 'direcao-criativa' },
    { label: 'Motion design', tag: 'motion-design' },
    { label: 'Inteligência artificial', tag: 'ia' },
    { label: 'Animação 3D', tag: 'animacao-3d' },
    { label: 'Fotografia', tag: 'fotografia' },
    { label: 'Direção de arte', tag: 'direcao-de-arte' },
    { label: 'Campanhas publicitárias', tag: 'campanha-publicitaria' },
    { label: 'Produção e captação de vídeo', tag: 'producao-de-video' },
  ],
  /** Função e período ficam em branco quando não foram informados (preencha no painel). */
  timeline: [
    { company: 'Live The Agency', position: 'Diretor de criação', period: 'atual' },
    { company: 'Keeta' },
    { company: 'Uber' },
    { company: 'Warner Bros. Discovery' },
    { company: 'XP Investimentos' },
    { company: 'TV Globo' },
    { company: 'Editora Abril' },
  ],
}

export const CONTACT = {
  title: 'me conta o que precisa se mexer',
  intro: 'Deck, roteiro ou uma frase só: tudo serve. Respondo em até dois dias úteis.',
  formIntro: 'Prefere formulário? Conta um pouco do projeto aqui.',
  formSuccess: 'Recebido. Respondo em até dois dias úteis.',
}

export const SETTINGS = {
  siteName: 'Blanzo Creative Studio',
  workTitle: 'trabalhos',
  workIntro:
    'Uma seleção do que eu faço entre direção criativa, motion, 3D, fotografia, produção de vídeo e IA. Escolha uma disciplina para ver só ela.',
  reelPhrase: 'uma cabeça, a produção inteira',
  aboutSummary:
    'Diretor de criação com longa estrada no motion design. Penso a ideia, dirijo, filmo, animo e finalizo, e uso IA quando ela ajuda. Um briefing, uma cabeça, sem repasse.',
  ctaHeading: 'vamos fazer isso se mexer',
  copyright: 'Blanzo Creative Studio',
  // Dados de exemplo: troque pelos seus em Configurações do site → Contato e redes.
  email: 'contato@example.com',
  whatsapp: '5511900000000',
  linkedin: 'https://www.linkedin.com',
  instagram: 'https://www.instagram.com',
  vimeo: 'https://vimeo.com',
  behance: 'https://www.behance.net',
  seoTitle: 'Blanzo Creative Studio · direção criativa, motion e produção',
  seoDescription:
    'Estúdio de uma pessoa só: direção criativa, motion design, 3D, fotografia, produção de vídeo e IA. Da ideia ao último frame.',
}
