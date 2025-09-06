"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { contactFormSchema, type ContactFormData } from "@/lib/validations"
import { Loader2, Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
      budget: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    console.log("Form data:", data)
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold">Mensagem Enviada com Sucesso!</h3>
            <p className="text-muted-foreground">
              Obrigado pelo seu interesse! Entrarei em contato em até 24 horas 
              para discutirmos como posso ajudar seu negócio a crescer online.
            </p>
            <Button 
              onClick={() => {
                setIsSubmitted(false)
                form.reset()
              }}
              variant="outline"
            >
              Enviar Nova Mensagem
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Vamos Conversar?</CardTitle>
        <CardDescription className="text-lg">
          Conte-me sobre seu projeto e como posso ajudar a fazer seu site decolar nos buscadores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
                {...form.register("name")}
                disabled={isSubmitting}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...form.register("email")}
                disabled={isSubmitting}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                placeholder="Nome da sua empresa"
                {...form.register("company")}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento Mensal</Label>
              <select
                id="budget"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...form.register("budget")}
                disabled={isSubmitting}
              >
                <option value="">Selecione uma faixa</option>
                <option value="1000-2500">R$ 1.000 - R$ 2.500</option>
                <option value="2500-5000">R$ 2.500 - R$ 5.000</option>
                <option value="5000-10000">R$ 5.000 - R$ 10.000</option>
                <option value="10000+">R$ 10.000+</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Serviço de Interesse *</Label>
            <select
              id="service"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...form.register("service")}
              disabled={isSubmitting}
            >
              <option value="">Selecione um serviço</option>
              <option value="auditoria">Auditoria SEO Completa</option>
              <option value="seo-tecnico">SEO Técnico</option>
              <option value="seo-conteudo">SEO de Conteúdo</option>
              <option value="link-building">Link Building</option>
              <option value="local-seo">Local SEO</option>
              <option value="consultoria">Consultoria Completa</option>
              <option value="outro">Outro</option>
            </select>
            {form.formState.errors.service && (
              <p className="text-sm text-red-500">
                {form.formState.errors.service.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem *</Label>
            <Textarea
              id="message"
              placeholder="Conte-me sobre seu site, objetivos e principais desafios. Quanto mais detalhes, melhor poderei ajudar!"
              rows={4}
              {...form.register("message")}
              disabled={isSubmitting}
            />
            {form.formState.errors.message && (
              <p className="text-sm text-red-500">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar Mensagem
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Ao enviar este formulário, você aceita ser contatado para discussão 
            do seu projeto. Respondo em até 24 horas.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}