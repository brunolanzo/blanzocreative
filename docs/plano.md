# Plano do site: Blanzo Creative Studio

**Fase 1: análise e plano.** Aprovada em 11/10/2026.
**Fase 2: base.** Aprovada em 11/10/2026.
**Fase 3: home e /trabalhos.** Aprovada em 11/10/2026, com um ajuste pedido: o reel da home toca sozinho e o único botão é o de som, discreto (sem "Assistir ao reel" e sem "Pausar").
**Fase 4: página de projeto e blocos.** Aprovada em 11/10/2026 (vídeos dos projetos só com "Ativar som", como na home).
**Fase 5: Sobre, Contato, logo e cursor.** Aprovada em 11/10/2026.
**Fase 6: polimento (movimento, desempenho, SEO).** Aprovada em 12/10/2026, com o texto pequeno trocando o cinza apagado pelo cinza secundário do DS.
**Fase 7: deploy e documentação.** Entregue em 12/10/2026, aguardando aprovação. No ar em https://blanzocreative.netlify.app.
**Fase 8: site em inglês.** Entregue em 23/10/2026, aguardando aprovação. A pedido do usuário (foco no público global): o site é só em inglês, com endereços `/work`, `/about` e `/contact` (os antigos redirecionam). O painel e a documentação seguem em português.

Documentos desta fase:
- `docs/referencia-buff.md`: análise da estrutura, do layout e do movimento do buffmotion.com.
- `docs/plano.md` (este arquivo): tokens, wireframes, schema do Sanity, escolhas técnicas, custos e dúvidas.
- `docs/notas-tecnicas.md`: versões conferidas e detalhes de implementação para as próximas fases.
- `docs/tokens.md`: tokens extraídos do design system, regras de uso, licença da fonte, tokens novos e os conflitos entre a Buff e o DS.

---

## 0. Design system: recebido e lido

O pacote exportado do Claude Design está em `design-system/`. Li tudo:
- `readme.md` com as regras da marca;
- 8 arquivos de tokens e 11 componentes (código, tipos e instruções);
- 22 cartões de diretrizes;
- o kit do site (6 telas) e o template;
- logos, favicons e as 5 animações de logo.

O resumo está em **`docs/tokens.md`**.

**Aprovado em 11/10/2026:** Fase 1 aprovada com as recomendações das dúvidas. Agência: **Live The Agency**. Fonte: **nenhuma fonte paga em nenhuma etapa**, então o Aeonik Pro sai e entra a **Manrope** (grátis, OFL). A comparação está em `docs/tokens.md` §8.

Continuam abertos (não bloqueiam):

| Pendência | Enquanto isso |
|---|---|
| **Hex do vermelho-rosado** | sigo com `#FF2E5B` (proposta do Claude Design); troca em um lugar só |
| **Logo em SVG** | sigo com os PNGs do DS |

---

## 1. Tokens

Todos em `docs/tokens.md`:
- tabelas de cor, tipo, espaço, raio e movimento;
- o mapeamento dos papéis tipográficos e das medidas da Buff para os tokens do DS;
- os tokens novos.

Em resumo:
- **Visual 100% do DS:**
  - fundo preto;
  - Manrope Medium (no lugar do Aeonik Pro) em minúsculas com ponto final vermelho-rosado;
  - rótulos em MAIÚSCULAS;
  - hairlines em vez de caixas;
  - raio de 8px nas mídias e pílula nos botões e tags;
  - um único destaque `#FF2E5B`.
- **Estrutura e comportamento da Buff, com valores do DS:**
  - o grid de 12 colunas, os cards 3:2 com a coluna par deslocada e a ordem das seções seguem a Buff;
  - gaps, margens e respiros usam a escala do DS;
  - o movimento usa as curvas e durações do DS (`--ease-draw`, 220/400/800ms, revelação de 16px, intervalo de 80ms).
- **Tokens novos (7, todos técnicos):** camadas (z-index), proporções 3:2 e 16:9, contorno e desfoque das pílulas sobre vídeo, opacidade do vídeo do hero e o limiar de 24px do header. Nenhuma cor, fonte ou espaçamento novo.

---

## 2. Wireframes

Legenda:
- `[ … ]` é botão ou link em pílula, com rótulo em MAIÚSCULAS;
- `( … )` é tag em pílula;
- `[SOM] [PAUSAR]` são as pílulas de texto sobre vídeo (o DS não usa ícones). Na home ficou só `[ATIVAR SOM]`, pequena e cinza (ajuste de 11/10/2026);
- `───` é hairline de 1px;
- tudo sobre fundo preto, títulos em minúsculas.

### 2.1 Home: desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ blanzo (logo)                                                  [MENU +]  │ header fixo e transparente; ao rolar o logo
│                                                                          │ some e o botão ganha painel preto desfocado
│                                                                          │
│                  REEL EM LOOP, TELA CHEIA (100svh)                       │
│                  com frase: 45% + degradê de proteção                    │
│                  sem frase: 100%                                         │
│                                                                          │
│  frase sobreposta opcional,                                              │
│  em display xl, minúsculas.                     ← ponto vermelho-rosado  │
│                                                                          │
│                                                           [ATIVAR SOM]   │
└──────────────────────────────────────────────────────────────────────────┘
   container: até 1440px, margem lateral clamp(20–64px), grid de 12 colunas
┌──────────────────────────────────────────────────────────────────────────┐
│ 01 ── TRABALHOS                                                          │ eyebrow com número (padrão do DS)
│ (TODOS) (DIREÇÃO CRIATIVA) (MOTION DESIGN) (INTELIGÊNCIA ARTIFICIAL) …   │ tag ativa em vermelho-rosado; filtram aqui mesmo
│ descrição curta da tag ativa (se houver)                                 │
│                                                                          │
│ ┌──────────────────────────────┐                                         │
│ │                              │  ┌──────────────────────────────┐       │
│ │       thumb 3:2, raio 8      │  │                              │ desce │
│ │                              │  │       thumb 3:2, raio 8      │ 48px  │
│ └──────────────────────────────┘  │                              │       │
│ título do projeto          2025   └──────────────────────────────┘       │
│ Cliente                           título do projeto          2024        │
│ (MOTION) (IA)                     Cliente                                │
│                                   (3D)                                   │
│              … 4 linhas × 2 colunas = 8 projetos …                       │
│                                                                          │
│ [VER TODOS OS TRABALHOS →]                                               │ leva para /trabalhos?tag=…
├──────────────────────────────────────────────────────────────────────────┤
│ 02 ── CLIENTES                                           (liga/desliga)  │
│    [ logo ]    [ logo ]    [ logo ]    [ logo ]    [ logo ]              │ 5 por linha, monocromático;
│    [ nome ]    [ logo ]    …                                             │ nome em texto até subir o logo
├──────────────────────────────────────────────────────────────────────────┤
│ 03 ── SOBRE                                              (liga/desliga)  │
│ ┌────────────────────────┐       duas ou três frases, em primeira        │
│ │  foto ou vídeo curto   │       pessoa, em display m.                   │
│ │                        │       (MOTION DESIGN) (DIREÇÃO DE ARTE) …     │
│ └────────────────────────┘       [CONHEÇA O ESTÚDIO →]                   │
├──────────────────────────────────────────────────────────────────────────┤
│ chamada de contato                                       (liga/desliga)  │
│ em display m.                                    [COMEÇAR UM PROJETO]    │ rodapé no padrão do DS
│ ──────────────────────────────────────────────────────────────────────── │
│ linkedin  instagram  vimeo  behance      (monograma)      © 2026 blanzo  │ redes em texto; e-mail copiável
└──────────────────────────────────────────────────────────────────────────┘
```

**Home: mobile (360–767px)**

```
┌──────────────────────────┐
│ blanzo          [MENU +] │  menu abre em tela cheia
│                          │
│   REEL TELA CHEIA        │
│   (100svh, poster)       │
│ frase sobreposta.        │
│ [ATIVAR SOM]             │
├──────────────────────────┤
│ (Todos) (Direção…) (Mo…→ │  tags numa linha, rolagem lateral
│ ┌──────────────────────┐ │
│ │      thumb 3:2       │ │  1 coluna, sem escalonamento
│ └──────────────────────┘ │
│ Título                   │
│ Cliente · (Tag)          │
│          …               │
│ [ Ver todos os trabalhos]│
├──────────────────────────┤
│ [logo] [logo] [logo]     │  3 por linha
├──────────────────────────┤
│ ┌──────────────────────┐ │
│ │ foto/vídeo           │ │  mídia em cima, texto embaixo
│ └──────────────────────┘ │
│ Frases… [ Conheça… ]     │
├──────────────────────────┤
│ Chamada + e-mail         │
│ Rodapé                   │
└──────────────────────────┘
```

### 2.2 /trabalhos

```
┌──────────────────────────────────────────────────────────────────────────┐
│ blanzo (logo)                                                  [MENU +]  │
│                                                                          │
│ Trabalhos                                                                │
│ (display gigante)                                                        │
│                                     Texto curto de introdução, editável, │
│                                     na metade direita                    │
│                                                                          │
│ (Todos) (Direção Criativa) (Motion Design) (Inteligência Artificial)     │
│ (Animação 3D) (Fotografia) (Direção de Arte) (Campanha Publicitária) …   │ quebra em 2 linhas no desktop
│ Descrição da tag ativa                                                   │ só quando há tag ativa
│                                                                          │
│ [ card ]                       [ card ]   ← desce 3rem                   │
│ [ card ]                       [ card ]                                  │
│ … 12 por vez …                                                           │
│                         [ Carregar mais ]                                │
├──────────────────────────────────────────────────────────────────────────┤
│ CONTATO + RODAPÉ (os mesmos da home)                                     │
└──────────────────────────────────────────────────────────────────────────┘
```

- `/trabalhos?tag=ia` abre já filtrada, com o HTML vindo do servidor.
- Clicar numa tag troca a URL sem recarregar; voltar e avançar funcionam.
- A troca anima sem pulo de layout: a altura do grid é animada junto.

### 2.3 Página de projeto

```
┌──────────────────────────────────────────────────────────────────────────┐
│ blanzo (logo)                                                  [MENU +]  │
│                                                                          │
│ Título do projeto em display,                                            │
│ em duas ou três linhas                                                   │
│ Subtítulo                                                                │
│                                         Cliente     Nome do cliente      │
│                                         Agência     Nome da agência      │ campos vazios somem
│                                         Ano         2025                 │
│                                         Função      Direção criativa     │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────────────────┐ │
│ │     MÍDIA DE ABERTURA (vídeo ou imagem), na largura do container     │ │
│ │                                                     [ATIVAR SOM]     │ │
│ └──────────────────────────────────────────────────────────────────────┘ │
│                                     Descrição de abertura (texto         │
│                                     formatado), na metade direita        │
│                                                                          │
│ ══════════════ CONSTRUTOR DE BLOCOS (ordem livre) ══════════════════════ │
│ [ Vídeo ponta a ponta ──────────────────────────────────────────────── ] │
│              [ Texto, largura estreita ]                                 │
│ [ Mosaico 3 colunas ][          ][          ]                            │
│ [ Lado a lado 60/40                ][            ]                       │
│ [ Antes e depois   ◀ ┃ ▶ ]                                               │
│ [ Composição livre: até 6 mídias no grid de 12 ]                         │
│ [ Galeria arrastável ⇢ ]  [ Citação ]  [ Embed ]  [ Espaçador ]          │
│                                                                          │
│ Créditos                                                                 │
│ Direção criativa ................................. Bruno Lanzo           │
│ Animação 3D ...................................... Nome (link)           │
│                                                                          │
│ (Motion Design) (Inteligência Artificial)        → /trabalhos?tag=…      │
│ ──────────────────────────────────────────────────────────────────────── │
│ Próximo projeto                                                          │
│ Título do próximo projeto          ┌────────────────────────────────┐    │
│ Cliente                            │           thumb 3:2            │    │ o bloco inteiro é um link
│ [ Ver projeto ]                    └────────────────────────────────┘    │
│                                                                          │
│ Relacionados                                                             │
│ [ card ]           [ card ]           [ card ]       ← mesma tag         │
│                                                                          │
│ [ Voltar para os trabalhos ]                     ← mantém o filtro       │
├──────────────────────────────────────────────────────────────────────────┤
│ CONTATO + RODAPÉ                                                         │
└──────────────────────────────────────────────────────────────────────────┘
```

- No mobile: o título vem antes da ficha, a ficha empilha em 2 colunas curtas e todos os blocos empilham.
- **Vídeos do projeto (Fase 4):** seguem o padrão escolhido para a home. Tocam sozinhos e o único controle é "Ativar som", discreto; o "Pausar" do wireframe saiu. Vídeo marcado com "controles completos" usa a barra do navegador e não toca sozinho.
  - **Mudança de 23/10/2026, a pedido do usuário:** os vídeos de projeto (bloco Vídeo e mídia de abertura) tentam começar **com som** quando aparecem na tela, e os com "controles completos" também tocam sozinhos. Se o navegador recusar o som (a pessoa ainda não clicou em nada do site), tocam sem som, com "Ativar som". O reel da home e os loops continuam começando sem som.
- A composição livre segue a ordem da lista. Os relacionados viram uma coluna.

---

## 3. Schema do Sanity

Nomes técnicos em inglês (padrão do código); tudo o que você vê no painel em português, com textos de ajuda curtos.

### 3.1 Barra lateral do painel

```
Projetos              (lista ordenável arrastando; essa ordem é a do site)
Tags                  (ordenável)
Clientes              (ordenável)
Página Sobre          (documento único)
Página Contato        (documento único)
Configurações do site (documento único, com abas)
```

### 3.2 Documentos

**Projeto (`project`).** Abas: Conteúdo · Mídia · Página · Créditos · Publicação.

| Campo | Tipo | Regras e ajuda |
|---|---|---|
| Título | texto | obrigatório |
| Slug | slug | gerado do título; obrigatório |
| Subtítulo | texto | |
| Cliente | referência → Cliente | opcional (projeto autoral pode ficar sem) |
| Agência | texto | opcional |
| Ano | número | obrigatório |
| Minha função | texto | ex.: "Direção criativa e motion" |
| Tags | referências → Tag | pelo menos 1 |
| Descrição de abertura | texto formatado | |
| Mídia de abertura | mídia (imagem ou vídeo) | recomendada (aviso se vazia) |
| Thumb do card | imagem, GIF ou vídeo curto em loop | **obrigatória**; ajuda com tamanhos (3:2, mín. 1800×1200) |
| Vídeo de preview | vídeo | opcional; toca no hover |
| Corpo da página | lista de blocos (3.4) | arrastar para reordenar |
| Créditos | lista de {função, nome, link} | |
| Visibilidade | Publicado / Não listado | não listado: fora dos grids, do sitemap e de "próximo/relacionados", com `noindex` |
| SEO | {título, descrição, imagem} | padrão: título, descrição de abertura e thumb |
| (oculto) ordem | `orderRank` | do plugin de ordenação |

**Tag (`tag`).** Nome, slug, descrição curta (exibida quando ativa) e ordem.

O seed cria: Direção Criativa, Motion Design, Inteligência Artificial (`ia`), Animação 3D, Fotografia, Direção de Arte, Campanha Publicitária, Produção e Captação de Vídeo.

**Cliente (`client`).**

| Campo | Regras e ajuda |
|---|---|
| Nome | obrigatório |
| Logo | SVG ou PNG transparente; opcional (sem logo, o site mostra o nome em texto) |
| Tratamento | Monocromático, padrão: pinta o logo numa cor do DS / Cores originais |
| Link | opcional |
| Mostrar na home | sim/não |
| Ordem | arrastar |

**Página Sobre (`aboutPage`).**
- Foto ou vídeo e bio (texto formatado).
- Disciplinas: lista de {nome, tag opcional}. Com tag, a disciplina vira link para o filtro.
- Trajetória: {empresa, função, início, fim ou "atual"}.
- Clientes: referências a Cliente, na ordem que você quiser.
- Prêmios: {título, instituição, ano, link}.
- CV: arquivo PDF.
- SEO.

**Página Contato (`contactPage`).**
- Título e texto de introdução.
- O que mostrar: e-mail, WhatsApp e cada rede.
- Textos do formulário: introdução e mensagem de sucesso.
- SEO.

Os dados de contato (e-mail, telefone, redes) ficam nas Configurações: são usados também no rodapé e na home, e assim existe um lugar só para editar.

**Configurações do site (`siteSettings`).** Abas:

| Aba | Campos |
|---|---|
| Identidade | **Logo:** tipo (SVG/PNG, GIF, Lottie, vídeo curto); arquivo para fundo claro e para fundo escuro; altura no desktop e no mobile; animação (sempre, só no hover, uma vez ao carregar). **Vídeo de logo:** os MP4 do DS têm fundo preto, e sobre o fundo preto do site o preto some (mesclagem *screen*, como no componente `Logo` do DS), então funcionam sem transparência. Para vídeo com transparência de verdade há um campo WebM e outro para Safari (HEVC/MOV), e a ajuda recomenda Lottie, GIF ou APNG. O seed já configura o wordmark PNG do DS e a animação de traço. **Favicon:** o conjunto do DS. |
| Cursor | ligado/desligado; imagem (SVG, PNG ou GIF); tamanho; ponto de clique (x, y); estado sobre links e cards (outra imagem ou texto curto, ex. "Ver"); movimento (colado ou com atraso leve) |
| Home | **Reel:** vídeo que toca sozinho em loop, poster, frase sobreposta. **Projetos em destaque:** até 8, arrastar (ver dúvida 2). Intro de entrada liga/desliga. Seções liga/desliga: Clientes, Sobre, Contato. Textos dos blocos Sobre e Contato da home. |
| Contato e redes | e-mail, WhatsApp, LinkedIn, Instagram, Vimeo, Behance |
| Rodapé | texto e linha de copyright |
| SEO padrão | título, descrição, imagem de compartilhamento |
| Textos da interface | todos os rótulos fixos ("Ver todos os trabalhos", "Carregar mais", "Ativar som", "Desativar som", "Próximo projeto", "Relacionados", "Voltar para os trabalhos", "Copiar e-mail", "Copiado", "Todos", rótulos de acessibilidade…), preenchidos pelo seed. Nenhum texto fica no código, o que facilita o inglês depois. |

### 3.3 Objetos reutilizáveis

| Objeto | Campos |
|---|---|
| Imagem | arquivo (JPG, PNG, WebP, GIF), recorte/ponto focal, **texto alternativo obrigatório** (ajuda: "descreva a imagem para quem usa leitor de tela e para o Google") |
| Vídeo | fonte: **Mux** (upload no painel) · **Arquivo MP4** (upload no Sanity, para loops curtos) · **URL** (MP4 ou HLS `.m3u8`) · **Vimeo**; poster opcional (o Mux gera um automático) |
| Mídia | imagem ou vídeo |
| Crédito | função, nome, link opcional |
| SEO | título, descrição, imagem |
| Opções do bloco | largura (ponta a ponta, conteúdo, estreita) · espaço acima e abaixo (P, M, G) · fundo · legenda. Fundos, todos tokens do DS: **preto** (`ink-1000`, padrão) · **preto elevado** (`ink-900`) · **superfície** (`ink-800`) · **branco** (tema claro do DS, para peças impressas ou documentos) |

### 3.4 Blocos do construtor (todos com as "Opções do bloco")

| # | Bloco | Campos próprios | Preview no painel |
|---|---|---|---|
| 1 | Vídeo | vídeo; controles (não); loop (sim); proporção (16:9, 9:16, 1:1, 4:5, 21:9, original); botão de som (sim) | miniatura + "Vídeo · 16:9" |
| 2 | Imagem | imagem | miniatura + "Imagem · ponta a ponta" |
| 3 | Mosaico | layout (2, 3 ou 4 colunas, masonry, destaque + 2, destaque + 4); espaço entre itens; itens (imagem, GIF ou vídeo curto) | 1ª mídia + "Mosaico · 3 colunas · 6 itens" |
| 4 | Lado a lado | proporção (50/50, 60/40, 40/60); mídia esquerda; mídia direita | 1ª mídia + "Lado a lado · 60/40" |
| 5 | Antes e depois | imagem antes; imagem depois; rótulos; posição inicial do divisor (0–100%); orientação | "Antes e depois · horizontal" |
| 6 | Composição livre | até 6 itens {mídia, coluna inicial 1–12, largura 1–12, deslocamento vertical nenhum/P/M/G} | "Composição livre · 4 mídias" |
| 7 | Galeria / carrossel | itens; altura (P, M, G) | "Galeria · 8 itens" |
| 8 | Texto | título de seção; texto formatado; alinhamento; (largura estreita por padrão) | início do texto |
| 9 | Citação | frase; autor; cargo | início da frase |
| 10 | Créditos | título; lista de créditos | "Créditos · 5 nomes" |
| 11 | Embed | link do Vimeo ou YouTube; proporção | "Embed · Vimeo" |
| 12 | Espaçador / divisor | tamanho (P, M, G); mostrar linha | "Espaçador · M" |

### 3.5 Validações e conforto

- **Thumb obrigatória.** Alt obrigatório em toda imagem, com texto de ajuda.
- **Aviso** (não bloqueia):
  - imagem menor que o recomendado para a largura escolhida (ponta a ponta: mín. 2400px; conteúdo: 1800px; estreita: 1200px);
  - GIF acima de ~8 MB, sugerindo trocar por vídeo em loop.
- **Duplicar projeto:** ação nativa do Sanity, ajustada para não copiar o slug nem a posição na ordem.
- **Pré-visualização:** Presentation tool com o site em modo rascunho, lado a lado com o formulário.
  - No painel, aba **Pré-visualizar**. Clicar num texto do site abre o campo dele no formulário.
  - Usa um token de leitura (papel Viewer) no `.env.local`, criado na Fase 4.
- **Painel em português:**
  - pacote `@sanity/locale-pt-br`, que traduz a interface do Sanity;
  - nomes e ajudas dos campos são escritos por mim, todos em português;
  - alguns textos internos de plugins (ex.: o do Mux) podem continuar em inglês.

---

## 4. Escolhas técnicas

Versões atuais conferidas no npm em 04/10/2026.

| Área | Escolha | Por quê |
|---|---|---|
| Framework | **Next.js 16.3** (App Router) + TypeScript + React 19 | versão estável atual |
| Estilo | **Tailwind CSS 4.3** com tokens em CSS variables + `@theme` | o Tailwind 4 lê os tokens direto do CSS: uma fonte de verdade só |
| CMS | **Sanity 6** + `next-sanity` 13, Studio em `/admin` | Studio no próprio site, como pedido; plano gratuito suficiente (ver custos). O painel roda isolado do CSS e das animações do site. |
| Atualização | **Webhook do Sanity → `/api/revalidate`** (assinatura verificada) → `revalidateTag` com expiração imediata | publicou, atualizou em segundos, **sem deploy**. Isso também protege os créditos do Netlify. |
| Rascunhos | Draft mode + Presentation tool | ver o projeto como ficará antes de publicar |
| Vídeo | `sanity-plugin-mux-input` 5 + as fontes alternativas (arquivo, URL, Vimeo) | ver 4.1 |
| Imagens | CDN do Sanity via `@sanity/image-url` + *loader* próprio do `next/image` (WebP/AVIF, `srcset`, `sizes`) | sem custo de imagem no Netlify. **GIFs continuam animados:** testado em 11/10/2026 com um GIF real no CDN do Sanity; ele devolve WebP animado com todos os quadros e menos da metade do peso. |
| Animação | **GSAP 3.15** (ScrollTrigger, Flip, SplitText, CustomEase) + `@gsap/react` | ver 4.2 |
| Scroll suave | **Lenis 1.3** | a referência usa; desligado com movimento reduzido e no toque |
| Transição de página | painel de cor (GSAP) + navegação do App Router | mesmo efeito da Buff sem Barba.js: cobre a tela → troca a rota → revela. Voltar/avançar do navegador: revelação rápida, sem cobrir. |
| Lottie (logo/transição) | `lottie-web` (build *light*), carregado **só** se o logo for Lottie | não pesa para quem não usa |
| Fontes | **Manrope** via `next/font/google` (baixada no build, servida pelo próprio site em WOFF2, com `swap` e fonte reserva de métricas ajustadas) | grátis (OFL), sem fonte paga em nenhuma etapa, funciona em todos os navegadores (ver `docs/tokens.md` §8) |
| Formulário | **Web3Forms**, chave em variável de ambiente; sem a variável, o formulário não aparece | 250 envios/mês grátis, sem servidor; honeypot contra spam |
| Hospedagem | **Netlify (plano Free)** | ver 4.3 |
| Placeholders | `sharp` (já vem com o Next.js) para as imagens; `ffmpeg-static` (dependência de desenvolvimento) para o MP4 | o ffmpeg não está instalado no seu Mac e não há Homebrew; assim nada é instalado no sistema |

Dependências de produção previstas (~14):
- `next`, `react`, `react-dom`;
- `sanity`, `next-sanity`, `styled-components` (exigência do Sanity);
- `@sanity/image-url`, `@portabletext/react`;
- `sanity-plugin-mux-input`, `@sanity/orderable-document-list`, `@sanity/locale-pt-br`;
- `gsap`, `@gsap/react`, `lenis`;
- `hls.js` e `lottie-web`, só sob demanda.

Nada pago.

### 4.1 Vídeo

O Mux grátis guarda **até 10 vídeos** (100 mil minutos de exibição por mês, até 1080p). Um portfólio com reel, aberturas e previews passa disso rápido. Por isso o campo de vídeo aceita quatro fontes, e cada uso vai para a mais adequada:

| Uso | Fonte recomendada | Reprodução |
|---|---|---|
| Reel, vídeos de abertura, vídeos com som | **Mux** (streaming adaptativo, poster automático) | ver abaixo |
| Loops curtos (thumb animada, preview, "GIF" em vídeo) | **Arquivo MP4 no Sanity** (não gasta a cota de 10 vídeos do Mux) | `<video>` nativo, zero JS extra |
| Trocar de fornecedor no futuro (Cloudflare Stream, Bunny, R2…) | **URL** (MP4 ou `.m3u8`) | idem |
| Vídeos que já estão no Vimeo | **Vimeo** | iframe (modo fundo para loops) |

Como os vídeos do Mux tocam:
- O plugin fica configurado com qualidade *basic* (a codificação não custa nada) e com a versão MP4 de cada vídeo ligada.
- **Vídeos que tocam sozinhos** (reel em loop, vídeos dos blocos) usam esse MP4 num `<video>` nativo, como a Buff faz. Não precisa de JS e o som funciona quando a pessoa ativa.
- **Vídeos com controles** (blocos com "mostrar controles") usam streaming adaptativo (HLS). O Safari toca HLS nativamente; nos outros navegadores, a biblioteca de HLS só é carregada quando o vídeo vai tocar.
- Não está claro se o plano grátis do Mux gera MP4. Se não gerar, os vídeos que tocam sozinhos também usam HLS.
  - **Fase 3:** o código já faz isso sozinho (tenta o MP4 e, se falhar, toca o HLS).
  - O teste com um vídeo real do Mux fica para quando a conta do Mux for criada, porque os vídeos de exemplo estão no próprio Sanity.
  - **Fase 7 (12/10/2026):** a documentação do Mux trata o MP4 como adicional pago.
    - O plugin agora vem sem MP4 e os vídeos do Mux tocam em HLS.
    - O site detecta, vídeo a vídeo, se existe MP4 (`muxMp4`) e o usa quando existir.

Regras do componente de vídeo:
- poster sempre;
- carrega só perto da tela e toca só visível;
- pausa ao sair da tela;
- **um vídeo com som por vez** (ativar o som de um silencia os outros);
- se o autoplay falhar (ex.: modo economia de energia do iPhone), mostra o poster com botão de play;
- com movimento reduzido, nada toca sozinho.

**Reel da home (ajuste de 11/10/2026):** toca sozinho, sem botão de pausar nem player em tela cheia. O único controle é "Ativar som", pequeno e discreto.
- Se o navegador recusar tocar sozinho (ex.: iPhone em economia de energia), o primeiro toque na página dá o play.
- Com movimento reduzido ou economia de dados, fica o poster; "Ativar som" dá o play com som.

### 4.2 Por que GSAP e não Motion

1. **A referência é feita de coreografias**: intro, menu com "wipe" em camadas, painel de transição com o logo, revelações encadeadas. Timeline com sobreposição de tempos e curvas personalizadas é o ponto forte do GSAP.
2. **Filtro sem pulo de layout:** o plugin Flip registra onde cada card estava, aplica o filtro e anima saídas, entradas e mudanças de lugar a partir dali. É exatamente o requisito do grid.
3. **ScrollTrigger + Lenis** é a integração mais testada (os dois no mesmo relógio), e é o par que a Buff usa.
4. **Licença:** desde a versão 3.13 (abril/2025) o GSAP é gratuito, com todos os plugins e uso comercial liberado.

O Motion seria ótimo para animações declarativas em React. Mas para essas coreografias e para a sincronia com o Lenis eu teria de escrever mais código próprio, e só pode ser um dos dois.

Peso (gzip): o GSAP core (28 KB) e o ScrollTrigger (18 KB) vão em todas as páginas. Flip (10 KB) e SplitText (4 KB) só carregam onde são usados.

### 4.3 Por que Netlify

- **A Vercel não serve no plano grátis.** O plano Hobby é só para uso pessoal não comercial, e a própria Vercel lista "anunciar a venda de um produto ou serviço" como uso comercial. Um portfólio de estúdio para conseguir clientes entra nisso. Na Vercel, o caminho seria o Pro, a US$ 20/mês.
- **O Netlify Free permite uso comercial** e suporta tudo o que o projeto usa no Next.js 16: App Router, revalidação por tag, draft mode, proxy/middleware.
- **Atenção ao modelo de créditos** (desde set/2025):
  - são 300 créditos/mês, com teto rígido: se acabar, o site fica pausado até o mês seguinte (nunca cobra);
  - **cada deploy de produção custa 15 créditos**;
  - tráfego custa 20 créditos/GB e requisições custam 2 créditos a cada 10 mil.
- **Como o projeto foi desenhado para caber nisso:**
  - publicar no painel **não faz deploy** (usa webhook);
  - imagens vêm do CDN do Sanity e vídeos do Mux/Sanity, então o Netlify só serve HTML, CSS, JS e fontes;
  - deploys de teste (*deploy previews*) são grátis.
- Detalhes e números completos vão para `docs/custos.md` na Fase 7.

### 4.4 Filtro na URL sem custo de servidor

- `/trabalhos?tag=ia` é servido a partir de páginas **estáticas por tag**, por uma regra de *rewrite* do Next (`beforeFiles`, casando o parâmetro `tag`). A URL continua com `?tag=`, mas o HTML sai pronto do CDN.
- A revalidação acontece quando você publica.
- No navegador, clicar numa tag só troca o estado e a URL, sem recarregar.
- Isso deixa o filtro instantâneo, bom para o Lighthouse, e não gasta créditos de função a cada visita.
- **Detalhe do Netlify:** o cache do CDN deles, com Next.js, só considera os parâmetros internos do Next na chave do cache. Sem ajuste, `?tag=ia` receberia a página sem filtro. A correção é declarar `Netlify-Vary: query=tag` nessa rota. Vou validar isso num deploy de teste (grátis).
- Se o *rewrite* der problema no Netlify, o plano B é renderização dinâmica com cache de dados (funciona igual, um pouco mais lenta).

### 4.5 Performance, acessibilidade e SEO (como vou garantir)

- **LCP** = poster do reel (prioridade, `sizes` corretos, AVIF/WebP). O vídeo só começa depois do carregamento.
- **Intro de entrada curta** (≤1,2s) para não atrasar o LCP. Vou medir na Fase 6; se pesar, ela encurta ou vira só o fade do logo.
- **JS sob demanda:** Flip, SplitText, `hls.js` e Lottie só carregam quando são usados.
- **Acessibilidade:**
  - link "Pular para o conteúdo";
  - foco visível na cor de destaque do DS;
  - menu com foco preso e `Esc`;
  - botões de som com `aria-pressed` e rótulo;
  - antes/depois operável por teclado (setas);
  - `prefers-reduced-motion` desliga intro, scroll suave, parallax, previews automáticos e transições, e o reel fica no poster até a pessoa ativar o som.
- **SEO:**
  - metadados por página e Open Graph com a thumb;
  - `sitemap.xml` sem os não listados e sem `/admin`;
  - `robots.txt` e `noindex` em `/admin` e nos não listados;
  - JSON-LD `Organization` (home) e `CreativeWork` (projeto).

---

## 5. Custos (resumo; detalhado em `docs/custos.md` na Fase 7)

| Serviço | Plano | Limites que importam | Se passar |
|---|---|---|---|
| Netlify | Free | 300 créditos/mês (deploy de produção = 15; 20/GB de tráfego; 2 por 10 mil requisições) | site pausa até o mês seguinte; Personal custa US$ 9/mês |
| Sanity | Free | 10 mil documentos, 100 GB de arquivos, 100 GB de tráfego/mês, 1 milhão de requisições CDN/mês, 2 webhooks | requisições falham (sem cobrança); Growth custa US$ 15/usuário/mês |
| Mux | Free | 10 vídeos guardados, 100 mil minutos/mês, até 1080p, selo "Mux" só no player deles (não usaremos) | com cartão cadastrado (pagamento por uso) os vídeos ficam ilimitados; com qualidade *basic* a codificação é grátis e um portfólio pequeno sai por centavos/mês |
| Web3Forms | Free | 250 envios/mês | envios recusados até o mês seguinte |
| Domínio .com.br | Registro.br | R$ 40/ano | — |

---

## 6. Decisões que tomei onde a especificação deixava espaço

Qualquer uma pode ser trocada; me diga.

1. **Hero:** segue a sua especificação (reel em tela cheia por trás) e o DS, não a Buff (que usa título + reel num cartão).
   - Com frase sobreposta: vídeo a 45% + degradê de proteção, regra do DS.
   - Sem frase: vídeo a 100%, para o trabalho aparecer inteiro.
   - Um único controle, "Ativar som", em pílula de texto discreta no canto (ajuste de 11/10/2026; a Buff também tem pausar).
2. **Intro de entrada** inspirada na Buff, usando a animação de traço do logo do DS (o DS reserva o logo animado para momentos de destaque e carregamento).
   - Roda uma vez por sessão, desliga no painel e nunca roda com movimento reduzido.
   - A duração é medida no Lighthouse na Fase 6.
   - É o "momento orquestrado" da home.
3. **Menu com o comportamento da Buff e o visual do DS:**
   - botão "menu +" abre um painel lateral (tela cheia no mobile), preto com hairlines e links em display minúsculo;
   - o painel tem Trabalhos, Sobre, Contato, redes e e-mail;
   - o kit do DS mostra os links sempre visíveis no header; pela sua regra (comportamento de menu = Buff), fico com o botão, mas a troca é simples.
4. **Clientes em grid** (padrão da parede de logos da Buff), não em faixa rolando:
   - 5 por linha no desktop e 3 no mobile;
   - troca de logos em ciclo só se houver mais logos do que células;
   - monocromático feito com máscara CSS na cor do DS, o que funciona com qualquer SVG ou PNG transparente.
5. **/trabalhos sem o projeto gigante no topo** que a Buff tem: o foco fica no filtro.
6. **Card:** mídia 3:2 (Buff) no visual do `ProjectTile` do DS:
   - título em minúsculas, cliente, ano à direita e tags em pílula clicáveis;
   - no hover, a mídia cresce 1.04 e troca pelo loop, e o título fica vermelho-rosado.
   - O link do card e os links das tags convivem sem conflito, tanto no teclado quanto no leitor de tela.
7. **"Voltar para os trabalhos"** lembra a lista de onde a pessoa veio (inclusive o filtro). Sem origem, vai para `/trabalhos`.
8. **Tags na home não mudam a URL da home.** O botão "Ver todos os trabalhos" carrega a tag ativa.
9. **Relacionados:** 3 projetos com a tag em comum, priorizando os destaques. "Próximo projeto" segue a ordem do painel e dá a volta no fim da lista.
10. **Tudo sobre preto**, como manda o DS. A alternância de seções claras e escuras e o rodapé colorido da Buff ficam de fora; o ritmo vem das hairlines e do respiro entre seções.
11. **Numeração de seção** (`01 ── TRABALHOS`) só onde o próprio DS usa: seções da home e listas. Nunca acima de todo título.
12. **Cursor customizado desligado por padrão** (a Buff e o DS usam o nativo); liga no painel quando você quiser.

---

## 7. Dúvidas (respondidas em 11/10/2026)

| Dúvida | Resposta |
|---|---|
| Fonte | **Nenhuma fonte paga em nenhuma etapa.** Entra a Manrope (grátis); ver `docs/tokens.md` §8 |
| Vermelho-rosado e logo vetorial | Sigo com `#FF2E5B` e os PNGs até você mandar os oficiais |
| Destaques da home | **Lista única** "Projetos em destaque" em Configurações → Home (até 8, arrastando), com aviso no formulário do projeto |
| Preview no mobile | **Só o card mais centralizado** toca, um por vez; nada com economia de dados ou movimento reduzido |
| Agência atual | **Live The Agency** |

---

## 8. O que a Fase 2 vai precisar de você

- **Uma conta no Sanity** (grátis). Eu rodo o comando que cria o projeto e você só faz login no navegador quando ele abrir. O seed usa esse mesmo login (`sanity exec --with-user-token`), então não precisa gerar token à mão.
- Mux, GitHub e Netlify só entram mais tarde (Fases 5 e 7). Os placeholders usam MP4 gerado localmente e enviado ao próprio Sanity.
