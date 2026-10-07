import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const require = createRequire(import.meta.url);
const sharp = require(path.join(rootDir, 'landing-page/node_modules/sharp'));

// Resolve Set Solar source logo
const candidatePaths = [
  path.join(rootDir, 'downloaded-assets/lovable_logo_transparent.png'),
  path.join(rootDir, 'downloaded-assets/logo_set_solar.png'),
  path.join(rootDir, 'landing-page/public/logo-setsolar.png'),
];

let sourceLogoPath = candidatePaths.find(p => fs.existsSync(p));
if (!sourceLogoPath) {
  throw new Error('No valid Set Solar logo found in downloaded-assets or public directories.');
}

console.log(`Using Set Solar source logo: ${sourceLogoPath}`);

function makeIco(png32Buffer, png16Buffer) {
  if (!png16Buffer) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // ICO type
    header.writeUInt16LE(1, 4); // 1 image

    const entry = Buffer.alloc(16);
    entry.writeUInt8(32, 0); // width
    entry.writeUInt8(32, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png32Buffer.length, 8); // size
    entry.writeUInt32LE(22, 12); // offset (6 + 16 = 22)

    return Buffer.concat([header, entry, png32Buffer]);
  }

  // 2 images in ICO: 16x16 and 32x32
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(2, 4); // 2 images

  const entry16 = Buffer.alloc(16);
  entry16.writeUInt8(16, 0);
  entry16.writeUInt8(16, 1);
  entry16.writeUInt8(0, 2);
  entry16.writeUInt8(0, 3);
  entry16.writeUInt16LE(1, 4);
  entry16.writeUInt16LE(32, 6);
  entry16.writeUInt32LE(png16Buffer.length, 8);
  entry16.writeUInt32LE(38, 12); // 6 + 16*2 = 38

  const entry32 = Buffer.alloc(16);
  entry32.writeUInt8(32, 0);
  entry32.writeUInt8(32, 1);
  entry32.writeUInt8(0, 2);
  entry32.writeUInt8(0, 3);
  entry32.writeUInt16LE(1, 4);
  entry32.writeUInt16LE(32, 6);
  entry32.writeUInt32LE(png32Buffer.length, 8);
  entry32.writeUInt32LE(38 + png16Buffer.length, 12);

  return Buffer.concat([header, entry16, entry32, png16Buffer, png32Buffer]);
}

async function generate() {
  console.log('Generating crisp multi-resolution Set Solar favicons...');

  const [png16, png32, png192, appleTouch] = await Promise.all([
    sharp(sourceLogoPath)
      .trim()
      .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer(),
    sharp(sourceLogoPath)
      .trim()
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer(),
    sharp(sourceLogoPath)
      .trim()
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer(),
    sharp(sourceLogoPath)
      .trim()
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer(),
  ]);

  const icoBuffer = makeIco(png32, png16);

  // Crisp SVG wrapper for browsers that request SVG favicons
  const png192Base64 = png192.toString('base64');
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192">
  <image href="data:image/png;base64,${png192Base64}" width="192" height="192" />
</svg>`;

  const targets = [
    path.join(rootDir, 'landing-page/public'),
    path.join(rootDir, 'formulario/public'),
    path.join(rootDir, 'formulario/public/simulador'),
  ];

  for (const dir of targets) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, 'favicon.svg'), svgFavicon);
    fs.writeFileSync(path.join(dir, 'favicon.ico'), icoBuffer);
    fs.writeFileSync(path.join(dir, 'favicon-16x16.png'), png16);
    fs.writeFileSync(path.join(dir, 'favicon-32x32.png'), png32);
    fs.writeFileSync(path.join(dir, 'favicon-192x192.png'), png192);
    fs.writeFileSync(path.join(dir, 'apple-touch-icon.png'), appleTouch);
    console.log(`Saved Set Solar favicons to ${dir}`);
  }

  // Also write to dist if it exists
  const distTargets = [
    path.join(rootDir, 'dist'),
    path.join(rootDir, 'dist/simulador'),
  ];

  for (const dir of distTargets) {
    if (fs.existsSync(dir)) {
      fs.writeFileSync(path.join(dir, 'favicon.svg'), svgFavicon);
      fs.writeFileSync(path.join(dir, 'favicon.ico'), icoBuffer);
      fs.writeFileSync(path.join(dir, 'favicon-16x16.png'), png16);
      fs.writeFileSync(path.join(dir, 'favicon-32x32.png'), png32);
      fs.writeFileSync(path.join(dir, 'favicon-192x192.png'), png192);
      fs.writeFileSync(path.join(dir, 'apple-touch-icon.png'), appleTouch);
      console.log(`Saved Set Solar favicons to dist: ${dir}`);
    }
  }

  console.log('Set Solar favicon generation complete!');
}

generate().catch(err => {
  console.error('Failed to generate Set Solar favicons:', err);
  process.exit(1);
});
