const fs = require('fs');

const files = [
  'www_setsolar_com_br.html',
  'www_setsolar_com_br_desconto.html',
  'www_setsolar_com_br_blank.html',
  'www_setsolar_com_br_sobre-nos.html',
  'www_setsolar_com_br_portfolio.html',
  'www_setsolar_com_br_contato-1.html',
  'energia_setsolar_com_br.html',
  'setsolartrindade_lovable_app.html'
];

for (const file of files) {
  const p = 'C:/Users/Matheus/Desktop/LPs Energia Solar/LP-SetSolar/downloaded-assets/' + file;
  if (!fs.existsSync(p)) continue;
  const html = fs.readFileSync(p, 'utf8');
  console.log('=== FILE:', file, '===');
  
  // Find scripts
  const scripts = [...html.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
  console.log('Scripts count:', scripts.length);
  scripts.slice(0, 10).forEach(s => console.log('  script:', s));

  // Find images
  const imgs = [...html.matchAll(/(?:src|href|image)=["']([^"']+\.(?:png|jpg|jpeg|svg|webp)[^"']*)["']/gi)].map(m => m[1]);
  console.log('Images count:', imgs.length);
  imgs.slice(0, 10).forEach(img => console.log('  img:', img));
}
