'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt';

interface TranslationOptions {
  defaultValue?: string;
  [key: string]: string | undefined;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: TranslationOptions) => string;
}

const translations = {
  en: {
    // Hero Section
    'hero.greeting': 'Hi, I\'m',
    'hero.name': 'Juliana Nascimento.',
    'hero.title': 'SEO Analyst',
    'hero.description': 'SEO analyst with 3+ years of experience helping companies improve search visibility. I turn SEO strategies into measurable results, driving organic traffic, improving conversions, and generating business opportunities.',
    'hero.contact': 'Contact Me',
    'hero.projects': 'View Projects',

    // Services
    'services.title': 'Services',
    'results.title': 'Results',
    'blog.title': 'Blog',
    
    // Skills
    'skills.cloudArchitecture': 'SEO Tech',
    'skills.devops': 'SEO On Page',
    'skills.infrastructure': 'SEO Off Page',
    'skills.security': 'Growth Marketing',
    'skills.content': 'Content Production',
    'skills.title': 'Tools',
    'skills.subtitle': 'Main tools I use in SEO and analytics',

    // Certifications
    'certifications.title': 'Certifications',
    'certifications.subtitle': 'Professional credentials and specializations in SEO, digital marketing and content production',

    // Samples
    'samples.title': 'Samples of My Work',
    'samples.subtitle': 'Below are a few examples of my work that showcase my ability to create SEO-optimized content that ranks',
    'samples.portuguese': 'Portuguese',
    'samples.english': 'English',
    'samples.viewArticle': 'View Article',
    'samples.verArtigo': 'Ver Artigo',

    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': 'Case studies and measurable results',
    'projects.viewLive': 'View Live',
    'projects.viewCode': 'View Code',

    // Education
    'education.title': 'Education',
    'education.subtitle': 'Academic background and qualifications',
    'education.uninter.degree': 'Post-graduation in Management, Digital Marketing and Leadership',
    'education.uninter.institution': 'Universidade UNINTER',
    'education.uninter.period': 'Completed',
    'education.uninter2.degree': 'Post-graduation in Strategic Marketing Planning and Management',
    'education.uninter2.institution': 'Universidade UNINTER',
    'education.uninter2.period': 'In Progress',
    'education.tiradentes.degree': 'Bachelor\'s degree in Social Communication - Advertising and Propaganda',
    'education.tiradentes.institution': 'Universidade Tiradentes',
    'education.tiradentes.period': 'Completed',
    'education.tiradentes.skills': '',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Ready to improve your online presence? Let\'s talk!',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    
    // Footer
    'footer.rights': 'All rights reserved.',

    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Tools',
    'nav.contact': 'Contact',
    'nav.certifications': 'Certifications',
    'nav.education': 'Education',
    'nav.services': 'Services',
    'nav.results': 'Results',
    'nav.blog': 'Blog',
  },
  pt: {
    // Hero Section
    'hero.greeting': 'Olá, eu sou',
    'hero.name': 'Juliana Nascimento.',
    'hero.title': 'Analista de SEO',
    'hero.description': 'Analista de SEO com mais de 3 anos de experiência ajudando empresas a melhorarem sua visibilidade nos motores de busca. Minha paixão é transformar estratégias de SEO em resultados mensuráveis, aumentando o tráfego orgânico, melhorando as conversões e gerando mais oportunidades de negócios.',
    'hero.contact': 'Contate-me',
    'hero.projects': 'Ver Projetos',

    // Services
    'services.title': 'Serviços',
    'results.title': 'Resultados',
    'blog.title': 'Blog',
    
    // Skills
    'skills.cloudArchitecture': 'SEO Tech',
    'skills.devops': 'SEO On Page',
    'skills.infrastructure': 'SEO Off Page',
    'skills.security': 'Growth Marketing',
    'skills.content': 'Produção de conteudo',
    'skills.title': 'Ferramentas',
    'skills.subtitle': 'Principais ferramentas que utilizo em SEO e analytics',

    // Certifications
    'certifications.title': 'Certificações',
    'certifications.subtitle': 'Credenciais e especializações em SEO, marketing digital e produção de conteúdo',

    // Samples
    'samples.title': 'Amostras do Meu Trabalho',
    'samples.subtitle': 'Abaixo estão alguns exemplos do meu trabalho que demonstram minha capacidade de criar conteúdo otimizado para SEO que rankeia',
    'samples.portuguese': 'Português',
    'samples.english': 'Inglês',
    'samples.viewArticle': 'View Article',
    'samples.verArtigo': 'Ver Artigo',

    // Projects
    'projects.title': 'Projetos',
    'projects.subtitle': 'Estudos de caso e resultados mensuráveis',
    'projects.viewLive': 'Ver Demo',
    'projects.viewCode': 'Ver Código',

    // Education
    'education.title': 'Educação',
    'education.subtitle': 'Minha formação e qualificações acadêmicas',
    'education.uninter.degree': 'Pós graduada em Gestão, Marketing Digital e Liderança',
    'education.uninter.institution': 'Universidade UNINTER',
    'education.uninter.period': 'Concluída',
    'education.uninter2.degree': 'Pós graduanda em Planejamento e Gestão Estratégica de Marketing',
    'education.uninter2.institution': 'Universidade UNINTER',
    'education.uninter2.period': 'Em andamento',
    'education.tiradentes.degree': 'Graduada em Comunicação Social - Publicidade e Propaganda',
    'education.tiradentes.institution': 'Universidade Tiradentes',
    'education.tiradentes.period': 'Concluída',
    'education.tiradentes.skills': '',

    // Contact
    'contact.title': 'Entre em Contato',
    'contact.subtitle': 'Pronto para melhorar sua presença online? Vamos conversar!',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    
    // Footer
    'footer.rights': 'Todos os direitos reservados.',

    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.skills': 'Ferramentas',
    'nav.contact': 'Contato',
    'nav.certifications': 'Certificações',
    'nav.education': 'Formação',
    'nav.services': 'Serviços',
    'nav.results': 'Resultados',
    'nav.blog': 'Blog',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string, options?: TranslationOptions): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    
    if (!translation && options?.defaultValue) {
      return options.defaultValue;
    }
    
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}