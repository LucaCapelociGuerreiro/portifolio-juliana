'use client';

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Certifications from './components/Certifications';
import { useLanguage } from './context/LanguageContext';

// Lazy loading para componentes pesados
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));

function ServicesSection() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const services = [
    {
      title: 'Pesquisa de Palavras-chave',
      description: 'Uso de Google Keyword Planner, SEMrush e Ahrefs para identificar oportunidades com volume e intenção.',
      icon: '🔍'
    },
    {
      title: 'Otimização On-Page',
      description: 'Títulos, metas, headings, URLs, conteúdo, UX e performance (Core Web Vitals).',
      icon: '📄'
    },
    {
      title: 'SEO Técnico',
      description: 'Sitemap, robots.txt, schema, correção de erros de rastreamento e mobile.',
      icon: '⚙️'
    },
    {
      title: 'Link Building',
      description: 'Estratégias de backlinks naturais e de qualidade com parcerias relevantes.',
      icon: '🔗'
    },
    {
      title: 'SEO Local',
      description: 'Google My Business, otimizações locais e destaque nas buscas por região.',
      icon: '📍'
    },
    {
      title: 'Análise de Competidores e Relatórios',
      description: 'GA, GSC e SEMrush para acompanhar tráfego, posições e ROI.',
      icon: '📊'
    }
  ];

  // Auto-rotate carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(interval);
  }, [services.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="services" className="py-20 bg-section-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t('services.title')}</h2>
          <p className="text-xl text-section-secondary max-w-2xl mx-auto">
            Serviços especializados para impulsionar sua presença digital
          </p>
        </motion.div>

        {/* Carousel Container */}
         <div className="relative max-w-7xl mx-auto">
           {/* Main Carousel */}
           <div className="relative overflow-hidden">
             <motion.div
               className="flex transition-transform duration-500 ease-in-out"
               animate={{ x: `${-currentSlide * (100 / 3)}%` }}
               transition={{ duration: 0.5 }}
             >
               {/* Serviços originais + duplicados para loop infinito */}
               {[...services, ...services.slice(0, 3)].map((service, index) => (
                 <motion.div
                   key={`service-${index}`}
                   className="w-1/3 flex-shrink-0 px-3"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: (index % services.length) * 0.1 }}
                   viewport={{ once: true }}
                 >
                   <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl p-6 h-80 flex flex-col justify-center items-center text-center border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                     <div className="text-4xl mb-4">{service.icon}</div>
                     <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                     <p className="text-sm text-gray-300 leading-relaxed">
                       {service.description}
                     </p>
                   </div>
                 </motion.div>
               ))}
             </motion.div>
           </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
            aria-label="Serviço anterior"
          >
            <svg className="w-6 h-6 text-white group-hover:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
            aria-label="Próximo serviço"
          >
            <svg className="w-6 h-6 text-white group-hover:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
           <div className="flex justify-center mt-8 space-x-2">
             {services.map((_, index) => (
               <button
                 key={index}
                 onClick={() => goToSlide(index)}
                 className={`w-3 h-3 rounded-full transition-all duration-200 ${
                   index === currentSlide 
                     ? 'bg-purple-500 scale-125' 
                     : 'bg-gray-400 hover:bg-gray-300'
                 }`}
                 aria-label={`Ir para serviço ${index + 1}`}
               />
             ))}
           </div>

          {/* Progress Bar */}
           <div className="mt-6 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
             <motion.div
               className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
               initial={{ width: '0%' }}
               animate={{ width: `${((currentSlide + 1) / services.length) * 100}%` }}
               transition={{ duration: 0.3 }}
             />
          </div>
        </div>

        {/* Mobile Version - 2 columns */}
        <div className="md:hidden mt-12 grid grid-cols-2 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-white">{service.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const items = [
    { label: 'Tráfego Orgânico (mensal)', before: '5.000', after: '15.000' },
    { label: 'Palavras-chave na 1ª página', before: '3', after: '10' },
    { label: 'Taxa de Conversão', before: '2%', after: '4%' },
  ];
  return (
    <section id="results" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10">Resultados (Antes e Depois)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
              <h3 className="text-lg font-semibold mb-3">{it.label}</h3>
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-gray-500">Antes</div>
                  <div className="text-2xl font-bold">{it.before}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Depois</div>
                  <div className="text-2xl font-bold text-purple-500">{it.after}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SamplesSection() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const portugueseSamples = [
    {
      title: 'O que é um CTO',
      url: 'https://www.empresaqui.com.br/blog/cto/',
      category: 'Tecnologia'
    },
    {
      title: 'Como Vender Serviços de Contabilidade',
      url: 'https://www.empresaqui.com.br/blog/como-vender-servicos-de-contabilidade/',
      category: 'Vendas'
    },
    {
      title: 'Cultura de Vendas',
      url: 'https://www.empresaqui.com.br/blog/cultura-de-vendas/',
      category: 'Vendas'
    },
    {
      title: 'Captação de Leads',
      url: 'https://www.empresaqui.com.br/blog/captacao-de-leads/',
      category: 'Marketing'
    },
    {
      title: 'Como Emitir Nota Fiscal MEI',
      url: 'https://www.empresaqui.com.br/blog/como-emitir-nota-fiscal-mei/',
      category: 'Fiscal'
    },
    {
      title: 'Mapa de Carreira',
      url: 'https://voitto.com.br/blog/artigo/mapa-de-carreira',
      category: 'Carreira'
    },
    {
      title: 'Matriz de Causa e Efeito',
      url: 'https://voitto.com.br/blog/artigo/matriz-de-causa-e-efeito',
      category: 'Análise'
    },
    {
      title: 'Ferramentas da Criatividade',
      url: 'https://voitto.com.br/blog/artigo/ferramentas-da-criatividade',
      category: 'Criatividade'
    },
    {
      title: 'Curadoria de Conteúdo',
      url: 'https://voitto.com.br/blog/artigo/curadoria-de-conteudo',
      category: 'Conteúdo'
    },
    {
      title: 'O que é Clickbait',
      url: 'https://voitto.com.br/blog/artigo/o-que-e-clickbait',
      category: 'Marketing'
    }
  ];

  const englishSamples = [
    {
      title: 'Motivating Behavior Change',
      url: 'https://www.thinkleansixsigma.com/article/motivating-behavior-change',
      category: 'Leadership'
    },
    {
      title: 'KPI - Key Performance Indicators',
      url: 'https://www.thinkleansixsigma.com/article/kpi',
      category: 'Analytics'
    },
    {
      title: 'OneNote Organization Tool',
      url: 'https://www.thinkleansixsigma.com/article/onenote',
      category: 'Productivity'
    },
    {
      title: 'Collective Creativity Management',
      url: 'https://www.thinkleansixsigma.com/article/collective-creativity',
      category: 'Innovation'
    },
    {
      title: 'Emotional Health at Work',
      url: 'https://www.thinkleansixsigma.com/article/emotional-health',
      category: 'Wellness'
    },
    {
      title: 'Understanding Emotions',
      url: 'https://www.thinkleansixsigma.com/article/emotions',
      category: 'Psychology'
    },
    {
      title: 'B2B Marketing Strategies',
      url: 'https://www.thinkleansixsigma.com/article/marketing-b2b',
      category: 'Marketing'
    },
    {
      title: 'Good Time Management',
      url: 'https://www.thinkleansixsigma.com/article/good-time-management',
      category: 'Productivity'
    }
  ];

  const slides = [
    { title: t('samples.portuguese'), samples: portugueseSamples, buttonText: t('samples.verArtigo') },
    { title: t('samples.english'), samples: englishSamples, buttonText: t('samples.viewArticle') }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  return (
    <section id="samples" className="py-20 bg-section-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-400 dark:to-purple-600">
              {t('samples.title')}
            </span>
          </h2>
          <p className="text-lg text-section-secondary">
            {t('samples.subtitle')}
          </p>
        </motion.div>
        
        {/* Carousel Navigation */}
        <div className="flex justify-center items-center mb-8">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/60 transition-colors mr-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? 'bg-purple-600 dark:bg-purple-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/60 transition-colors ml-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Carousel Content */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <h3 className="text-2xl font-bold mb-6 text-center text-purple-600 dark:text-purple-400">
                  {slide.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {slide.samples.map((sample, index) => (
                    <motion.a
                      key={sample.title}
                      href={sample.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group p-6 block"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                          {sample.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {sample.title}
                      </h4>
                      <div className="mt-3 flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium">
                        {slide.buttonText}
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Componente de loading para Suspense
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="rounded-full h-8 w-8 border-b-2 border-purple-500 animate-spin"></div>
    <span className="ml-2 text-gray-600 dark:text-gray-300">Carregando...</span>
  </div>
);

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ServicesSection />
      <Suspense fallback={<LoadingSpinner />}>
        <Projects />
      </Suspense>
      <ResultsSection />
      <Skills />
      <Certifications />
      <Suspense fallback={<LoadingSpinner />}>
        <Education />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Experience />
      </Suspense>
      <SamplesSection />
      <Contact />

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-center text-white">
        <p className="text-sm">
          © {new Date().getFullYear()} Juliana<span className="text-purple-400">.portfolio</span>. {t('footer.rights')}
        </p>
      </footer>
    </main>
  );
}