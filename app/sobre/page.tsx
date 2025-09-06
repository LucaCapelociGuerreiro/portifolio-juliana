import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Award, Users, TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça minha trajetória profissional e expertise em SEO. Mais de 5 anos de experiência ajudando empresas a crescer online.",
}

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/20" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Olá, sou Especialista em SEO
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Transformo sites em ferramentas de crescimento através de estratégias 
          de SEO baseadas em dados e resultados comprovados.
        </p>
        <Button asChild>
          <Link href="/contato" className="inline-flex items-center">
            Vamos Conversar
            <Calendar className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="text-center">
          <CardHeader>
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold">5+</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Anos de Experiência</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader>
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold">50+</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Projetos Concluídos</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader>
            <Award className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold">200%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Aumento Médio de Tráfego</p>
          </CardContent>
        </Card>
      </div>

      {/* About Content */}
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Minha História</h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-muted-foreground mb-4">
              Comecei minha jornada no marketing digital há mais de 5 anos, 
              fascinado pela possibilidade de ajudar empresas a serem encontradas 
              online pelos seus clientes ideais.
            </p>
            <p className="text-muted-foreground mb-4">
              Ao longo dos anos, especializei-me em SEO técnico e estratégico, 
              sempre focando em resultados mensuráveis e crescimento sustentável. 
              Cada projeto é uma oportunidade de aplicar as melhores práticas 
              e descobrir novas estratégias.
            </p>
            <p className="text-muted-foreground">
              Hoje, ajudo empresas de diversos setores a dominar os mecanismos 
              de busca, aumentar sua visibilidade online e gerar mais leads 
              qualificados através do tráfego orgânico.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Habilidades Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SEO Técnico</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Core Web Vitals</Badge>
                  <Badge variant="secondary">Schema Markup</Badge>
                  <Badge variant="secondary">Site Speed</Badge>
                  <Badge variant="secondary">Crawlability</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ferramentas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Google Analytics</Badge>
                  <Badge variant="secondary">Search Console</Badge>
                  <Badge variant="secondary">SEMrush</Badge>
                  <Badge variant="secondary">Screaming Frog</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Desenvolvimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">HTML/CSS</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Google Tag Manager</Badge>
                  <Badge variant="secondary">Data Studio</Badge>
                  <Badge variant="secondary">Looker</Badge>
                  <Badge variant="secondary">SQL</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Experiência Profissional</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>SEO Specialist - Freelancer</CardTitle>
                    <CardDescription>2020 - Presente</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Consultoria em SEO para empresas de médio e grande porte</li>
                  <li>Desenvolvimento e implementação de estratégias de SEO técnico</li>
                  <li>Análise de performance e otimização contínua</li>
                  <li>Treinamento de equipes internas em melhores práticas de SEO</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Digital Marketing Analyst</CardTitle>
                    <CardDescription>2019 - 2020</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Gestão de campanhas de SEO e SEM para e-commerce</li>
                  <li>Análise de dados e relatórios de performance</li>
                  <li>Otimização de landing pages para conversão</li>
                  <li>Colaboração com equipes de desenvolvimento</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Certificações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-primary" />
              <span>Google Analytics Certified</span>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-primary" />
              <span>Google Ads Certified</span>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-primary" />
              <span>SEMrush SEO Toolkit</span>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-primary" />
              <span>Technical SEO Certified</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 bg-muted/20 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Pronto para Crescer Online?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Vamos trabalhar juntos para transformar seu site em uma máquina 
            de gerar leads e vendas através do SEO.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contato">Solicitar Consultoria</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">Ver Portfolio</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}