export const SITE_CONFIG = {
  name: "Portfolio SEO - Analista de SEO",
  description: "Portfolio profissional de analista de SEO especializado em otimização de sites e crescimento orgânico.",
  author: "Analista SEO",
  url: "https://portfolio-seo.com",
  ogImage: "/images/og-image.jpg",
  keywords: [
    "SEO",
    "Otimização",
    "Marketing Digital",
    "Analytics",
    "Search Engine Optimization",
    "Consultoria SEO",
    "Análise de Site",
    "Performance Web"
  ]
} as const

export const NAVIGATION = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Projetos", href: "/portfolio" },
  { name: "Habilidades", href: "/habilidades" },
  { name: "Certificações", href: "/certificacoes" },
  { name: "Formação", href: "/formacao" },
  { name: "Contato", href: "/contato" }
] as const

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/in/analista-seo",
  twitter: "https://twitter.com/analista_seo",
  github: "https://github.com/analista-seo",
  email: "contato@portfolio-seo.com"
} as const

export const SERVICES = [
  {
    title: "Auditoria SEO",
    description: "Análise completa do site para identificar oportunidades de otimização",
    icon: "search"
  },
  {
    title: "SEO Técnico",
    description: "Otimização de performance, estrutura e crawlability do site",
    icon: "settings"
  },
  {
    title: "SEO de Conteúdo",
    description: "Estratégia e otimização de conteúdo para palavras-chave relevantes",
    icon: "file-text"
  },
  {
    title: "Link Building",
    description: "Construção de autoridade através de backlinks de qualidade",
    icon: "link"
  }
] as const