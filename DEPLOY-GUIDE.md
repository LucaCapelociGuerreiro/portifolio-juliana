# 🚀 Guia de Deploy - Oracle Cloud

## 📋 Informações do Servidor
- **IP**: 137.131.198.44
- **Usuário**: ubuntu
- **Chave SSH**: C:\Users\Lucac\Downloads\ssh-key-2025-08-23.key.pub
- **Domínio**: julianakaiza.site

## 🎯 Deploy Automatizado (Recomendado)

### 1. Executar Script Automatizado

```bash
# No diretório raiz do projeto
./deploy-to-oracle.sh
```

Este script fará automaticamente:
- ✅ Teste de conexão SSH
- ✅ Instalação do Docker e Docker Compose
- ✅ Upload dos arquivos do projeto
- ✅ Configuração do firewall
- ✅ Build das imagens Docker
- ✅ Deploy da aplicação
- ✅ Verificações pós-deploy

## 🔧 Deploy Manual (Alternativo)

### 1. Testar Conexão SSH

```bash
# Converter caminho Windows para WSL
SSH_KEY="/mnt/c/Users/Lucac/Downloads/ssh-key-2025-08-23.key"
chmod 600 "$SSH_KEY"

# Testar conexão
ssh -i "$SSH_KEY" ubuntu@137.131.198.44 "echo 'Conexão OK'"
```

### 2. Copiar Arquivos para o Servidor

```bash
# Compactar projeto (excluindo node_modules)
tar -czf portfolio.tar.gz --exclude=node_modules --exclude=.git --exclude=.next .

# Upload para servidor
scp -i "$SSH_KEY" portfolio.tar.gz ubuntu@137.131.198.44:/tmp/

# Limpar arquivo local
rm portfolio.tar.gz
```

### 3. Configurar Servidor

```bash
# Conectar ao servidor
ssh -i "$SSH_KEY" ubuntu@137.131.198.44

# No servidor, instalar Docker
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo usermod -aG docker ubuntu
sudo systemctl enable docker
sudo systemctl start docker

# Extrair projeto
sudo mkdir -p /opt/portfolio
sudo chown ubuntu:ubuntu /opt/portfolio
cd /opt/portfolio
tar -xzf /tmp/portfolio.tar.gz
rm /tmp/portfolio.tar.gz
```

### 4. Configurar Firewall

```bash
# No servidor
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443  
sudo ufw allow 3000
sudo ufw --force enable
```

### 5. Executar Deploy

```bash
# No servidor, ir para diretório de infraestrutura
cd /opt/portfolio/infra

# Build e deploy
docker-compose build --no-cache
docker-compose up -d

# Verificar status
docker-compose ps
docker-compose logs -f
```

## 🌐 Configuração de Domínio

### 1. Configurar DNS

No painel do seu provedor de domínio, configure:

```
Tipo: A
Nome: @
Valor: 137.131.198.44
TTL: 300

Tipo: A  
Nome: www
Valor: 137.131.198.44
TTL: 300
```

### 2. Aguardar Propagação

- **Mínimo**: 5-15 minutos
- **Máximo**: 24-48 horas
- **Verificar**: `nslookup julianakaiza.site`

### 3. Configurar SSL (Após DNS)

```bash
# No servidor
sudo apt-get install -y certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d julianakaiza.site -d www.julianakaiza.site

# Configurar renovação automática
sudo systemctl enable certbot.timer
```

## 📊 Monitoramento

### URLs de Acesso

- **Aplicação Direta**: http://137.131.198.44:3000
- **Via Nginx**: http://137.131.198.44
- **Domínio**: http://julianakaiza.site (após DNS)
- **HTTPS**: https://julianakaiza.site (após SSL)

### Comandos Úteis

```bash
# Conectar ao servidor
ssh -i "/mnt/c/Users/Lucac/Downloads/ssh-key-2025-08-23.key" ubuntu@137.131.198.44

# Ver status dos containers
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f app
docker-compose logs -f nginx

# Reiniciar aplicação
docker-compose restart

# Parar aplicação
docker-compose down

# Rebuildar e reiniciar
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Ver uso de recursos
docker stats

# Ver processso em execução
htop
```

## 🔍 Troubleshooting

### Problema: Conexão SSH negada

```bash
# Verificar permissões da chave
chmod 600 "/mnt/c/Users/Lucac/Downloads/ssh-key-2025-08-23.key"

# Testar com verbose
ssh -v -i "/mnt/c/Users/Lucac/Downloads/ssh-key-2025-08-23.key" ubuntu@137.131.198.44
```

### Problema: Containers não sobem

```bash
# Ver logs detalhados
docker-compose logs

# Verificar uso de memória
free -h

# Limpar espaço em disco
docker system prune -f
```

### Problema: Aplicação não responde

```bash
# Verificar se porta está em uso
sudo netstat -tlnp | grep :3000

# Verificar logs da aplicação
docker-compose logs app

# Verificar health check
docker-compose ps
```

### Problema: Nginx não funciona

```bash
# Verificar configuração
nginx -t

# Ver logs do Nginx
docker-compose logs nginx

# Verificar porta 80
sudo netstat -tlnp | grep :80
```

## 🚨 Limitações Oracle Cloud Free Tier

- **RAM**: 1GB total (400MB app + 100MB nginx + 500MB sistema)
- **CPU**: 1 OCPU
- **Disk**: 47GB
- **Bandwidth**: 10TB/mês

### Otimizações Aplicadas

- Docker multi-stage builds
- Limitações de memória nos containers
- Cache agressivo no Nginx
- Build otimizado do Next.js
- Compressão gzip

## 📈 Performance

### Métricas Esperadas

- **Tempo de resposta**: < 500ms
- **Core Web Vitals**: Otimizado
- **Compressão**: ~70% redução
- **Cache**: 1 ano para assets estáticos

### Monitoramento

```bash
# Performance da aplicação
curl -w "@curl-format.txt" -o /dev/null -s http://julianakaiza.site

# Criar arquivo curl-format.txt
echo "     time_namelookup:  %{time_namelookup}s
        time_connect:  %{time_connect}s
     time_appconnect:  %{time_appconnect}s
    time_pretransfer:  %{time_pretransfer}s
       time_redirect:  %{time_redirect}s
  time_starttransfer:  %{time_starttransfer}s
                     ----------
          time_total:  %{time_total}s" > curl-format.txt
```

## 🔐 Segurança

### Configurações Aplicadas

- Firewall UFW configurado
- SSL/TLS com Let's Encrypt
- Headers de segurança no Nginx
- Containers não-root
- Atualizações automáticas

### Backup

```bash
# Backup do projeto
sudo tar -czf /opt/backup-portfolio-$(date +%Y%m%d).tar.gz /opt/portfolio

# Backup automático (adicionar ao crontab)
echo "0 2 * * * sudo tar -czf /opt/backup-portfolio-\$(date +\%Y\%m\%d).tar.gz /opt/portfolio" | sudo crontab -
```

## 🎯 Próximos Passos

1. ✅ Deploy básico
2. ⏳ Configuração DNS
3. ⏳ SSL/HTTPS
4. ⏳ Monitoramento avançado
5. ⏳ CI/CD com GitHub Actions
6. ⏳ Backup automatizado
7. ⏳ Analytics e SEO

---

**🚀 Suporte**: Em caso de problemas, verificar logs e documentação acima.
