'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const { t } = useLanguage();
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const education = [
    {
      degree: t('education.tiradentes.degree'),
      institution: t('education.tiradentes.institution'),
      period: t('education.tiradentes.period'),
      description: '',
      isPostGrad: false
    },
    {
      degree: t('education.uninter.degree'),
      institution: t('education.uninter.institution'),
      period: t('education.uninter.period'),
      description: '',
      isPostGrad: true
    },
    {
      degree: t('education.uninter2.degree'),
      institution: t('education.uninter2.institution'),
      period: t('education.uninter2.period'),
      description: '',
      isPostGrad: true
    }
  ];

  return (
    <section id="education" className="py-20 bg-section-primary">
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
              {t('education.title')}
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {t('education.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 hover:border-purple-500 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <GraduationCap className="w-6 h-6 text-purple-400 mr-2" />
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                  </div>
                  <p className="text-gray-400">{edu.institution}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{edu.period}</span>
                  </div>
                </div>
              </div>
              {edu.description && (
                <p className="text-gray-300">{edu.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
