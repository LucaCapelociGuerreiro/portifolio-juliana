#!/bin/bash

# Deploy Script Otimizado - Portfolio Juliana Kaiza
# Uso: ./deploy.sh [servidor-ip] [caminho-para-chave-ssh] [--full]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Verificar argumentos
if [ $# -lt 2 ]; then
    error "Uso: $0 <servidor-ip> <caminho-para-chave-ssh> [--full]"
fi

SERVER_IP=$1
SSH_KEY=$2
FULL_DEPLOY=${3:-""}
APP_NAME="portfolio-juliana"
REMOTE_DIR="/home/ubuntu/$APP_NAME"
DOMAIN="julianakaiza.site"

# Verificar se é deploy completo
if [ "$FULL_DEPLOY" = "--full" ]; then
    log "🚀 Iniciando DEPLOY COMPLETO para $SERVER_IP"
    SKIP_SETUP=false
else
    log "⚡ Iniciando DEPLOY RÁPIDO para $SERVER_IP"
    SKIP_SETUP=true
fi

# Verificar se a chave SSH existe
if [ ! -f "$SSH_KEY" ]; then
    error "Chave SSH não encontrada: $SSH_KEY"
fi

# Função para executar comandos remotos
remote_exec() {
    ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no ubuntu@"$SERVER_IP" "$1"
}

# Função para copiar arquivos
copy_files() {
    rsync -avz --delete -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
        --exclude node_modules \
        --exclude .next \
        --exclude .git \
        --exclude ssh-key-*.key \
        ./ ubuntu@"$SERVER_IP":"$REMOTE_DIR"/
}

# Verificar se é o primeiro deploy
log "🔍 Verificando se é o primeiro deploy..."
if remote_exec "[ -d $REMOTE_DIR ]" 2>/dev/null; then
    info "Diretório existe - Deploy incremental"
    FIRST_DEPLOY=false
else
    info "Primeiro deploy - Configuração completa necessária"
    FIRST_DEPLOY=true
    SKIP_SETUP=false
fi

# 1. Copiar arquivos
log "📁 Copiando arquivos para o servidor..."
copy_files

# 2. Instalar/atualizar dependências
log "📦 Verificando dependências..."
if [ "$FIRST_DEPLOY" = true ] || [ "$FULL_DEPLOY" = "--full" ]; then
    log "Instalando todas as dependências..."
    remote_exec "cd $REMOTE_DIR && npm install"
else
    log "Verificando se há novas dependências..."
    remote_exec "cd $REMOTE_DIR && npm install --production=false"
fi

# 3. Build da aplicação
log "🏗️ Fazendo build da aplicação..."
remote_exec "cd $REMOTE_DIR && npm run build"

# 4. Gerenciar aplicação PM2
log "🔄 Gerenciando aplicação..."
if remote_exec "pm2 describe $APP_NAME" >/dev/null 2>&1; then
    log "Reiniciando aplicação existente..."
    remote_exec "pm2 restart $APP_NAME"
else
    log "Iniciando nova aplicação..."
    remote_exec "cd $REMOTE_DIR && pm2 start npm --name '$APP_NAME' -- start"
    remote_exec "pm2 save"
fi

# 5. Verificar status
log "📊 Verificando status da aplicação..."
remote_exec "pm2 status | grep $APP_NAME"

# Configurações apenas no primeiro deploy ou deploy completo
if [ "$SKIP_SETUP" = false ]; then
    log "⚙️ Executando configurações de infraestrutura..."
    
    # Verificar e instalar PM2 se necessário
    if ! remote_exec "which pm2" >/dev/null 2>&1; then
        log "Instalando PM2..."
        remote_exec "sudo npm install -g pm2"
    fi
    
    # Configurar PM2 startup
    log "Configurando PM2 startup..."
    remote_exec "pm2 save"
    STARTUP_CMD=$(remote_exec "pm2 startup systemd -u ubuntu --hp /home/ubuntu" | grep "sudo env")
    if [ ! -z "$STARTUP_CMD" ]; then
        remote_exec "$STARTUP_CMD" || warn "Falha ao configurar PM2 startup"
    fi
    
    # Verificar e configurar Nginx
    if ! remote_exec "systemctl is-active nginx" >/dev/null 2>&1; then
        log "Instalando e configurando Nginx..."
        remote_exec "sudo apt update && sudo apt install nginx -y"
        
        # Criar configuração Nginx
        log "Configurando Nginx..."
        cat > /tmp/nginx-config << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|pdf|txt)$ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF
        
        scp -i "$SSH_KEY" -o StrictHostKeyChecking=no /tmp/nginx-config ubuntu@"$SERVER_IP":/tmp/nginx-config
        remote_exec "sudo mv /tmp/nginx-config /etc/nginx/sites-available/$DOMAIN"
        remote_exec "sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/"
        remote_exec "sudo rm -f /etc/nginx/sites-enabled/default"
        remote_exec "sudo nginx -t && sudo systemctl restart nginx"
        rm -f /tmp/nginx-config
    else
        log "Nginx já está configurado - pulando configuração"
    fi
    
    # Configurar firewall se necessário
    log "Verificando configuração de firewall..."
    if ! remote_exec "curl -s --connect-timeout 5 http://localhost" >/dev/null; then
        warn "Problema de conectividade - verificando iptables..."
        remote_exec "sudo iptables -I INPUT 5 -p tcp --dport 80 -j ACCEPT"
        remote_exec "sudo iptables -I INPUT 6 -p tcp --dport 443 -j ACCEPT"
        
        # Salvar regras iptables
        if remote_exec "which netfilter-persistent" >/dev/null 2>&1; then
            remote_exec "sudo netfilter-persistent save"
        else
            remote_exec "sudo apt install iptables-persistent -y"
            remote_exec "sudo netfilter-persistent save"
        fi
    fi
    
    # Configurar SSL se Certbot estiver disponível
    if remote_exec "which certbot" >/dev/null 2>&1; then
        log "Tentando configurar SSL..."
        remote_exec "sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN" || warn "SSL não configurado - pode ser necessário configurar manualmente"
    else
        info "Certbot não instalado - SSL pode ser configurado posteriormente"
    fi
fi

# Verificação final
log "🔍 Verificação final..."
sleep 3

# Testar aplicação
if remote_exec "curl -f -s http://localhost:3000" >/dev/null; then
    log "✅ Aplicação respondendo na porta 3000"
else
    error "❌ Aplicação não está respondendo na porta 3000"
fi

# Testar Nginx
if remote_exec "curl -f -s http://localhost" >/dev/null; then
    log "✅ Nginx funcionando corretamente"
else
    warn "⚠️ Nginx pode ter problemas - verificar configuração"
fi

# Testar acesso externo
if curl -f -s "http://$SERVER_IP" >/dev/null 2>&1; then
    log "✅ Site acessível externamente"
else
    warn "⚠️ Site pode não estar acessível externamente - verificar firewall"
fi

log "🎉 Deploy concluído com sucesso!"
log "🌐 Site disponível em: http://$DOMAIN"
log "📊 Monitoramento: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 monit'"

echo ""
echo "=== Comandos úteis ==="
echo "Ver logs: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 logs $APP_NAME'"
echo "Reiniciar: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 restart $APP_NAME'"
echo "Status: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 status'"
echo "Deploy rápido: ./deploy.sh $SERVER_IP $SSH_KEY"
echo "Deploy completo: ./deploy.sh $SERVER_IP $SSH_KEY --full"
