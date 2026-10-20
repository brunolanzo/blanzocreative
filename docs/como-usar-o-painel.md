# Como usar o painel

Tudo o que aparece no site é editado no painel, sem mexer em código.

## Entrar

- Endereço: o do seu site com `/admin` no final (ex.: `https://blanzocreative.netlify.app/admin`).
- Entre com a mesma conta do Sanity que você usou na criação do projeto (GitHub).
- Na primeira vez em um navegador novo, o Sanity pede o login de novo. É normal.

## O que tem na barra lateral

| Item | Para que serve |
|---|---|
| **Projetos** | Os trabalhos. A ordem desta lista (arrastando) é a ordem no site. |
| **Tags** | As disciplinas que fazem o filtro funcionar (Motion Design, Fotografia…). Também ordenáveis. |
| **Clientes** | Marcas com nome, logo e link. Alimentam a parede de clientes. |
| **Página Sobre** | Título, bio, disciplinas, trajetória, clientes, prêmios e CV. |
| **Página Contato** | Título, introdução e os textos do formulário. |
| **Configurações do site** | Logo, reel da home, destaques, e-mail e redes, rodapé, cursor, SEO e todos os textos de botões. |

No alto do painel há também as abas **Pré-visualizar** (o site ao lado do formulário) e **Vídeos (Mux)**.

## Rascunho, pré-visualização e publicação

- Toda mudança vira um **rascunho** até você clicar em **Publicar**. Ninguém vê o rascunho.
- Para conferir antes, abra a aba **Pré-visualizar**:
  - o site aparece ao lado, já com o rascunho;
  - clique num texto do site e o campo dele abre no formulário.
- Depois de **Publicar**, o site atualiza sozinho em até um minuto. Se não atualizar, recarregue a página com Cmd+Shift+R.

---

## Criar um projeto novo

Primeira vez publicando um trabalho real? Siga o passo a passo com teste em **[publicar-um-trabalho.md](publicar-um-trabalho.md)**.

1. **Projetos** → botão **+** (ou abra um projeto parecido, menu **⋯** → **Duplicar**: copia tudo menos o endereço).
2. Aba **Conteúdo**:
   - **Título** e **Endereço (slug)**: clique em **Gerar** para criar o endereço a partir do título;
   - **Subtítulo**, **Cliente** (opcional; projeto autoral pode ficar sem), **Agência**, **Ano**, **Minha função**;
   - **Tags**: pelo menos uma. São elas que colocam o projeto no filtro certo;
   - **Descrição de abertura**: o texto que aparece logo abaixo da mídia de abertura.
3. Aba **Mídia**: thumb, vídeo de preview e mídia de abertura (detalhes abaixo).
4. Aba **Página**: o corpo do projeto, montado com blocos (veja "Montar a página").
5. Aba **Créditos**: a ficha técnica (função, nome e link opcional).
6. Aba **Publicação e SEO**:
   - **Visibilidade:**
     - *Publicado* aparece nos grids;
     - *Não listado* só abre pelo link direto, bom para mandar a um cliente antes de anunciar. Fica fora do Google.
   - **SEO e compartilhamento:** opcional. Sem ele, o site usa o título, o texto e a thumb.
7. **Publicar**.

O projeto entra na lista na posição de cima. Arraste para a posição que quiser.

## Thumb, preview e mídia de abertura

- **Thumb do card** (obrigatória):
  - aparece nos grids da home e de /trabalhos;
  - pode ser imagem, GIF ou vídeo curto em loop (sem som);
  - proporção **3:2**, pelo menos **1800 × 1200 px**.
- **Vídeo de preview** (opcional): toca por cima da thumb quando o mouse passa no card (no celular, quando o card está no meio da tela). Use um loop de **5 a 10 segundos, sem som**.
- **Mídia de abertura**:
  - a primeira mídia da página do projeto, na largura do conteúdo;
  - imagem com pelo menos **2400 px de largura**, ou vídeo;
  - o vídeo toca sozinho, sem som, com o botão "Ativar som" no canto.

## Vídeos: de onde vêm

Todo campo de vídeo pergunta **"De onde vem o vídeo"**:

| Opção | Quando usar |
|---|---|
| **Upload no Mux** | Reel, vídeos longos ou com som. O Mux prepara versões para cada conexão e gera o poster. O plano grátis guarda poucos vídeos (veja `docs/custos.md`). |
| **Arquivo MP4** | Loops curtos sem som (até ~15 MB): thumbs, previews, vídeos de mosaico. Fica no próprio Sanity. |
| **Link de MP4 ou HLS** | Vídeos guardados em outro lugar (Cloudflare R2, Bunny…). Cole o link direto do arquivo. |
| **Vimeo** | Vídeos que já estão no Vimeo. |

Mais dois campos em todo vídeo:

- **Poster:** a imagem que aparece enquanto o vídeo carrega. Em **arquivo MP4 e link**, envie sempre: é ele que diz ao site o formato do vídeo (sem poster, o site usa 16:9). Exporte um quadro do próprio vídeo.
- **Descrição do vídeo:** uma frase sobre o que acontece no vídeo, para leitores de tela.

**Primeira vez com o Mux:**
1. O painel pede um token do Mux.
2. No site do Mux, vá em **Settings → Access Tokens** e crie um token com permissão **Mux Video: Read e Write**.
3. Cole o **Token ID** e o **Token Secret** no painel.

## Fotos e GIFs

- Todo campo de imagem pede o **texto alternativo**: uma frase descrevendo a imagem para quem usa leitor de tela (e para o Google). Ex.: "Modelo em contraluz segurando a lata, fundo preto".
- **GIFs continuam animados** no site.
- Acima de ~8 MB, o painel avisa. Nesse caso, prefira um MP4 em loop: fica mais leve com a mesma aparência.
- **Ponto focal:** clique no ícone de recorte da imagem para escolher o recorte e o ponto mais importante. O site mantém esse ponto visível quando a imagem é cortada (thumbs 3:2, mosaicos).
- O painel avisa quando a imagem é pequena demais para o lugar onde está.

## Montar a página com blocos

Na aba **Página**, em **Corpo da página**, clique em **Adicionar item** e escolha um bloco. Arraste pelos pontinhos para mudar a ordem.

| Bloco | O que faz |
|---|---|
| **Vídeo** | Toca sozinho, sem som e em loop (com botão de som). Com "controles completos", mostra a barra do navegador e espera a pessoa dar o play. Escolha a proporção. |
| **Imagem** | Uma imagem ou GIF. |
| **Mosaico** | Várias mídias juntas: 2, 3 ou 4 colunas, masonry (alturas livres), ou destaque + 2 ou + 4 menores. |
| **Lado a lado** | Duas mídias: 50/50, 60/40 ou 40/60. |
| **Antes e depois** | Duas imagens do mesmo tamanho com um divisor que a pessoa arrasta. |
| **Composição livre** | Até 6 mídias posicionadas no grid de 12 colunas (coluna inicial, largura e deslocamento para baixo). |
| **Galeria / carrossel** | Uma faixa horizontal que a pessoa arrasta. |
| **Texto** | Título de seção e texto formatado (negrito, itálico, listas, links). |
| **Citação** | Frase de cliente, com autor e cargo. |
| **Créditos** | Uma ficha técnica no meio da página. |
| **Embed** | Link do Vimeo ou YouTube. O player só carrega quando a pessoa clica. |
| **Espaçador / divisor** | Espaço vazio entre blocos, com linha opcional. |

Todo bloco (menos o espaçador) tem **Opções do bloco**:

- **Largura:**
  - **ponta a ponta:** encosta nas bordas da tela;
  - **largura do conteúdo;**
  - **estreita:** dois terços, centralizado.
- **Espaço acima e abaixo:** pequeno, médio ou grande.
- **Cor de fundo:** preto, preto elevado, superfície ou branco (o tema claro do design system, para peças impressas).
- **Legenda:** texto pequeno logo abaixo do bloco.

O projeto **"Identidade em movimento"** usa todos os blocos: abra-o para ver um exemplo de cada.

## Destaques da home

- Vá em **Configurações do site → Home → Projetos em destaque**.
- Adicione até **8** projetos e arraste na ordem que quiser.
- O formulário do projeto mostra um selo "Destaque na home" quando ele está nessa lista.

## Tags

- **Tags** → **+**: nome, endereço (**Gerar**) e uma descrição curta, que aparece quando a tag está ativa no filtro.
- Uma tag só aparece no filtro quando pelo menos um projeto publicado usa ela.
- A ordem da lista de tags é a ordem dos botões no site.

## Clientes

- **Clientes** → **+**: nome, logo, tratamento, link e "mostrar na home".
- **Logo:** SVG (ideal) ou PNG com fundo transparente. Sem logo, o site mostra o nome em texto.
- **Tratamento:**
  - **monocromático** (padrão) pinta o logo no cinza do site e no vermelho-rosado no hover;
  - **cores originais** mantém o arquivo como está.
- A ordem da lista é a ordem na parede de clientes. Com mais clientes do que espaços, eles se revezam.

## Trocar o logo

Em **Configurações do site → Logo e favicon**:

- **Tipo de logo:**
  - **imagem:** SVG, PNG ou GIF animado;
  - **vídeo curto em loop:** o MP4 com fundo preto funciona, porque o preto some sobre o site;
  - **animação Lottie (JSON).**
- **Quando animar** (vídeo e Lottie): sempre, só quando o mouse passa por cima, ou uma vez ao carregar. Parado, o logo mostra o desenho completo.
- **Altura** no computador e no celular, em pixels.
- **Favicon:** o ícone da aba do navegador (PNG quadrado de 512 × 512).

O vídeo do logo também aparece na intro da home e no painel de troca de página.

## Cursor

Em **Configurações do site → Cursor** (vem desligado):

- **Usar cursor customizado** e a **imagem** (SVG, PNG ou GIF animado, com fundo transparente);
- **Tamanho** em pixels;
- **Ponto de clique:** onde a "ponta" do cursor fica (0 = canto esquerdo/topo, 50 = centro);
- **Sobre links e cards:** um texto curto (ex.: "ver") ou outra imagem;
- **Movimento:** colado ao mouse ou seguindo com leve atraso.

O cursor não aparece em celular nem para quem pede menos animação no sistema. Sobre a galeria e o "antes e depois", ele mostra "Arraste".

## Reel da home e seções

Em **Configurações do site → Home**:

- **Demo reel:**
  - **Reel:** o vídeo que toca sozinho no topo, em loop. Prefira o Mux, principalmente se for o reel completo;
  - **Poster:** a primeira coisa que a home mostra, horizontal e com pelo menos **2400 px**;
  - **Frase sobreposta:** opcional, em minúsculas, com ponto vermelho. Com frase, o vídeo fica mais escuro para o texto aparecer.
- **Animação de entrada:** o logo se desenhando antes do reel, uma vez por visita.
- **Seções da home:** liga e desliga Clientes, Sobre (resumo) e a chamada para contato.
- **Sobre (resumo na home):** foto ou vídeo e 2 ou 3 frases.

## Outras configurações

- **Página Trabalhos:** título e introdução do topo de /trabalhos.
- **Contato e redes:** e-mail, WhatsApp (só números: 55 + DDD + número), LinkedIn, Instagram, Vimeo e Behance. Valem para o site todo.
- **Rodapé:** a frase grande antes do rodapé e o nome no copyright (o ano é automático).
- **SEO padrão:** título, descrição e imagem de compartilhamento (1200 × 630) usados quando uma página não tem os seus.
- **Textos da interface:** todos os textos de botões e rótulos ("Ver todos os trabalhos", "Ativar som"…). Mude o valor para trocar no site.

---

## Tamanhos e formatos recomendados

| Onde | Formato | Tamanho / duração |
|---|---|---|
| Thumb do card | JPG/PNG/WebP, GIF ou MP4 em loop | 3:2, mínimo 1800 × 1200 px |
| Vídeo de preview do card | MP4 (H.264) sem som | 3:2, 5 a 10 s, até ~5 MB |
| Mídia de abertura do projeto | Imagem ou vídeo | Imagem com 2400 px de largura; vídeo 1920 × 1080 ou maior |
| Bloco ponta a ponta | Imagem | 2400 px de largura |
| Bloco na largura do conteúdo | Imagem | 1800 px de largura |
| Bloco estreito | Imagem | 1200 px de largura |
| Imagens de mosaico, lado a lado, galeria | Imagem, GIF ou MP4 | 1200 a 1800 px no lado maior |
| GIF animado | GIF | até ~8 MB (acima disso, use MP4 em loop) |
| Loop curto em arquivo | MP4 (H.264), sem som | até ~15 MB; sempre com poster |
| Vídeo com som ou longo | Mux (upload) | 1080p é o máximo do plano grátis |
| Poster do reel | JPG | 16:9, mínimo 2400 × 1350 px |
| Logo do site | SVG (ideal), PNG transparente, GIF, MP4 com fundo preto ou Lottie | altura de 28 px no computador e 22 px no celular (ajustável) |
| Logo de cliente | SVG ou PNG transparente | qualquer tamanho; o site ajusta |
| Imagem de compartilhamento | JPG | 1200 × 630 px |
| Favicon | PNG quadrado | 512 × 512 px |
| CV | PDF | — |
