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

/**
 * `id` é o identificador estável do documento (tag-<id>, igual ao do site publicado);
 * `slug` vai no endereço (/work?tag=…). O site é só em inglês desde 23/10/2026.
 */
export const TAGS = [
  { id: 'direcao-criativa', slug: 'creative-direction', name: 'Creative direction', description: 'From the idea to the last frame: concept, script and crew direction.' },
  { id: 'motion-design', slug: 'motion-design', name: 'Motion design', description: '2D animation, type in motion and brands that move.' },
  { id: 'ia', slug: 'ai', name: 'AI', description: 'Images, films and visual research with AI, with real direction behind them.' },
  { id: 'animacao-3d', slug: '3d-animation', name: '3D animation', description: 'Product, character and set in 3D, from model to render.' },
  { id: 'fotografia', slug: 'photography', name: 'Photography', description: 'Campaign, product and portrait, in the studio or on location.' },
  { id: 'direcao-de-arte', slug: 'art-direction', name: 'Art direction', description: 'Visual language, references and care for every frame.' },
  { id: 'campanha-publicitaria', slug: 'advertising', name: 'Advertising', description: 'Pieces for TV, digital and retail, designed as one family.' },
  { id: 'producao-de-video', slug: 'video-production', name: 'Video production', description: 'Crew, camera, location, editing and finishing, end to end.' },
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
  { type: 'videoBlock', video: 'video-16x9', label: 'Film of the new brand in motion', aspect: '16:9', width: 'full' },
  {
    type: 'textBlock',
    heading: 'The challenge',
    paragraphs: [
      'Vetra changed its brand and needed it to move the same way everywhere: app, car dashboard, social and events.',
      'I started with how the logo behaves and only then designed the screens. Motion first, layout second.',
    ],
  },
  { type: 'imageBlock', image: 'img-21x9', alt: 'Cinema-format frame with the brand applied', width: 'full' },
  {
    type: 'mosaicBlock',
    layout: 'cols-3',
    gap: 'md',
    items: [
      img('img-1x1-a', 'Logo animation study, frame 1'),
      img('img-1x1-b', 'Logo animation study, frame 2'),
      vid('video-1x1', 'Loop of the symbol spinning'),
    ],
  },
  {
    type: 'splitBlock',
    ratio: '60-40',
    left: img('img-4x5-a', 'App screen with the new brand'),
    right: vid('video-9x16', 'Vertical sting for stories'),
  },
  { type: 'beforeAfterBlock', before: 'img-before', after: 'img-after', alt: 'The old brand compared with the new one', start: 50, orientation: 'horizontal' },
  {
    type: 'compositionBlock',
    items: [
      { ...img('img-4x5-b', 'Launch poster'), colStart: 1, colSpan: 5, offset: 'none' },
      { ...img('img-3x2', 'Car dashboard with the animated interface'), colStart: 7, colSpan: 6, offset: 'md' },
      { ...img('gif-4x3', 'GIF of the loading icon'), colStart: 3, colSpan: 4, offset: 'lg' },
    ],
  },
  {
    type: 'galleryBlock',
    height: 'md',
    items: [
      img('img-4x5-a', 'Social piece, version 1'),
      img('img-4x5-b', 'Social piece, version 2'),
      img('img-4x5-c', 'Social piece, version 3'),
      img('img-1x1-c', 'Square piece for the feed'),
    ],
  },
  { type: 'imageBlock', image: 'gif-4x3', alt: 'Sample animated GIF (should stay animated on the site)', width: 'narrow' },
  {
    type: 'quoteBlock',
    quote: 'For the first time the brand looks the same everywhere. And it looks alive.',
    author: 'Carla Menezes',
    role: 'Head of Brand, Vetra Mobilidade',
  },
  {
    type: 'creditsBlock',
    heading: 'Animation team',
    credits: [
      { role: '2D animation', name: 'Rafael Lima' },
      { role: '3D animation', name: 'Júlia Prado' },
      { role: 'Music', name: 'Estúdio Grave' },
    ],
  },
  { type: 'embedBlock', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', title: 'Sample embed: Big Buck Bunny (Blender Foundation)' },
  { type: 'spacerBlock', size: 'lg', divider: true },
  {
    type: 'textBlock',
    heading: 'The result',
    paragraphs: ['A motion system the in-house team runs on its own: 40 base animations, a guide and ready-made files for every channel.'],
  },
]

export const PROJECTS: ProjectSpec[] = [
  {
    slug: 'summer-in-motion',
    title: 'Summer in motion',
    subtitle: 'Launch campaign for the passion fruit flavor',
    client: 'ondina-bebidas',
    agency: 'Agência Norte',
    year: 2025,
    role: 'Creative direction and motion design',
    tags: ['advertising', 'motion-design', 'video-production'],
    intro: [
      'A whole summer in 30 seconds. I shot the can in the studio, animated the liquid in 3D and built a family of pieces for TV, social and retail.',
    ],
    hero: vid('video-16x9', 'The campaign’s 30-second film'),
    preview: 'preview-3x2',
    body: [
      { type: 'videoBlock', video: 'video-16x9', label: '15-second version', aspect: '16:9', width: 'content' },
      {
        type: 'mosaicBlock',
        layout: 'cols-3',
        items: [
          img('img-1x1-a', 'Can on a black background, frame 1'),
          img('img-1x1-b', 'Can on a black background, frame 2'),
          img('img-1x1-c', 'Can on a black background, frame 3'),
        ],
      },
      { type: 'textBlock', heading: 'How it was made', paragraphs: ['Two days in the studio, a week of 3D and one rule: every piece had to work without sound.'] },
    ],
    credits: [
      { role: 'Creative direction', name: 'Blanzo' },
      { role: 'Director of photography', name: 'Marina Costa' },
      { role: 'Music', name: 'Estúdio Grave' },
    ],
  },
  {
    slug: 'identity-in-motion',
    title: 'Identity in motion',
    subtitle: 'Motion system for the new brand (template project with every block)',
    client: 'vetra-mobilidade',
    year: 2025,
    role: 'Art direction and motion design',
    tags: ['motion-design', 'art-direction'],
    intro: [
      'A new brand that had to be born moving. I designed how the logo behaves, the transitions and a motion guide for the in-house team.',
      'This project uses every block type in the panel. Use it as a template to build yours.',
    ],
    hero: img('img-16x9', 'Vetra logo in motion on a black background'),
    preview: 'preview-3x2',
    body: FULL_TEMPLATE,
    credits: [
      { role: 'Art direction', name: 'Blanzo' },
      { role: 'Motion design', name: 'Blanzo' },
      { role: '3D animation', name: 'Júlia Prado' },
    ],
  },
  {
    slug: 'the-bank-in-your-pocket',
    title: 'The bank in your pocket',
    subtitle: 'Brand film with AI-generated imagery',
    client: 'pilar-banco-digital',
    agency: 'Estúdio Faro',
    year: 2026,
    role: 'Creative direction and AI',
    tags: ['advertising', 'creative-direction', 'ai'],
    intro: [
      'City scenes that don’t exist, generated and directed frame by frame. AI did the heavy lifting; direction decided what stayed.',
    ],
    hero: vid('video-16x9', '45-second brand film'),
    preview: 'preview-3x2',
    body: [
      { type: 'imageBlock', image: 'img-16x9', alt: 'AI-generated scene of a street at night', width: 'full' },
      { type: 'splitBlock', ratio: '50-50', left: img('img-4x5-a', 'Generated character, first version'), right: img('img-4x5-b', 'Generated character, final version') },
      { type: 'quoteBlock', quote: 'It seemed impossible to pull this off in three weeks.', author: 'Paulo Antunes', role: 'Marketing Director, Pilar Banco Digital' },
    ],
    credits: [
      { role: 'Creative direction', name: 'Blanzo' },
      { role: 'Editing', name: 'Rafael Lima' },
    ],
  },
  {
    slug: 'texture-atlas',
    title: 'Texture atlas',
    subtitle: 'Visual research with AI for a game world',
    client: 'kairo-games',
    year: 2025,
    role: 'Art direction, AI and 3D',
    tags: ['ai', '3d-animation'],
    intro: ['More than 400 textures generated, curated and taken into 3D. The result became the game’s visual bible.'],
    hero: img('img-16x9', 'Board with dozens of generated textures'),
    body: [
      {
        type: 'mosaicBlock',
        layout: 'cols-4',
        gap: 'sm',
        items: [
          img('img-1x1-a', 'Stone texture'),
          img('img-1x1-b', 'Metal texture'),
          img('img-1x1-c', 'Fabric texture'),
          img('img-1x1-a', 'Wood texture'),
        ],
      },
      { type: 'videoBlock', video: 'video-1x1', label: 'Material applied to a spinning 3D object', aspect: '1:1', width: 'narrow' },
    ],
    credits: [{ role: 'Art direction', name: 'Blanzo' }],
  },
  {
    slug: 'solar-line',
    title: 'Solar line',
    subtitle: 'Product launch in 3D',
    client: 'solano-energia',
    year: 2024,
    role: '3D animation and motion design',
    tags: ['3d-animation', 'motion-design'],
    intro: ['A solar panel explained without anyone having to read: everything assembles in front of the camera.'],
    hero: vid('video-16x9', 'Animation of the solar panel assembling itself'),
    preview: 'preview-3x2',
    body: [
      { type: 'videoBlock', video: 'video-16x9', label: 'Technical exploded view of the product', aspect: '16:9', width: 'full' },
      { type: 'textBlock', heading: 'The process', paragraphs: ['Modeling from the engineering CAD, studio lighting and a single camera move.'] },
    ],
    credits: [
      { role: '3D animation', name: 'Blanzo' },
      { role: 'Sound design', name: 'Estúdio Grave' },
    ],
  },
  {
    slug: 'coastal-portraits',
    title: 'Coastal portraits',
    subtitle: 'Summer photo campaign',
    client: 'brisamar-cosmeticos',
    year: 2024,
    role: 'Photography and art direction',
    tags: ['photography', 'art-direction'],
    intro: ['Three days, two beaches and natural light. Portraits without heavy retouching for a line of sunscreens.'],
    hero: img('img-16x9', 'Backlit portrait on the beach'),
    body: [
      {
        type: 'galleryBlock',
        height: 'lg',
        items: [
          img('img-4x5-a', 'Portrait 1, late-afternoon light'),
          img('img-4x5-b', 'Portrait 2, backlight'),
          img('img-4x5-c', 'Portrait 3, beach umbrella shade'),
        ],
      },
      { type: 'imageBlock', image: 'img-3x2', alt: 'Product on the sand under hard light', width: 'content' },
    ],
    credits: [
      { role: 'Photography', name: 'Blanzo' },
      { role: 'Fashion production', name: 'Ana Ribeiro' },
    ],
  },
  {
    slug: 'no-fine-print',
    title: 'No fine print',
    subtitle: 'Spots for TV and digital',
    client: 'nimbo-seguros',
    agency: 'Agência Norte',
    year: 2023,
    role: 'Direction and filming',
    tags: ['advertising', 'video-production'],
    intro: ['Three 30-second films about what the insurance really covers, shot in a single day.'],
    hero: vid('video-16x9', '30-second spot'),
    body: [
      { type: 'videoBlock', video: 'video-16x9', label: 'Film 2 of the series', aspect: '16:9', width: 'content', controls: true },
      { type: 'splitBlock', ratio: '50-50', left: vid('video-9x16', 'Vertical cut for social'), right: img('img-4x5-c', 'Frame from the set') },
    ],
    credits: [
      { role: 'Direction', name: 'Blanzo' },
      { role: 'Production', name: 'Marina Costa' },
    ],
  },
  {
    slug: 'trama-collection',
    title: 'Trama collection',
    subtitle: 'Lookbook and collection film',
    client: 'tecela-moda',
    year: 2025,
    role: 'Creative direction, photography and video',
    tags: ['photography', 'creative-direction', 'video-production'],
    intro: ['One set, two cameras: the lookbook and the collection film came out of the same shoot day.'],
    hero: img('img-16x9', 'Model wearing the collection in the studio'),
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
      { type: 'videoBlock', video: 'video-9x16', label: 'Vertical collection film', aspect: '9:16', width: 'narrow' },
    ],
    credits: [
      { role: 'Creative direction', name: 'Blanzo' },
      { role: 'Styling', name: 'Ana Ribeiro' },
    ],
  },
  {
    slug: 'season-idents',
    title: 'Season idents',
    subtitle: 'Opening package for the new season',
    client: 'kairo-games',
    year: 2023,
    role: 'Motion design and 3D',
    tags: ['motion-design', '3d-animation'],
    intro: ['Opener, title cards and transitions for six months of live streams.'],
    hero: vid('video-16x9', 'Season opener'),
    thumbnail: vid('preview-3x2', 'Opener loop', 'thumb-season-idents'),
    body: [
      { type: 'mosaicBlock', layout: 'cols-2', items: [vid('video-1x1', 'Animated title card 1'), img('img-1x1-b', 'Static title card')] },
    ],
    credits: [{ role: 'Motion design', name: 'Blanzo' }],
  },
  {
    slug: 'manifesto',
    title: 'Manifesto',
    subtitle: 'Personal project about doing it all with one head',
    year: 2026,
    role: 'Direction, script, AI and editing',
    tags: ['creative-direction', 'ai'],
    intro: ['A short film about the studio, made the way the studio works: from script to grade, no handoff.'],
    hero: vid('video-16x9', 'Manifesto film'),
    body: [
      { type: 'textBlock', heading: 'Why a manifesto', paragraphs: ['To explain in two minutes what a list of services can’t.'], align: 'center' },
      { type: 'spacerBlock', size: 'md', divider: true },
      { type: 'imageBlock', image: 'img-21x9', alt: 'Frame from the film in cinema format', width: 'full' },
    ],
    credits: [{ role: 'Everything', name: 'Blanzo' }],
  },
  {
    slug: 'packaging-that-talks',
    title: 'Packaging that talks',
    subtitle: '3D packshots for the new line',
    client: 'ondina-bebidas',
    year: 2022,
    role: 'Art direction and 3D',
    tags: ['art-direction', '3d-animation'],
    intro: ['Twelve flavors, twelve scenes. Each can got a set that tells its flavor without a single word.'],
    hero: img('img-16x9', 'Twelve cans in colorful sets'),
    body: [
      { type: 'mosaicBlock', layout: 'feature-2', items: [img('img-4x3', 'Main scene'), img('img-1x1-a', 'Detail 1'), img('img-1x1-b', 'Detail 2')] },
    ],
    credits: [{ role: 'Art direction', name: 'Blanzo' }],
  },
  {
    slug: 'event-opener',
    title: 'Event opener',
    subtitle: 'Opening film for a sales convention',
    client: 'vetra-mobilidade',
    year: 2024,
    role: 'Creative direction, motion and filming',
    tags: ['motion-design', 'video-production', 'creative-direction'],
    intro: ['Two minutes to open the event and a thousand people in the dark. A 30-meter screen, no margin for error.'],
    hero: vid('video-16x9', 'Opening film'),
    preview: 'preview-3x2',
    body: [
      { type: 'imageBlock', image: 'img-21x9', alt: 'Event screen showing the film', width: 'full' },
      { type: 'quoteBlock', quote: 'The whole auditorium stood up at the end.', author: 'Carla Menezes', role: 'Head of Brand, Vetra Mobilidade' },
    ],
    credits: [
      { role: 'Creative direction', name: 'Blanzo' },
      { role: 'Filming', name: 'Marina Costa' },
    ],
  },
]

/** Ordem dos destaques da home (Configurações → Home). */
export const FEATURED = [
  'summer-in-motion',
  'identity-in-motion',
  'the-bank-in-your-pocket',
  'texture-atlas',
  'solar-line',
  'coastal-portraits',
  'trama-collection',
  'event-opener',
]

export const ABOUT = {
  title: 'a generalist, on purpose',
  bio: [
    'I’m a generalist creative. I started in motion design and never stopped moving outward: photography, 3D animation, art direction, video production (I once ran my own production company) and, now, artificial intelligence.',
    'Today I’m a creative director at Live The Agency. Before that, I was at Uber, Warner Bros. Discovery, XP Investimentos, TV Globo, Editora Abril and Keeta. Blanzo is where it all comes together: one brief, one head, no handoff tax.',
  ],
  disciplines: [
    { label: 'Creative direction', tag: 'creative-direction' },
    { label: 'Motion design', tag: 'motion-design' },
    { label: 'Artificial intelligence', tag: 'ai' },
    { label: '3D animation', tag: '3d-animation' },
    { label: 'Photography', tag: 'photography' },
    { label: 'Art direction', tag: 'art-direction' },
    { label: 'Advertising campaigns', tag: 'advertising' },
    { label: 'Video production', tag: 'video-production' },
  ],
  /** Função e período ficam em branco quando não foram informados (preencha no painel). */
  timeline: [
    { company: 'Live The Agency', position: 'Creative director', period: 'present' },
    { company: 'Keeta' },
    { company: 'Uber' },
    { company: 'Warner Bros. Discovery' },
    { company: 'XP Investimentos' },
    { company: 'TV Globo' },
    { company: 'Editora Abril' },
  ],
}

export const CONTACT = {
  title: 'tell me what it should feel like',
  intro: 'Deck, script, or a single sentence — all of it works. I reply within two days.',
  formIntro: 'Prefer a form? Tell me a bit about the project here.',
  formSuccess: 'Got it. I’ll come back to you within two days.',
}

export const SETTINGS = {
  siteName: 'Blanzo Creative Studio',
  workTitle: 'selected work',
  workIntro:
    'A selection of what I do across creative direction, motion, 3D, photography, video production and AI. Pick a discipline to see just that.',
  reelPhrase: 'one mind, whole production',
  aboutSummary:
    'Creative director with a long run in motion design. I come up with the idea, direct, shoot, animate and finish it, and I use AI when it helps. One brief, one head, no handoff tax.',
  ctaHeading: 'let’s make it move',
  copyright: 'Blanzo Creative Studio',
  // Dados de exemplo: troque pelos seus em Configurações do site → Contato e redes.
  email: 'hello@example.com',
  whatsapp: '5511900000000',
  linkedin: 'https://www.linkedin.com',
  instagram: 'https://www.instagram.com',
  vimeo: 'https://vimeo.com',
  behance: 'https://www.behance.net',
  seoTitle: 'Blanzo Creative Studio · creative direction, motion and production',
  seoDescription:
    'A one-person studio: creative direction, motion design, 3D, photography, video production and AI. From the idea to the last frame.',
}
