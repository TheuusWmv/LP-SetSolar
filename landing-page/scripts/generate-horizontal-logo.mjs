import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve('..');

const originalSvg = fs.readFileSync(path.join(projectRoot, 'LogoClartoTec.svg'), 'utf8');

// Extract all <defs>...</defs>
const defsMatches = [...originalSvg.matchAll(/<defs>([\s\S]*?)<\/defs>/g)];
let allDefs = defsMatches.map(m => m[1]).join('\n');

const costuraEnd = originalSvg.indexOf('</g>', originalSvg.indexOf('data-vectoreasy="costura"')) + 4;
const graphicContent = originalSvg.slice(costuraEnd);

const elementRegex = /(<defs>[\s\S]*?<\/defs>\s*)?<path([^>]+)\/?>/g;
let iconElements = [];
let textElements = [];

function isIconPath(pathStr) {
  const m = pathStr.match(/M\s*([-+]?[0-9.]+)\s+([-+]?[0-9.]+)/i);
  if (!m) return false;
  const y = parseFloat(m[2]);
  return y < 1350;
}

let match;
while ((match = elementRegex.exec(graphicContent)) !== null) {
  const full = match[0];
  const pathAttrs = match[2];
  if (isIconPath(pathAttrs)) {
    iconElements.push(full);
  } else {
    textElements.push(full);
  }
}

console.log(`Icon elements: ${iconElements.length}, Text elements: ${textElements.length}`);

// Balanced horizontal proportions:
// Icon: 847.2 W x 875.1 H
// Text: 2195.6 W x 537.4 H
// Scale: 1.15x -> Text: 2525 W x 618 H
// Gap: 140px
// Total: 847.2 + 140 + 2525 = 3512 W, 875 H
const scale = 1.15;
const gap = 140;
const iconW = 847.2;
const iconH = 875.1;
const textW = 2195.6 * scale;
const textH = 537.4 * scale;

const textY = (iconH - textH) / 2;
const textX = iconW + gap;
const totalW = Math.round(textX + textW);
const totalH = Math.round(iconH);

const iconTrans = `translate(${-773.5}, ${-438.1})`;
const textTrans = `translate(${textX}, ${textY}) scale(${scale}) translate(${-97.6}, ${-1412.7})`;

const horizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" width="${totalW}" height="${totalH}" shape-rendering="geometricPrecision">
  <defs>
    ${allDefs}
  </defs>
  <g id="clarotec-icon" transform="${iconTrans}">
    ${iconElements.join('\n')}
  </g>
  <g id="clarotec-text" transform="${textTrans}">
    ${textElements.join('\n')}
  </g>
</svg>`;

const targetsSvg = [
  path.join(projectRoot, 'landing-page/public/logo-clarotec.svg'),
  path.join(projectRoot, 'landing-page/src/assets/logo-clarotec.svg'),
  path.join(projectRoot, 'formulario/public/logo-clarotec.svg'),
  path.join(projectRoot, 'formulario/src/assets/logo-clarotec.svg'),
];

for (const p of targetsSvg) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, horizontalSvg);
  console.log(`Saved: ${p}`);
}

// Generate PNG with Sharp (e.g. width 1400px for crisp retina display)
const pngBuffer = await sharp(Buffer.from(horizontalSvg))
  .resize({ width: 1400 })
  .png()
  .toBuffer();

const targetsPng = [
  path.join(projectRoot, 'landing-page/public/logo-clarotec.png'),
  path.join(projectRoot, 'landing-page/src/assets/logo-clarotec.png'),
  path.join(projectRoot, 'formulario/public/logo-clarotec.png'),
  path.join(projectRoot, 'formulario/src/assets/logo-clarotec.png'),
];

for (const p of targetsPng) {
  fs.writeFileSync(p, pngBuffer);
  console.log(`Saved: ${p}`);
}

console.log('Horizontal logo generation and distribution complete!');
