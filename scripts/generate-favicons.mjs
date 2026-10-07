import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const require = createRequire(import.meta.url);
const sharp = require(path.join(rootDir, 'landing-page/node_modules/sharp'));

// Read Marca-WorldPlace.svg
const rawSvgPath = path.join(rootDir, 'Marca-WorldPlace.svg');
const rawSvg = fs.readFileSync(rawSvgPath, 'utf8');

// Center in a square 600x600 canvas with balanced padding
// Artwork in Marca-WorldPlace: X ~ 7..553 (width ~546), Y ~ 12..405 (height ~393)
// Center of artwork: X = 280, Y = 208.5
// For a 600x600 box centered at (280, 208.5):
// minX = 280 - 300 = -20
// minY = 208.5 - 300 = -91.5
const squareSvg = rawSvg.replace(
  'viewBox="0 0 560 419"',
  'viewBox="-20 -91.5 600 600" width="600" height="600"'
);

function makeIco(png32Buffer) {
  // ICONDIR header (6 bytes)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(1, 4); // 1 image

  // ICONDIRENTRY (16 bytes)
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

async function generate() {
  console.log('Generating crisp multi-resolution favicons...');

  const svgBuffer = Buffer.from(squareSvg);

  const [png16, png32, png192, appleTouch] = await Promise.all([
    sharp(svgBuffer).resize(16, 16).png().toBuffer(),
    sharp(svgBuffer).resize(32, 32).png().toBuffer(),
    sharp(svgBuffer).resize(192, 192).png().toBuffer(),
    sharp(svgBuffer).resize(180, 180).png().toBuffer(),
  ]);

  const icoBuffer = makeIco(png32);

  const targets = [
    path.join(rootDir, 'landing-page/public'),
    path.join(rootDir, 'formulario/public'),
  ];

  for (const dir of targets) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Write square SVG
    fs.writeFileSync(path.join(dir, 'favicon.svg'), squareSvg);
    fs.writeFileSync(path.join(dir, 'favicon.ico'), icoBuffer);
    fs.writeFileSync(path.join(dir, 'favicon-16x16.png'), png16);
    fs.writeFileSync(path.join(dir, 'favicon-32x32.png'), png32);
    fs.writeFileSync(path.join(dir, 'favicon-192x192.png'), png192);
    fs.writeFileSync(path.join(dir, 'apple-touch-icon.png'), appleTouch);
    console.log(`Saved favicons to ${dir}`);
  }

  // Also write to dist if it exists
  const distTargets = [
    path.join(rootDir, 'dist'),
    path.join(rootDir, 'dist/simulador'),
  ];

  for (const dir of distTargets) {
    if (fs.existsSync(dir)) {
      fs.writeFileSync(path.join(dir, 'favicon.svg'), squareSvg);
      fs.writeFileSync(path.join(dir, 'favicon.ico'), icoBuffer);
      fs.writeFileSync(path.join(dir, 'favicon-16x16.png'), png16);
      fs.writeFileSync(path.join(dir, 'favicon-32x32.png'), png32);
      fs.writeFileSync(path.join(dir, 'favicon-192x192.png'), png192);
      fs.writeFileSync(path.join(dir, 'apple-touch-icon.png'), appleTouch);
      console.log(`Saved favicons to dist: ${dir}`);
    }
  }

  console.log('Favicon generation complete!');
}

generate().catch(err => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});
