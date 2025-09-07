'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, TrendingUp, Target, Award, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { PROJECTS } from '@/lib/constants'

const projectMetrics = {
  1: { increase: '400+', metric: 'Artigos Publicados', period: 'Blog' },
  2: { increase: '100%', metric: 'Páginas Otimizadas', period: 'Desde o Lançamento' },
  3: { increase: '1 E-book', metric: 'Revisão Completa', period: 'Infoproduto' },
  4: { increase: 'Massa', metric: 'Indexação', period: 'Múltiplas Páginas' },
  5: { increase: 'Topic Clusters', metric: 'Otimização', period: 'Links Internos' },
  6: { increase: 'Parcerias', metric: 'Link Building', period: 'Blogs Externos' }
}

export function ProjectsSection() {
  const [activeProject, setActiveProject] = React.useState<number | null>(null)

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-black dark:via-gray-900 dark:to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-gray-800 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Casos de Sucesso
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Projetos que <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Transformaram</span> Negócios
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Cada projeto é uma história de sucesso única, com estratégias personalizadas 
            que geraram resultados mensuráveis e impacto real no crescimento digital.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {PROJECTS.filter(p => p.featured).map((project, index) => {
            const metrics = projectMetrics[project.id as keyof typeof projectMetrics]
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <Card className="h-full overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                  {/* Project Header with Gradient */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl font-bold mb-2 opacity-20">
                          {project.title.split(' ')[0].charAt(0)}
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                          <span className="text-sm font-medium">Caso de Sucesso</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Metrics */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: activeProject === project.id ? 1 : 0,
                        y: activeProject === project.id ? 0 : 20
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 text-center"
                    >
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {metrics.increase}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {metrics.metric}
                      </div>
                    </motion.div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {project.title}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-700 dark:text-primary-300 rounded-full border border-primary-200 dark:border-primary-800"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Results Metrics */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-300">
                          Resultado Alcançado
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                        {metrics.increase}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-500">
                        {metrics.metric} • {metrics.period}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white border-0 shadow-lg hover:shadow-xl group-hover:scale-105 transition-all duration-300"
                      onClick={() => window.open(project.demo, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver Projeto Completo
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Outros Projetos Especializados
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.filter(p => !p.featured).map((project, index) => {
            const metrics = projectMetrics[project.id as keyof typeof projectMetrics]
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-base font-semibold leading-tight">{project.title}</CardTitle>
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <Target className="w-3 h-3" />
                        <span className="text-xs font-medium">{metrics.increase}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-500">
                          +{project.technologies.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {metrics.metric}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {metrics.period}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para Transformar seu Negócio?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Cada projeto é único e merece uma estratégia personalizada. 
              Vamos conversar sobre como posso ajudar você a alcançar resultados similares.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-gradient-to-r from-white/20 to-white/10 border-white/30 text-white hover:from-white/30 hover:to-white/20 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Consultoria Gratuita
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
