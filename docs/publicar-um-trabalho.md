# Publicar um trabalho real

O caminho mais seguro para o primeiro trabalho: publicar como **Não listado**, conferir no site pelo link e só depois mostrar para todo mundo.

Enquanto estiver não listado, o projeto **não aparece** nos grids, na home, no "próximo projeto", no sitemap nem no Google. Só abre para quem tiver o link.

Os detalhes de cada campo e os tamanhos de arquivo estão em [como-usar-o-painel.md](como-usar-o-painel.md).

---

## 1. Separe o material

| O quê | Como | Precisa? |
|---|---|---|
| Textos | Título, ano, sua função, cliente e agência (se houver), 1 a 3 tags e uma descrição de abertura de 2 a 4 frases | obrigatórios: título, ano e uma tag |
| Thumb do card | Imagem, GIF ou MP4 em loop sem som, proporção **3:2**, mínimo **1800 × 1200 px** | obrigatória |
| Vídeo de preview | Loop de 5 a 10 segundos, sem som, 3:2, até ~5 MB | opcional |
| Mídia de abertura | Imagem com **2400 px** de largura, ou vídeo de 1920 × 1080 ou maior | recomendada |
| Mídias da página | Imagens de 1200 a 2400 px de largura, GIFs, vídeos | opcional |
| Créditos | Função, nome e link de cada pessoa | opcional |
| Logo do cliente | O arquivo oficial, em SVG ou PNG com fundo transparente | opcional: sem logo, o site mostra o nome |

**Vídeos:**

- **Com som ou longos:** use o Mux. Na primeira vez, o painel pede o token (veja "Primeira vez com o Mux" no guia). Se o vídeo já estiver no Vimeo, dá para usar o link dele.
- **Loops curtos sem som:** arquivo MP4 de até ~15 MB, sempre com um **poster** (um quadro do próprio vídeo, exportado como imagem).

O site mostra os títulos em minúsculas sozinho. Escreva normalmente.

## 2. Entre no painel

Abra **https://blanzocreative.netlify.app/admin** e entre com a sua conta do Sanity (a do GitHub).

## 3. Cadastre o cliente

Pule este passo se o projeto for autoral ou se o cliente já estiver na lista.

1. **Clientes** → **+**.
2. Preencha **Nome**, **Logo**, **Cor do logo** e **Link (opcional)**.
3. Durante o teste, **desmarque "Mostrar na faixa de clientes da home"**. Marcado, o cliente aparece na home assim que é publicado, mesmo com o projeto escondido.
4. **Publicar**.

Cadastre o cliente **antes** do projeto. Se ele for criado de dentro do projeto (botão "Criar novo"), fica como rascunho, e o site só mostra o nome dele depois que ele também for publicado.

As tags que já existem cobrem as disciplinas do site. Para uma nova: **Tags** → **+**, nome, endereço (**Gerar**), descrição e **Publicar**.

## 4. Crie o projeto

1. **Projetos** → **+**.
2. Aba **Conteúdo**:
   - **Título**, depois **Endereço (slug)** → **Gerar**. Esse endereço é o final do link do projeto;
   - **Subtítulo**, **Cliente**, **Agência (opcional)**, **Ano** e **Minha função no projeto**;
   - **Tags**: pelo menos uma;
   - **Descrição de abertura**.
3. Aba **Mídia**:
   - **Thumb do card**, **Vídeo de preview (opcional)** e **Mídia de abertura**;
   - em cada mídia, escolha o **Tipo** (Imagem ou GIF, ou Vídeo);
   - em toda imagem, escreva o **Texto alternativo**: uma frase descrevendo a imagem. É obrigatório, e sem ele o painel não publica;
   - se a imagem for ser cortada (a thumb, por exemplo), escolha o ponto focal no ícone de recorte;
   - em todo vídeo, escolha **De onde vem o vídeo** e envie o poster.
4. Aba **Página**:
   - **Corpo da página** → **Adicionar item...** → escolha um bloco;
   - comece simples, por exemplo **Texto**, **Mosaico** e **Vídeo**;
   - o projeto de exemplo **"Identidade em movimento"** usa todos os blocos: abra-o para ver como cada um fica.
5. Aba **Créditos**: **Adicionar item** para cada pessoa.
6. Aba **Publicação e SEO**:
   - **Visibilidade** → **Não listado**;
   - **SEO e compartilhamento** pode ficar vazio: o site usa o título, a descrição e a thumb.

O painel guarda tudo sozinho como **rascunho**. Ninguém vê o rascunho.

## 5. Confira antes de publicar (opcional)

1. Abra a aba **Pré-visualizar**, no alto do painel.
2. Na barra de endereço da pré-visualização, digite `/trabalhos/` seguido do endereço do projeto.
3. A página aparece com o rascunho. Clique num texto para abrir o campo dele.

Se a pré-visualização não abrir, siga em frente: o passo 6 é o teste de verdade.

## 6. Publique escondido

1. Clique em **Publicar** (o botão verde, embaixo à direita).
   - Se o painel não deixar, ele mostra em vermelho o que falta. Em geral é o título, o endereço, o ano, uma tag, a thumb, o texto alternativo de alguma imagem ou uma mídia vazia num bloco.
   - Os avisos em amarelo (imagem pequena, sem mídia de abertura) não impedem a publicação. Corrija se puder.
2. Espere alguns segundos e abra `https://blanzocreative.netlify.app/trabalhos/` com o endereço do projeto no final.
3. Confira no computador e no celular:
   - textos e créditos;
   - imagens e vídeos;
   - o botão "Ativar som";
   - o "próximo projeto" no fim da página.
4. Para ajustar, mude no painel e clique em **Publicar** de novo. A página atualiza em até um minuto. Se não atualizar, recarregue com **Cmd+Shift+R**.

Quem tiver o link vê a página. Dá para mandar ao cliente antes de anunciar.

## 7. Mostre para todo mundo

1. Aba **Publicação e SEO** → **Visibilidade** → **Publicado: aparece nos grids do site** → **Publicar**.
2. O projeto entra no topo de `/trabalhos` e no filtro das tags dele. Para mudar a posição, arraste-o na lista **Projetos**.
3. Se você desmarcou o cliente no passo 3: abra o cliente, marque **"Mostrar na faixa de clientes da home"** e clique em **Publicar**.
4. **Na home (opcional):**
   - vá em **Configurações do site → Home → Projetos em destaque**;
   - a lista já tem 8 projetos, o máximo. Tire um dos exemplos e adicione o seu;
   - arraste para a posição que quiser e clique em **Publicar**.

## Para desfazer

| Quero… | Como |
|---|---|
| Esconder de novo | **Visibilidade** → **Não listado** → **Publicar** |
| Tirar do site e guardar como rascunho | Menu **⋯** ao lado de **Publicar** → **Despublicar** |
| Apagar o projeto | Menu **⋯** → **Excluir** |

O site atualiza em até um minuto. Depois de despublicar ou excluir, o link mostra "página não encontrada".

## Depois do primeiro trabalho real

- Os 12 projetos de exemplo continuam no site. Quando tiver os seus, exclua os exemplos.
- Depois, exclua os clientes fictícios: Brisamar Cosméticos, Kairo Games, Nimbo Seguros, Ondina Bebidas, Pilar Banco Digital, Solano Energia, Tecelã Moda e Vetra Mobilidade. O painel só deixa excluir um cliente que não está em nenhum projeto, nem em rascunho.
- Troque também o resto do conteúdo de exemplo: **Página Sobre**, **Página Contato** e, em **Configurações do site**, o e-mail, o WhatsApp e as redes.
