import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = path.join(root, "landing-page");
const origin = "https://setsolar.grupokami.com/";
async function generate(extra = {}) {
  const fixture = await mkdtemp(path.join(tmpdir(), "solar-seo-"));
  try {
    await mkdir(path.join(fixture, "dist"));
    await writeFile(
      path.join(fixture, "dist/index.html"),
      await readFile(path.join(app, "index.html")),
    );
    await writeFile(
      path.join(fixture, "site.config.json"),
      await readFile(path.join(app, "site.config.json")),
    );
    const env = { ...process.env };
    for (const key of [
      "SITE_URL",
      "SITE_INDEXABLE",
      "BUSINESS_VERIFIED",
      "CF_PAGES_BRANCH",
    ])
      delete env[key];
    const result = spawnSync(
      process.execPath,
      [path.join(app, "scripts/prerender.mjs")],
      { cwd: fixture, env: { ...env, ...extra }, encoding: "utf8" },
    );
    assert.equal(result.status, 0, result.stderr);
    return await readFile(path.join(fixture, "dist/index.html"), "utf8");
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
}
test("produção permite indexação e identifica a empresa, serviços e FAQ", async () => {
  const html = await generate();
  assert.match(html, /content="index, follow, max-image-preview:large"/);
  assert.ok(html.includes('rel="canonical" href="' + origin + '"'));
  const graph = JSON.parse(
    html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
  )["@graph"];
  assert.ok(
    graph.some(
      (item) =>
        item["@type"] === "LocalBusiness" &&
        item.address.addressCountry === "BR",
    ),
  );
  assert.ok(
    graph.find((item) => item["@type"] === "FAQPage").mainEntity.length >= 8,
  );
  assert.ok(
    graph.find((item) => item["@type"] === "LocalBusiness").hasOfferCatalog
      .itemListElement.length >= 3,
  );
});
test("preview e bloqueio explícito de indexação continuam noindex", async () => {
  for (const flags of [
    { CF_PAGES_BRANCH: "feature/preview" },
    { SITE_INDEXABLE: "false" },
    { SITE_URL: "https://preview.example.com/" },
  ]) {
    const html = await generate(flags);
    assert.match(html, /content="noindex, follow"/);
    assert.equal(html.includes('"@type":"LocalBusiness"'), false);
  }
});
