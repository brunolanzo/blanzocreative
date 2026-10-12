# Tokens do site Blanzo

Fonte da verdade: o design system exportado do Claude Design, em `design-system/project/` (principalmente `tokens/*.css` e `readme.md`). Este documento resume os tokens, mostra como entram no código e registra cada ponto em que tive de decidir algo.

Na Fase 2, os arquivos `tokens/*.css` do DS entram no projeto **sem alteração de valores**: só muda o caminho das fontes. O Tailwind 4 lê esses tokens via `@theme inline`, então existe uma fonte só.

---

## 1. Cores

O site é **preto como base**, não um "modo escuro". O tema claro do DS existe para documentos e impressão.

### Escala

| Token | Valor | Uso no DS |
|---|---|---|
| `--ink-1000` | `#000000` | fundo das páginas |
| `--ink-900` | `#0A0A0A` | superfície de "card" (painéis) |
| `--ink-800` | `#141414` | superfície elevada, fundo de mídia carregando |
| `--ink-700` | `#1E1E1E` | — |
| `--ink-600` | `#2C2C2C` | **hairlines** (linhas de 1px) sobre preto |
| `--ink-500` | `#4A4A4A` | borda forte |
| `--ink-400` | `#6E6E6E` | texto apagado |
| `--ink-300` | `#9B9B9B` | texto secundário |
| `--ink-200` | `#C8C8C8` | — |
| `--ink-100` | `#E4E4E4` | hairline no tema claro |
| `--ink-050` | `#F2F2F2` | superfície elevada no tema claro |
| `--paper` | `#FFFFFF` | texto principal |
| `--flash-600` | `#C4103C` | destaque pressionado |
| `--flash-500` | `#FF2E5B` | **o destaque (vermelho-rosado)** |
| `--flash-400` | `#FF5C7E` | destaque em hover |
| `--flash-100` | `#FFE1E8` | tinta clara (pouco uso) |

> ⚠️ **O `#FF2E5B` é uma proposta do Claude Design, não o valor oficial da marca.** O `.ai` com a cor real não subiu. Se você tiver o hex, eu reajusto a rampa `flash-*`.

### Semânticos (tema escuro, o padrão)

| Token | Aponta para |
|---|---|
| `--surface-page` / `--surface-raised` / `--surface-card` | `ink-1000` / `ink-800` / `ink-900` |
| `--surface-inverse` / `--surface-accent` | `paper` / `flash-500` |
| `--text-primary` / `--text-secondary` / `--text-muted` | `paper` / `ink-300` / `ink-400` |
| `--text-inverse` / `--text-accent` | `ink-1000` / `flash-500` |
| `--text-link` / `--text-link-hover` | `paper` / `flash-500` |
| `--border-hairline` / `--border-strong` / `--border-accent` | `ink-600` / `ink-500` / `flash-500` |
| `--focus-ring` | `flash-500` |
| `--overlay-scrim` | `rgba(0,0,0,.72)`: header ao rolar, fundo do menu |
| `--protect-gradient` | degradê preto de baixo para cima, **o único degradê permitido**: texto sobre vídeo |

O tema claro (`[data-theme="light"]`) inverte superfícies, textos e bordas.

### Regra do destaque

O vermelho-rosado é um *flash*, para usar com parcimônia:
- hover;
- foco;
- o ponto final do título do hero;
- **um** CTA;
- o número de seção.

> Se dá para ver dois elementos em destaque ao mesmo tempo sem rolar, tire um.

---

## 2. Tipografia

| Token | Valor |
|---|---|
| `--font-sans` | **Manrope** (gratuita, ver §8), depois `"Helvetica Neue", Helvetica, Arial, sans-serif`. No DS original era Aeonik Pro (paga). |
| `--font-script` | `"Pacifico", cursive` (acento decorativo de uma linha; **nunca** para o logo nem para interface) |
| Pesos | 300 (só display muito grande) · 400 corpo · **500 títulos e interface** · 700 ênfase rara |

### Escala, mapeada nos papéis da Buff

As proporções da hierarquia vêm da Buff; os valores e as fontes vêm do DS. Todos os papéis da Buff têm equivalente no DS, então **nenhum token novo de tipo foi necessário**.

| Papel (Buff) | Token do DS | Tamanho | Entrelinha · tracking | Caixa |
|---|---|---|---|---|
| Display do hero | `--size-display-xl` | 56 → 144px (fluido) | 0.92 · −0.04em | minúscula |
| Título de página | `--size-display-l` | 44 → 96px | 0.92 · −0.04em | minúscula |
| Manifesto / título de seção | `--size-display-m` | 36 → 64px | 0.92 · −0.04em | minúscula |
| "Próximo projeto", nomes | `--size-h1` | 40px | 1.1 · −0.02em | minúscula |
| Subtítulos | `--size-h2` | 30px | 1.1 · −0.02em | minúscula |
| Título no card | `--size-h3` | 22px | 1.1 · −0.02em | minúscula |
| Texto de abertura | `--size-body-l` | 19px | 1.5 | frase normal |
| Corpo | `--size-body` | 16px | 1.5 · máx. 62 caracteres | frase normal |
| Legendas, créditos | `--size-body-s` | 14px (mínimo na tela) | 1.5 | frase normal |
| Rótulos, botões, eyebrow | `--size-label` / `--size-label-s` | 12 / 11px | 1.2 · **+0.16em** | **MAIÚSCULA** |

**Regras de texto:**
- **Caixa:** títulos sempre em minúsculas; rótulos e botões em MAIÚSCULAS; corpo em frase normal.
- **Ênfase:** um ponto final vermelho-rosado no título do hero; no máximo uma palavra em destaque por título.
- **Voz:** primeira pessoa do singular ("eu dirijo", nunca "nossa equipe").
- **Sem emoji.**
- **Rótulos curtos e com verbo:** "ver o trabalho", "começar um projeto".

---

## 3. Espaçamento e layout

| Token | Valor | Uso |
|---|---|---|
| `--space-1` … `--space-11` | 4, 8, 12, 16, 24, 32, 48, 64, 96, 144, 200px | escala única |
| `--gutter-page` | `clamp(20px, 5vw, 64px)` | margem lateral (substitui os 6vw da Buff) |
| `--maxw-content` | 1440px | largura máxima (igual à Buff) |
| `--maxw-prose` | 62ch | largura máxima de texto corrido |
| `--section-y` | `clamp(64px, 10vw, 144px)` | respiro vertical entre seções (substitui os 96px da Buff) |

**Estrutura da Buff resolvida com tokens do DS:**

| Estrutura (Buff) | Valor Buff | Token do DS |
|---|---|---|
| Gap entre colunas do grid | 40px | `--space-6` (32px), como no grid de trabalhos do DS |
| Gap entre linhas do grid | ~88px | `--space-7` (48px), idem |
| Deslocamento da coluna par | 3rem | `--space-7` (48px), mesmo valor |
| Mídias lado a lado | 24px | `--space-5` (24px), mesmo valor |
| Controles sobre vídeo | 8px | `--space-2` (8px), mesmo valor |
| Grid | 12 colunas | 12 colunas |

---

## 4. Raios, bordas, profundidade

| Token | Valor | Uso |
|---|---|---|
| `--radius-0` | 0 | layout e seções (a marca tem cantos retos) |
| `--radius-md` | 8px | **mídias e campos** |
| `--radius-pill` | 999px | **botões, tags, chips, pílulas de controle** |
| `--radius-sm` / `--radius-lg` | 4 / 16px | existem, mas o DS não usa no site |
| `--hairline` | `1px solid var(--border-hairline)` | estrutura: linhas, não caixas |
| `--shadow-*` | — | **só no tema claro**; sobre preto não há sombra |
| `--glow-accent` | anel + brilho vermelho-rosado | uso raro |
| `--blur-panel` | `saturate(140%) blur(18px)` | header ao rolar |

**Sem "cards":** um card no DS é uma coluna de texto com hairline em cima, sem fundo, sem sombra e sem raio. Quando precisa de superfície (mídia, formulário), usa `ink-900`/`ink-800` com raio de 8px e hairline.

---

## 5. Movimento

| Token | Valor | Uso |
|---|---|---|
| `--ease-draw` | `cubic-bezier(.65, 0, .35, 1)` | **curva assinatura** (do traço do logo) |
| `--ease-out` | `cubic-bezier(.16, 1, .3, 1)` | revelações, hover |
| `--ease-in-out` | `cubic-bezier(.4, 0, .2, 1)` | trocas neutras |
| `--dur-instant` | 120ms | pressionar |
| `--dur-fast` | 220ms | hover (mudança de cor) |
| `--dur-base` | 400ms | revelação, acordeão |
| `--dur-slow` | 800ms | zoom da mídia no hover, transições grandes |
| `--dur-draw` | 2400ms | desenho completo do logo |
| `--stagger` | 80ms | intervalo entre irmãos |

**Divisão Buff × DS no movimento:** a Buff decide **o que** se move e **quando**; o DS decide **como**.

| Momento (Buff) | Como fica com o DS |
|---|---|
| Revelação no scroll (Buff: sobe 40px, 0,1s) | sobe **16px** + fade, `--dur-base`, `--stagger`, `--ease-out` |
| Painel de transição de página | `--dur-slow` + `--ease-draw`; no centro, a animação de traço do logo (os MP4 do DS) |
| Entrada do menu (Buff: `cubic-bezier(.65,.05,0,1)`) | `--ease-draw` (curva quase idêntica) |
| Intro da home | logo desenhando (`--dur-draw`), versão curta; medido no Lighthouse na Fase 6 |
| Hover do card (Buff: card sobe 8px) | **regra do DS:** a mídia cresce 1.04 dentro do quadro e troca a imagem pelo loop; o título fica vermelho-rosado |
| Filtro (Buff: itens encolhem para 90%) | fade + 16px. O DS proíbe "pop" de escala, mola e quique |
| Scroll suave (Lenis) | mantido (o DS não fala de scroll) |

---

## 6. Logo e marca

| Arquivo | O que é |
|---|---|
| `assets/logo/wordmark-white.png` / `-black.png` | "blanzo" manuscrito, 2000×956 (PNG transparente) |
| `assets/logo/monogram-white.png` / `-black.png` | "bl", 600×639 |
| `assets/logo/badge-black.png` | "bl" vazado num disco preto, 435×435 |
| `assets/favicon/*` | favicon 64px, Apple 180px, Android 192px, Edge 270px |
| `assets/motion/*.mp4` | 5 animações de traço (2–3s, H.264, **fundo preto, sem áudio**) |

**Regras:**
- **Nunca recolorir:** branco sobre preto ou preto sobre branco; vermelho-rosado nunca.
- **Respiro mínimo:** a altura do laço do "b".
- **Animação:** só em momentos de destaque e carregamento.
- **Vídeos de logo:** como têm fundo preto, sobre o fundo preto do site usam `mix-blend-mode: screen` e o preto some. É o que o próprio componente `Logo` do DS faz. Não precisa de vídeo com transparência.
- **Tamanho:** o DS cita mínimo de 96px para o wordmark, mas o header do próprio DS usa 26px de altura (≈54px de largura). Sigo o header do DS; a altura é ajustável no painel.

> ⚠️ **Logos só em PNG.** O `.ai` com a versão vetorial não subiu. O PNG funciona, mas um SVG fica nítido em qualquer tamanho e pesa menos.

---

## 7. Ícones

O DS **não tem conjunto de ícones**, de propósito. As affordances são tipográficas:
- `+` girando 45° para `×` ao abrir;
- `→` e `←` dentro de rótulos de navegação;
- `✳` como separador;
- um ponto vermelho-rosado de 6px como indicador de status;
- números (`01`, `02`) marcando seções.

**No site:**

| Necessidade | Solução do DS |
|---|---|
| Som e pausa do vídeo | pílula de **texto** ("som", "pausar"/"tocar") com contorno branco a 40% sobre desfoque de 8px; nada de ícone. Versão discreta (24px de altura, texto cinza que acende em branco quando ligado), sem token novo |
| Redes sociais | links em texto ("linkedin", "instagram"…) |
| Botão do menu | rótulo "menu" com `+` que gira para `×` |
| Setas do carrossel e do "antes e depois" | `←` `→` tipográficos |

Se um dia precisar de ícone de verdade, o DS indica o Lucide com traço 1.5. É uma substituição sinalizada, não da marca.

---

## 8. Fontes

**Decisão (11/10/2026, a seu pedido): nenhuma fonte paga em nenhuma etapa.**

O Aeonik Pro (CoType Foundry) é comercial e a licença web só permite publicar os WOFF2 fornecidos pela CoType. Ele sai do projeto e **não é usado nem no desenvolvimento**. Os TTF que vieram no pacote continuam em `design-system/` como referência, sem nenhum uso, e ficam fora do Git.

**No lugar: Manrope** (Google Fonts, licença SIL Open Font License, grátis inclusive para uso comercial). Comparei 8 fontes gratuitas com a tipografia original do DS: DM Sans, Manrope, Figtree, Plus Jakarta Sans, Inter, Hanken Grotesk, Instrument Sans e Geist. A Manrope é a mais próxima:
- tem o mesmo grotesco geométrico de curvas "quadradas";
- tem largura e ritmo parecidos no título em minúsculas com tracking −0.04em;
- tem rótulos em MAIÚSCULAS bem espaçados;
- tem eixo variável de 200 a 800, então cobre os pesos do DS (300, 400, 500, 700);
- tem acentos completos em português.

O único ponto fraco: a Manrope **não tem itálico**. O DS não usa itálico em nenhum componente, então não faz falta. Num eventual `<em>` dentro de texto corrido, o navegador inclina a fonte. Se um dia quiser itálico de verdade, a alternativa mais próxima é a **Figtree**, que tem itálicos.

**Por que não falha em navegador nenhum:**
- vem pelo `next/font/google`, que baixa a fonte **no build** e serve do próprio site, em WOFF2. Não depende do Google na hora da visita.
- o Next gera uma fonte reserva com métricas ajustadas, para o texto não "pular" enquanto carrega.
- a pilha reserva continua a do DS: Helvetica Neue → Helvetica → Arial.

**Pacifico** (acento de script do DS) também é livre (OFL). Só entra se for usada, via `next/font/google`.

**Mudança de token:** `--font-sans` passa a apontar para a Manrope. É o único valor do DS alterado, por decisão sua.

---

## 9. Tokens novos (não existem no DS)

Você pediu para ser avisado. Todos são técnicos ou viram token a partir de um valor que o DS só escreve em texto ou dentro de um componente. **Nenhuma cor, fonte ou espaçamento novo.**

| Token | Valor | Por quê |
|---|---|---|
| `--z-header` · `--z-menu` · `--z-modal` · `--z-transition` · `--z-cursor` | 50 · 60 · 70 · 80 · 90 | ordem de camadas (header, menu, reel em tela cheia, transição, cursor) |
| `--ratio-card` | `3 / 2` | proporção dos cards (Buff) |
| `--ratio-reel` | `16 / 9` | reel e vídeos padrão |
| `--control-outline` | `rgba(255,255,255,.4)` | contorno das pílulas sobre vídeo (valor do componente `VideoFrame` e do texto do DS) |
| `--blur-control` | `blur(8px)` | desfoque das pílulas sobre vídeo (idem) |
| `--hero-video-opacity` | `.45` | opacidade do vídeo do hero com título por cima (texto do DS: "~45%") |
| `--nav-scroll-threshold` | 24px | ponto em que o header ganha o painel desfocado (componente `Chrome` do DS) |

---

## 10. Onde a Buff e o DS discordam

Regra que você definiu: estrutura e comportamento da Buff; visual do DS; no conflito, estrutura da Buff com o token mais próximo do DS.

| Ponto | Buff | DS | Como fica |
|---|---|---|---|
| Fundo das seções | alterna claro/escuro; rodapé colorido | preto sempre; sem cor de fundo decorativa | **preto sempre** (visual). O ritmo da Buff fica nas hairlines e no `--section-y` |
| Títulos | serifa com palavras em itálico | Medium em minúsculas, ponto vermelho-rosado (Manrope no lugar do Aeonik) | **DS**. Ênfase por cor numa palavra, não por itálico |
| Hero | título + reel num cartão | vídeo em tela cheia a 45% + degradê + título | **sua especificação + DS:** reel em tela cheia. Com frase por cima, 45% + degradê (DS); sem frase, 100%, para o trabalho aparecer inteiro |
| Header | logo some ao rolar; só botão de menu | links visíveis; painel preto desfocado + hairline após 24px | **comportamento da Buff** (botão + painel, logo some ao rolar) com **visual do DS** (botão sobre painel desfocado; menu preto com hairlines e títulos em display) |
| Card | 3:2 uniforme; sobe 8px no hover | proporções misturadas; mídia cresce 1.04; título vermelho-rosado | **proporção da Buff** (3:2, coluna par deslocada) com **hover do DS** |
| Controles de vídeo | botões redondos com ícones | pílulas de texto com contorno e desfoque | **DS** |
| Rodapé | 3 colunas + logo gigante | hairline, chamada em display + botão, linha com redes em texto, monograma, © | **DS** (cobre o pedido: e-mail, redes, ano) |
| Numeração e eyebrows | só a categoria do projeto | eyebrow com número em cada seção da home ("01 — trabalhos") | **DS, só onde o próprio DS usa:** seções da home e listas. Nunca em todo título |
| Marquee | não existe | faixa infinita de disciplinas ("uma por página") | **não uso por padrão:** a barra de tags já mostra as disciplinas. Fica como opção se você quiser |

## 11. Decisão de contraste (12/10/2026)

O cinza apagado do DS (`--text-muted`, #6E6E6E) tem contraste de 4,1:1 sobre o preto. Em texto pequeno, isso fica abaixo do mínimo da WCAG AA (4,5:1).

A pedido do usuário, o texto pequeno do site passou a usar o cinza secundário do próprio DS (`--text-secondary`, #9B9B9B, 7,6:1). Isso vale para rótulos, legendas, ano e cliente nos cards, números de seção e links do rodapé.

O token não mudou de valor. O cinza apagado continua só em detalhes decorativos (marcadores de lista). O texto branco sobre o vermelho-rosado (3,6:1) ficou como no DS.
