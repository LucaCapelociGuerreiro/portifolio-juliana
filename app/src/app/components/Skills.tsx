'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import { BarChart2, Search, Link2, Activity, FileText } from 'lucide-react';

// Definição das ferramentas de SEO
const skillCategories = [
  {
    title: 'Análise e Métricas',
    icon: <BarChart2 aria-label="Análise e Métricas" className="w-6 h-6" />,
    skills: [
      { name: 'Google Analytics', logo: '/skills/google-analytics.svg' },
      { name: 'Google Search Console', logo: '/skills/google-search-console.svg' },
      { name: 'WebPageTest', logo: '/skills/webpagetest.svg' },
      { name: 'Core Web Vitals', logo: '/skills/core-web-vitals.svg' },
    ],
  },
  {
    title: 'Pesquisa & Auditoria',
    icon: <Search aria-label="Pesquisa & Auditoria" className="w-6 h-6" />,
    skills: [
      { name: 'SEMrush', logo: '/skills/semrush.svg' },
      { name: 'Ahrefs', logo: '/skills/ahrefs.svg' },
      { name: 'Screaming Frog', logo: '/skills/screaming-frog.svg' },
      { name: 'Keyword Planner', logo: '/skills/keyword-planner.svg' },
    ],
  },
  {
    title: 'Produção de conteúdo',
    icon: <FileText aria-label="Produção de conteúdo" className="w-6 h-6" />,
    skills: [
      { name: 'Redação SEO', logo: '/skills/redacao-seo.svg' },
      { name: 'Content Strategy', logo: '/skills/content-strategy.svg' },
      { name: 'Copywriting', logo: '/skills/copywriting.svg' },
    ],
  },
];

// Componente para exibir a barra de item
const SkillItem = ({ name, logo }: { name: string; logo: string }) => {
  return (
    <div className="mb-4" role="listitem">
      <div className="flex items-center">
        <div className="relative w-8 h-8 mr-3 flex-shrink-0" aria-hidden="true">
          <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900/30 rounded-md flex items-center justify-center overflow-hidden">
            {logo ? (
              <Image
                src={logo}
                alt=""
                width={24}
                height={24}
                className="object-contain"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.insertAdjacentHTML(
                    'afterend',
                    `<span class="text-xs font-bold text-purple-700 dark:text-purple-300" aria-hidden="true">${name.substring(0, 2)}</span>`
                  );
                }}
              />
            ) : (
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300" aria-hidden="true">{name.substring(0, 2)}</span>
            )}
          </div>
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
      </div>
    </div>
  );
};

const Skills = () => {
  const { t } = useLanguage();
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      id="skills"
      className="py-20 bg-section-secondary"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500">
              {t('skills.title')}
            </span>
          </h2>
          <p className="text-lg text-section-secondary max-w-3xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={prefersReducedMotion ? {} : { y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transition-all"
              role="article"
              aria-labelledby={`skill-category-${index}`}
            >
              <div className="flex items-center mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-3 text-purple-600 dark:text-purple-400" aria-hidden="true">
                  {category.icon}
                </div>
                <h3 id={`skill-category-${index}`} className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-600 dark:from-purple-400 dark:to-purple-400">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-1" role="list" aria-label={`Ferramentas de ${category.title}`}>
                {category.skills.map((skill) => (
                  <SkillItem key={skill.name} name={skill.name} logo={skill.logo} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
