import sharp from "sharp";
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
const manifest = {};
async function visit(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "fonts") await visit(file);
      continue;
    }
    if (
      !/\.(png|jpe?g|svg)$/i.test(entry.name) ||
      /energia-solar-/.test(entry.name) ||
      /favicon|apple-touch|hero-casa/.test(entry.name)
    )
      continue;
    const meta = await sharp(file).metadata();
    const url = "/" + file.replaceAll("\\", "/").replace(/^public\//, "");
    if (/\.svg$/i.test(file)) {
      manifest[url] = { src: url, width: meta.width, height: meta.height };
      continue;
    }
    const stem = file.replace(/\.[^.]+$/, "");
    const widths = [
      ...new Set([Math.min(480, meta.width), Math.min(1280, meta.width)]),
    ];
    const variants = [];
    for (const width of widths) {
      const output = stem + "-" + width + ".webp";
      await sharp(file)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 76, effort: 5 })
        .toFile(output);
      variants.push({
        src: "/" + output.replaceAll("\\", "/").replace(/^public\//, ""),
        width,
      });
    }
    manifest[url] = {
      width: meta.width,
      height: meta.height,
      src: variants.at(-1).src,
      srcSet: variants.map((v) => v.src + " " + v.width + "w").join(", "),
    };
  }
}
await visit("public");
for (const width of [480, 768])
  await sharp("public/images/projetos/hero-set-solar.jpg")
    .resize(width, Math.round(width * 1.9), {
      fit: "cover",
      position: "centre",
    })
    .webp({ quality: 60, effort: 5 })
    .toFile("public/images/hero-mobile-" + width + ".webp");
await sharp("public/images/projetos/hero-set-solar.jpg")
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 80 })
  .toFile("public/images/energia-solar-social.jpg");
await writeFile(
  "src/data/imageManifest.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log("Imagens responsivas geradas.");
