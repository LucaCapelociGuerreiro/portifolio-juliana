'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Award, ExternalLink } from 'lucide-react';

const certifications = [
  {
    title: 'Crafting a Winning SEO Strategy: A Guide for In-House Marketers',
    institution: 'Semrush',
    category: 'SEO Strategy'
  },
  {
    title: 'Growth Marketing Essencial',
    institution: 'Conversion',
    category: 'Growth Marketing'
  },
  {
    title: 'Fundamentos de CRO',
    institution: 'Voitto',
    category: 'Conversion Optimization'
  },
  {
    title: 'Métricas de SEO',
    institution: 'Conversion',
    category: 'SEO Analytics'
  },
  {
    title: 'Workshop SEO Técnico',
    institution: 'Conversion',
    category: 'Technical SEO'
  },
  {
    title: 'Formação em SEO',
    institution: 'Voitto',
    category: 'SEO Foundation'
  },
  {
    title: 'Workshop Estratégias de Link Building',
    institution: 'Conversion',
    category: 'Link Building'
  },
  {
    title: 'Copywriting',
    institution: 'Udemy',
    category: 'Content Writing'
  },
  {
    title: 'Marketing de Conteúdo',
    institution: 'Rock University',
    category: 'Content Marketing'
  },
  {
    title: 'Wordpress na Prática',
    institution: 'Rock University',
    category: 'CMS'
  },
  {
    title: 'Produção de conteúdo para Web',
    institution: 'Rock University',
    category: 'Content Production'
  },
  {
    title: 'Revisão de conteúdo para Web',
    institution: 'Rock University',
    category: 'Content Review'
  }
];

const Certifications = () => {
  const { t } = useLanguage();
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      id="certifications"
      className="py-20 bg-section-primary"
      aria-labelledby="certifications-heading"
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
          <h2 id="certifications-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500">
              {t('certifications.title')}
            </span>
          </h2>
          <p className="text-lg text-section-primary max-w-3xl mx-auto">
            {t('certifications.subtitle')}
          </p>
        </motion.div>

        {/* Grid de Certificações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={`${cert.title}-${cert.institution}`}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={prefersReducedMotion ? {} : { y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transition-all"
              role="article"
              aria-labelledby={`cert-${index}`}
            >
              <div className="flex items-start mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-3 text-purple-600 dark:text-purple-400 flex-shrink-0" aria-hidden="true">
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 id={`cert-${index}`} className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {cert.title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {cert.institution}
                    </p>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full w-fit">
                      {cert.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;