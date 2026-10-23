# Notas técnicas para as próximas fases

Pesquisa feita em 04/10/2026 (npm, documentação oficial e changelogs). Arquivo de apoio para a implementação; o resumo para decisão está em `docs/plano.md`.

## Versões conferidas (todas compatíveis entre si)

| Pacote | Versão | Observação |
|---|---|---|
| next | 16.3.8 | Node ≥ 20.9 |
| react / react-dom | 19.3.0 | Sanity exige ≥ 19.2.2; next-sanity, ≥ 19.2.3 |
| sanity | 6.17.0 | **Node ≥ 22.12** (máquina local: Node 24; no Netlify, fixar com `.nvmrc`) |
| next-sanity | 13.3.4 | peer: next ^16, sanity ^5.29 ou ^6 |
| styled-components | 6.x | peer do Sanity; não usar a 7 (pré-lançamento) |
| tailwindcss / @tailwindcss/postcss | 4.3.3 | |
| sanity-plugin-mux-input | 5.0.13 | suporta Sanity 6 |
| @sanity/orderable-document-list | 2.0.25 | uma ordem (`orderRank`) por tipo |
| @sanity/locale-pt-br | 1.1.37 | `plugins: [ptBRLocale()]` |
| @sanity/image-url | 2.1.1 | `import {createImageUrlBuilder} from '@sanity/image-url'` |
| @portabletext/react | (usar o reexportado pelo next-sanity) | evita duas cópias |
| gsap / @gsap/react | 3.15.0 / 2.1.2 | todos os plugins gratuitos desde 3.13 |
| lenis | 1.3.26 | `lenis/react`; respeita `prefers-reduced-motion` |
| hls.js | 1.7.3 | só sob demanda |
| lottie-web | 5.13.0 | build *light*, só sob demanda |
| ffmpeg-static | 5.3.0 | devDependency para o MP4 do seed |

## Next.js 16

- **APIs assíncronas:** `await params`, `await searchParams`, `await cookies()`, `await headers()`, `await draftMode()`.
- **`revalidateTag(tag, perfil)`:** o segundo argumento é obrigatório. No webhook, usar `revalidateTag(tag, { expire: 0 })` para expirar na hora. O `'max'` é *stale-while-revalidate*: a primeira visita ainda veria o conteúdo antigo.
- **`middleware.ts` virou `proxy.ts`**, com a função exportada `proxy` e execução só em Node.
- **Ferramentas:** Turbopack é o padrão em `dev` e `build`. `next lint` saiu: rodar ESLint direto.
- **`cacheComponents` é opcional (desligado).** Plano: ficar no modelo clássico (ISR + tags no fetch), o mais testado no Netlify.
  - Se ligar: as exportações `dynamic`/`revalidate` passam a dar erro.
  - Se ligar: rotas visitadas ficam montadas via `<Activity>`. Atenção ao montar e desmontar GSAP e Lenis.
- **`next/image`:**
  - `images.qualities` padrão `[75]`;
  - `priority` está obsoleto (usar `preload` / `fetchPriority="high"`);
  - `remotePatterns` no lugar de `domains`.
- O Next não sobrescreve mais `scroll-behavior: smooth` global. Com Lenis, não usar `scroll-behavior: smooth` no `html`.
- **Rewrites com query:**
  - `has: [{type: 'query', key: 'tag', value: '(?<tag>[a-z0-9-]+)'}]` em **`beforeFiles`**;
  - em `afterFiles` não funciona, porque a página estática `/trabalhos` é servida antes.

## Tailwind 4

- **Tokens em CSS:** `@theme { … }` gera utilitários e variáveis. Usar `@theme inline` quando o token aponta para outra variável (ex.: fontes do `next/font`).
- **Classes vindas do CMS** (ex.: cor de fundo do bloco) não são detectadas. Mapear para classes estáticas ou usar `@source inline(…)`.
- **Isolar o Studio:** grupos de rotas com layouts raiz separados. `(site)` importa `globals.css`, Lenis e GSAP; `(studio)/admin` não importa nada disso.

## Sanity / next-sanity

- **Studio:**
  - `sanity.config.ts` com `'use client'` e `basePath: '/admin'`;
  - rota `app/(studio)/admin/[[...tool]]/page.tsx` com `NextStudio` e `export {metadata, viewport} from 'next-sanity/studio'` (já põe noindex).
- **CORS:** cadastrar no projeto Sanity cada origem (localhost, deploy previews, domínio), com *credentials*.
- **Webhook:**
  - `parseBody(req, secret)` de `next-sanity/webhook`. O terceiro argumento já espera a consistência do Content Lake (3s) na versão 13.3.4, ao contrário do que diz a documentação.
  - Tags: por tipo (`project`, `tag`, `client`, `siteSettings`…) e por slug (`project:slug`).
- **Plano grátis:** 2 webhooks; buscas com `useCdn: false` contam na cota de 250 mil requisições/mês. Como o Next guarda o resultado em cache até a próxima publicação, o consumo fica muito baixo.
- **Presentation:**
  - `presentationTool` vem de `sanity/presentation`;
  - rota `app/api/draft-mode/enable/route.ts` com `defineEnableDraftMode`;
  - cliente com `stega: {studioUrl: '/admin'}`;
  - `<VisualEditing/>` só com draft mode ligado;
  - token `SANITY_API_READ_TOKEN` com papel Viewer.
  - Usar `stega: false` em metadados e `stegaClean()` antes de comparar textos ou passar para o SplitText.
- **`defineLive`:** a Sanity recomenda, mas a especificação pede webhook + revalidação por tag, que é o que vamos usar para o conteúdo publicado. Em modo rascunho, o `VisualEditing` atualiza a página sozinho.
- **TypeGen:** configurado em `sanity.cli.ts` (`typegen`). Rodar `sanity schema extract && sanity typegen generate`; usar `defineQuery`.
- **Ação de duplicar:** nativa. Usar `mapDocument` para limpar `slug` e `orderRank`, e remover a ação dos documentos únicos.

## Imagens e GIFs

- **Animação preservada:** desde 08/2024 o pipeline do Sanity transforma GIF e WebP animados mantendo a animação, até 256 megapixels somando todos os quadros. Acima disso, só o primeiro quadro.
- **Testado em 11/10/2026** com um GIF de 16 quadros (1200 × 900) no projeto:
  - `?w=800&fit=max` devolve GIF animado, 16 quadros, 22,9 KB;
  - `?w=800&fit=max&auto=format` com `Accept: image/avif,image/webp` devolve **WebP animado**, 16 quadros, 9,8 KB.
  - Conclusão: o loader usa `auto=format` também para GIF.
- **No Next:** com *loader* próprio, o Next não inspeciona a imagem. `unoptimized` usa o `src` como está, sem `srcset`. Usado só para logos SVG/GIF no header.

## Mux

- **Plugin:** `muxInput({ video_quality: 'basic', static_renditions: ['highest'] })`. A qualidade *basic* não cobra codificação; o padrão do plugin seria *plus*.
- **URLs:**
  - MP4: `https://stream.mux.com/{playbackId}/highest.mp4`;
  - HLS: `https://stream.mux.com/{playbackId}.m3u8`;
  - poster: `https://image.mux.com/{playbackId}/thumbnail.webp?time=…&width=…`.
- **O MP4 fica pronto depois do HLS.** O status salvo pelo plugin é uma foto do momento: não condicionar a renderização a ele. Ter fallback para HLS.
- **Plano grátis:**
  - até 10 vídeos guardados, 100 mil minutos/mês, até 1080p;
  - geração de MP4 no plano grátis não confirmada;
  - o selo "Mux" aparece só no Mux Player, que não vamos usar.
- **Players do Mux:** o `@mux/mux-player-react` (~314 KB gzip) e o `@mux/mux-video-react` (~218 KB) são pesados demais para a meta de Lighthouse.
  - O `@mux/mux-background-video` (~4 KB) exige qualidade *basic*/*premium*, ainda é 0.x, e não está claro se suporta áudio. Avaliar na Fase 3 só para loops sem som.

## Animação e scroll

- **GSAP + Lenis:**
  ```js
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(t => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  ```
  No React: `<ReactLenis root options={{autoRaf: false}} ref={…}/>`.
- **Elementos com rolagem própria** (painel do menu, galerias) precisam de `data-lenis-prevent`.
- **Grid filtrado:** `Flip.getState()` antes de mudar o estado e `Flip.from()` no `useLayoutEffect`/`useGSAP` seguinte.
- **Peso gzip:** core 28 KB, ScrollTrigger 18 KB, Flip 9,7 KB, SplitText 3,6 KB.

## Netlify

- **Adaptador:** OpenNext (`@netlify/plugin-nextjs` 5.16.x), com suporte ao Next 16. Um adaptador oficial do Netlify chega no fim de 2026, automático.
- **Cache do CDN e query:** a chave do cache só considera os parâmetros internos do Next. Na rota `/trabalhos`, mandar o cabeçalho `Netlify-Vary: query=tag` e confirmar num deploy preview.
- **Plano da conta (conferido na Fase 7):** Free **antigo**, sem créditos (conta de 2024; `type_slug: free-is-free`).
  - Limites por mês: 100 GB de tráfego e 300 minutos de build (rígidos), 125 mil execuções de função por site, 1 build por vez.
  - Passou do limite: os sites da conta ficam suspensos até o fim do mês. Sem cobrança.
  - Trocar para o plano de créditos (300 créditos, deploy = 15) é irreversível e dá menos folga para este site. Não trocar.
- **`proxy.ts`** roda como Edge Function: sem sistema de arquivos.

## Como ficou na Fase 3 (home e /trabalhos)

- **Vídeo:** `LoopVideo` é um `<video>` nativo que só recebe o endereço quando vai tocar pela primeira vez (`preload="none"`).
  - O HLS usa o suporte do próprio navegador (Safari) ou o hls.js, carregado sob demanda. Era o `hls.js/light` até a Fase 7; ver a nota do Mux na seção da Fase 7.
  - O `@mux/mux-background-video` não foi usado: o vídeo nativo resolve sem nenhum KB a mais.
  - Do Mux, o MP4 é tentado primeiro e, se der erro, o HLS assume.
- **Filtro de tags:**
  - a pílula clicada acende na hora;
  - os cards que saem somem em 220ms;
  - só então o estado muda: `Flip.getState` antes, `Flip.from` no `useLayoutEffect` seguinte;
  - a altura do grid anima junto.
  - Em /trabalhos a tag vai para a URL com `history.pushState`, e o título da aba acompanha.
- **/trabalhos?tag=…:** conferido com `next start`. A página sai pré-gerada do cache (`x-nextjs-cache: HIT`), com `Netlify-Vary: query=tag`.
- **Intro da home:**
  - dura 1,2s contados da primeira pintura, não da hidratação: 0,4s parada e 0,8s subindo;
  - o traço do logo (~1,4s no MP4 do DS) toca a 2,5×;
  - o painel sobe em pixels inteiros (`snap: 'y'`). Com `yPercent`, o Chrome deixava uma linha de 1px aparecendo no meio da subida.
- **`next/image`:** o Next 16 exige declarar as qualidades usadas (`images.qualities: [70, 75]`); 70 só no fundo do reel.
- **Reel da home (ajuste pedido em 11/10/2026):**
  - toca sozinho; o único controle é o de som, numa versão menor e cinza da pílula do DS;
  - sem "Assistir ao reel": o player em tela cheia e o campo "Reel completo" saíram do painel;
  - se o autoplay for recusado, o primeiro `click`/`touchend`/`keydown` na página dá o play;
  - com movimento reduzido ou economia de dados, "Ativar som" dá o play.
  - O som é ligado direto no `<video>` dentro do clique (`setMuted`/`playNow` do `LoopVideo`), porque o iPhone só libera som dentro do gesto.

## Como ficou na Fase 4 (página de projeto)

- **Blocos:** um componente por tipo em `src/components/blocks/`, todos dentro do `BlockShell`.
  - Espaços acima/abaixo: P 24 · M 48 · G 96px (dois blocos no "M" ficam a 96px).
  - Fundos: preto, preto elevado, superfície, ou "branco", que liga o tema claro do DS só no bloco (`data-theme="light"`).
- **Formato sem pulo de layout:** cada mídia reserva o espaço pelo formato antes de carregar.
  - Imagem: pelas dimensões do arquivo, com o recorte.
  - Vídeo: pelo poster, pelo Mux (`data.aspect_ratio`) ou 16:9.
  - O painel avisa quando um vídeo em arquivo não tem poster (menos no reel e nos cards, que têm quadro fixo).
- **Mídia sozinha num bloco** cabe na tela: até 85% da altura (100% se for ponta a ponta), centralizada.
- **Vídeos da página (`VideoPlayer`):**
  - mesmo padrão da home: tocam sozinhos sem som, só com o botão de som;
  - com "controles completos": barra do navegador, não toca sozinho, o endereço entra quando o vídeo aparece;
  - um som por vez: o vídeo que sai da página devolve o som (`useSound` solta no desmontar).
- **Embed (Vimeo/YouTube):**
  - só a imagem até o clique;
  - YouTube pelo `youtube-nocookie.com`, com a imagem grande (`maxresdefault`) e a pequena de reserva;
  - Vimeo pela API pública oEmbed, guardada por um dia.
- **Próximo e relacionados:**
  - próximo = o seguinte na ordem do painel (volta ao primeiro no fim);
  - relacionados = até 3 com tags em comum, mais tags primeiro, sem repetir o próximo;
  - não listados ficam fora dos dois.
- **Voltar para os trabalhos:** usa a lista e o filtro de onde a pessoa abriu o projeto (sessionStorage).
- **Pré-visualização:**
  - rotas `/api/draft-mode/enable` (segredo do painel + token) e `/disable`;
  - `<VisualEditing/>` no layout só com draft mode;
  - botão "Sair da pré-visualização" quando aberto fora do painel;
  - testada com um rascunho temporário (já apagado).
  - Token criado em 11/10/2026 pelo CLI: "Site Blanzo - pre-visualizacao", papel viewer. Para revogar: sanity.io/manage → projeto → API → Tokens.
- **Cache:** a página de projeto usa as tags `project`, `project:<slug>`, `client`, `tag` e `mux.videoAsset`.
  - Na Fase 7, o webhook precisa incluir os documentos `mux.videoAsset`: o vídeo do Mux termina de processar depois da publicação.
- **Intro da home:** o script que decide se ela aparece foi para o layout.
  - Ele roda uma vez por carregamento e não é mais desenhado pelo React na navegação, o que gerava um aviso.
  - Também passou a seguir a Buff: a intro só toca quando a visita começa pela home.
  - Na Fase 7 ele saiu do `<head>` e virou o primeiro item do `<body>` (motivo na seção da Fase 7).

### Revisão de código da Fase 4 (corrigido antes da aprovação)

- **Sair da pré-visualização:** o destino é conferido pela origem já resolvida da URL.
  - Antes, `/\outro-site` ou um TAB no endereço levavam para outro domínio.
  - Agora qualquer truque volta para o início do site; testado com as variações conhecidas.
- **Reel ou preview do Vimeo:**
  - o reel da home toca no player de fundo do Vimeo, cobrindo a tela, sem o botão de som;
  - os previews dos cards só usam vídeo que toca no `<video>` do site (`isNativeVideo`).
- **Trava de rolagem:** `lockScroll` conta as travas e aplica a trava pendente quando o Lenis nasce. A intro trava antes de o Lenis existir.
- **Vimeo com controles:** fica montado depois de aparecer (`useInView` com `once`), então rolar não interrompe quem assiste.
- **Anel de foco:** nos botões que cobrem um quadro arredondado (play do embed e do vídeo recusado, divisor do antes e depois) o anel é desenhado por dentro.
- **Ponto focal com recorte:** o hotspot do Sanity é medido na imagem inteira e convertido para a parte recortada.
- **Carga do hls.js:**
  - ao terminar, confere se o vídeo ainda deve tocar e ainda está na página;
  - só o preparo mais recente vale (contador);
  - vídeo com controles prepara o hls.js sem baixar e só baixa no play.

## Como ficou na Fase 5 (Sobre, Contato, logo e cursor)

- **Sobre:** título, bio (primeiro parágrafo em branco, os seguintes em cinza, como na tela do DS), disciplinas que levam ao filtro, foto/vídeo e CV (link com `?dl=`, que faz o CDN do Sanity baixar o arquivo).
  - Depois: trajetória, clientes (a mesma parede da home) e prêmios, cada seção só se tiver conteúdo, com a numeração ajustada.
  - O exemplo não inventa prêmios: a seção só aparece quando você cadastrar.
- **Contato:** e-mail (copiar e mailto), WhatsApp formatado (+55 11 90000-0000), redes, cada um liga/desliga em Página Contato.
  - **Formulário (Web3Forms):**
    - só aparece com `NEXT_PUBLIC_WEB3FORMS_KEY` (é uma chave pública por desenho do serviço);
    - campos: nome, e-mail, empresa, tipo de projeto (as tags + "Outro") e mensagem;
    - honeypot `botcheck` contra robôs; os rótulos do painel viram os nomes dos campos no e-mail;
    - testado sem enviar nada, com as respostas do Web3Forms simuladas (sucesso e erro).
- **Logo:**
  - imagem (SVG/PNG/GIF; o GIF anima sozinho), vídeo (MP4 com fundo preto usa mesclagem *screen*; WebM/HEVC para transparência) ou Lottie (`lottie-web`, build leve só com SVG, carregado sob demanda junto com o JSON);
  - modos: sempre, só no hover, uma vez ao carregar;
  - em repouso (modo hover, ou movimento reduzido) o logo fica no **último quadro**, o desenho completo;
  - o vídeo pode carregar antes da hidratação, então a montagem confere `readyState` além do evento;
  - testados com rascunhos temporários na pré-visualização (vídeo no hover e Lottie "uma vez"), já apagados.
- **Cursor customizado:**
  - elemento que segue o mouse (GIF anima, ao contrário de `cursor: url()`);
  - suavidade com `gsap.quickTo` (0,25s) ou colado (`quickSetter`);
  - estados: normal, hover em links/botões (texto curto ou outra imagem), "Arraste" em `[data-cursor-drag]` (galeria e antes/depois) e escondido sobre campos (volta o cursor do sistema);
  - some ao sair da janela ou entrar num iframe do Vimeo/YouTube;
  - nunca em toque nem com movimento reduzido.
- **Favicon:** `public/favicon.ico` (o ícone do DS em ICO com PNG dentro) atende o painel e qualquer rota sem ícone próprio.
- **Chave do Web3Forms:** criada pelo usuário em 11/10/2026 (formulário "Site Blanzo · Contato", site cadastrado como `localhost`) e salva no `.env.local`.
  - Fase 7: pôr a mesma variável no Netlify e trocar o endereço do formulário no painel do Web3Forms pelo domínio definitivo.

## Como ficou na Fase 6 (polimento)

- **Transição de página** (`PageTransition` + `AppLink` + `src/lib/page-transition.ts`):
  - o `onNavigate` do `next/link` cancela a navegação e o painel cobre a tela (`--dur-slow`, `--ease-draw`);
  - coberta, a página volta ao topo e a rota troca (`router.push` sem scroll); quando a rota nova chega, o painel sai pelo alto e a página sobe 48px;
  - total de ~2s, como na Buff;
  - **cor:** `bg-raised` (cinza quase preto do DS), com o traço do logo (MP4 do DS, mesclagem *screen*, 2×) no centro;
  - **sem painel:** voltar/avançar só faz um fade rápido; filtro e âncora (mesma rota) e movimento reduzido também ficam sem painel;
  - se a rota demorar mais de 6s, o painel sai mesmo assim.
- **Aparecer ao rolar (`Reveal`):** `ScrollTrigger.batch` nos filhos, a 85% da tela, uma vez. Só esconde o que está abaixo da tela no carregamento, então não pisca nem atrasa a primeira pintura.
- **Palavras dos títulos:** animação CSS (`[data-word]`), pausada enquanto `html[data-transition]` está em "covering/covered" ou a intro está na tela. Movimento reduzido também zera o `animation-delay`.
- **SEO:**
  - `/sitemap.xml` (páginas e projetos listados, com `lastModified`) e `/robots.txt` (bloqueia `/admin` e `/api/`);
  - JSON-LD `Organization` na home e `CreativeWork` em cada projeto, com o `<` escapado.
- **Lighthouse** (build de produção, 11/10/2026):

  | | Desempenho | Acessibilidade | Boas práticas | SEO |
  |---|---|---|---|---|
  | Celular | 94–97 | 96–97 | 100 | 100 |
  | Computador | 100 | 96–97 | 100 | 100 |

  - LCP no celular: 2,6–3,2s; TBT 0; CLS 0.
  - **O grande ganho:** o `useIsPresentationTool` do `next-sanity/hooks` (no botão "sair da pré-visualização") puxava o pacote inteiro do visual editing, ~210 KB comprimidos, em todas as páginas. Troquei por `window.self !== window.top`.
  - O vídeo do painel de transição só existe durante a troca. Escondido, ele contava como maior elemento (LCP).
  - `experimental.inlineCss`: o CSS do site (~10 KB comprimido) vai no HTML. A primeira pintura caiu de 1,1s para 0,8s no celular.
  - Intro da home medida: o vídeo do logo é o LCP da home (3,2s no celular, nota 94). Fica como está.
- **Contraste (decidido em 12/10/2026):** o cinza apagado do DS (`--text-muted` #6E6E6E sobre preto, 4,1:1) saiu do texto pequeno, que agora usa o cinza secundário. O branco sobre o vermelho-rosado (3,6:1) ficou, e é o único alerta de acessibilidade que sobra (filtro ativo). Detalhes em `docs/tokens.md` §11.

## Fase 7 (deploy)

- **GitHub:** repositório `brunolanzo/blanzocreative`. O conteúdo antigo (outra versão do site, com Supabase) foi substituído a pedido do usuário, sem backup.
  - Autor dos commits: `brunolanzo` com o e-mail privado do GitHub (`brunolanzo@users.noreply.github.com`).
- **Netlify:** site `blanzocreative` (https://blanzocreative.netlify.app), time "Blanzo", ligado ao GitHub (branch `main`).
  - `netlify.toml` com `npm run build`, `publish = ".next"` e Node 24. O primeiro deploy levou 74s.
  - Variáveis: as cinco do README, menos `NEXT_PUBLIC_SITE_URL` (de propósito). O endereço cai para a variável `URL` do Netlify (`src/lib/site-url.ts`), que existe no build **e** nas páginas refeitas depois (conferido: canônico e JSON-LD certos após o webhook).
  - Na mesma conta há outro site antigo e parado (`tubular-muffin-295776`, de 2024), que divide os limites do plano.
- **Sanity:** CORS `https://blanzocreative.netlify.app` com credenciais. Webhook "Site: atualizar ao publicar" com a configuração do README.
  - Teste de ponta a ponta: um documento `mux.videoAsset` criado e apagado pela API (não aparece no site). As duas entregas voltaram 200, e as páginas foram refeitas na hora seguinte.
- **O que o Netlify injeta no HTML** (fora do nosso código):
  - um comentário de propaganda no `<head>`, logo depois do `<meta charset>`, precedido de quebra de linha;
  - o script `/.netlify/scripts/hud` depois do `</html>`, que desenha o selo "Powered by Netlify" no canto inferior direito. O selo vem ligado em projetos Free criados desde 19/08/2026 e se desliga em **Project configuration → General → Powered by Netlify badge**, sem novo deploy.
- **Erro de hidratação (#418) causado pelo comentário:**
  - A quebra de linha vira um nó de texto no `<head>`. O React 19 hidrata pela posição os filhos do `<head>` que não são "hoistable", e o nosso `<script>` da intro era um deles. Ao achar texto onde esperava elemento, o React descartava o HTML do servidor e refazia a página inteira no navegador.
  - Provado nos dois sentidos: tirar o comentário do HTML publicado zera o erro, e pôr um comentário igual no build local o reproduz. O script do selo não interfere.
  - **Correção:** o script da intro virou o primeiro item do `<body>`. Regra: nada que o React precise hidratar pela posição no `<head>` do layout do site (só `<meta>`, `<link>`, `<title>` e scripts `async`).
- **404 no pré-carregamento de `/trabalhos?tag=…`:**
  - Logo após o build, o HTML traz as dicas de pré-carregamento marcadas como desatualizadas (`InliningHintsStale`), e o navegador pede a estrutura de cada link.
  - Depois que a página é refeita (qualquer publicação no painel), as dicas vêm atualizadas. O roteador do Next passa a reaproveitar a estrutura de `/trabalhos` para `/trabalhos?tag=…` e pede o trecho `trabalhos/__PAGE__`, que não existe na rota reescrita (`/trabalhos/filtro/[tag]`): 404.
  - Reproduzido no `next start` local depois de um aviso assinado ao `/api/revalidate`. Não é coisa do Netlify.
  - **Correção:** o `AppLink` não pré-carrega links com `?tag=`. O clique continua navegando sem recarregar, já filtrado.
- **Home:** ganhou endereço canônico (`/`).
- **Lighthouse no site publicado** (12/10/2026, com as correções acima). Ordem: home · /trabalhos · projeto · /sobre · /contato.

  | | Desempenho | Acessibilidade | Boas práticas | SEO |
  |---|---|---|---|---|
  | Celular | 98–99 · 98 · 98 · 99 · 100 | 96 · 96 · 100 · 100 · 100 | 100 | 100 |
  | Computador | 99 · 100 · 99 · 100 · 100 | 96 · 96 · 100 · 100 · 100 | 100 | 100 |

  - LCP no celular: 1,2–2,5s; TBT 0–40 ms; CLS ≤ 0,003. Nenhum erro no console.
  - A primeira visita depois de uma publicação é mais lenta, porque a página é refeita nessa hora (uma medição da home deu 82, com LCP de 3,8s). As seguintes saem do cache.
  - Antes das correções, "Boas práticas" era 96 em todas as páginas (o erro #418). A acessibilidade 96 é o filtro ativo (branco sobre vermelho-rosado).
- **Commits só de documentação:** ponha `[skip netlify]` na mensagem para o Netlify não gerar deploy.
- **Mux:** sem MP4 por padrão (adicional pago). `resolveVideo` só tenta o MP4 quando o asset tem o arquivo `highest.mp4` (`muxMp4` na consulta).
  - **HLS no Chrome (corrigido em 21/10/2026):** o Chrome recente responde "maybe" a `canPlayType('application/vnd.apple.mpegurl')`, mas não toca os vídeos do Mux (erro 4, "no supported sources"; testado no Chrome 155 e no navegador do app, Chrome 152). O `LoopVideo` confiava nessa resposta e tentava o HLS nativo. Agora o nativo fica só para o Safari (e navegadores sem MSE, como os do iPhone); no resto, o hls.js. Conferido: o vídeo do Mux toca no Chrome 155 a 720p.
  - **Som no hls.js (corrigido em 21/10/2026):** o Mux manda o áudio numa faixa separada (`#EXT-X-MEDIA:TYPE=AUDIO`), e a versão `hls.js/light` não carrega faixas de áudio separadas. Resultado: vídeo mudo no Chrome, no Edge e no Firefox (0 bytes de áudio decodificados). O `LoopVideo` passou a usar o hls.js completo: 183 KB comprimidos contra 116 KB, baixados só quando um vídeo HLS vai tocar fora do Safari.
- **Vídeo de projeto com som (23/10/2026, pedido do usuário):**
  - `VideoPlayer` passa `autoSound` ao `LoopVideo`: ao tocar sozinho, ele tenta `play()` sem `muted`. O Chrome e o Safari só aceitam depois de uma ativação do usuário no documento (clique, toque, tecla; rolar não conta). Numa navegação dentro do site, o clique no card já vale. Se o `play()` falha com `NotAllowedError`, o vídeo volta a `muted` e toca assim.
  - Com som, o vídeo toma o som (`claimSound`). A escolha da pessoa (botão de som ou volume da barra nativa, detectado no `volumechange` comparando com o `muted` que o site pôs) vale para os próximos: desligou, `soundOptedOut()` impede o próximo de começar com som.
  - Com "controles completos" o vídeo também toca sozinho; pausar na barra impede que ele volte a tocar sozinho. O `poster` vai no próprio `<video>`, para o player nativo não ficar cinza enquanto carrega.
  - Vídeo com som só toca com metade dele na tela (`threshold: 0.5`).
  - Conferido no Chrome 155 com a regra padrão de autoplay: link direto e só rolando → toca sem som; depois de um clique na página ou chegando pelo card → toca com som (áudio decodificado); rolando para longe → pausa; movimento reduzido → não toca sozinho, e o play da barra toca com som.
- **`useInView` e o `threshold` (corrigido em 23/10/2026):** o `isIntersecting` já é true com 1px na tela, então a fração pedida era ignorada (o vídeo tocava com 1px visível e só pausava quando saía inteiro). Agora o hook também confere o `intersectionRatio`. Afeta o reel da home (15%) e os vídeos de projeto.
- **Custos:** pesquisa nas páginas oficiais em 12/10/2026, em `docs/custos.md`.

## Fontes da pesquisa

- [Next.js 16](https://nextjs.org/blog/next-16) · [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) · [proxy](https://nextjs.org/docs/app/api-reference/file-conventions/proxy) · [rewrites](https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites)
- [Tailwind: tema](https://tailwindcss.com/docs/theme) · [Tailwind + Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Studio embutido no Next.js](https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs) · [Visual editing no App Router](https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router) · [Validação de webhooks](https://www.sanity.io/docs/nextjs/validating-sanity-webhooks-nextjs) · [URLs de imagem (GIF)](https://www.sanity.io/docs/apis-and-sdks/image-urls)
- [Mux: MP4 estático](https://www.mux.com/docs/guides/enable-static-mp4-renditions) · [Mux: imagens do vídeo](https://www.mux.com/docs/guides/get-images-from-a-video) · [Mux: plano grátis](https://www.mux.com/blog/free-plan)
- [Licença do GSAP](https://gsap.com/standard-license/) · [Lenis](https://github.com/darkroomengineering/lenis)
- [Next.js no Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) · [Créditos do Netlify](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/) · [Cache do Netlify e query](https://answers.netlify.com/t/nextjs-netlify-cache-doesnt-take-into-account-query-parameters-by-default/131312/2)
- [Planos antigos do Netlify](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-legacy-plans/legacy-pricing-plans/) · [Selo "Powered by Netlify"](https://docs.netlify.com/manage/projects/powered-by-netlify-badge/) · [Lançamento do selo](https://www.netlify.com/changelog/2026-08-19-pre-launch-toolbar-and-powered-by-netlify-badge/)
