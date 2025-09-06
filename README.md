# Portfolio Juliana Kaiza

Um portfólio moderno e responsivo construído com Next.js 14, TypeScript, Tailwind CSS e Framer Motion.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Type safety e melhor DX
- **Tailwind CSS** - Styling utilitário e responsivo
- **Framer Motion** - Animações suaves e interativas
- **React Hook Form** - Gerenciamento de formulários
- **Lucide React** - Ícones modernos
- **Next Themes** - Suporte a dark/light mode

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/julianakaiza/portfolio.git
cd portfolio

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📦 Build e Deploy

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Executar build localmente
npm start
```

### Deploy na Oracle Cloud

#### 1. Preparação do Servidor

```bash
# Conectar ao servidor Oracle Cloud
ssh -i your-key.pem ubuntu@your-server-ip

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 para gerenciamento de processos
sudo npm install -g pm2
```

#### 2. Deploy da Aplicação

```bash
# No servidor, clone o repositório
git clone https://github.com/julianakaiza/portfolio.git
cd portfolio

# Instalar dependências
npm install

# Build da aplicação
npm run build

# Iniciar com PM2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

#### 3. Configuração do Nginx

```bash
# Instalar Nginx
sudo apt update
sudo apt install nginx

# Configurar virtual host
sudo nano /etc/nginx/sites-available/julianakaiza.site
```

Adicione a configuração:

```nginx
server {
    listen 80;
    server_name julianakaiza.site www.julianakaiza.site;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Ativar o site
sudo ln -s /etc/nginx/sites-available/julianakaiza.site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 4. SSL com Let's Encrypt

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d julianakaiza.site -d www.julianakaiza.site

# Configurar renovação automática
sudo crontab -e
# Adicionar: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔧 Configuração de Domínio

1. **DNS Records**: Configure os registros A/AAAA no seu provedor de domínio apontando para o IP da Oracle Cloud
2. **Firewall**: Abra as portas 80 e 443 no Security Group da Oracle Cloud
3. **SSL**: O certificado será renovado automaticamente

## 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router (Next.js 14)
│   ├── globals.css     # Estilos globais
│   ├── layout.tsx      # Layout raiz
│   └── page.tsx        # Página inicial
├── components/         # Componentes React
│   ├── ui/            # Componentes UI reutilizáveis
│   ├── sections/      # Seções do portfólio
│   ├── navigation.tsx # Navegação
│   └── footer.tsx     # Rodapé
└── lib/               # Utilitários e constantes
    ├── constants.ts   # Dados do portfólio
    └── utils.ts       # Funções utilitárias
```

## 🎨 Personalização

### Cores e Tema

Edite `tailwind.config.js` para personalizar as cores:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Suas cores primárias
      }
    }
  }
}
```

### Conteúdo

Atualize `src/lib/constants.ts` com suas informações:

- Dados pessoais
- Projetos
- Experiência profissional
- Links sociais

## 📱 Features

- ✅ Design responsivo
- ✅ Dark/Light mode
- ✅ Animações suaves
- ✅ SEO otimizado
- ✅ Performance otimizada
- ✅ Formulário de contato
- ✅ Navegação suave
- ✅ Acessibilidade

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👩‍💻 Autora

**Juliana Kaiza**
- Website: [julianakaiza.site](https://julianakaiza.site)
- LinkedIn: [linkedin.com/in/julianakaiza](https://linkedin.com/in/julianakaiza)
- GitHub: [github.com/julianakaiza](https://github.com/julianakaiza)
