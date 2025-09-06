import { SITE_CONFIG, SOCIAL_LINKS } from './constants'

export const getPersonStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Especialista em SEO",
  "jobTitle": "SEO Specialist & Digital Marketing Consultant", 
  "description": SITE_CONFIG.description,
  "url": SITE_CONFIG.url,
  "image": `${SITE_CONFIG.url}/images/profile.jpg`,
  "email": SOCIAL_LINKS.email,
  "sameAs": [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.twitter,
    SOCIAL_LINKS.github
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "SEO Portfolio"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "São Paulo",
    "addressCountry": "BR"
  },
  "knowsAbout": [
    "Search Engine Optimization",
    "Technical SEO",
    "Content Marketing",
    "Digital Marketing",
    "Google Analytics",
    "Link Building"
  ]
})

export const getOrganizationStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SITE_CONFIG.name,
  "description": SITE_CONFIG.description,
  "url": SITE_CONFIG.url,
  "logo": `${SITE_CONFIG.url}/images/logo.png`,
  "image": `${SITE_CONFIG.url}/images/og-image.jpg`,
  "email": SOCIAL_LINKS.email,
  "sameAs": [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.twitter,
    SOCIAL_LINKS.github
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-99999-9999",
    "contactType": "customer service",
    "availableLanguage": ["Portuguese", "English"]
  },
  "foundingDate": "2019",
  "founder": {
    "@type": "Person",
    "name": "Especialista em SEO"
  },
  "serviceArea": {
    "@type": "Country",
    "name": "Brazil"
  }
})

export const getServiceStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Consultoria em SEO",
  "description": "Serviços especializados de SEO para aumentar tráfego orgânico e melhorar rankings nos mecanismos de busca",
  "provider": {
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url
  },
  "areaServed": {
    "@type": "Country",
    "name": "Brazil"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços de SEO",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Auditoria SEO",
          "description": "Análise completa do site para identificar oportunidades de otimização"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "SEO Técnico",
          "description": "Otimização de performance, estrutura e crawlability do site"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "SEO de Conteúdo",
          "description": "Estratégia e otimização de conteúdo para palavras-chave relevantes"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Link Building", 
          "description": "Construção de autoridade através de backlinks de qualidade"
        }
      }
    ]
  }
})

export const getBreadcrumbStructuredData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})