#!/bin/bash

# Script de Atualização Ultra-Rápida - Portfolio Juliana Kaiza
# Uso: ./update-site.sh [--build-only]

set -e

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configurações
SERVER_IP="137.131.170.86"
SSH_KEY="ssh-key-2025-08-24.key"
APP_NAME="portfolio-juliana"
REMOTE_DIR="/home/ubuntu/$APP_NAME"

log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%H:%M:%S')] $1${NC}"
}

# Verificar argumentos
BUILD_ONLY=${1:-""}

if [ "$BUILD_ONLY" = "--build-only" ]; then
    log "🏗️ Modo BUILD ONLY - apenas rebuild sem sync de arquivos"
else
    log "⚡ Atualização completa - sync + build + restart"
fi

# Função para executar comandos remotos
remote_exec() {
    ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no ubuntu@"$SERVER_IP" "$1"
}

# Verificar se há mudanças locais não commitadas
if [ "$BUILD_ONLY" != "--build-only" ]; then
    if ! git diff --quiet || ! git diff --cached --quiet; then
        warn "⚠️ Há mudanças não commitadas. Recomenda-se fazer commit primeiro."
        read -p "Continuar mesmo assim? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
fi

# Sync de arquivos (apenas se não for build-only)
if [ "$BUILD_ONLY" != "--build-only" ]; then
    log "📁 Sincronizando arquivos..."
    rsync -avz --delete -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
        --exclude node_modules \
        --exclude .next \
        --exclude .git \
        --exclude ssh-key-*.key \
        ./ ubuntu@"$SERVER_IP":"$REMOTE_DIR"/
    
    # Verificar se há novas dependências
    log "📦 Verificando dependências..."
    remote_exec "cd $REMOTE_DIR && npm install --production=false"
fi

# Build
log "🏗️ Fazendo build..."
remote_exec "cd $REMOTE_DIR && npm run build"

# Restart
log "🔄 Reiniciando aplicação..."
remote_exec "pm2 restart $APP_NAME"

# Verificação rápida
log "✅ Verificando status..."
if remote_exec "pm2 describe $APP_NAME | grep -q 'status.*online'" 2>/dev/null; then
    log "🎉 Atualização concluída com sucesso!"
    info "🌐 Site: https://julianakaiza.site"
    
    # Mostrar logs recentes
    echo ""
    echo "📋 Logs recentes:"
    remote_exec "pm2 logs $APP_NAME --lines 5 --nostream" 2>/dev/null || true
else
    warn "⚠️ Aplicação pode ter problemas - verificar logs"
    remote_exec "pm2 logs $APP_NAME --lines 10 --nostream"
fi

echo ""
echo "=== Comandos úteis ==="
echo "Ver logs: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 logs $APP_NAME'"
echo "Status: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 status'"
echo "Build apenas: ./update-site.sh --build-only"
