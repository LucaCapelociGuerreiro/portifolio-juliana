'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ExternalLink, TrendingUp, Award, FileText } from 'lucide-react'
import { CASE_STUDY_RESULTS, CERTIFICATIONS, WORK_SAMPLES } from '@/lib/constants'

export function ResultsSection() {
  return (
    <section id="results" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resultados & Certificações
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Números que comprovam a eficácia das estratégias de SEO implementadas e 
            certificações que validam minha expertise na área.
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CASE_STUDY_RESULTS.map((result, index) => (
            <motion.div
              key={result.metric}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{result.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {result.before} → {result.after}
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {result.improvement}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {result.period}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary-600" />
                  Certificações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {CERTIFICATIONS.map((cert, index) => (
                    <motion.div
                      key={cert}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">{cert}</span>
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
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-600" />
                  Amostras de Trabalho
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Portuguese Articles */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    🇧🇷 Artigos em Português
                  </h4>
                  <div className="space-y-2">
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
                        className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {sample.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {sample.company}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* English Articles */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    🇺🇸 Artigos em Inglês
                  </h4>
                  <div className="space-y-2">
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
                        className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {sample.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {sample.company}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
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
