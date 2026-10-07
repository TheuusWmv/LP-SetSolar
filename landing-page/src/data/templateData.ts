// =============================================================================
// templateData.ts — Arquivo Central de Dados & Personalização da Landing Page
// =============================================================================

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  badge?: string;
  startingPrice?: string;
  rating?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  avatar: string;
  rating: number;
  highlight: string;
  quote: string;
  stats: {
    label: string;
    value: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface StepItem {
  number: string;
  title: string;
  duration: string;
  description: string;
  subtitle?: string;
  timeline?: string;
  highlight?: string;
}

export interface PartnerBrand {
  name: string;
  category: string;
}

export const templateData = {
  company: {
    name: "World Place Solar",
    shortName: "World Place",
    razaoSocial: "World Place Solucoes e Construcao LTDA",
    cnpj: "42.774.704/0001-61",
    tagline: "Reduza em até 95% a sua conta de luz",
    subheadline:
      "Projetos e instalação de energia solar fotovoltaica para residências, empresas e agronegócio em Goiânia e em todo o estado de Goiás. Faça uma simulação gratuita e comece a economizar.",
    whatsapp: "5562991533755",
    whatsappDefaultMessage:
      "Olá! Quero uma simulação gratuita da World Place Solar para saber quanto posso economizar na minha conta de luz.",
    phone: "(62) 99153-3755",
    phoneFormatted: "+55 (62) 99153-3755",
    email: "",
    workingHours: "Segunda a Sexta, das 08h às 18h",
    city: "Goiânia",
    state: "GO",
    address: "Avenida Comercial Esquina Com Rua Ipiranga, 625, Qd 116, Lt 04, Jd. Nova Esperança, Goiânia - GO",
    regionCovered: "Goiânia, Região Metropolitana e Goiás",
    instagram: "https://www.instagram.com/world_placesolar/",
    simulatorUrl: "/simulador/",
  },

  partnerBrands: [
    { name: "BYD Energy", category: "Baterias & Módulos Tier 1" },
    { name: "WEG Solar", category: "Engenharia e Tradição Nacional" },
    { name: "Huawei Solar", category: "Inversores Digitais Inteligentes" },
    { name: "Fronius", category: "Inversores Premium Austríacos" },
    { name: "Canadian Solar", category: "Líder Global em Fotovoltaico" },
    { name: "DAH Solar", category: "Módulos Full-Screen Patenteados" },
    { name: "Sungrow", category: "Alta Potência & Confiabilidade" },
    { name: "SAJ Electric", category: "Inversores & Armazenamento" },
  ],

  howItWorks: {
    badge: "Como Funciona",
    title: "Do orçamento à geração, você sabe cada próximo passo.",
    subtitle:
      "Nossa equipe técnica cuida do dimensionamento, engenharia, instalação e de todos os trâmites de homologação junto à concessionária de energia. Estimativa total:",
    highlightDuration: "45 a 75 dias",
    buttonText: "Simular minha economia",
  },

  howItWorksSteps: [
    {
      number: "01",
      title: "Visita técnica",
      duration: "1 dia",
      description:
        "Análise estrutural do telhado ou solo, verificação do padrão de entrada e estudo de sombreamento.",
    },
    {
      number: "02",
      title: "Engenharia & Projeto",
      duration: "3 a 5 dias",
      description:
        "Dimensionamento elétrico, escolha dos inversores e módulos Tier 1 e cálculo da geração anual esperada.",
    },
    {
      number: "03",
      title: "Parecer de acesso",
      duration: "até 15 dias",
      description:
        "Protocolamos o projeto na concessionária de energia e acompanhamos todas as etapas regulatórias.",
    },
    {
      number: "04",
      title: "Instalação especializada",
      duration: "1 a 3 dias",
      description:
        "Fixação estrutural, montagem dos módulos, cabeamento e inversores. A rede local só para na conexão.",
    },
    {
      number: "05",
      title: "Vistoria e medidor",
      duration: "até 7 dias",
      description:
        "A distribuidora realiza a vistoria técnica e substitui o medidor pelo modelo bidirecional homologado.",
    },
    {
      number: "06",
      title: "Sistema gerando",
      duration: "no mesmo dia",
      description:
        "Com a autorização concedida, ativamos o sistema e sua economia de até 95% começa imediatamente.",
    },
  ] as StepItem[],

  services: [
    {
      id: "residencial",
      number: "01",
      title: "Energia Solar Residencial",
      category: "Casas & Condomínios",
      description:
        "Mais conforto em casa, menos peso na conta de luz. Use seu telhado para gerar energia e deixe mais espaço no orçamento para os planos da família.",
      features: [
        "Economia de até 95% todo mês",
        "Valorização patrimonial imediata",
        "Instalação rápida de 1 a 2 dias",
        "Monitoramento fácil pelo celular",
      ],
      image:
        "/images/solar-residencial.jpg",
      badge: "Mais Procurado",
      startingPrice: "Orçamento sob medida",
      rating: "5.0",
    },
    {
      id: "comercial",
      number: "02",
      title: "Energia Solar Comercial",
      category: "Empresas & Varejo",
      description:
        "Sua empresa trabalha para crescer. A conta de luz não precisa levar tanto do resultado. Gere parte da energia que consome e libere recursos para reinvestir.",
      features: [
        "Redução direta nos custos fixos",
        "Payback acelerado (2 a 3 anos)",
        "Financiamento que se paga com a economia",
        "Selo ESG para a sua marca",
      ],
      image:
        "/images/solar-comercial.jpg",
      badge: "ROI Rápido",
      startingPrice: "Retorno estimado no projeto",
      rating: "4.9",
    },
    {
      id: "rural",
      number: "03",
      title: "Solar Rural & Agronegócio",
      category: "Fazendas, Granjas & Aviários",
      description:
        "Granjas, aviários, ordenhas e pivôs de irrigação consomem energia intensiva todos os dias. No Oeste Catarinense, reduza esse custo fixo com segurança técnica e alta durabilidade.",
      features: [
        "Operação contínua de irrigação, aviários e maquinários",
        "Linhas especiais Safra, Pronaf e Finame/BNDES Agro",
        "Instalações robustas em solo ou coberturas de barracões",
        "Proteção e estabilidade contra oscilações da rede elétrica",
      ],
      image:
        "/images/solar-rural.jpg",
      badge: "Crédito Rural",
      startingPrice: "Linhas Pronaf / Safra",
      rating: "5.0",
    },
    {
      id: "industrial",
      number: "04",
      title: "Solar Industrial & Média Tensão",
      category: "Indústrias & Grandes Cargas",
      description:
        "Cada redução no custo de energia amplia a margem operacional da sua indústria. Dimensionamos subestações e geração fotovoltaica com engenharia de precisão e laudos com ART.",
      features: [
        "Subestações e conexão homologada em média tensão",
        "Contratos de desempenho e garantia de geração",
        "Laudos estruturais e responsabilidade técnica (ART)",
        "Amortização rápida de ativo com redução de encargos",
      ],
      image:
        "/images/solar-industrial.jpg",
      badge: "Alta Tensão",
      startingPrice: "Projetos Sob Medida",
      rating: "4.9",
    },
    {
      id: "baterias",
      number: "05",
      title: "Baterias & Backup Off-Grid / Híbrido",
      category: "Armazenamento Inteligente",
      description:
        "Quando a rede elétrica oscilar ou cair, as operações essenciais continuam ativas. Projetamos sistemas híbridos com baterias para garantir autonomia contínua à sua estrutura.",
      features: [
        "Energia contínua garantida em apagões e quedas de rede",
        "Baterias de Lítio LiFePO4 de ciclo profundo e longa vida",
        "Transição automática instantânea em milissegundos",
        "Independência energética para cargas críticas e câmaras frias",
      ],
      image:
        "/images/solar-baterias.jpg",
      badge: "Autonomia Total",
      startingPrice: "Autonomia sob medida",
      rating: "5.0",
    },
  ] as ServiceItem[],

  faqs: [
    {
      question: "Quando começo a gerar minha própria energia?",
      answer:
        "A instalação dos equipamentos em uma residência costuma levar de 1 a 3 dias úteis. O processo completo, da visita técnica ao sistema ligado e homologado, tem estimativa média de 45 a 75 dias. Nossa equipe da World Place Solar conduz todo o protocolo junto à distribuidora e mantém você informado.",
      category: "Instalação",
    },
    {
      question: "Quanto custa e como saber se vale a pena?",
      answer:
        "O investimento depende do seu consumo médio, dos equipamentos e do local de instalação. Com nossa simulação gratuita, calculamos a economia estimada de até 95% e o tempo de retorno (payback) antes de você fechar contrato.",
      category: "Financeiro",
    },
    {
      question: "E nos dias nublados ou durante a noite?",
      answer:
        "Os módulos solares geram energia através da radiação luminosa, mesmo em dias nublados ou chuvosos (com produção proporcional). À noite, seu imóvel utiliza a rede da concessionária ou o saldo de créditos gerados pelo próprio sistema durante o dia.",
      category: "Técnico",
    },
    {
      question: "Preciso pagar tudo à vista?",
      answer:
        "Não. Trabalhamos com diversas linhas de financiamento bancário e crédito rural, onde o valor da parcela é frequentemente menor ou equivalente ao que você já economiza na conta de luz todo mês.",
      category: "Financeiro",
    },
    {
      question: "A World Place Solar cuida da homologação na concessionária?",
      answer:
        "Sim, 100%! Cuidamos de todo o processo de engenharia, emissão de ART, entrada do parecer de acesso e acompanhamento da vistoria e troca do medidor até a ativação definitiva do sistema.",
      category: "Regulatório",
    },
    {
      question: "O sistema funciona em caso de queda de energia na rua?",
      answer:
        "Em sistemas conectados à rede padrão (on-grid), o inversor se desliga por segurança técnica dos operadores da rede. Caso sua residência, empresa ou granja necessite de energia ininterrupta, desenvolvemos soluções híbridas com banco de baterias.",
      category: "Técnico",
    },
  ] as FAQItem[],
};
