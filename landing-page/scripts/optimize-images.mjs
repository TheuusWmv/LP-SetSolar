import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';

await mkdir('public/images', { recursive: true });
const source = 'src/assets/hero-casa-solar.png';
for (const width of [640, 1280, 1920]) {
  await sharp(source).resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 }).toFile(`public/images/energia-solar-${width}.webp`);
}
await sharp(source).resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 85 }).toFile('public/images/energia-solar-social.jpg');
const before = (await stat(source)).size;
const after = (await stat('public/images/energia-solar-1920.webp')).size;
console.log(`Hero: ${before} → ${after} bytes (${(100 * (1 - after / before)).toFixed(1)}% menor).`);
