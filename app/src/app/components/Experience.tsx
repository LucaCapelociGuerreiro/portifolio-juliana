'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ExperienceItem from './ExperienceItem';

const experiences = [
  {
    title: 'Analista de SEO Pleno',
    company: 'EmpresAqui',
    location: 'Tempo integral',
    period: 'jul de 2025 - o momento · 2 meses',
    bullets: [
      'Análise e auditoria de SEO on-page e off-page - Revisão de títulos, meta descrições, headers, URLs, etc.',
      'Verificação de backlinks e qualidade de domínios de referência',
      'Monitoramento de métricas e KPIs - Acompanhamento de tráfego orgânico, CTR, posição média, taxa de rejeição',
      'Uso de ferramentas de SEO - Domínio de plataformas como SEMrush, Ahrefs, Screaming Frog, Moz, Google Search Console, Google Analytics',
      'Planejamento e otimização de conteúdo - Definição de pautas com base em palavras-chave relevantes',
      'Pesquisa de palavras-chave - Identificação de oportunidades e análise de intenção de busca',
      'Implementações técnicas de SEO - Colaboração com desenvolvedores para ajustes em sitemap, robots.txt, velocidade de carregamento',
      'Estratégias de link building - Planejamento e execução de ações para aquisição de backlinks de qualidade',
      'Acompanhamento da concorrência - Análise de SEO dos concorrentes e identificação de oportunidades',
      'Criação e apresentação de relatórios - Geração de insights e recomendações com base nos dados coletados',
      'Colaboração com equipes multidisciplinares - Integração com times de marketing, produto, desenvolvimento e conteúdo'
    ],
    tags: ['SEMrush', 'Ahrefs', 'Screaming Frog', 'Moz', 'GSC', 'GA', 'Schema Markup', 'Link Building'],
  },
  {
    title: 'Analista de SEO Júnior',
    company: 'EmpresAqui',
    location: 'Remota',
    period: 'out de 2023 - jul de 2025 · 1 ano 10 meses',
    bullets: [
      'Pesquisa de palavras-chave',
      'Análise de concorrentes',
      'Otimizações On Page (Title, Description, Imagens, URLs, Headings, Linkagem interna)',
      'Criação de briefings de redação, revisão e acompanhamento de entregas de redatores',
      'Rotina de auditorias de SEO (Screaming Frog, GSC, SEMrush)',
      'Análise, definição e acompanhamento de links para Linkbuilding',
      'Otimizações de Landing Pages',
      'Criação de páginas com foco em gerar cadastros e potencializar vendas',
      'Auxilio na estratégia conjunta de produção de conteúdo focada em SEO, Youtube e Social Media',
      'Otimizações de SEO para YouTube',
      'Criação e otimização de SEO para e-mail marketing'
    ],
    tags: ['SEO', 'WordPress', 'YouTube SEO', 'Email Marketing', 'Landing Pages', 'Content Strategy'],
  },
  {
    title: 'Analista de SEO Júnior',
    company: 'Grupo Voitto',
    location: 'Brasil · Remota',
    period: 'mar de 2023 - ago de 2023 · 6 meses',
    bullets: [
      'Produção e otimização de artigos no setor de Artigos & SEO',
      'Desenvolvimento de estratégias de pautas de conteúdo com objetivo de desenvolver conteúdo de valor',
      'Geração de tráfego orgânico através de técnicas de SEO',
      'Trabalho com técnicas de tecnologia e autoridade para alcançar bom posicionamento',
      'Aumento do ranqueamento de páginas no Google e outros buscadores',
      'Redação para SEO com foco em técnicas para blogs'
    ],
    tags: ['Redação', 'Desenvolvimento de conteúdo', 'SEO Técnico', 'Content Marketing', 'Blog SEO'],
  },
];

export default function Experience() {
  const { t } = useLanguage();
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section id="experience" className="py-20 bg-section-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              {t('experience.title', { defaultValue: 'Experiência' })}
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {t('experience.subtitle', { defaultValue: 'Minha trajetória profissional e projetos' })}
          </p>
        </motion.div>

        <div className="relative pl-8 max-w-4xl mx-auto">
          {/* Linha vertical da timeline */}
          <motion.div 
            initial={prefersReducedMotion ? {} : { height: 0 }}
            whileInView={prefersReducedMotion ? {} : { height: '100%' }}
            transition={prefersReducedMotion ? {} : { duration: 1.5 }}
            viewport={{ once: true }}
            className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-400 to-purple-600" 
          />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={prefersReducedMotion ? {} : { duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <ExperienceItem {...exp} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
