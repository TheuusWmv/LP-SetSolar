# LP World Place Solar

Cópia independente da landing page e do simulador solar para World Place Solar, preparada para Cloudflare Pages. A landing é estática. Somente `POST /api/leads` executa uma Pages Function para encaminhar o formulário ao webhook privado.

## Estrutura e rotas

| Rota | Origem | Observação |
| --- | --- | --- |
| `/` | `landing-page/` | HTML pré-renderizado |
| `/simulador/` | `formulario/` | Interface estática, fora dos buscadores |
| `/api/leads` | `functions/api/leads.js` | Aceita apenas POST JSON; webhook e token só no servidor |
| Demais rotas | `dist/404.html` | 404 real, sem enviar a landing por engano |

`dist/_routes.json` limita a execução da Function ao endpoint. `dist/_headers`, `robots.txt` e a meta tag do simulador evitam indexação da rota de conversão; isso **não é controle de acesso**. Uma URL acessível publicamente pode ser aberta por qualquer pessoa que a conheça.

## Build local

Requer Node.js e npm. Na raiz desta pasta:

```sh
npm run setup
npm run build
npm run check
```

O resultado para publicação fica em `dist/`. Para testar a Function localmente com Wrangler, copie `.dev.vars.example` para `.dev.vars`, preencha os valores reais e execute `npx wrangler pages dev dist`. O arquivo `.dev.vars` está ignorado pelo Git.

## Publicar na Cloudflare Pages

1. Envie esta pasta como raiz de um repositório da Sollux, ou mantenha-a neste repositório e configure **Root directory** como `LP-Sollux`. A branch de produção pode ser `client/sollux`.
2. Crie um projeto **Pages** com integração Git. Use **Build command** `npm run setup && npm run build` e **Build output directory** `dist`. A configuração fica no painel da Pages; este projeto não usa um Worker separado.
3. Em **Settings → Variables and Secrets**, cadastre `LEAD_WEBHOOK_URL` como segredo com a URL HTTPS do CRM. Se o CRM exigir bearer token, cadastre `LEAD_WEBHOOK_TOKEN` como segredo. Configure os valores no ambiente **Production** e, se testar previews, também em **Preview**. Não use `VITE_` nesses nomes.
4. Configure o domínio da Sollux. Depois de confirmar dados comerciais e depoimentos, defina `SITE_URL` com a origem HTTPS terminada em `/`, `BUSINESS_VERIFIED=true` e `SITE_INDEXABLE=true` como variáveis de **build** e refaça o deploy. Enquanto isso, o build permanece `noindex`.
5. Envie um lead de teste e confirme o recebimento no CRM antes de divulgar a página.

O painel da Pages recebe o segredo somente na Function. Não coloque a URL do webhook ou token em arquivos `.env` commitados, em `VITE_*`, no HTML ou no JavaScript da página. Se o CRM não for configurado, o endpoint responde 503 e o formulário não mostra sucesso falso.

## Personalização ainda pendente

Nome, endereço, telefones e logo da Sollux foram aplicados a partir de `info-sollux.txt` e `Logo Sollux.jpg`. Ainda faltam domínio, e-mail (se houver), horário de atendimento e destino do formulário. Atualize:

- `landing-page/src/data/templateData.ts`: ofertas, serviços e afirmações comerciais que dependem da operação real.
- `landing-page/src/components/`: textos que descrevem prazos, economia potencial e equipamentos.
- `landing-page/public/privacidade.html`: revisar o aviso de privacidade com quem administra o CRM.
- `landing-page/public/` e `formulario/public/`: substituir a logo JPEG de 150 × 150 px por um arquivo de maior resolução se houver.

A seção de feedbacks do modelo foi mantida com retratos e textos ilustrativos, identificados como exemplos na própria página. Substitua nomes, fotos e relatos por avaliações autorizadas antes de divulgar a página como prova social da Sollux. Volume de projetos, índices de satisfação e economia acumulada do modelo foram removidos. Não há domínio, e-mail, webhook ou token inventado para a Sollux.
