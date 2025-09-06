export const SITE_CONFIG = {
  name: 'Juliana Kaiza',
  title: 'Juliana Kaiza - Portfolio',
  description: 'Portfolio profissional de Juliana Kaiza - Desenvolvedora, Designer e Criadora de Conteúdo',
  url: 'https://julianakaiza.site',
  ogImage: '/og-image.jpg',
  links: {
    github: 'https://github.com/julianakaiza',
    linkedin: 'https://linkedin.com/in/julianakaiza',
    email: 'contato@julianakaiza.site',
    instagram: 'https://instagram.com/julianakaiza',
  }
}

export const NAVIGATION_ITEMS = [
  { name: 'Início', href: '#home' },
  { name: 'Sobre', href: '#about' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Experiência', href: '#experience' },
  { name: 'Contato', href: '#contact' },
]

export const SKILLS = [
  { name: 'React', level: 95 },
  { name: 'Next.js', level: 90 },
  { name: 'TypeScript', level: 88 },
  { name: 'Node.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'UI/UX Design', level: 92 },
  { name: 'Figma', level: 90 },
  { name: 'Tailwind CSS', level: 95 },
]

export const PROJECTS = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Plataforma completa de e-commerce com painel administrativo, sistema de pagamentos e gestão de estoque.',
    image: '/projects/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
    github: 'https://github.com/julianakaiza/ecommerce',
    demo: 'https://ecommerce-demo.julianakaiza.site',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Aplicativo de gerenciamento de tarefas com colaboração em tempo real e integração com calendário.',
    image: '/projects/taskapp.jpg',
    technologies: ['React', 'Firebase', 'Material-UI', 'Socket.io'],
    github: 'https://github.com/julianakaiza/taskapp',
    demo: 'https://tasks.julianakaiza.site',
    featured: true,
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'Website portfolio responsivo com animações suaves e otimização para SEO.',
    image: '/projects/portfolio.jpg',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com/julianakaiza/portfolio',
    demo: 'https://portfolio-client.julianakaiza.site',
    featured: false,
  },
]

export const EXPERIENCE = [
  {
    id: 1,
    company: 'Tech Innovations Ltd',
    position: 'Senior Frontend Developer',
    period: '2022 - Presente',
    description: 'Liderança técnica no desenvolvimento de aplicações web complexas usando React e Next.js. Mentoria de desenvolvedores júnior e implementação de melhores práticas.',
    technologies: ['React', 'Next.js', 'TypeScript', 'GraphQL'],
  },
  {
    id: 2,
    company: 'Digital Solutions Co',
    position: 'Fullstack Developer',
    period: '2020 - 2022',
    description: 'Desenvolvimento de aplicações fullstack, desde a concepção até o deploy. Trabalho com equipes multidisciplinares em projetos de grande escala.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'AWS'],
  },
  {
    id: 3,
    company: 'StartupXYZ',
    position: 'Frontend Developer',
    period: '2019 - 2020',
    description: 'Desenvolvimento de interfaces modernas e responsivas. Foco em performance e experiência do usuário.',
    technologies: ['React', 'Redux', 'Sass', 'Jest'],
  },
]
