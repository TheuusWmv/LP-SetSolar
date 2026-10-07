import { readFile, writeFile } from "node:fs/promises";
import { loadEnv } from "vite";
import { render, templateData } from "../.prerender/entry-server.js";

const config = JSON.parse(await readFile("site.config.json", "utf8"));
const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
let siteUrl;
env.SITE_URL ||= config.url;
if (env.SITE_URL) {
  const parsed = new URL(env.SITE_URL);
  if (
    parsed.protocol !== "https:" ||
    parsed.search ||
    parsed.hash ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/"
  ) {
    throw new Error(
      "SITE_URL deve ser a origem HTTPS da home, sem caminho, credenciais, parâmetros ou fragmento.",
    );
  }
  siteUrl = parsed.href;
}
const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const productionOrigin = new URL(config.url).origin;
const isPreview = Boolean(
  env.CF_PAGES_BRANCH && env.CF_PAGES_BRANCH !== "main",
);
const indexable =
  !isPreview &&
  new URL(siteUrl).origin === productionOrigin &&
  config.indexable &&
  env.SITE_INDEXABLE !== "false";
let html = await readFile("dist/index.html", "utf8");
html = html.replace(
  'content="noindex, follow"',
  `content="${indexable ? "index, follow, max-image-preview:large" : "noindex, follow"}"`,
);
const title = html.match(/<title>(.*?)<\/title>/s)[1];
const description = html.match(/name="description"\s+content="([^"]*)"/)[1];
const { company } = templateData;
const tags = [
  ["property", "og:type", "website"],
  ["property", "og:locale", "pt_BR"],
  ["property", "og:site_name", company.name],
  ["property", "og:title", title],
  ["property", "og:description", description],
  ["name", "twitter:card", "summary_large_image"],
  ["name", "twitter:title", title],
  ["name", "twitter:description", description],
];
let head = "";
const page = {
  "@type": "WebPage",
  name: title,
  description,
  inLanguage: "pt-BR",
  about: { "@type": "Thing", name: "Energia solar fotovoltaica" },
};
const graph = [page];
if (siteUrl) {
  head += `<link rel="canonical" href="${escapeHtml(siteUrl)}" />\n`;
  const image = new URL("images/energia-solar-social.jpg", siteUrl).href;
  tags.push(
    ["property", "og:url", siteUrl],
    ["property", "og:image", image],
    ["property", "og:image:width", "1200"],
    ["property", "og:image:height", "630"],
    [
      "property",
      "og:image:alt",
      "Projeto de energia solar fotovoltaica em Goiás",
    ],
    ["name", "twitter:image", image],
    [
      "name",
      "twitter:image:alt",
      "Projeto de energia solar fotovoltaica em Goiás",
    ],
  );
  Object.assign(page, {
    "@id": `${siteUrl}#webpage`,
    url: siteUrl,
    isPartOf: { "@id": `${siteUrl}#website` },
  });
  graph.push({
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: company.name,
    inLanguage: "pt-BR",
  });
  if (indexable) {
    page.publisher = { "@id": `${siteUrl}#organization` };
    graph.push({
      "@type": "LocalBusiness",
      "@id": `${siteUrl}#organization`,
      name: company.name,
      legalName: company.razaoSocial,
      url: siteUrl,
      telephone: `+55${company.phone.replace(/\D/g, "")}`,
      email: company.email,
      image,
      logo: new URL("logo-setsolar.png", siteUrl).href,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address,
        addressLocality: company.city,
        addressRegion: company.state,
        postalCode: company.cep,
        addressCountry: "BR",
      },
      areaServed: company.regionCovered,
      sameAs: [company.instagram],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Soluções de energia solar",
        itemListElement: templateData.services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            serviceType: service.title,
            provider: { "@id": `${siteUrl}#organization` },
            areaServed: company.regionCovered,
          },
        })),
      },
    });
    graph.push({
      "@type": "FAQPage",
      "@id": `${siteUrl}#faq`,
      mainEntity: templateData.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(siteUrl)}</loc></url></urlset>\n`,
  );
} else {
  console.warn(
    "SEO: configure SITE_URL para gerar canonical, sitemap e URLs absolutas de compartilhamento.",
  );
}
head += tags
  .map(
    ([attr, key, value]) =>
      `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`,
  )
  .join("\n");
head += `\n<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c")}</script>`;
const pageMarkup = render();
html = html
  .replace("<!-- SEO_HEAD -->", head)
  .replace('<div id="root"></div>', `<div id="root">${pageMarkup}</div>`);
// Inline the stylesheet to avoid a render-blocking CSS request and a second layout.
const cssLink = html.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
if(cssLink) {
 const css = await readFile('dist'+cssLink[1],'utf8');
 html=html.replace(cssLink[0], '<style>'+css.replaceAll('</style','<\\/style')+'</style>');
}
await writeFile("dist/index.html", html);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}sitemap.xml\n` : ""}`,
);
console.log(
  `HTML pré-renderizado: ${Buffer.byteLength(html)} bytes; conteúdo servido igualmente a pessoas e robôs.`,
);
