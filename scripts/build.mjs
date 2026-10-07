import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

// Generate favicons before bundling
spawnSync(process.execPath, [path.join(root, 'scripts/generate-favicons.mjs')], {
  stdio: 'inherit',
});

for (const app of ['landing-page', 'formulario']) {
  const result = spawnSync(npm, ['run', 'build'], {
    cwd: path.join(root, app),
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  });
  if (result.status !== 0) process.exit(result.status || 1);
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, 'landing-page', 'dist'), output, { recursive: true });
await cp(path.join(root, 'formulario', 'dist'), path.join(output, 'simulador'), { recursive: true });
await writeFile(path.join(output, '_routes.json'), JSON.stringify({ version: 1, include: ['/api/leads'], exclude: [] }, null, 2));
await writeFile(path.join(output, '_headers'), [
  '/*',
  '  X-Content-Type-Options: nosniff',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  '  X-Frame-Options: DENY',
  '',
  '/simulador/*',
  '  X-Robots-Tag: noindex, nofollow',
  '',
].join('\n'));
const robotsPath = path.join(output, 'robots.txt');
const robots = await readFile(robotsPath, 'utf8');
await writeFile(robotsPath, `${robots.trim()}\nDisallow: /simulador/\nDisallow: /api/\n`);
await writeFile(path.join(output, '404.html'), '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="robots" content="noindex"><title>Página não encontrada | World Place Solar</title><body><h1>Página não encontrada</h1><p><a href="/">Voltar ao início</a></p></body></html>');

const simulator = await readFile(path.join(output, 'simulador', 'index.html'), 'utf8');
if (!simulator.includes('noindex')) throw new Error('O simulador precisa permanecer fora do índice de busca.');
console.log('Site pronto em dist/: /, /simulador/ e /api/leads (Function).');
