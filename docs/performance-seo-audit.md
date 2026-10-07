# Auditoria de desempenho e busca ? Set Solar

Data: 2026-10-07. P?gina: https://setsolar.grupokami.com/

## Resultados medidos

| Ambiente | Dispositivo | Desempenho | Acessibilidade | Boas pr?ticas | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| publicado antes | mobile | 55 | 89 | 96 | 66 |
| publicado antes | desktop | 93 | 95 | 100 | 66 |
| build local otimizado | mobile | 99 | 100 | 100 | 100 |
| build local otimizado | desktop | 100 | 100 | 100 | 100 |

Medi??es Lighthouse CLI com Chrome, categorias padr?o e throttling simulado. Desktop usa preset desktop; mobile usa configura??o padr?o. O build local foi servido com gzip. Vers?o, hor?rio e m?tricas est?o em [lighthouse-summary.json](lighthouse-summary.json). As medi??es anteriores usaram os dom?nios p?blicos; comparar com localhost n?o isola efeitos da rede/CDN. O resultado local n?o comprova a nota no PageSpeed p?blico.

O endpoint do PageSpeed Insights retornou HTTP 429 durante as tentativas. N?o foi poss?vel obter relat?rio do servi?o em pagespeed.web.dev. Pontua??es variam conforme ambiente, rede e execu??o; desempenho mobile de 99 n?o equivale a 100.

## Altera??es

- Corrigido noindex em produ??o; previews e simulador continuam fora do ?ndice.
- Canonical, sitemap, metadados sociais e identifica??o estruturada de empresa, servi?os e FAQ, coerentes com conte?do vis?vel.
- Conte?do local e guia de decis?o com fontes ANEEL/Inmetro, informa??es de or?amento e ressalvas sobre economia estimada.
- Fotos WebP responsivas e imagem priorit?ria da primeira tela; dimens?es e lazy loading nas demais.
- Primeira tela est?tica, fontes do dispositivo e JavaScript inicial de cerca de 2,3 KB gzip; React ativado por regi?o pr?xima ? tela.
- CSS inline, renderiza??o adiada de se??es fora da tela e cache de arquivos est?ticos.
- Corrigidos contraste, estrutura de listas/t?tulos e tamanho dos controles de depoimentos.

## Verifica??o

Build completo e cinco testes automatizados por projeto passaram. Chrome em 360, 412 e 1440 px: menu, servi?os, depoimentos, FAQ, aus?ncia de overflow e erros de console. Conferidos HTML sem JavaScript, FAQ/JSON-LD e primeira tela sem depender de CSS externo. Nenhum lead real foi enviado.

## Busca e GEO

As melhorias tornam conte?do e entidade mais acess?veis a buscadores e sistemas de respostas de IA. N?o garantem posi??o nem cita??o. Indexa??o, reputa??o, conte?do ?til e sinais externos continuam relevantes. O cadastro empresarial deve refletir dados reais e consistentes; monitorar indexa??o no Search Console ap?s o deploy. N?o foram inventadas avalia??es agregadas.

Refer?ncias: [recursos de IA na Pesquisa Google](https://developers.google.com/search/docs/appearance/ai-features), [pontua??o de desempenho Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).
