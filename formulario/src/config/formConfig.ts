import { PropertyType, RoofDetail, OwnershipStatus } from '../types/form';

export interface BrandConfig {
  companyName: string;
  logoText: string;
  logoUrl: string; // Optional image in /public, e.g. /logo.svg
  faviconUrl: string;
  accentColor: string;
  accentHoverColor: string;
  accentSoftColor: string;
  accentTextColor: string;
  landingPageUrl: string;
  webhookUrl: string; // Rota local da Pages Function; credenciais ficam no servidor.
}

export const brandConfig: BrandConfig = {
  companyName: "World Place Solar",
  logoText: "World Place Solar",
  logoUrl: "/simulador/logo-worldplace.svg",
  faviconUrl: "/simulador/favicon.svg?v=wp2",
  accentColor: "#E9191B",
  accentHoverColor: "#872325",
  accentSoftColor: "#fef2f2",
  accentTextColor: "#ffffff",
  landingPageUrl: "/",
  webhookUrl: "/api/leads",
};

export const leadTypeConfig = [
  {
    id: 'pf' as const,
    title: 'Para Minha Casa (Pessoa Física)',
    shortcut: 'A',
    description: 'Residências unifamiliares, sobrados, condomínios fechados ou sítios',
  },
  {
    id: 'pj' as const,
    title: 'Para Minha Empresa (Pessoa Jurídica / CNPJ)',
    shortcut: 'B',
    description: 'Comércios, indústrias, galpões logísticos ou agronegócio',
  },
];

export const pjSegmentsConfig = [
  {
    id: 'comercio' as const,
    title: 'Comércio, Escritório ou Serviços',
    shortcut: 'A',
    description: 'Lojas, clínicas, padarias, academias, supermercados e escritórios',
  },
  {
    id: 'industria' as const,
    title: 'Indústria, Fábrica ou Galpão',
    shortcut: 'B',
    description: 'Manufatura, centros logísticos, usinagens e galpões',
  },
  {
    id: 'agro' as const,
    title: 'Agronegócio ou Produtor Rural',
    shortcut: 'C',
    description: 'Fazendas, granjas, pivôs de irrigação, aviários e laticínios',
  },
  {
    id: 'outros' as const,
    title: 'Escola, Hotel ou Outra Atividade',
    shortcut: 'D',
    description: 'Instituições de ensino, hotelaria, postos de combustíveis',
  },
];

export const propertyTypesConfig: {
  id: PropertyType;
  title: string;
  shortcut: string;
  description: string;
  iconName: 'Home' | 'Building2' | 'Tractor' | 'Factory';
}[] = [
  {
    id: 'residencial',
    title: 'Para minha residência',
    shortcut: 'A',
    description: '',
    iconName: 'Home',
  },
  {
    id: 'comercial',
    title: 'Para meu comércio ou escritório',
    shortcut: 'B',
    description: '',
    iconName: 'Building2',
  },
  {
    id: 'rural',
    title: 'Para agronegócio ou produtor rural',
    shortcut: 'C',
    description: '',
    iconName: 'Tractor',
  },
  {
    id: 'industrial',
    title: 'Para indústria ou galpão logístico',
    shortcut: 'D',
    description: '',
    iconName: 'Factory',
  },
];

export const roofDetailsConfig: Record<string, RoofDetail> = {
  ceramico: {
    id: 'ceramico',
    title: 'Telhado Cerâmico',
    shortcut: 'A',
    subtitle: 'Telhas de Barro / Colonial / Francesa',
    description: 'A fixação é realizada com ganchos estruturais de inox sob as telhas, preservando 100% da vedação original e resistência a ventos.',
    idealAngle: '15° a 25°',
    fixingType: 'Ganchos Inox Reguláveis',
    tag: 'Mais comum no Brasil',
    image3D: '/simulador/models/ceramico.webp',
  },
  metalico: {
    id: 'metalico',
    title: 'Telhado Metálico',
    shortcut: 'B',
    subtitle: 'Telha Trapezoidal / Sanduíche / Aluzinco',
    description: 'Instalação ultra-rápida utilizando mini-trilhos fixados diretamente nas ondas com parafusos autobrocantes e vedação EPDM de alta durabilidade.',
    idealAngle: '10° a 20°',
    fixingType: 'Mini-Trilhos de Alumínio',
    tag: 'Alta Eficiência de Fixação',
    image3D: '/simulador/models/metalico.webp',
  },
  fibrocimento: {
    id: 'fibrocimento',
    title: 'Fibrocimento / Ondulada',
    shortcut: 'C',
    subtitle: 'Telhas de Fibrocimento ou Brasilit',
    description: 'Fixação por parafusos prisioneiros de aço inox com bucha de vedação hermética, presos diretamente na estrutura de madeira ou metálica.',
    idealAngle: '10° a 18°',
    fixingType: 'Parafusos Prisioneiros Inox',
    tag: 'Vedação Hermética Dupla',
    image3D: '/simulador/models/fibrocimento.webp',
  },
  laje: {
    id: 'laje',
    title: 'Laje Plana de Concreto',
    shortcut: 'D',
    subtitle: 'Lajes Acessíveis ou Coberturas Planas',
    description: 'Utiliza suportes triangulares de alumínio naval para obter a inclinação solar perfeita em direção ao Norte, sem perfurar a impermeabilização.',
    idealAngle: '18° a 25° (Norte)',
    fixingType: 'Triângulos Angulados ou Lastro',
    tag: 'Orientação Solar Otimizada',
    image3D: '/simulador/models/laje.webp',
  },
  solo: {
    id: 'solo',
    title: 'Usinas em Solo / Terreno',
    shortcut: 'E',
    subtitle: 'Áreas Abertas ou Chácaras',
    description: 'Estruturas de estacas cravadas ou sapatas de concreto com inclinação ideal, ideais para geração remota ou quando o telhado possui sombras.',
    idealAngle: '20° a 30°',
    fixingType: 'Estrutura Biposte / Cravada',
    tag: 'Máxima Potência & Escalabilidade',
    image3D: '/simulador/models/solo.webp',
  },
};

export const ownershipStatusConfig: {
  id: OwnershipStatus;
  title: string;
  shortcut: string;
  description: string;
  recommended: boolean;
}[] = [
  {
    id: 'proprietario',
    title: 'Sou o proprietário',
    shortcut: 'A',
    description: '',
    recommended: true,
  },
  {
    id: 'inquilino',
    title: 'O imóvel é alugado',
    shortcut: 'B',
    description: '',
    recommended: false,
  },
  {
    id: 'obra',
    title: 'Imóvel em construção ou reforma',
    shortcut: 'C',
    description: '',
    recommended: false,
  },
];

export const ownershipStatusConfigPJ: {
  id: OwnershipStatus;
  title: string;
  shortcut: string;
  description: string;
  recommended: boolean;
}[] = [
  {
    id: 'proprietario',
    title: 'Imóvel próprio da empresa',
    shortcut: 'A',
    description: '',
    recommended: true,
  },
  {
    id: 'inquilino',
    title: 'Imóvel alugado',
    shortcut: 'B',
    description: '',
    recommended: false,
  },
  {
    id: 'obra',
    title: 'Em expansão ou obra',
    shortcut: 'C',
    description: '',
    recommended: false,
  },
];

export interface EnergyBillRange {
  id: string;
  title: string;
  shortcut: string;
  description: string;
  numericValue: number;
}

export const energyBillRangesPF: EnergyBillRange[] = [
  {
    id: 'pf-1',
    title: 'Até R$ 350 /mês',
    shortcut: 'A',
    description: '',
    numericValue: 300,
  },
  {
    id: 'pf-2',
    title: 'De R$ 350 a R$ 650 /mês',
    shortcut: 'B',
    description: '',
    numericValue: 500,
  },
  {
    id: 'pf-3',
    title: 'De R$ 650 a R$ 1.200 /mês',
    shortcut: 'C',
    description: '',
    numericValue: 900,
  },
  {
    id: 'pf-4',
    title: 'De R$ 1.200 a R$ 2.500 /mês',
    shortcut: 'D',
    description: '',
    numericValue: 1800,
  },
  {
    id: 'pf-5',
    title: 'Acima de R$ 2.500 /mês',
    shortcut: 'E',
    description: '',
    numericValue: 3500,
  },
];

export const energyBillRangesPJ: EnergyBillRange[] = [
  {
    id: 'pj-1',
    title: 'De R$ 800 a R$ 2.500 /mês',
    shortcut: 'A',
    description: '',
    numericValue: 1600,
  },
  {
    id: 'pj-2',
    title: 'De R$ 2.500 a R$ 6.000 /mês',
    shortcut: 'B',
    description: '',
    numericValue: 4200,
  },
  {
    id: 'pj-3',
    title: 'De R$ 6.000 a R$ 15.000 /mês',
    shortcut: 'C',
    description: '',
    numericValue: 10000,
  },
  {
    id: 'pj-4',
    title: 'De R$ 15.000 a R$ 35.000 /mês',
    shortcut: 'D',
    description: '',
    numericValue: 24000,
  },
  {
    id: 'pj-5',
    title: 'Acima de R$ 35.000 /mês',
    shortcut: 'E',
    description: '',
    numericValue: 50000,
  },
];

export interface GoalOption {
  id: string;
  title: string;
  shortcut: string;
  description?: string;
}

export const mainGoalsConfig: GoalOption[] = [
  {
    id: 'reduzir_conta',
    title: 'Reduzir até 95% do custo da conta de luz',
    shortcut: 'A',
  },
  {
    id: 'protecao_tarifas',
    title: 'Me proteger dos aumentos constantes de tarifa',
    shortcut: 'B',
  },
  {
    id: 'sustentabilidade',
    title: 'Valorizar o imóvel com tecnologia sustentável',
    shortcut: 'C',
  },
  {
    id: 'autonomia',
    title: 'Ter autonomia e energia ininterrupta',
    shortcut: 'D',
  },
];

export interface TimelineOption {
  id: string;
  title: string;
  shortcut: string;
  description?: string;
}

export const timelineConfig: TimelineOption[] = [
  {
    id: 'imediato',
    title: 'O quanto antes (este mês)',
    shortcut: 'A',
  },
  {
    id: '3_meses',
    title: 'Em até 3 meses',
    shortcut: 'B',
  },
  {
    id: '6_meses',
    title: 'Em até 6 meses',
    shortcut: 'C',
  },
  {
    id: 'pesquisando',
    title: 'Apenas pesquisando e planejando',
    shortcut: 'D',
  },
];
