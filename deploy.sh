#!/bin/bash

# Deploy Script para Oracle Cloud
# Uso: ./deploy.sh [servidor-ip] [caminho-para-chave-ssh]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Verificar argumentos
if [ $# -lt 2 ]; then
    error "Uso: $0 <servidor-ip> <caminho-para-chave-ssh>"
fi

SERVER_IP=$1
SSH_KEY=$2
APP_NAME="portfolio-juliana"
REMOTE_DIR="/home/ubuntu/$APP_NAME"
DOMAIN="julianakaiza.site"

log "Iniciando deploy para $SERVER_IP"

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
        ./ ubuntu@"$SERVER_IP":"$REMOTE_DIR"/
}

log "1. Copiando arquivos para o servidor..."
copy_files

log "2. Instalando dependências..."
remote_exec "cd $REMOTE_DIR && npm install --production=false"

log "3. Fazendo build da aplicação..."
remote_exec "cd $REMOTE_DIR && npm run build"

log "4. Parando aplicação anterior (se existir)..."
remote_exec "pm2 stop $APP_NAME || true"
remote_exec "pm2 delete $APP_NAME || true"

log "5. Iniciando nova aplicação..."
remote_exec "cd $REMOTE_DIR && pm2 start npm --name '$APP_NAME' -- start"
remote_exec "pm2 save"

log "6. Verificando status da aplicação..."
remote_exec "pm2 status"

log "7. Configurando Nginx (se necessário)..."
remote_exec "sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled"

# Criar configuração do Nginx
cat > /tmp/nginx-config << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

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
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

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

# Copiar configuração do Nginx
scp -i "$SSH_KEY" -o StrictHostKeyChecking=no /tmp/nginx-config ubuntu@"$SERVER_IP":/tmp/nginx-config
remote_exec "sudo mv /tmp/nginx-config /etc/nginx/sites-available/$DOMAIN"
remote_exec "sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/"
remote_exec "sudo nginx -t && sudo systemctl reload nginx"

log "8. Configurando SSL com Let's Encrypt..."
remote_exec "sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN || warn 'SSL já configurado ou erro na configuração'"

log "9. Configurando renovação automática do SSL..."
remote_exec "echo '0 12 * * * /usr/bin/certbot renew --quiet' | sudo crontab -"

log "10. Verificando saúde da aplicação..."
sleep 5
if curl -f -s "http://$SERVER_IP" > /dev/null; then
    log "✅ Aplicação está respondendo corretamente!"
else
    warn "⚠️  Aplicação pode não estar respondendo corretamente"
fi

log "🚀 Deploy concluído com sucesso!"
log "🌐 Site disponível em: https://$DOMAIN"
log "📊 Monitoramento: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 monit'"

# Limpeza
rm -f /tmp/nginx-config

echo ""
echo "=== Comandos úteis ==="
echo "Ver logs: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 logs $APP_NAME'"
echo "Reiniciar: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 restart $APP_NAME'"
echo "Status: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 status'"
echo "Monitor: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 monit'"
