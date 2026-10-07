import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sharp = require(path.join(root, 'landing-page', 'node_modules', 'sharp'));

// Definição dos vetores do emblema da ClaroTec
// O emblema é composto por:
// 1. Sol (raios + disco + brilho)
// 2. Duas folhas estilizadas (verde claro e verde escuro com nervura central)
// 3. Painel solar 4x4 em perspectiva com contorno circular inferior
// 4. Tipografia CLARO TEC com swoosh orbital e estrela
// 5. Subtítulo SOLUÇÕES

function buildSvg({ includeBackground = false, viewBox = '0 0 150 150', width = 150, height = 150 } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">
  <defs>
    <!-- Gradiente do Sol -->
    <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFDD00"/>
      <stop offset="50%" stop-color="#FFAA00"/>
      <stop offset="100%" stop-color="#FF6A00"/>
    </linearGradient>

    <!-- Gradiente dos Raios do Sol -->
    <linearGradient id="raysGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFD000"/>
      <stop offset="100%" stop-color="#FF7700"/>
    </linearGradient>

    <!-- Gradientes das Folhas -->
    <linearGradient id="leafLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#99D836"/>
      <stop offset="100%" stop-color="#55A62E"/>
    </linearGradient>
    <linearGradient id="leafDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4C9C28"/>
      <stop offset="100%" stop-color="#1B6620"/>
    </linearGradient>

    <!-- Gradiente do Painel Solar -->
    <linearGradient id="solarGrad" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#0E8CD8"/>
      <stop offset="50%" stop-color="#0766B2"/>
      <stop offset="100%" stop-color="#023974"/>
    </linearGradient>

    <!-- Gradiente do Swoosh -->
    <linearGradient id="swooshGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#02538C"/>
      <stop offset="40%" stop-color="#3D8E30"/>
      <stop offset="75%" stop-color="#7BBF28"/>
      <stop offset="100%" stop-color="#FFBA00"/>
    </linearGradient>

    <!-- Gradiente de Fundo Suave (opcional) -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C2EBF3"/>
      <stop offset="50%" stop-color="#E8F6F8"/>
      <stop offset="100%" stop-color="#FBF4DD"/>
    </linearGradient>

    <!-- Clip path para a silhueta circular da base do emblema (folhas + painel) -->
    <clipPath id="emblemCircleClip">
      <circle cx="75" cy="46" r="27.5"/>
    </clipPath>

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&amp;family=Plus+Jakarta+Sans:wght@700;800&amp;display=swap');
      .brand-claro {
        font-family: 'Montserrat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 900;
        fill: #02538C;
        font-size: 19px;
        letter-spacing: -0.02em;
      }
      .brand-tec {
        font-family: 'Montserrat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 900;
        fill: #4E9B34;
        font-size: 19px;
        letter-spacing: -0.02em;
      }
      .brand-solucoes {
        font-family: 'Montserrat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 800;
        fill: #08436E;
        font-size: 8.8px;
        letter-spacing: 0.22em;
      }
    </style>
  </defs>

  ${includeBackground ? `<rect width="100%" height="100%" fill="url(#bgGrad)"/>` : ''}

  <!-- ==================== EMBLEMA ==================== -->
  <g id="emblem">
    <!-- 1. RAIOS DO SOL (triângulos apontados ao redor do semicírculo superior) -->
    <g id="sun-rays" fill="url(#raysGrad)">
      <!-- Ray 1 (~9:30) -->
      <polygon points="50.5,33.5 45.0,29.0 52.8,29.5" />
      <!-- Ray 2 (~10:30) -->
      <polygon points="55.8,26.5 53.0,19.5 60.0,22.2" />
      <!-- Ray 3 (~11:15) -->
      <polygon points="63.5,21.0 64.0,13.5 69.5,18.0" />
      <!-- Ray 4 (~12:00 Topo central) -->
      <polygon points="72.0,17.5 75.0,10.0 78.0,17.5" />
      <!-- Ray 5 (~12:45) -->
      <polygon points="80.5,18.0 86.0,13.5 86.5,21.0" />
      <!-- Ray 6 (~1:30) -->
      <polygon points="90.0,22.2 97.0,19.5 94.2,26.5" />
      <!-- Ray 7 (~2:15) -->
      <polygon points="97.2,29.5 105.0,29.0 99.5,33.5" />
      <!-- Ray 8 (~2:45) -->
      <polygon points="99.0,36.5 106.5,38.5 99.8,42.0" />
    </g>

    <!-- 2. CORPO DO SOL -->
    <circle cx="75" cy="38" r="19" fill="url(#sunGrad)" />

    <!-- Arco de luz branco no sol -->
    <path d="M 59 34 C 63 25, 87 25, 91 34 C 86 28, 64 28, 59 34 Z" fill="#FFFFFF" opacity="0.8" />

    <!-- 3. BASE DO EMBLEMA (Folhas + Painel Solar) contidos na silhueta circular -->
    <g id="circle-base" clip-path="url(#emblemCircleClip)">

      <!-- Painel Solar (fundo azul) -->
      <path d="M 68 28 L 105 28 L 105 75 L 68 75 Z" fill="url(#solarGrad)"/>

      <!-- Grade de Células Fotovoltaicas (linhas brancas em perspectiva) -->
      <g stroke="#FFFFFF" stroke-width="1.3" opacity="0.95" fill="none">
        <!-- Linha de divisão superior/borda do painel -->
        <!-- Divisórias Verticais em Perspectiva -->
        <line x1="77.5" y1="28" x2="73.5" y2="75" />
        <line x1="86.5" y1="28" x2="84.5" y2="75" />
        <line x1="95.5" y1="28" x2="96.5" y2="75" />

        <!-- Divisórias Horizontais -->
        <line x1="68" y1="39.5" x2="105" y2="38.5" />
        <line x1="68" y1="51.0" x2="105" y2="50.0" />
        <line x1="68" y1="62.5" x2="105" y2="62.0" />
      </g>

      <!-- 4. FOLHAS VERDES (Eco) -->
      <!-- Contorno branco de destaque entre folhas e painel solar -->
      <!-- Folha 1 (Superior/Esquerda) -->
      <path d="M 75 73.5 C 64 73.5, 48 57, 52 35 C 68 33, 76 46, 75 73.5 Z" fill="#FFFFFF" />

      <!-- Metade Clara da Folha Superior -->
      <path d="M 52 35 C 50 48, 58 64, 75 73.5 C 67 61, 62 48, 52 35 Z" fill="url(#leafLightGrad)" />
      <!-- Metade Escura da Folha Superior -->
      <path d="M 52 35 C 62 48, 67 61, 75 73.5 C 75 54, 69 41, 52 35 Z" fill="url(#leafDarkGrad)" />

      <!-- Folha 2 (Frontal / Inferior) -->
      <!-- Contorno branco separador -->
      <path d="M 74 74 C 60 74, 45 64, 46 47 C 62 44, 73 57, 74 74 Z" fill="#FFFFFF" />

      <!-- Metade Clara da Folha Frontal -->
      <path d="M 46 47 C 46 59, 56 69, 74 74 C 64 64, 57 55, 46 47 Z" fill="url(#leafLightGrad)" />
      <!-- Metade Escura da Folha Frontal -->
      <path d="M 46 47 C 57 55, 64 64, 74 74 C 74 61, 68 51, 46 47 Z" fill="url(#leafDarkGrad)" />

      <!-- Nervuras brancas finas -->
      <path d="M 46 47 C 57 55, 64 64, 74 74" stroke="#FFFFFF" stroke-width="0.8" fill="none" opacity="0.6"/>
      <path d="M 52 35 C 62 48, 67 61, 75 73.5" stroke="#FFFFFF" stroke-width="0.8" fill="none" opacity="0.6"/>
    </g>

    <!-- Borda externa branca separando o sol das folhas e do painel -->
    <path d="M 66 31 C 70 27, 85 26, 99 30" stroke="#FFFFFF" stroke-width="2" fill="none" />
  </g>

  <!-- ==================== TIPOGRAFIA ==================== -->
  <g id="typography">
    <!-- Linha Principal: CLARO TEC -->
    <text x="75" y="104.5" text-anchor="middle">
      <tspan class="brand-claro">CLARO </tspan>
      <tspan class="brand-tec">TEC</tspan>
    </text>

    <!-- Swoosh Dinâmico Orbital sob 'TEC' -->
    <!-- Começa abaixo do 'O' de CLARO, curva por baixo de TEC e sobe até a direita -->
    <path d="M 78 107.5 C 93 104, 116 104, 137.5 110.5 C 122 106, 96 106.5, 78 107.5 Z" fill="url(#swooshGrad)" />

    <!-- Estrela / Spark Dourada na ponta do Swoosh -->
    <g transform="translate(138.5, 111) scale(0.65)" fill="#FFBA00">
      <!-- Centro da estrela -->
      <circle cx="0" cy="0" r="2.2" fill="#FFA500"/>
      <!-- Raios da estrela de 8 pontas -->
      <polygon points="0,-4.5 1,-1.2 4.5,0 1,1.2 0,4.5 -1,1.2 -4.5,0 -1,-1.2" />
      <polygon points="-2.5,-2.5 0,-0.8 2.5,-2.5 0.8,0 2.5,2.5 0,0.8 -2.5,2.5 -0.8,0" transform="rotate(22.5)" />
    </g>

    <!-- Subtítulo: SOLUÇÕES -->
    <text x="76" y="120" text-anchor="middle" class="brand-solucoes">SOLUÇÕES</text>
  </g>
</svg>
`;
}

// Emblema isolado para favicon/ícone
function buildIconSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="42 8 66 68" width="100%" height="100%">
  <defs>
    <linearGradient id="iconSunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFDD00"/>
      <stop offset="50%" stop-color="#FFAA00"/>
      <stop offset="100%" stop-color="#FF6A00"/>
    </linearGradient>
    <linearGradient id="iconRaysGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFD000"/>
      <stop offset="100%" stop-color="#FF7700"/>
    </linearGradient>
    <linearGradient id="iconLeafLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#99D836"/>
      <stop offset="100%" stop-color="#55A62E"/>
    </linearGradient>
    <linearGradient id="iconLeafDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4C9C28"/>
      <stop offset="100%" stop-color="#1B6620"/>
    </linearGradient>
    <linearGradient id="iconSolar" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#0E8CD8"/>
      <stop offset="50%" stop-color="#0766B2"/>
      <stop offset="100%" stop-color="#023974"/>
    </linearGradient>
    <clipPath id="iconCircleClip">
      <circle cx="75" cy="46" r="27.5"/>
    </clipPath>
  </defs>

  <g id="icon-sun-rays" fill="url(#iconRaysGrad)">
    <polygon points="50.5,33.5 45.0,29.0 52.8,29.5" />
    <polygon points="55.8,26.5 53.0,19.5 60.0,22.2" />
    <polygon points="63.5,21.0 64.0,13.5 69.5,18.0" />
    <polygon points="72.0,17.5 75.0,10.0 78.0,17.5" />
    <polygon points="80.5,18.0 86.0,13.5 86.5,21.0" />
    <polygon points="90.0,22.2 97.0,19.5 94.2,26.5" />
    <polygon points="97.2,29.5 105.0,29.0 99.5,33.5" />
    <polygon points="99.0,36.5 106.5,38.5 99.8,42.0" />
  </g>
  <circle cx="75" cy="38" r="19" fill="url(#iconSunGrad)" />
  <path d="M 59 34 C 63 25, 87 25, 91 34 C 86 28, 64 28, 59 34 Z" fill="#FFFFFF" opacity="0.8" />

  <g clip-path="url(#iconCircleClip)">
    <path d="M 68 28 L 105 28 L 105 75 L 68 75 Z" fill="url(#iconSolar)"/>
    <g stroke="#FFFFFF" stroke-width="1.3" opacity="0.95" fill="none">
      <line x1="77.5" y1="28" x2="73.5" y2="75" />
      <line x1="86.5" y1="28" x2="84.5" y2="75" />
      <line x1="95.5" y1="28" x2="96.5" y2="75" />
      <line x1="68" y1="39.5" x2="105" y2="38.5" />
      <line x1="68" y1="51.0" x2="105" y2="50.0" />
      <line x1="68" y1="62.5" x2="105" y2="62.0" />
    </g>
    <path d="M 75 73.5 C 64 73.5, 48 57, 52 35 C 68 33, 76 46, 75 73.5 Z" fill="#FFFFFF" />
    <path d="M 52 35 C 50 48, 58 64, 75 73.5 C 67 61, 62 48, 52 35 Z" fill="url(#iconLeafLight)" />
    <path d="M 52 35 C 62 48, 67 61, 75 73.5 C 75 54, 69 41, 52 35 Z" fill="url(#iconLeafDark)" />
    <path d="M 74 74 C 60 74, 45 64, 46 47 C 62 44, 73 57, 74 74 Z" fill="#FFFFFF" />
    <path d="M 46 47 C 46 59, 56 69, 74 74 C 64 64, 57 55, 46 47 Z" fill="url(#iconLeafLight)" />
    <path d="M 46 47 C 57 55, 64 64, 74 74 C 74 61, 68 51, 46 47 Z" fill="url(#iconLeafDark)" />
    <path d="M 46 47 C 57 55, 64 64, 74 74" stroke="#FFFFFF" stroke-width="0.8" fill="none" opacity="0.6"/>
    <path d="M 52 35 C 62 48, 67 61, 75 73.5" stroke="#FFFFFF" stroke-width="0.8" fill="none" opacity="0.6"/>
  </g>
  <path d="M 66 31 C 70 27, 85 26, 99 30" stroke="#FFFFFF" stroke-width="2" fill="none" />
</svg>
`;
}

export { buildSvg, buildIconSvg };
