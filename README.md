# Blanzo Creative Studio · site

O site-portfólio da Blanzo: Next.js no Netlify, conteúdo no Sanity (painel em `/admin`) e vídeos no Mux ou no próprio Sanity.

No ar em **https://blanzocreative.netlify.app** (painel em https://blanzocreative.netlify.app/admin).

Tudo o que aparece no site se edita no painel: veja **[docs/como-usar-o-painel.md](docs/como-usar-o-painel.md)**.

Para publicar um trabalho, com um teste antes de mostrar para todo mundo: **[docs/publicar-um-trabalho.md](docs/publicar-um-trabalho.md)**.

Quanto custa e a partir de quando se paga: **[docs/custos.md](docs/custos.md)**.

---

## Do zero ao ar

### 1. Contas

| Serviço | Para quê | Onde |
|---|---|---|
| **GitHub** | Guarda o código. Cada mudança no código gera uma versão nova do site. | [github.com](https://github.com) |
| **Sanity** | O painel e o conteúdo (textos, imagens, vídeos curtos). | [sanity.io](https://www.sanity.io) |
| **Netlify** | Hospeda o site. Entre com a conta do GitHub. | [netlify.com](https://www.netlify.com) |
| **Mux** (opcional) | Vídeos longos ou com som, com streaming. | [mux.com](https://www.mux.com) |
| **Web3Forms** (opcional) | Recebe o formulário de contato no seu e-mail. | [web3forms.com](https://web3forms.com) |

### 2. Variáveis de ambiente

Os valores ficam fora do código.

- No seu computador: arquivo `.env.local`. Copie o `.env.example`, que é comentado, e preencha.
- No Netlify: **Site configuration → Environment variables**.

| Variável | O que é | Onde pegar |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID do projeto no Sanity | [sanity.io/manage](https://www.sanity.io/manage) → o projeto |
| `NEXT_PUBLIC_SANITY_DATASET` | Nome do dataset | `production` |
| `NEXT_PUBLIC_SITE_URL` | Endereço público do site, sem barra no fim | No Netlify pode ficar vazia (o site usa o endereço do próprio Netlify). No computador: `http://localhost:3000`. |
| `SANITY_API_READ_TOKEN` | Token de leitura, só para a pré-visualização de rascunhos | sanity.io/manage → projeto → **API → Tokens → Add API token**, papel **Viewer**. Nunca compartilhe. |
| `SANITY_REVALIDATE_SECRET` | Senha que o Sanity manda ao site quando você publica | Uma sequência aleatória longa. Use a mesma no webhook (passo 5). |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Chave do formulário de contato | web3forms.com → seu formulário → **Access Key**. Sem ela, o formulário não aparece. |

### 3. Rodar no computador

Precisa do [Node.js](https://nodejs.org) 24 (o arquivo `.nvmrc` indica a versão).

```bash
npm install
```

```bash
npm run dev
```

- Abra [http://localhost:3000](http://localhost:3000) para ver o site e [http://localhost:3000/admin](http://localhost:3000/admin) para o painel.
- Para carregar o conteúdo de exemplo num projeto Sanity vazio, rode `npm run seed`.
  - Atenção: ele **substitui** os documentos de exemplo, então não rode por cima de conteúdo que você já editou.

### 4. Colocar no ar (Netlify)

1. No Netlify: **Add new project → Import an existing project → GitHub** e escolha o repositório.
2. As configurações de build já vêm do arquivo `netlify.toml` (`npm run build`, Node 24).
3. Antes do primeiro deploy, adicione as variáveis do passo 2.
4. **Deploy**. O endereço fica algo como `https://nome-do-site.netlify.app`.
5. Desligue o selo "Powered by Netlify", que vem ligado em projetos novos do plano Free: **Project configuration → General → Powered by Netlify badge**. Não precisa de novo deploy.

Daí em diante, cada envio para a branch `main` do GitHub gera um deploy novo.

**Publicar no painel não gera deploy:** o site atualiza pelo webhook (passo 5) e isso não gasta créditos do Netlify.

### 5. Ligar o painel ao site publicado (Sanity)

Em [sanity.io/manage](https://www.sanity.io/manage), no projeto:

1. **API → CORS origins → Add CORS origin:**
   - o endereço do site (ex.: `https://nome-do-site.netlify.app`);
   - marque **Allow credentials**. É isso que faz o painel em `/admin` funcionar no site publicado.
2. **API → Webhooks → Create webhook**, para o site atualizar quando você publica:
   - **URL:** `https://nome-do-site.netlify.app/api/revalidate`;
   - **Dataset:** `production`;
   - **Trigger on:** Create, Update e Delete;
   - **Filter:** `_type in ["project", "tag", "client", "siteSettings", "aboutPage", "contactPage", "mux.videoAsset"]`;
   - **Projection:** `{_type, "slug": slug.current}`;
   - **Secret:** o mesmo valor de `SANITY_REVALIDATE_SECRET`;
   - **HTTP method:** POST;
   - **API version:** a mais recente.

Para testar: mude um texto no painel, publique e recarregue o site em até um minuto.

### 6. Domínio próprio (.com.br pelo Registro.br)

1. Registre o domínio em [registro.br](https://registro.br).
2. No Netlify: **Domain management → Add a domain**, digite o domínio e siga as instruções. A forma mais simples:
   - escolha **Netlify DNS**;
   - o Netlify mostra 4 servidores de DNS (ex.: `dns1.p01.nsone.net`);
   - no Registro.br, em **DNS → Alterar servidores DNS**, troque pelos servidores que o Netlify mostrou;
   - a troca pode levar algumas horas. O certificado HTTPS é gerado sozinho.
3. Depois que o domínio estiver no ar:
   - **Sanity:** acrescente o domínio novo em **CORS origins** (com credentials) e troque a URL do webhook;
   - **Web3Forms:** troque o endereço do formulário pelo domínio novo;
   - **Netlify:** se você preencheu `NEXT_PUBLIC_SITE_URL`, troque pelo domínio novo e faça um novo deploy.

---

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Site e painel no computador, atualizando a cada mudança |
| `npm run build` | Gera a versão de produção (é o que o Netlify roda) |
| `npm run lint` · `npm run typecheck` | Conferem o código |
| `npm run seed` | Carrega o conteúdo de exemplo no Sanity |
| `npm run placeholders` | Gera as imagens e vídeos provisórios do exemplo |
| `npm run typegen` | Atualiza os tipos depois de mudar o schema ou as consultas |

## Para quem for mexer no código

- **Convenções:** `CLAUDE.md` (estrutura de pastas, tokens do design system, como criar um tipo novo de bloco).
- **Decisões e detalhes técnicos:**
  - `docs/plano.md`: o plano aprovado;
  - `docs/tokens.md`: tokens e regras visuais;
  - `docs/notas-tecnicas.md`: versões e detalhes de implementação;
  - `docs/referencia-buff.md`: a análise da referência.
