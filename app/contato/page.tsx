import { Metadata } from "next"
import { ContactForm } from "@/components/forms/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato para discutir como posso ajudar seu negócio a crescer online através de estratégias de SEO comprovadas.",
}

export default function ContatoPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Vamos Trabalhar Juntos
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Pronto para transformar seu site em uma máquina de gerar leads? 
          Entre em contato e vamos discutir como o SEO pode impulsionar seu negócio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {SOCIAL_LINKS.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">
                    +55 (11) 99999-9999
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Localização</p>
                  <p className="text-sm text-muted-foreground">
                    São Paulo, Brasil
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Horário</p>
                  <p className="text-sm text-muted-foreground">
                    Seg-Sex: 9h às 18h
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Por que me Escolher?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Resposta Rápida</p>
                  <p className="text-sm text-muted-foreground">
                    Respondo todas as consultas em até 24 horas
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Análise Gratuita</p>
                  <p className="text-sm text-muted-foreground">
                    Primeira análise do seu site sem compromisso
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Resultados Comprovados</p>
                  <p className="text-sm text-muted-foreground">
                    Mais de 5 anos ajudando empresas a crescer online
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Processo de Trabalho</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Análise Inicial</p>
                  <p className="text-sm text-muted-foreground">
                    Auditoria completa do seu site atual
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Estratégia</p>
                  <p className="text-sm text-muted-foreground">
                    Plano personalizado para seus objetivos
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Implementação</p>
                  <p className="text-sm text-muted-foreground">
                    Execução das otimizações e acompanhamento
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium">Resultados</p>
                  <p className="text-sm text-muted-foreground">
                    Relatórios e métricas de crescimento
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Perguntas Frequentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quanto tempo leva para ver resultados?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Geralmente começamos a ver melhorias em 2-3 meses, com resultados 
                significativos em 4-6 meses. SEO é um investimento de longo prazo.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Como funciona o processo?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Começamos com uma análise gratuita, seguida de proposta personalizada. 
                Durante o projeto, você recebe relatórios regulares de progresso.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trabalha com que tipo de empresa?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Atendo desde pequenas empresas locais até grandes e-commerces. 
                Cada estratégia é personalizada para o nicho e objetivos específicos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Oferece garantias?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ofereço garantia de satisfação: se não ver melhorias mensuráveis 
                em 4 meses, devolvemos parte do investimento.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}