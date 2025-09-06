import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Users, Award } from "lucide-react"
import Link from "next/link"
import { cases } from "@/content/cases"

export const metadata: Metadata = {
  title: "Portfólio",
  description: "Conheça casos de sucesso reais onde transformei sites em máquinas de conversão através de estratégias de SEO comprovadas.",
}

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Casos de Sucesso em SEO
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Descubra como ajudei empresas de diferentes setores a multiplicar 
          seu tráfego orgânico e aumentar suas vendas através do SEO.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="text-center">
          <CardHeader>
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold">300%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Aumento Médio de Tráfego</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader>
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold">50+</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Projetos Realizados</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader>
            <Award className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold">95%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Taxa de Satisfação</p>
          </CardContent>
        </Card>
      </div>

      {/* Case Studies Grid */}
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Estudos de Caso Detalhados</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada projeto é único. Veja como apliquei estratégias personalizadas 
            para diferentes desafios e nichos de mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cases.map((caseStudy, index) => (
            <Card key={caseStudy.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary">{caseStudy.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {caseStudy.duration}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {caseStudy.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {caseStudy.overview}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Key Results */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {caseStudy.results.traffic}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tráfego Orgânico
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {caseStudy.results.keywords}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Novas Keywords
                    </div>
                  </div>
                </div>

                {/* Client */}
                <div className="border-t pt-4">
                  <div className="text-sm font-medium text-muted-foreground">Cliente:</div>
                  <div className="text-sm">{caseStudy.client}</div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Testimonial Preview */}
                {caseStudy.testimonial && (
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <blockquote className="text-sm italic text-muted-foreground mb-2">
                      "{caseStudy.testimonial.quote.substring(0, 100)}..."
                    </blockquote>
                    <div className="text-xs text-muted-foreground">
                      - {caseStudy.testimonial.author}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <Button asChild className="w-full">
                  <Link href={`/portfolio/${caseStudy.id}`}>
                    Ver Caso Completo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="text-center py-16 mt-16 bg-muted/20 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">
          Pronto para Ser o Próximo Caso de Sucesso?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Vamos trabalhar juntos para transformar seu site em uma máquina 
          de gerar leads e vendas através do SEO estratégico.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contato">Solicitar Análise Gratuita</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/sobre">Conhecer Minha Metodologia</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}