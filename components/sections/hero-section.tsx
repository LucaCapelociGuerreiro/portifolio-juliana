"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Search, BarChart3, Shield, TrendingUp, Sparkles, Code, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/90" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto min-h-[80vh]">
          
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8 lg:space-y-10 order-2 lg:order-1"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary">Disponível para novos projetos</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-green-500/20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-400">+95% Taxa de Sucesso</span>
              </div>
            </motion.div>

            {/* Main heading with gradient */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl elegant-heading text-foreground"
              >
                Olá, eu sou{" "}
                <span className="shine-animation block mt-2">
                  Juliana Silva
                </span>
                <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 text-foreground/90 font-light">
                  Rodrigues
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap gap-2 text-xl md:text-2xl text-muted-foreground"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-6 h-6 text-primary" />
                  SEO Expert
                </span>
                <span className="text-muted-foreground/50">|</span>
                <span className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  Performance
                </span>
                <span className="text-muted-foreground/50">|</span>
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Growth
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl elegant-text text-muted-foreground max-w-2xl"
            >
              Transformo sites em <span className="text-primary font-semibold">máquinas de conversão</span> através de 
              estratégias avançadas de SEO, otimização técnica e análise de performance. 
              Especializada em <span className="text-gradient font-semibold">resultados mensuráveis</span> e crescimento sustentável.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="text-lg px-8 py-6 pulse-glow group relative overflow-hidden">
                <Link href="/contato">
                  <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                  Vamos Conversar
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shimmer_0.6s_ease-out]" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 glass-effect border-primary/30 hover:border-primary/50">
                <Link href="/portfolio">
                  <Code className="mr-2 h-5 w-5" />
                  Ver Projetos
                </Link>
              </Button>
            </motion.div>

            {/* Enhanced Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid grid-cols-2 gap-4 pt-8"
            >
              {[
                { icon: Search, label: "SEO Técnico", desc: "Otimização avançada" },
                { icon: BarChart3, label: "Analytics", desc: "Dados e insights" },
                { icon: TrendingUp, label: "Growth", desc: "Crescimento orgânico" },
                { icon: Shield, label: "Security", desc: "Sites seguros" },
              ].map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="glass-effect rounded-xl p-4 border border-primary/20 card-hover group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <skill.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{skill.label}</h3>
                      <p className="text-sm text-muted-foreground">{skill.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - Enhanced Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center lg:justify-end relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main profile circle */}
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent p-1 glow-purple">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-card to-card/50 flex items-center justify-center glass-effect border border-primary/30 overflow-hidden">
                  {/* Professional avatar */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative">
                    <Image
                      src="/images/profile-avatar.svg"
                      alt="Juliana Silva Rodrigues - SEO Expert"
                      width={240}
                      height={240}
                      className="w-full h-full object-cover rounded-full"
                      priority
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-8 -right-8 w-16 h-16 rounded-full glass-effect border border-primary/30 flex items-center justify-center floating-animation"
              >
                <Search className="w-8 h-8 text-primary" />
              </motion.div>
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-8 w-20 h-20 rounded-full glass-effect border border-primary/30 flex items-center justify-center floating-animation"
              >
                <TrendingUp className="w-10 h-10 text-primary" />
              </motion.div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -right-12 w-12 h-12 rounded-full glass-effect border border-primary/30 flex items-center justify-center floating-animation"
              >
                <BarChart3 className="w-6 h-6 text-primary" />
              </motion.div>

              {/* Background glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-3xl -z-10 animate-pulse" />
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-2xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced background decorations */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/4 right-1/6 w-96 h-96 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-gradient-to-l from-primary/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" />
        
        {/* Animated particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  )
}