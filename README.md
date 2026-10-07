# Set Solar

Landing page estática e simulador publicados em https://setsolar.grupokami.com/ por integração Git com Cloudflare Pages.

## Build e verificação

Requer Node.js e npm. Na raiz:

```sh
npm run setup
npm run build
npm run check
```

A saída de produção está em `dist/`. Os testes de SEO usam o bundle SSR gerado pelo build e validam produção, preview e bloqueio explícito de indexação.

Para testar o navegador contra um preview já iniciado, execute `node scripts/verify-browser.mjs URL_DO_PREVIEW`. Requer Google Chrome instalado. Verifica menu, serviços, depoimentos, FAQ, console, conteúdo sem JavaScript e correspondência entre FAQ e JSON-LD. Imagens de conferência ficam em `artifacts/` (ignoradas pelo Git).

## SEO e conteúdo para busca e respostas de IA

A origem canônica e a autorização de indexação ficam em `landing-page/site.config.json`. A branch `main` usa essa configuração. Outras branches da Cloudflare permanecem `noindex`; `SITE_INDEXABLE=false` pode desativar a indexação explicitamente. `SITE_URL` só deve substituir a origem após atualizar a configuração e o domínio público.

O HTML contém canonical, sitemap, metadados sociais e dados estruturados de empresa local, serviços e perguntas frequentes. Os dados vêm de `src/data/templateData.ts`; mantenha endereço, telefone, serviços e afirmações comerciais atualizados. Não há promessa de posicionamento nem marcação de avaliações agregadas.

A tipografia usa fontes do dispositivo, fotos têm versões WebP responsivas e a primeira tela usa controles nativos. As outras regiões interativas carregam React quando se aproximam da tela. FAQ e links funcionam sem React.

## Publicação e leads

Cloudflare Pages: comando `npm run setup && npm run build`, diretório de saída `dist`, branch de produção `main`. O push ao GitHub aciona o deploy quando a integração Git está habilitada.

O simulador em `/simulador/` permanece fora dos buscadores. Apenas `POST /api/leads` executa uma Pages Function. Configure `LEAD_WEBHOOK_URL` e, se necessário, `LEAD_WEBHOOK_TOKEN` como segredos no servidor. Não use prefixo `VITE_` nesses valores. O formulário só confirma sucesso após resposta válida do destino. Nunca versione segredos.
