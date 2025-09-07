export const SITE_CONFIG = {
  name: 'Juliana Kaíza Rodrigues do Nascimento',
  title: 'Juliana Kaíza - Analista de SEO e Criadora de Conteúdo',
  description: 'Portfolio profissional de Juliana Kaíza - Analista de SEO e Criadora de Conteúdo com mais de 3 anos de experiência',
  url: 'https://julianakaiza.site',
  ogImage: '/og-image.jpg',
  links: {
    linkedin: 'https://www.linkedin.com/in/juliana-ka%C3%ADza-r-do-nascimento-a87a54206/',
    email: 'juliana_kaiza@outlook.com',
    instagram: 'https://instagram.com/julianakaiza',
  }
}

export const NAVIGATION_ITEMS = [
  { name: 'Início', href: '#home' },
  { name: 'Sobre', href: '#about' },
  { name: 'Serviços', href: '#services' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Experiência', href: '#experience' },
  { name: 'Contato', href: '#contact' },
]

export const SKILLS = [
  { name: 'SEO On-Page', level: 95 },
  { name: 'SEO Técnico', level: 90 },
  { name: 'Google Analytics', level: 92 },
  { name: 'Google Search Console', level: 90 },
  { name: 'SEMrush', level: 88 },
  { name: 'Ahrefs', level: 85 },
  { name: 'Link Building', level: 87 },
  { name: 'Copywriting', level: 90 },
  { name: 'WordPress', level: 85 },
  { name: 'Inbound Marketing', level: 88 },
]

export const PROJECTS = [
  {
    id: 1,
    title: 'Aumento no Fluxo de Conteúdo de Blog',
    description: 'Estratégia completa de produção de conteúdo que resultou na publicação de mais de 400 artigos otimizados para SEO, aumentando significativamente o tráfego orgânico.',
    image: '/projects/blog-content.jpg',
    technologies: ['Content Marketing', 'SEO On-Page', 'Keyword Research', 'Editorial Calendar'],
    demo: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Execução de Projetos de Novas Páginas',
    description: 'Criação estratégica de headings, pesquisa de palavras-chave e monitoramento de SEO técnico para novas páginas, garantindo otimização desde o lançamento.',
    image: '/projects/new-pages.jpg',
    technologies: ['SEO Técnico', 'Keyword Research', 'Heading Structure', 'Technical SEO'],
    demo: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Revisão de Conteúdo de Infoproduto',
    description: 'Revisão completa e otimização de e-book, garantindo qualidade do conteúdo, estrutura adequada e otimização para conversão.',
    image: '/projects/ebook-review.jpg',
    technologies: ['Content Review', 'Copywriting', 'Content Optimization', 'Conversion Optimization'],
    demo: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Projeto de Indexação em Massa',
    description: 'Implementação de estratégias de indexação em massa para melhorar a visibilidade de múltiplas páginas nos motores de busca simultaneamente.',
    image: '/projects/mass-indexing.jpg',
    technologies: ['Technical SEO', 'Indexação', 'Search Console', 'Site Architecture'],
    demo: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Otimização em Massa com Topic Clusters',
    description: 'Projeto focado em otimização em massa utilizando links internos estratégicos e estrutura de topic clusters para melhorar a autoridade temática.',
    image: '/projects/topic-clusters.jpg',
    technologies: ['Topic Clusters', 'Link Building Interno', 'Content Architecture', 'SEO Strategy'],
    demo: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'Projeto de Parcerias com Blogs',
    description: 'Pesquisa estratégica de palavras-chave em blogs parceiros para estabelecer trocas de links externos de qualidade e aumentar a autoridade do domínio.',
    image: '/projects/blog-partnerships.jpg',
    technologies: ['Link Building', 'Partnership Strategy', 'Keyword Research', 'Outreach'],
    demo: '#',
    featured: false,
  },
]

export const EXPERIENCE = [
  {
    id: 1,
    company: 'EmpresAqui',
    position: 'Analista de SEO Pleno',
    period: '2023 - Atual',
    description: 'Condução de auditorias técnicas e estratégias de SEO on-page e off-page. Planejamento de pautas com base em palavras-chave relevantes. Implementações técnicas para melhoria de Core Web Vitals. Monitoramento de métricas com Google Analytics, Search Console e SEMrush. Estratégias de Link Building e análise da concorrência.',
    technologies: ['SEO Técnico', 'Google Analytics', 'SEMrush', 'Link Building', 'Core Web Vitals'],
  },
  {
    id: 2,
    company: 'Grupo Voitto',
    position: 'Analista de SEO',
    period: '2023',
    description: 'Produção e otimização de artigos para o blog com foco em tráfego orgânico. Criação de titles, meta descriptions e URLs amigáveis. Estratégias de Inbound Marketing (funil de vendas: topo, meio e fundo). Gestão de parceiros (colunistas e guest posts). Produção de copywriting e redação publicitária.',
    technologies: ['Content Marketing', 'Inbound Marketing', 'Copywriting', 'SEO On-Page', 'Guest Posts'],
  },
]

export const CERTIFICATIONS = [
  'Google Analytics Certified',
  'SEMrush SEO Toolkit',
  'HubSpot Inbound Marketing Certification',
  'Growth Marketing Essencial (Conversion)',
  'Fundamentos de CRO (Voitto)',
  'Workshop SEO Técnico & Estratégias de Link Building',
  'Marketing de Conteúdo (Rock University)',
  'Copywriting (Udemy)',
  'Wordpress na Prática (Rock University)',
]

export const WORK_SAMPLES = {
  portuguese: [
    {
      title: 'Mapa de Carreira',
      url: 'https://voitto.com.br/blog/artigo/mapa-de-carreira',
      company: 'Voitto'
    },
    {
      title: 'Matriz de Causa e Efeito',
      url: 'https://voitto.com.br/blog/artigo/matriz-de-causa-e-efeito',
      company: 'Voitto'
    },
    {
      title: 'Curadoria de Conteúdo',
      url: 'https://voitto.com.br/blog/artigo/curadoria-de-conteudo',
      company: 'Voitto'
    },
    {
      title: 'Cultura de Vendas',
      url: 'https://www.empresaqui.com.br/blog/cultura-de-vendas/',
      company: 'EmpresAqui'
    },
    {
      title: 'Como Emitir Nota Fiscal MEI',
      url: 'https://www.empresaqui.com.br/blog/como-emitir-nota-fiscal-mei/',
      company: 'EmpresAqui'
    },
  ],
  english: [
    {
      title: 'Motivating Behavior Change',
      url: 'https://www.thinkleansixsigma.com/article/motivating-behavior-change',
      company: 'Think Lean Six Sigma'
    },
    {
      title: 'KPI',
      url: 'https://www.thinkleansixsigma.com/article/kpi',
      company: 'Think Lean Six Sigma'
    },
    {
      title: 'OneNote',
      url: 'https://www.thinkleansixsigma.com/article/onenote',
      company: 'Think Lean Six Sigma'
    },
    {
      title: 'Collective Creativity',
      url: 'https://www.thinkleansixsigma.com/article/collective-creativity',
      company: 'Think Lean Six Sigma'
    },
    {
      title: 'Emotional Health',
      url: 'https://www.thinkleansixsigma.com/article/emotional-health',
      company: 'Think Lean Six Sigma'
    },
  ]
}

export const CASE_STUDY_RESULTS = [
  {
    metric: 'Tráfego Orgânico',
    before: '5.000',
    after: '15.000',
    improvement: '+200%',
    period: 'visitas mensais'
  },
  {
    metric: 'Palavras-chave na 1ª página',
    before: '3',
    after: '10',
    improvement: '+233%',
    period: 'posições'
  },
  {
    metric: 'Taxa de Conversão',
    before: '2%',
    after: '4%',
    improvement: '+100%',
    period: 'conversões'
  },
  {
    metric: 'Recuperação EmpresAqui',
    before: 'Desindexação',
    after: 'Recuperação',
    improvement: '+59,5%',
    period: 'em 4 meses'
  }
]

export const SERVICES = [
  {
    title: 'Pesquisa de Palavras-chave',
    description: 'Identificação de termos estratégicos com SEMrush, Ahrefs e Google Keyword Planner.',
    icon: 'Search'
  },
  {
    title: 'SEO On-Page',
    description: 'Otimização de títulos, meta descrições, headers, URLs, imagens e Core Web Vitals.',
    icon: 'FileText'
  },
  {
    title: 'SEO Técnico',
    description: 'Ajustes em sitemap, robots.txt, dados estruturados (schema markup), velocidade de carregamento.',
    icon: 'Settings'
  },
  {
    title: 'Link Building',
    description: 'Estratégias para conquistar backlinks relevantes e de qualidade.',
    icon: 'Link'
  },
  {
    title: 'SEO Local',
    description: 'Otimização de Google My Business e buscas geolocalizadas.',
    icon: 'MapPin'
  },
  {
    title: 'Análise da Concorrência',
    description: 'Identificação de oportunidades e benchmarking.',
    icon: 'BarChart'
  },
  {
    title: 'Relatórios e Métricas',
    description: 'Monitoramento de tráfego, rankings e conversões com Google Analytics e Search Console.',
    icon: 'TrendingUp'
  }
]
