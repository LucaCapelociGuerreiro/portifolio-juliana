'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CheckCircle, Star } from 'lucide-react'
import { SKILLS } from '@/lib/constants'

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sobre Mim
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sou **Analista de SEO e Criadora de Conteúdo**, com mais de 3 anos de experiência 
            ajudando empresas a aumentarem sua visibilidade nos motores de busca.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Skills - Agora à esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 border-primary-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary-700 dark:text-primary-300">
                  <Star className="w-5 h-5" />
                  Habilidades Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {SKILLS.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* About Text - Agora à direita */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Minha missão é transformar estratégias de SEO em **resultados mensuráveis** — 
                aumentando o tráfego orgânico, melhorando as conversões e gerando oportunidades 
                de negócios. Especialista em **SEO On Page, Off Page e Técnico**, combino 
                criatividade com análise de dados para entregar conteúdos otimizados.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Trabalho com ferramentas como SEMrush, Ahrefs, Google Analytics e Search Console 
                para identificar oportunidades, monitorar performance e implementar estratégias 
                que engajam o público e conquistam melhores posições no Google.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Tenho experiência comprovada em recuperação de tráfego orgânico, SEO local, 
                link building e criação de conteúdo otimizado tanto em português quanto em inglês. 
                Meus projetos já resultaram em aumentos de até 200% no tráfego orgânico.
              </p>

              {/* Destaque com estatísticas */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">3+</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Anos de Experiência</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">200%</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Aumento Máximo</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
