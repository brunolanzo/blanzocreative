# Referência de estrutura, layout e movimento: buffmotion.com

Análise feita em 04/10/2026 navegando o site ao vivo em 1440×900 (desktop) e 375×812 (mobile), medindo o DOM e o CSS calculado. Páginas vistas: home, `/projects`, uma página de projeto (`/projects/frontify-motion-toolkit`), `/studio`, `/info` e `/contact`.

> **Regra:** daqui saem só padrões e comportamentos (estrutura, proporções, ritmo, interação). Nada de código, textos, imagens, vídeos, fontes ou marca da Buff. Cores, fontes, logos e raios vêm do design system da Blanzo. Os números abaixo servem como proporção; na implementação cada valor é trocado pelo token mais próximo do design system.

---

## 0. O que roda por trás (para entender o comportamento)

| Peça | Uso na Buff |
|---|---|
| Webflow | CMS e hospedagem |
| GSAP 3.15 + ScrollTrigger + CustomEase | revelações no scroll, transições, menu |
| Lenis 1.3 | scroll suave (`lerp 0.165`, `wheelMultiplier 1.25`), sincronizado com o ScrollTrigger |
| Barba.js | transição entre páginas sem recarregar |
| lottie-web | rabiscos animados da marca (hero, menu, CTA, transição) |
| Swiper / slider próprio | depoimentos e galerias arrastáveis |
| Typeform | formulários (contato, newsletter) |
| Mux | vídeos servidos como **MP4 estático** (`stream.mux.com/{id}/2160p.mp4` ou `high.mp4`) num `<video>` nativo, sem player HLS |

Conclusão útil para nós: o "feel" vem de GSAP + Lenis + transição de página com painel. E o reel não usa player pesado: é `<video>` nativo com MP4.

---

## 1. Sistema de layout

- **Container:** largura `min(100% − 2 × 6vw, 1440px)`. A margem lateral é fluida (6vw): 86px em 1440, 22px em 375.
- **Grid:** 12 colunas. Gap principal de 40px; 24px entre mídias lado a lado; 8px entre controles pequenos.
- **Seções:** padding vertical fluido de ~32px (mobile) a 96px (desktop). Toda seção usa o mesmo valor; o ritmo vem da repetição.
- **Tipografia fluida:** todos os tamanhos são `clamp()` interpolando entre viewport 320px e 1440px.
- **Raios:** cards 4px, vídeos 8px, botões em pílula (999px), campos 8px.
- **Temas por seção:** a página alterna blocos claros e escuros. Padrão recorrente: hero **claro** → miolo **escuro** (manifesto, grid, depoimentos) → CTA final **claro** → rodapé em **cor de destaque** (a cor muda conforme a página).
- **Composição assimétrica:** títulos alinhados à esquerda ocupando ~6 colunas; parágrafos de apoio deslocados para a metade direita (colunas 7–12) e um pouco abaixo do título. Esse deslocamento aparece em quase todas as páginas e dá o ritmo editorial.

## 2. Hierarquia tipográfica (proporções, não fontes)

Duas famílias apenas: uma **display serifada** para títulos e uma **grotesca** para texto e interface. Tudo em peso regular; o contraste vem de **tamanho** e de **itálico** (palavras-chave dos títulos em itálico, às vezes na cor de destaque).

| Papel | Desktop | Mobile | Entrelinha | Tracking | Onde aparece |
|---|---|---|---|---|---|
| Display (H1) | 6.5rem (104px) | 2.8rem (45px) | 1.05 | −0.02em | hero de toda página, CTA final |
| H2 | 4rem (64px) | 2rem | 1.1 | −0.02em | manifestos, títulos de seção |
| H3 | 2.5rem (40px) | 1.5rem | 1.2 | −0.02em | "próximo projeto", nomes |
| H4 | 1.5rem (24px) | 1.3rem | 1.4 | −0.02em | título no card (itálico), títulos do rodapé |
| Parágrafo XL | 2rem (32px) | 1.2rem | 1.4 | 0 | ficha no topo do projeto (Cliente / Produção) |
| Parágrafo LG | 1.25rem (20px) | 1.1rem | 1.5 | 0 | categoria no card, intros |
| Corpo | 1rem | 0.9rem | 1.6 | 0 | texto corrido |
| Pequeno | 0.9rem | 0.8rem | 1.5 | 0 | legendas, links do rodapé |
| Eyebrow | 0.8rem | 0.7rem | 1.2 | +0.1em, caixa-alta | só em 2 lugares: barra de anúncio e categoria acima do título do projeto |

Razão display/corpo ≈ 6,5× no desktop e ≈ 3× no mobile. É essa diferença extrema que faz a página parecer editorial.

## 3. Header e menu

**Header**
- Barra de anúncio opcional no topo (pílula na largura do container com um link para o trabalho mais recente). Rola junto com a página.
- Header `sticky` no topo, **sem fundo**. Logo à esquerda (~36×44px) e, à direita, um único botão de menu (área de toque de 80×80px, ícone de seta →). Não há links de navegação expostos, nem no desktop.
- **No scroll:** o logo some (fade para opacidade 0) assim que a página sai do topo e só volta no topo. O botão de menu fica sempre visível, sobre um pequeno "chip" com fundo claro (raio 4px), para manter contraste sobre seções claras ou escuras. O header não se esconde ao rolar para baixo.

**Menu**
- Abre um painel lateral pela direita, com largura `clamp(34em, 42vw, 60em)`; no mobile, ocupa a tela inteira.
- Sobreposição escura (preto a 40%) sobre a página; clicar nela fecha. `Esc` fecha. O scroll suave é pausado enquanto o menu está aberto.
- Entrada em camadas: duas faixas de cor de destaque passam em sequência (efeito "wipe") e o painel claro fica; os links sobem em sequência (0,55s, `cubic-bezier(0.65, 0.05, 0, 1)`); um rabisco Lottie da marca se desenha atrás dos links.
- Conteúdo: links grandes na fonte display empilhados, linha de ícones de redes, botão em pílula "começar um projeto".
- O ícone do botão gira de → para ↗ quando o menu está aberto (vira o "fechar").

## 4. Home (ordem das seções)

1. **Intro (a cada carregamento completo da home; não reaparece em navegação interna):** tela escura cheia com uma frase curta centralizada por ~2,5s. Depois ela some (fade + sobe) e a página entra subindo de `7dvh` até 0 (1,2s, `power3.inOut`). Os Lotties da página esperam a intro terminar. Desligada com `prefers-reduced-motion`.
2. **Hero (claro):** H1 gigante de posicionamento, alinhado à esquerda, ocupando ~metade da largura; rabisco Lottie enorme ao fundo. Logo abaixo, o **reel num cartão 16:9 na largura do container** (raio 8px), autoplay, mudo, loop, `playsinline`, com poster. Dois botões redondos de 32px no canto inferior direito do vídeo (12px de margem, 8px entre eles): **ativar/desativar som** e **pausar/tocar**, com `aria-label`. O reel **não** é tela cheia na Buff: é o primeiro bloco depois do título.
3. **Manifesto (escuro):** H2 com palavra em itálico na cor de destaque; parágrafo na metade direita; link "saiba mais".
4. **Trabalhos em destaque (escuro):** grid de 2 colunas com 4 projetos (ver seção 5) e link para todos os projetos.
5. **Depoimentos (escuro):** H2 + slider horizontal arrastável (cursor `grab`), com autoplay que pausa no hover e fora da tela.
6. **Estúdio (escuro):** foto na largura do container + link "conheça o time".
7. **CTA (claro):** H1 gigante de convite + botão em pílula que abre o formulário; Lottie ao fundo.
8. **Rodapé (cor de destaque):** 3 colunas (newsletter, endereço, contato com telefone, e-mail com copiar e ícones de redes), o logotipo gigante cortado na base, linha legal (© ano, privacidade).

## 5. Card de projeto

- **Estrutura:** mídia **3:2** (raio 4px, `overflow: hidden`) → título (display em itálico, ~24px) → categoria (grotesca, ~20px), 24px abaixo da mídia. O card inteiro é clicável (link cobrindo o card) e o foco por teclado desenha um contorno de 2px na cor de destaque em volta dele.
- **Grid de 2 colunas** com gap de 40px; a coluna da direita desce **3rem (48px)**, criando um grid escalonado. Entre linhas, ~88px.
- **Hover (desktop):**
  - o card sobe 8px (`translateY(-8px)`, 0,5s, `cubic-bezier(0.76, 0, 0.25, 1)`);
  - o vídeo de preview só é carregado no primeiro hover (o `src` é aplicado na hora), dá play e aparece por cima da thumb com fade de 0,2s;
  - ao sair, o vídeo some com fade e só depois pausa e volta ao início.
  - Com `prefers-reduced-motion`, o card não sobe.
- **Mobile:** 1 coluna, sem escalonamento, gap de 40px. **O preview não toca sozinho:** a thumb fica estática.
- **Variante destaque:** em `/projects`, o projeto mais recente aparece sozinho, na largura do container, em 16:9.

## 6. Página de trabalhos (`/projects`)

1. **Hero (claro):** H1 à esquerda; parágrafo de introdução na metade direita, mais abaixo; link secundário para o reel; o projeto em destaque na largura do container (16:9).
2. **Filtros (escuro):** linha de botões em pílula (contorno de 1px; o ativo fica preenchido em cor clara), quebrando em duas linhas se precisar. Seleção única com "Todos". Os botões usam `aria-pressed`; os itens escondidos recebem `aria-hidden`.
3. **Grid:** o mesmo card escalonado de 2 colunas. Os ~24 projetos carregam de uma vez, sem paginação.
4. **Animação do filtro:** o grid escurece rapidamente; os itens que saem encolhem para 90% com fade e deixam o fluxo; os que ficam reaparecem com fade e escala. Cerca de 0,5s no total.
5. **A URL não muda** ao filtrar: o estado é só do navegador. *(Na Blanzo isso muda: o filtro vai para a URL, conforme a especificação.)*
6. CTA + rodapé.

## 7. Página de projeto

1. **Hero (claro):**
   - eyebrow com a categoria;
   - H1 com o título (2 a 3 linhas);
   - ficha na metade direita, em parágrafo XL: "Cliente | X" e "Produção | Y";
   - mídia de abertura na largura do container: vídeo autoplay mudo em loop, com os mesmos dois botões redondos. A proporção segue o material (no exemplo, ~1,45:1).
2. **Corpo (escuro):** blocos empilhados, separados pelo padding de seção (96px):
   - manifesto: H2 + parágrafo na metade direita;
   - texto: título ("o desafio", "o impacto") + parágrafo limitado a ~6 colunas, à esquerda;
   - mídias: par 50/50 com gap de 24px; mosaico 2×2; mídia na largura do container (4:3 ou 16:9); texto e mídia lado a lado (5/7 colunas);
   - citação: display em itálico, deslocada para a direita, com avatar, nome, cargo e empresa.
3. **Próximo projeto:**
   - linha divisória de 1px;
   - "Próximo projeto" em display itálico (~40px);
   - abaixo, divisão 5/7: à esquerda título (~40px), descrição curta (~20px) e "ver projeto"; à direita thumb 3:2.
   - O bloco inteiro é um link.
4. **CTA (claro)** com uma pergunta + botão; rodapé.
- Não há bloco de créditos separado nem botão "voltar": a navegação acontece pelo menu ou pelo próximo projeto. *(A Blanzo terá créditos, tags, relacionados e "voltar" com filtro, conforme a especificação.)*

## 8. Estúdio (`/studio`) e Info (`/info`)

- **Estúdio:** H1 de boas-vindas + foto do time na largura do container → manifesto (H2) → galeria horizontal arrastável → princípios → grid do time (itens alternados com deslocamento vertical; no hover a foto encolhe para 75%) → trabalhe conosco → impacto → CTA → rodapé.
- **Info:** H1 + Lottie → **parede de logos de clientes** → serviços → processo → depoimentos → CTA → rodapé.
- **Parede de logos:**
  - grid de 5 colunas × 3 linhas no desktop (15 visíveis; 12 no tablet);
  - cada célula tem proporção 3:2 e o logo ocupa 65% da largura, centralizado;
  - os logos são monocromáticos claros sobre fundo escuro (arquivos já tratados, sem filtro CSS);
  - com mais logos do que células, uma célula por vez troca de logo (ordem embaralhada), em ciclo contínuo.

## 9. Contato (`/contact`)

- Hero claro: H1 com palavra em itálico + Lottie; formulário embutido logo abaixo.
- Bloco escuro com texto na metade direita: e-mails que **copiam para a área de transferência** ao clicar, com a mensagem "copiado". Telefone com `tel:`.
- Depoimentos, CTA, rodapé.

## 10. Movimento

| Comportamento | Detalhe |
|---|---|
| Scroll suave | Lenis (`lerp 0.165`, roda ×1,25), sincronizado com o ScrollTrigger pelo ticker do GSAP. Pausa com o menu aberto. |
| Revelação no scroll | Só em grupos marcados (não em toda seção): filhos entram de `y: 40px` + opacidade 0, com intervalo de 0,1s entre eles, `power3.out`, quando o topo do grupo chega a 80% da tela, uma vez só. |
| Título do hero | Palavras do H1 entram ao carregar a página (ficam ocultas até o JS rodar, para evitar piscar). |
| Transição de página | **Saída:** painel de cor sobe cobrindo a tela (0,65s, `power4.out`) enquanto a página atual desliza −10dvh; um Lottie pequeno do logo toca no centro. **Entrada:** o painel continua subindo e sai pelo topo; a nova página sobe de `7dvh` até 0 (0,9s, `power3.inOut`) e o scroll volta ao topo. Total de ~1,5–2s. Com movimento reduzido: troca instantânea. |
| Curvas | Assinatura: saída forte `cubic-bezier(0, 0.84, 0.2, 1)` e entrada-saída `cubic-bezier(0.76, 0, 0.25, 1)`. |
| Vídeo | Carregamento preguiçoso (IntersectionObserver com margem de 100px); só toca visível e pausa quando sai (limiar de 50%); com movimento reduzido fica pausado. |
| Cursor | **Nativo.** Existe só um rótulo de texto contextual que aparece sobre elementos marcados (ex.: arrastar) e some em telas de toque; `grab`/`grabbing` nos sliders. |
| Movimento reduzido | Respeitado na intro, transições, revelações, hover dos cards e vídeos. |

## 11. Mobile (375px)

- Margem lateral de 6vw (~22px); H1 com ~45–48px; padding de seção ~32px.
- Header: logo + botão de menu (58px); menu em tela cheia com links em display (~40px).
- Reel 16:9 na largura do container, com os controles.
- Grid de 1 coluna, thumbs estáticas (sem autoplay de preview).
- Parede de logos com menos células.

---

## 12. Como isso vira a Blanzo

| Ponto | Buff | Blanzo (proposta) |
|---|---|---|
| Hero | título gigante + reel num cartão 16:9 abaixo | **especificação manda:** reel em tela cheia por trás + frase sobreposta opcional. Uso o ritmo da Buff (controles redondos no canto, header transparente por cima, entrada orquestrada) sobre o layout da especificação. |
| Intro | tela escura com frase, ~2,5s, a cada carregamento da home | mesma ideia, mais curta (≤1,2s) para não atrasar o LCP; 1× por sessão; desligável no painel; nunca com movimento reduzido. |
| Destaques na home | 4 projetos (2×2) | 8 projetos (2×4) + barra de tags que filtra ali mesmo. |
| Card | 3:2, título itálico + categoria, sobe 8px, preview no hover | igual na estrutura; abaixo do título: cliente + tags clicáveis. |
| Preview no mobile | estático | **decisão pendente** (ver plano): estático como a Buff, ou só o card mais centralizado tocando. |
| Filtro | client-side, URL não muda, tudo carregado | `?tag=` na URL, renderizado no servidor, voltar/avançar funcionando; "carregar mais". |
| Menu | botão único + painel lateral com wipe | igual, com 3 links (Trabalhos, Sobre, Contato) + redes + e-mail. |
| Logo no scroll | some fora do topo | igual (o logo customizável volta no topo). |
| Clientes | parede de logos 5×3 com ciclo, na página Info | faixa na home com o mesmo padrão de grid; ciclo só quando houver mais logos que células; nome em texto enquanto não houver logo. |
| Projeto | hero com ficha + corpo em blocos + próximo projeto | mesma ordem + créditos, tags, relacionados, "voltar" mantendo o filtro. |
| Transição de página | painel de cor + Lottie do logo | painel na cor do design system + logo da Blanzo (estático ou animado, conforme o painel). |
| Cursor | nativo + rótulo contextual | cursor customizado opcional (configurável no painel), com estado "Ver" sobre cards, seguindo esse espírito de rótulo contextual. |
