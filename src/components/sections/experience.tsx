'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ExternalLink, Award, FileText, CheckCircle, Star, Globe } from 'lucide-react'
import { EXPERIENCE, CERTIFICATIONS, WORK_SAMPLES } from '@/lib/constants'

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Experience Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experiência & Qualificações
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Minha trajetória profissional, certificações e amostras de trabalho que 
            demonstram expertise e resultados comprovados em SEO e Marketing Digital.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Trajetória Profissional
            </h3>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500"></div>

            <div className="space-y-12">
              {EXPERIENCE.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative flex items-start"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full border-4 border-white dark:border-black shadow-lg"></div>

                  {/* Content */}
                  <div className="ml-16 flex-1">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <CardTitle className="text-xl">{exp.position}</CardTitle>
                            <CardDescription className="text-lg font-medium text-primary-600 dark:text-primary-400">
                              {exp.company}
                            </CardDescription>
                          </div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                            {exp.period}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full border border-primary-200 dark:border-primary-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Work Samples Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-yellow-800 dark:text-yellow-300">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Award className="w-6 h-6" />
                  </div>
                  Certificações Profissionais
                </CardTitle>
                <CardDescription className="text-yellow-700 dark:text-yellow-400">
                  Qualificações que validam minha expertise em SEO e Marketing Digital
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {CERTIFICATIONS.map((cert, index) => (
                    <motion.div
                      key={cert}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-4 bg-white/80 dark:bg-gray-800/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {cert}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Work Samples */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-800 dark:text-blue-300">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FileText className="w-6 h-6" />
                  </div>
                  Amostras de Trabalho
                </CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-400">
                  Exemplos práticos do meu trabalho em SEO e criação de conteúdo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Portuguese Articles */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-600" />
                    🇧🇷 Artigos em Português
                  </h4>
                  <div className="space-y-3">
                    {WORK_SAMPLES.portuguese.map((sample, index) => (
                      <motion.a
                        key={sample.title}
                        href={sample.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between p-3 bg-white/80 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 group shadow-sm hover:shadow-md"
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {sample.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {sample.company}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* English Articles */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    🇺🇸 Artigos em Inglês
                  </h4>
                  <div className="space-y-3">
                    {WORK_SAMPLES.english.map((sample, index) => (
                      <motion.a
                        key={sample.title}
                        href={sample.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between p-3 bg-white/80 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 group shadow-sm hover:shadow-md"
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {sample.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {sample.company}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
