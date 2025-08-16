'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus({ type: 'loading', message: 'Enviando mensagem...' });
    
    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você implementaria a integração real com um serviço de email
      // Por exemplo: EmailJS, Formspree, ou uma API própria
      
      setStatus({ 
        type: 'success', 
        message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.' 
      });
      
      // Limpar formulário
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.' 
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'juliana_kaiza@outlook.com',
      href: 'mailto:juliana_kaiza@outlook.com',
      color: 'text-blue-400'
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: '(79) 99992-2046',
      href: 'tel:+5579999922046',
      color: 'text-green-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Juliana Nascimento',
      href: 'https://www.linkedin.com/in/juliana-ka%C3%ADza-r-do-nascimento-a87a54206/',
      color: 'text-blue-500'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-section-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-purple-500 focus:border-purple-500'
                  }`}
                  placeholder="Seu nome completo"
                  disabled={status.type === 'loading'}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-purple-500 focus:border-purple-500'
                  }`}
                  placeholder="seu.email@exemplo.com"
                  disabled={status.type === 'loading'}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-purple-500 focus:border-purple-500'
                  }`}
                  placeholder="Conte-me sobre seu projeto ou como posso ajudá-lo..."
                  disabled={status.type === 'loading'}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.message}
                  </p>
                )}
              </div>
              
              <motion.button
                type="submit"
                disabled={status.type === 'loading'}
                whileHover={{ scale: status.type === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: status.type === 'loading' ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  status.type === 'loading'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                }`}
              >
                {status.type === 'loading' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </motion.button>
              
              {/* Status do formulário */}
              {status.type !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg flex items-center ${
                    status.type === 'success' 
                      ? 'bg-green-900/50 border border-green-700 text-green-300'
                      : status.type === 'error'
                      ? 'bg-red-900/50 border border-red-700 text-red-300'
                      : 'bg-blue-900/50 border border-blue-700 text-blue-300'
                  }`}
                >
                  {status.type === 'success' && <CheckCircle className="w-5 h-5 mr-2" />}
                  {status.type === 'error' && <AlertCircle className="w-5 h-5 mr-2" />}
                  <span>{status.message}</span>
                </motion.div>
              )}
            </form>
          </motion.div>
          
          {/* Informações de contato */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Vamos conversar!</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Estou sempre aberta a discutir novos projetos, oportunidades criativas 
                ou parcerias. Não hesite em entrar em contato!
              </p>
            </div>
            
            <div className="space-y-6">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target={contact.label === 'LinkedIn' ? '_blank' : undefined}
                    rel={contact.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200 group"
                  >
                    <div className={`p-3 rounded-lg bg-gray-700 group-hover:bg-gray-600 transition-colors ${contact.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400">{contact.label}</p>
                      <p className="text-white font-medium">{contact.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-6 border border-purple-700/50"
            >
              <h4 className="text-lg font-semibold mb-2">Tempo de resposta</h4>
              <p className="text-gray-300">
                Normalmente respondo em até <span className="text-purple-400 font-medium">24 horas</span> durante dias úteis.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;