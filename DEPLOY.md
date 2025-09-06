# Guia de Deploy - Portfolio Juliana Kaiza

## 🚀 Deploy na Oracle Cloud

### Pré-requisitos

1. **Instância Oracle Cloud** configurada com Ubuntu
2. **Domínio** julianakaiza.site configurado
3. **Chave SSH** para acesso ao servidor

### Deploy Automatizado

Use o script de deploy incluído no projeto:

```bash
./deploy.sh [IP-DO-SERVIDOR] [CAMINHO-PARA-CHAVE-SSH]
```

Exemplo:
```bash
./deploy.sh 123.456.789.123 ~/.ssh/oracle-key.pem
```

### Deploy Manual

#### 1. Preparação do Servidor

```bash
# Conectar ao servidor
ssh -i sua-chave.pem ubuntu@seu-servidor-ip

# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Instalar Nginx
sudo apt install nginx -y

# Instalar Certbot para SSL
sudo apt install certbot python3-certbot-nginx -y
```

#### 2. Deploy da Aplicação

```bash
# Clonar repositório
git clone https://github.com/julianakaiza/portfolio.git
cd portfolio

# Instalar dependências
npm install

# Build da aplicação
npm run build

# Iniciar com PM2
pm2 start npm --name "portfolio-juliana" -- start
pm2 save
pm2 startup
```

#### 3. Configuração do Nginx

Criar arquivo de configuração:

```bash
sudo nano /etc/nginx/sites-available/julianakaiza.site
```

Conteúdo:

```nginx
server {
    listen 80;
    server_name julianakaiza.site www.julianakaiza.site;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

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

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|pdf|txt)$ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Ativar site:

```bash
sudo ln -s /etc/nginx/sites-available/julianakaiza.site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 4. Configuração SSL

```bash
# Obter certificado SSL
sudo certbot --nginx -d julianakaiza.site -d www.julianakaiza.site

# Configurar renovação automática
sudo crontab -e
# Adicionar: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### 5. Configuração do Firewall Oracle Cloud

No painel da Oracle Cloud:

1. Acesse **Networking** > **Virtual Cloud Networks**
2. Selecione sua VCN
3. Clique em **Security Lists**
4. Adicione regras de entrada:
   - **Port 80** (HTTP): 0.0.0.0/0
   - **Port 443** (HTTPS): 0.0.0.0/0
   - **Port 22** (SSH): Seu IP específico

### Comandos Úteis

```bash
# Ver logs da aplicação
pm2 logs portfolio-juliana

# Reiniciar aplicação
pm2 restart portfolio-juliana

# Status da aplicação
pm2 status

# Monitor em tempo real
pm2 monit

# Verificar Nginx
sudo nginx -t
sudo systemctl status nginx

# Ver logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Renovar SSL manualmente
sudo certbot renew --dry-run
```

### Atualizações

Para atualizar o site:

```bash
# No servidor
cd portfolio
git pull origin main
npm install
npm run build
pm2 restart portfolio-juliana
```

### Monitoramento

Configure alertas para:
- Status da aplicação (PM2)
- Uso de recursos (CPU, RAM, Disk)
- Certificado SSL (renovação)
- Logs de erro

### Backup

Configure backup automático de:
- Código fonte (Git)
- Configurações do servidor
- Certificados SSL
- Logs importantes

### Troubleshooting

#### Aplicação não inicia
```bash
pm2 logs portfolio-juliana
npm run build
```

#### Nginx não funciona
```bash
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

#### SSL não funciona
```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

#### Domínio não resolve
- Verificar DNS records (A/AAAA)
- Verificar propagação DNS
- Verificar firewall Oracle Cloud

---

## 📞 Suporte

Em caso de problemas:
1. Verificar logs: `pm2 logs portfolio-juliana`
2. Verificar status: `pm2 status`
3. Verificar Nginx: `sudo nginx -t`
4. Verificar SSL: `sudo certbot certificates`

**Site funcionando:** https://julianakaiza.site
