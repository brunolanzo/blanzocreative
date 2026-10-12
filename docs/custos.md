# Custos

Valores conferidos nas páginas oficiais de cada serviço em **12/10/2026** (links ao lado de cada número). Preços em dólar, como os serviços cobram. Eles mudam: antes de decidir um upgrade, confira o link.

**Resumo:** com o tráfego de um portfólio (alguns milhares de visitas por mês), o site roda **de graça**. Dois cuidados evitam surpresas:

1. **Não mande código para o GitHub mais de ~15 vezes por mês.** Cada deploy no Netlify gasta créditos. Editar e publicar no painel **não** gasta: o site atualiza pelo webhook.
2. **Reel e vídeos longos no Mux, não como arquivo no Sanity.** Vídeo servido pelo Sanity conta nos 100 GB de banda do plano grátis.

---

## O que o site usa

| Serviço | Plano | Custo hoje |
|---|---|---|
| Netlify (hospedagem) | Free | US$ 0 |
| Sanity (painel e conteúdo) | Free | US$ 0 |
| GitHub (código) | Free | US$ 0 |
| Web3Forms (formulário) | Free | US$ 0 |
| Mux (vídeos) | Free (ainda não ligado) | US$ 0 |
| Fonte Manrope | Livre (OFL) | US$ 0 |

## Netlify

**Free: 300 créditos por mês**, com limite rígido ([como os créditos funcionam](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/)).

| O que gasta crédito | Quanto |
|---|---|
| Deploy de produção (cada envio de código para `main`) | 15 créditos |
| Tráfego | 20 créditos por GB |
| Requisições | 2 créditos a cada 10 mil |
| Funções (páginas refeitas depois de publicar no painel) | 10 créditos por GB-hora |
| Deploy de teste (*deploy preview*), deploy que falhou, voltar a uma versão anterior | 0 |

([preços](https://www.netlify.com/pricing/))

- **Se os créditos acabarem:** todos os sites da conta ficam fora do ar ("Site not available") até o mês seguinte ou até um upgrade. Não há cobrança surpresa ([projetos pausados](https://docs.netlify.com/manage/accounts-and-billing/billing/resume-paused-projects/)).
- **Estimativa para o site:**
  - **Visitas:** as imagens e os vídeos vêm do Sanity e do Mux, então o Netlify só entrega as páginas (~300 KB na primeira visita). 3 mil visitas por mês dão ~1 GB e ~60 mil requisições, cerca de 30 créditos.
  - **Deploys:** ~15 créditos cada. Até uns 15 por mês cabe com folga.
- **Primeiro plano pago** ([preços](https://www.netlify.com/pricing/)):
  - **Personal:** US$ 9/mês, 1.000 créditos, com recarga automática opcional de US$ 5 por 500 créditos (vem desligada);
  - **Pro:** US$ 20/mês, 3.000 créditos.

## Sanity

**Free** ([preços](https://www.sanity.io/pricing)):

- até 20 pessoas no painel;
- 10 mil documentos;
- 250 mil requisições de API e 1 milhão de API CDN por mês;
- 100 GB de banda por mês;
- 100 GB de arquivos;
- 2 webhooks (o site usa 1).

- **Se estourar:** sem cobrança extra. O Sanity para de responder (erro 402) até o dia 1º do mês seguinte, com avisos por e-mail em 80% e 100% ([planos e pagamentos](https://www.sanity.io/docs/platform-management/plans-and-payments)). No limite de documentos ou de arquivos, dá para editar, mas não criar nem enviar nada novo.
- **Estimativa para o site:**
  - **Documentos e requisições:** ~40 documentos e poucos milhares de requisições por mês. O site guarda as respostas até a próxima publicação, então quase não consulta o Sanity.
  - **Atenção à banda:** imagens, GIFs e vídeos em arquivo saem do CDN do Sanity e contam nos 100 GB. Imagens são otimizadas (WebP/AVIF no tamanho certo), então pesam pouco. Um reel de 30 MB em arquivo, visto 3 mil vezes, já daria ~90 GB. Por isso, reel e vídeos longos vão no Mux.
- **Primeiro plano pago:** **Growth**, US$ 15 por pessoa por mês, com 25 mil documentos e 4 webhooks ([preços](https://www.sanity.io/pricing)).
  - O que passar das cotas é cobrado: US$ 1 por 25 mil requisições de API, US$ 0,30/GB de banda, US$ 0,50/GB de arquivos.

## Mux (vídeos)

**Free, sem cartão** ([preços](https://www.mux.com/pricing), [plano grátis](https://www.mux.com/docs/changelog/video-free-plan)):

- até **10 vídeos guardados**;
- 100 mil minutos assistidos por mês;
- só vídeo gravado (sem ao vivo);
- entrega padrão até 1080p ([resolução](https://www.mux.com/docs/guides/control-playback-resolution)).

- **MP4 estático:**
  - a documentação trata como adicional pago, a US$ 0,00075 por minuto de vídeo por mês ([preços detalhados](https://www.mux.com/docs/pricing/overview));
  - por isso o painel vem com ele **desligado**, e os vídeos do Mux tocam em streaming (HLS);
  - se um dia você estiver num plano pago e quiser o MP4 (um pouco mais leve para os vídeos que tocam sozinhos), basta ligar no `sanity.config.ts`. O site passa a usar o MP4 sozinho.
- **Passando de 10 vídeos:** plano **Pay as you go**, com cartão e US$ 20/mês de crédito. Preços para 1080p ([preços detalhados](https://www.mux.com/docs/pricing/overview)):
  - **codificação:** grátis na qualidade *basic*, que é a configurada no painel;
  - **armazenamento:** US$ 0,003 por minuto de vídeo por mês;
  - **entrega:** US$ 0,001 por minuto assistido, depois dos 100 mil grátis.
- **Exemplo:** 30 vídeos somando 60 minutos custam ~US$ 0,18/mês de armazenamento, o que fica dentro do crédito.

## Web3Forms (formulário)

- **Free:** 250 mensagens por mês e histórico de 30 dias.
- **Pro:** US$ 10/mês ou US$ 89/ano, com 10 mil mensagens por mês.
- **Se estourar:** avisos em 90% e 100%; depois disso, as mensagens novas são recusadas até o mês seguinte.

([preços](https://web3forms.com/pricing))

## GitHub

Grátis, com repositórios públicos e privados ilimitados ([preços](https://github.com/pricing)).

---

## Se o Mux ficar caro: alternativas para vídeo

Todas funcionam com o campo **"Link de MP4 ou HLS"** do painel, sem mudar código.

| Serviço | Como cobra | Atenção |
|---|---|---|
| **Cloudflare Stream** ([preços](https://developers.cloudflare.com/stream/pricing/)) | US$ 5/mês por 1.000 minutos guardados (em blocos pré-pagos de US$ 5) + US$ 1 por 1.000 minutos assistidos. Envio e codificação grátis. | Sem plano grátis. Com o espaço cheio, novos envios ficam bloqueados. |
| **Bunny Stream** ([stream](https://bunny.net/pricing/stream/), [CDN](https://bunny.net/pricing/cdn/), [armazenamento](https://bunny.net/pricing/storage/)) | Codificação grátis. Armazenamento a partir de US$ 0,01/GB. Entrega a US$ 0,045/GB na América do Sul (US$ 0,01/GB na Europa e na América do Norte). Mínimo de US$ 1/mês. | Pré-pago: com saldo negativo por ~4 dias a conta é desativada, e os arquivos são apagados após 60 dias ([conta suspensa](https://bunny.net/docs/account/account-suspended)). |
| **Cloudflare R2** com MP4 ([preços](https://developers.cloudflare.com/r2/pricing/)) | Grátis até 10 GB guardados por mês; depois US$ 0,015/GB. **Saída de dados grátis.** | Sem streaming adaptativo: entrega o arquivo MP4 como está. O endereço público `r2.dev` é só para testes; em produção, o domínio precisa estar na Cloudflare ([buckets públicos](https://developers.cloudflare.com/r2/buckets/public-buckets/)). |

**Para um portfólio:** R2 é o mais barato para loops curtos em MP4. Cloudflare Stream é o substituto mais direto do Mux para vídeos longos com streaming.
