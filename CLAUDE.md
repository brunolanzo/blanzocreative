# Blanzo Creative Studio · site portfólio

Next.js 16 (App Router) + Tailwind 4 + Sanity 6 (Studio em `/admin`). **O site público é só em inglês** (público global, decisão de 23/10/2026). O painel, a documentação e as conversas continuam em português; o usuário não é desenvolvedor.

- **Especificação:** `~/Downloads/prompt-claude-code-blanzo.md`.
- **Plano aprovado:** `docs/plano.md`.
- **Tokens e regras visuais:** `docs/tokens.md`.
- **Detalhes de versões e APIs:** `docs/notas-tecnicas.md`.
- **Referência de estrutura e movimento (buffmotion.com):** `docs/referencia-buff.md`.

## Regras do projeto

- **Trabalho em fases**, com parada para aprovação do usuário ao fim de cada uma (ver `docs/plano.md`).
- **Estrutura, ordem das seções e comportamento** vêm da Buff. **Visual** (cor, tipo, raio, ícones, tom) vem só do design system em `design-system/`. No conflito, estrutura da Buff com o token mais próximo do DS. Avisar o usuário antes de criar token novo.
- **Nenhuma fonte paga, em nenhuma etapa.** A fonte é Manrope (`src/lib/fonts.ts`). Os TTF do Aeonik Pro em `design-system/` nunca são usados nem versionados.
- **Nenhum texto fixo no código.** Rótulos de interface vêm do painel (Configurações → Textos da interface). Os padrões ficam em `src/lib/ui-strings.ts`, cada um com `label` (nome do campo no painel, em português) e `text` (o texto do site, em inglês); ao criar um rótulo novo, adicione ali (vira campo no painel automaticamente) e rode o seed se precisar.
- **Copy no tom do DS, em inglês:** primeira pessoa do singular, títulos em minúsculas, rótulos curtos em MAIÚSCULAS (via CSS), sentence case no corpo (nunca Title Case), sem emoji nem ponto de exclamação. O DS traz frases prontas (`design-system/project/readme.md`, "CONTENT FUNDAMENTALS", e as telas em `ui_kits/studio-site/`): use-as antes de inventar.
- **Endereços em inglês:** `/work`, `/work/<slug>`, `/work?tag=…`, `/about`, `/contact`. Os antigos em português (`/trabalhos`, `/sobre`, `/contato`) redirecionam em `next.config.ts`.
- **Contraste e destaque:** só um vermelho-rosado visível por vez; hover = vermelho-rosado; foco = anel de 2px vermelho-rosado.
- **Texto pequeno usa `text-fg-secondary`**, nunca `text-fg-muted` (4,1:1 sobre o preto, abaixo da WCAG AA). O cinza apagado fica só para detalhes decorativos (decisão de 12/10/2026, `docs/tokens.md` §11).

## Estrutura

```
src/app/(site)/        site público (layout com header, menu, rodapé, Lenis)
src/app/(studio)/admin painel Sanity (layout raiz separado, sem CSS do site)
src/app/api/revalidate webhook do Sanity → revalidateTag(tag, { expire: 0 })
src/app/api/draft-mode   liga/desliga a pré-visualização de rascunhos (aba "Pré-visualizar" do painel)
src/app/global-not-found.tsx  404 fora dos dois layouts
src/components/ui/     primitivos do DS: Button, Display, Eyebrow, Tag, Field (campo com linha, do DS)
src/components/layout/ SiteHeader, MenuPanel, SiteFooter, SmoothScroll, CopyEmail, CustomCursor, PageTransition, ExitPreview…
src/app/sitemap.ts, robots.ts  sitemap (sem não listados nem o painel) e robots
src/components/brand/  SiteLogo (imagem, vídeo ou Lottie) e AnimatedLogo (modos sempre / só no hover / uma vez)
src/components/navigation/ AppLink: o link interno do site (com a transição de página)
src/components/motion/ Reveal: grupo que aparece ao rolar
src/components/contact/ ContactForm (Web3Forms; só aparece com NEXT_PUBLIC_WEB3FORMS_KEY)
src/components/media/  SanityImage, LoopVideo (vídeo nativo + HLS sob demanda), VideoPlayer (vídeo de página),
                       MediaView/MediaFrame (mídia que preenche / mídia no próprio formato), VimeoFrame, ControlPill
src/components/blocks/ os 12 blocos do construtor, BlockShell (largura, espaços, fundo, legenda) e PageBlocks
src/components/project/ ProjectHeader, ProjectHero, NextProject, BackToWork
src/components/work/   ProjectCard, TagFilter, FilterableWork (grid da home e de /work), WorkIndex
src/components/home/   HomeIntro, HomeHero, ReelModal, ClientWall, AboutSummary
src/lib/               cn, fonts, motion (curvas/durações do DS para o GSAP), smooth-scroll, ui-strings,
                       environment (movimento reduzido, hover, economia de dados), sound (um som por vez),
                       url-tag (tag na URL), titles, media, last-list, use-in-view
src/sanity/            env, lib (client, fetch, queries, settings, image, image-loader), schemaTypes, structure, studio (ações, badges)
src/styles/            globals.css (ponte tokens → Tailwind) + tokens/*.css (cópia do DS + site.css)
scripts/placeholders/  gerador das mídias provisórias (sharp + opentype.js + ffmpeg-static)
scripts/seed/          conteúdo de exemplo (content.ts) e envio ao Sanity (index.ts)
```

## Tokens e Tailwind

- Os tokens do DS ficam em `src/styles/tokens/*.css`, com os valores originais (só `--font-sans` mudou). `globals.css` os expõe ao Tailwind via `@theme inline` e reseta as paletas padrão do Tailwind.
- **Espaçamento:** `--spacing: 1px`, então o número é o pixel. Use só a escala do DS: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144, 200 (ex.: `gap-32`, `mt-48`). Margem lateral `px-gutter`, respiro de seção `py-section`, conteúdo `container-site`.
- **Classes do DS:**
  - cores `ink-*`, `paper`, `flash-*`, `page`, `card`, `raised`, `fg`, `fg-secondary`, `fg-muted`, `accent`, `hairline`, `strong`;
  - tipo `text-display-xl|l|m`, `text-h1|h2|h3`, `text-body-l|body|body-s`, `text-label|label-s`;
  - curvas `ease-draw|out|in-out`; durações `duration-120|220|400|800`;
  - `rounded-md` (mídia), `rounded-pill`;
  - utilitários `glass-panel`, `glass-control`, `protect-gradient`, `link`.
- **`cn()` só junta classes** (sem tailwind-merge, para não somar dependência): não passe por `className` uma classe que conflite com a do componente (ex.: `absolute` contra `relative`). Use uma prop, como o `overlay` da `ControlPill`.
- **Movimento em JS:** `src/lib/motion.ts` (EASE, DURATION, STAGGER). Sempre respeitar `prefersReducedMotion()` (ou `useReducedMotion()` em componentes).
- **Links internos: sempre `AppLink`** (`@/components/navigation/AppLink`), nunca `next/link` direto: é ele que pede a transição de página. Links externos continuam `<a>`.
  - Ele não pré-carrega links com `?tag=`: o rewrite de `/work?tag=` confunde o pré-carregamento do Next (404 depois de cada publicação). Detalhes em `docs/notas-tecnicas.md`, Fase 7.
- **Nada de `<script>` inline no `<head>` do layout do site.** O Netlify injeta um comentário com quebra de linha ali, e o React 19 falha a hidratação de tudo o que precisa achar pela posição no `<head>` (erro #418, página refeita no navegador). Scripts que precisam rodar antes da pintura vão no começo do `<body>`, como o da intro.
- **Aparecer ao rolar:** embrulhe o grupo em `<Reveal>` (os filhos diretos sobem 16px com fade, em sequência). O que já está na tela ao abrir não anima. Não use no grid de projetos (o filtro já anima com Flip).
- **Títulos de página:** `Display` com `as="h1"` divide as palavras e anima em CSS (sem esperar o JS). Elas esperam a intro e o painel de transição.
- **Peso do JavaScript:** nada do `next-sanity/hooks` ou `@sanity/visual-editing` em componentes do site: eles trazem ~200 KB para todas as visitas. As ferramentas da pré-visualização só carregam com o draft mode ligado.
- **Cursor customizado:** desligado por padrão (Configurações → Cursor). Áreas de arrastar levam `data-cursor-drag` (o cursor mostra "Arraste"); links e botões mostram o texto ou a imagem de hover.
- **Vídeo:** sempre pelo `LoopVideo`/`MediaView` (carrega só quando vai tocar, pausa fora da tela). Vídeo com som chama `useSound()`/`claimSound()` para silenciar os outros.
  - Vídeos de projeto (`VideoPlayer`) tentam começar com som (`autoSound`): o navegador só deixa depois de um clique no site; se recusar, tocam sem som. O reel da home e os loops começam sem som.
  - HLS (Mux): nativo só no Safari; no resto, o hls.js **completo** (o light não carrega a faixa de áudio separada do Mux).

## Dados (Sanity)

- **Consultas:** `defineQuery` em `src/sanity/lib/queries.ts`. Depois de mudar schema ou consultas: `npm run typegen` (gera `src/sanity/sanity.types.ts`, nunca editar à mão).
- **Busca:** `sanityFetch({ query, tags })`. Em produção usa cache por tag; em `npm run dev` busca sempre na hora. Tags: o `_type` do documento e `project:<slug>`.
- **Documentos únicos:** `aboutPage`, `contactPage`, `siteSettings` (IDs fixos, sem duplicar/apagar).
- **Projetos, tags e clientes** são ordenáveis (`orderRank`, plugin `@sanity/orderable-document-list`). A ordem dos destaques da home é a lista `siteSettings.featuredProjects`.
- **Seed:** `npm run seed` (usa o login do `npx sanity login`). É idempotente e **substitui** os documentos de exemplo: confira antes se nada foi editado no painel. As mídias saem de `npm run placeholders` (vídeos ganham um poster automático).
- **Formato das mídias:** imagem pelo arquivo (com o recorte); vídeo pelo poster, pelo Mux ou 16:9 (`mediaRatio` em `src/lib/media.ts`). Por isso o painel pede poster para vídeo em arquivo.

## Pré-visualização (rascunhos)

- Na pré-visualização, `sanityFetch` busca os rascunhos com o token `SANITY_API_READ_TOKEN` (papel Viewer, só no servidor: `src/sanity/lib/token.ts`).
- Os textos livres ganham uma marcação invisível no fim (stega) para o "clique para editar". Só as chaves listadas em `EDITABLE_TEXT` (`src/sanity/lib/client.ts`) recebem a marcação. **Nunca** acrescente ali campos que o código compara (layout, tipo, proporção, slug…).
- Antes de mexer no texto (cortar, comparar, `trim`), use `splitPreviewMarker`/`hasVisibleText` (`src/lib/preview-marker.ts`); nos metadados, `stegaClean`.

## Como criar um novo tipo de bloco do construtor

1. Crie `src/sanity/schemaTypes/blocks/<nome>Block.ts` com `defineType`, título em português, ícone (`@sanity/icons/<Nome>`), campos com descrição curta, o campo `options` do tipo `blockOptions` e um `preview` que mostre miniatura + nome do layout.
2. Adicione-o em `pageBlockTypes` (`blocks/index.ts`). A ordem ali é a do menu "Adicionar bloco".
3. Projete o bloco na consulta GROQ da página de projeto e rode `npm run typegen`.
4. Crie o componente em `src/components/blocks/`, embrulhado em `BlockShell` (ele aplica as "Opções do bloco"), e acrescente o `case` em `PageBlocks.tsx`. O tipo do bloco sai de `BlockOf<'nomeBlock'>` (`blocks/types.ts`).
5. Se fizer sentido, inclua um exemplo no projeto-modelo do seed (`FULL_TEMPLATE` em `scripts/seed/content.ts`).
6. Rode `npx sanity schema validate`, `npm run typecheck`, `npm run lint` e `npm run build`.

## Verificação

- `npm run typecheck` · `npm run lint` · `npm run build`.
- `npx sanity schema validate` · `npx sanity documents validate -y --level warning`.
- `npm run dev` e abra http://localhost:3000 (painel em /admin).
