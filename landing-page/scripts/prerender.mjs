import { readFile, writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';
import { render, templateData } from '../.prerender/entry-server.js';

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
let siteUrl;
if (env.SITE_URL) {
  const parsed = new URL(env.SITE_URL);
  if (parsed.protocol !== 'https:' || parsed.search || parsed.hash || parsed.username || parsed.password || parsed.pathname !== '/') {
    throw new Error('SITE_URL deve ser a origem HTTPS da home, sem caminho, credenciais, parâmetros ou fragmento.');
  }
  siteUrl = parsed.href;
}
const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const indexable = env.SITE_INDEXABLE === 'true';
if (indexable && (!siteUrl || env.BUSINESS_VERIFIED !== 'true')) {
  throw new Error('Para indexar, configure SITE_URL e confirme os dados reais com BUSINESS_VERIFIED=true.');
}
let html = await readFile('dist/index.html', 'utf8');
html = html.replace('content="noindex, follow"', `content="${indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}"`);
const title = html.match(/<title>(.*?)<\/title>/s)[1];
const description = html.match(/name="description" content="([^"]*)"/)[1];
const { company } = templateData;
const tags = [
  ['property', 'og:type', 'website'],
  ['property', 'og:locale', 'pt_BR'],
  ['property', 'og:site_name', company.name],
  ['property', 'og:title', title],
  ['property', 'og:description', description],
  ['name', 'twitter:card', 'summary_large_image'],
  ['name', 'twitter:title', title],
  ['name', 'twitter:description', description],
];
let head = '';
const page = { '@type': 'WebPage', name: title, description, inLanguage: 'pt-BR', about: { '@type': 'Thing', name: 'Energia solar fotovoltaica' } };
const graph = [page];
if (siteUrl) {
  head += `<link rel="canonical" href="${escapeHtml(siteUrl)}" />\n`;
  const image = new URL('images/energia-solar-social.jpg', siteUrl).href;
  tags.push(['property', 'og:url', siteUrl], ['property', 'og:image', image],
    ['property', 'og:image:width', '1200'], ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', 'Casa com painéis solares no telhado'],
    ['name', 'twitter:image', image], ['name', 'twitter:image:alt', 'Casa com painéis solares no telhado']);
  Object.assign(page, { '@id': `${siteUrl}#webpage`, url: siteUrl, isPartOf: { '@id': `${siteUrl}#website` } });
  graph.push({ '@type': 'WebSite', '@id': `${siteUrl}#website`, url: siteUrl, name: company.name, inLanguage: 'pt-BR' });
  if (env.BUSINESS_VERIFIED === 'true') {
    page.publisher = { '@id': `${siteUrl}#organization` };
    graph.push({ '@type': 'Organization', '@id': `${siteUrl}#organization`, name: company.name, url: siteUrl, telephone: `+55${company.phone.replace(/\D/g, '')}`, email: company.email });
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(siteUrl)}</loc></url></urlset>\n`);
} else {
  console.warn('SEO: configure SITE_URL para gerar canonical, sitemap e URLs absolutas de compartilhamento.');
}
head += tags.map(([attr, key, value]) => `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`).join('\n');
head += `\n<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c')}</script>`;
html = html.replace('<!-- SEO_HEAD -->', head).replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
await writeFile('dist/index.html', html);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}sitemap.xml\n` : ''}`);
console.log(`HTML pré-renderizado: ${Buffer.byteLength(html)} bytes; conteúdo servido igualmente a pessoas e robôs.`);
