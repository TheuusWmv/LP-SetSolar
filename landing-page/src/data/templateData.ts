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
  installationImage: string;
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
    name: "Set Solar",
    shortName: "Set Solar",
    razaoSocial: "Set Solar Ltda.",
    cnpj: "37.325.291/0001-06",
    phone: "(62) 9 8487-9184",
    phoneFormatted: "+55 (62) 9 8487-9184",
    whatsapp: "5562984879184",
    email: "settecnologiasolar@gmail.com",
    address: "Av. Manoel Monteiro, nº 1717, Centro / Setor Oeste",
    city: "Trindade",
    state: "GO",
    cep: "75392-725",
    hours: "Segunda a Sexta: 08h às 18h | Sábado: 08h às 12h",
    workingHours: "Segunda a Sexta: 08h às 18h | Sábado: 08h às 12h",
    tagline: "Tecnologia em Energia Solar e Comprometimento com o Planeta",
    subheadline:
      "Projetos de alta performance para residências, empresas e agronegócio em Trindade, Goiânia e em todo o estado de Goiás. Do dimensionamento à homologação na Equatorial Goiás, nós cuidamos de tudo.",
    whatsappDefaultMessage:
      "Olá! Gostaria de fazer uma simulação gratuita de energia solar com a Set Solar para o meu imóvel.",
    simulatorUrl: "/simulador/",
    regionCovered: "Trindade, Região Metropolitana e todo o estado de Goiás",
    instagram: "https://www.instagram.com/setsolar/",
  },

  partnerBrands: [
    { name: "WEG Solar", category: "Engenharia e Tradição Nacional de Alta Confiabilidade" },
    { name: "Deye", category: "Líder em Inversores Híbridos e String Inteligentes" },
    { name: "Canadian Solar", category: "Painéis Fotovoltaicos Tier 1 de Alta Eficiência" },
    { name: "Jinko Solar", category: "Tecnologia N-Type TOPCon Líder Global" },
    { name: "Growatt", category: "Inversores Digitais com Monitoramento por App" },
    { name: "Fronius", category: "Inversores Premium Austríacos de Alta Performance" },
    { name: "Equatorial Goiás", category: "Concessionária Homologada (Conexão e Injeção de Créditos)" },
  ],

  howItWorks: {
    badge: "Processo Turn-Key Descomplicado",
    title: "Do orçamento à geração, você sabe exatamente cada próximo passo.",
    subtitle:
      "Nossa equipe técnica cuida do dimensionamento, engenharia com ART, homologação na Equatorial Goiás e instalação. Você acompanha tudo sem burocracia. Estimativa total:",
    highlightDuration: "30 a 60 dias",
    buttonText: "Simular minha economia agora",
  },

  howItWorksSteps: [
    {
      number: "01",
      title: "Diagnóstico Gratuito",
      duration: "1 dia",
      description:
        "Analisamos seu histórico na conta de luz da Equatorial Goiás para calcular a potência em kWp, o número ideal de módulos e a economia projetada.",
    },
    {
      number: "02",
      title: "Visita Técnica & Engenharia",
      duration: "2 a 3 dias",
      description:
        "Engenheiro elétrico avalia a estrutura do telhado ou solo, padrão de entrada de energia e sombreamento, emitindo o projeto elétrico oficial com ART.",
    },
    {
      number: "03",
      title: "Homologação Equatorial Goiás",
      duration: "até 15 dias",
      description:
        "Protocolamos toda a documentação regulatória junto à concessionária Equatorial Goiás e acompanhamos a emissão do parecer de acesso sem você precisar sair de casa.",
    },
    {
      number: "04",
      title: "Instalação Especializada",
      duration: "1 a 3 dias",
      description:
        "Montagem ágil e segura das estruturas de fixação, painéis fotovoltaicos Tier 1, cabeamento e inversores por equipe própria treinada pelas normas NR-10 e NR-35.",
    },
    {
      number: "05",
      title: "Ativação & Monitoramento",
      duration: "no mesmo dia da vistoria",
      description:
        "A concessionária instala o medidor bidirecional, ativamos o sistema e configuramos o aplicativo no seu smartphone para acompanhar a geração em tempo real e economizar até 95%.",
    },
  ] as StepItem[],

  services: [
    {
      id: "residencial",
      number: "01",
      title: "Energia Solar Residencial",
      category: "Casas e Condomínios Fechados",
      description:
        "Mais conforto para ligar o ar-condicionado sem peso na consciência e no bolso. Transforme a luz do sol em economia mensal de até 95% para a sua família em Trindade e região.",
      features: [
        "Economia imediata de até 95% na fatura de luz",
        "Valorização patrimonial instantânea de 8% a 12%",
        "Instalação rápida e limpa em 1 a 2 dias úteis",
        "Monitoramento intuitivo da geração pelo celular",
      ],
      image: "/images/projetos/residencial-le-jardam.png",
      badge: "Mais Procurado",
      startingPrice: "Orçamento sob medida",
      rating: "5.0",
    },
    {
      id: "comercial",
      number: "02",
      title: "Comercial e Empresas",
      category: "Posto Mak, Escolas, Frigoríficos",
      description:
        "Sua empresa trabalha para dar lucro, não para pagar faturas de energia exorbitantes. Reduza custos fixos operacionais de ar-condicionado, câmaras frias e maquinários.",
      features: [
        "Alívio massivo nos custos fixos operacionais",
        "Payback acelerado (2,5 a 4 anos)",
        "Financiamento que se paga com o valor economizado",
        "Casos reais: Posto Mak, Território da Carne, Escola Dinâmica",
      ],
      image: "/images/projetos/posto-mak.jpg",
      badge: "ROI Rápido (3 Anos)",
      startingPrice: "Retorno acelerado",
      rating: "5.0",
    },
    {
      id: "rural",
      number: "03",
      title: "Rural e Agronegócio",
      category: "Fazendas e Galpões",
      description:
        "Ordenhas mecânicas, pivôs de irrigação, silos e resfriadores de leite demandam energia intensiva contínua. Proteja a rentabilidade da sua fazenda contra oscilações de custos.",
      features: [
        "Estabilidade e autonomia para operações contínuas no campo",
        "Estruturas de solo reforçadas ou sobre barracões metálicos",
        "Acesso a linhas de crédito agro subsidiadas (FCO, Pronaf e Pronamp)",
        "Engenharia com proteção contra descargas e intempéries",
      ],
      image: "/images/projetos/rural-agro.jpg",
      badge: "Linhas Safra & Pronaf",
      startingPrice: "Linhas FCO / Safra",
      rating: "5.0",
    },
    {
      id: "eletromobilidade",
      number: "04",
      title: "Eletromobilidade & Carport",
      category: "Carregadores Wallbox e Garagens Solares",
      description:
        "Abasteça seu veículo elétrico ou híbrido com a energia do sol direto na garagem da sua casa ou empresa. Expertise consolidada na implantação de eletropostos e garagens solares.",
      features: [
        "Carregamento seguro e homologado com proteções elétricas",
        "Integração inteligente com inversores híbridos e solares",
        "Economia absoluta em comparação com gasolina ou diesel",
        "Valorização de estacionamentos corporativos e centros comerciais",
      ],
      image: "/images/projetos/eletromobilidade.png",
      badge: "Pioneirismo Set Solar",
      startingPrice: "Projetos Sob Medida",
      rating: "5.0",
    },
    {
      id: "usinas",
      number: "05",
      title: "Usinas de Solo & Investimento",
      category: "Geração Compartilhada & Investidores",
      description:
        "Gere energia limpa em propriedade rural ou lote vago e compense créditos nas faturas de múltiplos imóveis urbanos cadastrados no mesmo CPF ou CNPJ perante a Equatorial Goiás.",
      features: [
        "Sem necessidade de espaço em telhado urbano",
        "Centralização da geração para dezenas de filiais ou residências",
        "Rentabilidade superior a investimentos de renda fixa",
        "Projeto completo com cercamento, engenharia e subestação",
      ],
      image: "/images/projetos/usinas-solo.jpg",
      badge: "Alta Rentabilidade",
      startingPrice: "Máximo Retorno",
      rating: "5.0",
    },
  ] as ServiceItem[],

  testimonials: [
    {
      id: "marcos-cordeiro",
      name: "Marcos V. Cordeiro",
      role: "Proprietário Residencial",
      company: "Residencial Trindade",
      city: "Trindade - GO",
      avatar: "/images/avatar-carlos.jpg",
      installationImage: "/images/projetos/residencial-le-jardam.png",
      rating: 5,
      highlight: "Economia de R$ 850 para R$ 90/mês",
      quote:
        "Minha conta de luz caiu de R$ 850 para R$ 90! A equipe da Set Solar foi impecável do início ao fim. O engenheiro Davi explicou tudo com muita transparência e a instalação durou menos de 2 dias. Recomendo de olhos fechados.",
      stats: {
        label: "Economia mensal",
        value: "89% ao mês",
      },
    },
    {
      id: "rogerio-mendes",
      name: "Rogério Mendes",
      role: "Comerciante / Posto Mak",
      company: "Posto Mak & Conveniência",
      city: "Goiânia - GO",
      avatar: "/images/avatar-guilherme.jpg",
      installationImage: "/images/projetos/posto-mak.jpg",
      rating: 5,
      highlight: "Redução de R$ 2.000/mês",
      quote:
        "Investimos em energia solar para nossa empresa e em menos de 3 anos o sistema já se pagou completamente. Hoje economizamos mais de R$ 2.000 por mês, valor que reaplicamos em estoque e melhorias na empresa.",
      stats: {
        label: "Economia mensal",
        value: "+R$ 2.000,00/mês",
      },
    },
    {
      id: "hamilton-oliveira",
      name: "Hamilton de Oliveira",
      role: "Produtor Rural",
      company: "Fazenda Campo Belo",
      city: "Iporá - GO",
      avatar: "/images/avatar-roberto.jpg",
      installationImage: "/images/projetos/rural-agro.jpg",
      rating: 5,
      highlight: "Projeto perfeito sem surpresas",
      quote:
        "A Set Solar entendeu perfeitamente a necessidade da nossa fazenda, dimensionando os painéis para suportar os maquinários e o poço artesiano. Economia real e suporte de pós-venda excepcional.",
      stats: {
        label: "Autonomia",
        value: "100% Diurna",
      },
    },
    {
      id: "dr-paulo-roberto",
      name: "Dr. Paulo Roberto",
      role: "Médico e Empreendedor",
      company: "Clínica & Residência",
      city: "Trindade - GO",
      avatar: "/images/avatar-carlos.jpg",
      installationImage: "/images/projetos/clinica-dr-paulo.png",
      rating: 5,
      highlight: "Acabamento técnico impecável",
      quote:
        "Equipe altamente técnica! O projeto da clínica e da residência foi entregue antes do prazo previsto, com acabamento impecável na fixação dos painéis e instalação dos inversores. Monitoro tudo pelo celular diariamente. Nota 10!",
      stats: {
        label: "Instalação",
        value: "Clínica & Casa",
      },
    },
    {
      id: "escola-dinamica",
      name: "Coordenação Escola Dinâmica",
      role: "Diretoria e Gestão",
      company: "Escola Dinâmica",
      city: "Trindade - GO",
      avatar: "/images/avatar-fabiana.jpg",
      installationImage: "/images/projetos/escola-dinamica.png",
      rating: 5,
      highlight: "Exemplo de sustentabilidade",
      quote:
        "Excelente trabalho de toda a equipe da Set Solar, desde o atendimento comercial até a conclusão da obra. Além da economia financeira expressiva nas despesas da escola, nossos alunos aprendem sobre energia limpa na prática.",
      stats: {
        label: "Impacto",
        value: "Economia Contínua",
      },
    },
  ] as TestimonialItem[],

  faqs: [
    {
      question: "Quanto realmente posso economizar na fatura de luz com a Set Solar?",
      answer:
        "Com o sistema fotovoltaico on-grid instalado pela Set Solar, você pode reduzir em até 95% o valor da sua conta de energia. Você continuará pagando à concessionária (Equatorial Goiás) apenas a taxa mínima de disponibilidade da rede elétrica (custo de disponibilidade) e a taxa municipal de iluminação pública.",
      category: "Economia",
    },
    {
      question: "Como funciona o financiamento em até 60x sem entrada?",
      answer:
        "Temos parcerias com os maiores bancos e fintechs do Brasil (Santander, BV, Solfácil, Banco do Brasil, Sicredi e Sicoob). Você pode financiar 100% do projeto em até 60 parcelas e com carência de até 90 a 120 dias. Na prática, o valor que você economiza na conta de luz logo nos primeiros meses é utilizado para pagar a própria parcela do financiamento.",
      category: "Financiamento",
    },
    {
      question: "O sistema continua gerando energia em dias nublados ou com chuva?",
      answer:
        "Sim! Os painéis fotovoltaicos operam através da radiação luminosa e não apenas do calor ou da luz solar direta. Mesmo em dias chuvosos ou com céu encoberto, o sistema continua gerando eletricidade em níveis proporcionais. O dimensionamento da Set Solar considera todo o histórico meteorológico anual de Goiás.",
      category: "Técnico",
    },
    {
      question: "A Set Solar cuida de toda a aprovação e homologação na Equatorial Goiás?",
      answer:
        "Sim, assumimos 100% da responsabilidade burocrática e técnica no modelo Turn-key. Realizamos o projeto elétrico com ART assinada por engenheiro, protocolamos a documentação perante a Equatorial Goiás, acompanhamos o parecer de acesso e orientamos a vistoria até a troca do medidor pelo relógio bidirecional.",
      category: "Regulatório",
    },
    {
      question: "Quais são as garantias dos equipamentos instalados?",
      answer:
        "Trabalhamos exclusivamente com fabricantes globais Tier 1 (como Canadian Solar, Jinko Solar, WEG e Deye). Os módulos fotovoltaicos possuem 25 anos de garantia de eficiência de geração linear, os inversores contam com garantia de fábrica de 5 a 12 anos, e a Set Solar garante a qualidade de montagem e engenharia da instalação.",
      category: "Garantia",
    },
    {
      question: "Quanto tempo leva a instalação no meu imóvel?",
      answer:
        "A montagem física no telhado de uma residência leva em média de 1 a 3 dias úteis, sem sujeira e sem interferir na rotina da família. Em empresas e propriedades rurais, o prazo fica entre 3 a 7 dias. O processo regulatório completo até a aprovação da concessionária dura em média de 30 a 60 dias.",
      category: "Instalação",
    },
    {
      question: "E se eu mudar de imóvel no futuro?",
      answer:
        "O sistema fotovoltaico é um patrimônio seu. Caso você se mude, ele pode ser desinstalado e reinstalado no seu novo endereço ou você pode deixar o sistema no imóvel atual, que terá uma valorização imobiliária média de 8% a 12% no momento da venda ou locação.",
      category: "Patrimônio",
    },
    {
      question: "Qual é a manutenção necessária para o sistema solar?",
      answer:
        "A manutenção é mínima. Como os módulos possuem tecnologia antiaderente, a própria água da chuva realiza uma limpeza básica. Recomendamos apenas uma limpeza especializada a cada 6 a 12 meses para retirar poeira acumulada, serviço que a Set Solar também oferece para garantir que sua geração opere sempre no máximo rendimento.",
      category: "Manutenção",
    },
  ] as FAQItem[],
};
