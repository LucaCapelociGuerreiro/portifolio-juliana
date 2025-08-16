'use client';

import { motion } from 'framer-motion';
import { LineChart, MapPin } from 'lucide-react';

const projects = [
  {
    title: 'Estudo de Caso: Aumento de Tráfego Orgânico – EmpresAqui',
    description:
      'Desafio: Queda significativa no tráfego orgânico devido à desindexação em massa. Solução: Auditoria técnica completa, otimização para palavras-chave principais e fortalecimento das linkagens internas priorizando leitura por robôs do Google. Resultado: +59,5% de tráfego orgânico em 4 meses e melhora no ranking para termos de alto valor.',
    icon: LineChart,
    tags: ['SEO Técnico', 'On-Page', 'Linkagem Interna', 'Recuperação de Desindexação'],
  },
  {
    title: 'Estudo de Caso: SEO Local – Blog EmpresAqui',
    description:
      'Desafio: Ausência nas buscas locais. Solução: Otimização do Google My Business e ajustes on-page direcionados ao SEO local. Resultado: aumento expressivo de tráfego local e presença no topo das buscas locais para termos relevantes.',
    icon: MapPin,
    tags: ['SEO Local', 'Google My Business', 'On-Page', 'Estratégia Local'],
  },
];

const Projects = () => {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section id="projects" className="py-20 bg-section-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? {} : { duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-400 dark:to-purple-600">
              Projetos em Destaque
            </span>
          </h2>
          <p className="text-lg text-section-secondary">
            Estudos de caso e resultados mensuráveis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <project.icon aria-hidden className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                <h3 className="text-xl font-semibold">{project.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
