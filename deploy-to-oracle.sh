#!/bin/bash

# ==============================================================================
# SCRIPT DE DEPLOY AUTOMATIZADO - ORACLE CLOUD
# ==============================================================================
# Deploy do portfólio Juliana para servidor Oracle Cloud
# Servidor: 137.131.198.44
# Usuário: ubuntu
# Chave SSH: "C:\Users\Lucac\Downloads\ssh-key-2025-08-23.key.pub"

set -e  # Exit on any error

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configurações do servidor
# ⚠️  IMPORTANTE: Verifique se o IP está correto no console Oracle Cloud
# Se a instância foi reiniciada, o IP pode ter mudado
SERVER_IP="137.131.198.44"  # ← Atualize aqui se o IP mudou
SERVER_USER="ubuntu"
SSH_KEY_PATH="$HOME/.ssh/oracle-key"  # Chave copiada para WSL
PROJECT_REMOTE_PATH="/opt/portfolio"
DOMAIN="julianakaiza.site"

# Função de log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${PURPLE}[STEP]${NC} $1"
}

# ==============================================================================
# VERIFICAÇÕES INICIAIS
# ==============================================================================

log_step "🔍 Verificando pré-requisitos..."

# Verificar se estamos no diretório correto
if [ ! -f "app/package.json" ]; then
    log_error "Execute este script na raiz do projeto (onde está a pasta 'app')"
    exit 1
fi

# Verificar se a chave SSH existe
if [ ! -f "$SSH_KEY_PATH" ]; then
    log_error "Chave SSH não encontrada em: $SSH_KEY_PATH"
    log_warning "Verifique se o caminho está correto ou se você está no WSL"
    exit 1
fi

# Configurar permissões da chave SSH
chmod 600 "$SSH_KEY_PATH"

log_success "Pré-requisitos verificados"

# ==============================================================================
# FUNÇÃO PARA EXECUTAR COMANDOS REMOTOS
# ==============================================================================

run_remote() {
    local command="$1"
    log "Executando remotamente: $command"
    ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "$command"
}

# ==============================================================================
# VERIFICAR CONEXÃO COM SERVIDOR
# ==============================================================================

log_step "🌐 Testando conexão com o servidor..."

if ! ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no -o ConnectTimeout=10 "$SERVER_USER@$SERVER_IP" "echo 'Conexão OK'" >/dev/null 2>&1; then
    log_error "Não foi possível conectar ao servidor $SERVER_IP"
    log_warning "Verifique:"
    log_warning "  1. Se o IP está correto: $SERVER_IP"
    log_warning "  2. Se a chave SSH está correta: $SSH_KEY_PATH"
    log_warning "  3. Se o firewall permite conexões SSH (porta 22)"
    exit 1
fi

log_success "Conexão com servidor estabelecida"

# ==============================================================================
# PREPARAR SERVIDOR
# ==============================================================================

log_step "🔧 Preparando servidor..."

# Instalar Docker se não estiver instalado
run_remote "
if ! command -v docker &> /dev/null; then
    echo 'Instalando Docker...'
    sudo apt-get update
    sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo \"deb [arch=\$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \$(lsb_release -cs) stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo usermod -aG docker ubuntu
    sudo systemctl enable docker
    sudo systemctl start docker
else
    echo 'Docker já está instalado'
fi
"

# Instalar Docker Compose se não estiver instalado
run_remote "
if ! command -v docker-compose &> /dev/null; then
    echo 'Instalando Docker Compose...'
    sudo curl -L \"https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo 'Docker Compose já está instalado'
fi
"

# Criar diretório do projeto
run_remote "sudo mkdir -p $PROJECT_REMOTE_PATH && sudo chown ubuntu:ubuntu $PROJECT_REMOTE_PATH"

log_success "Servidor preparado"

# ==============================================================================
# UPLOAD DOS ARQUIVOS
# ==============================================================================

log_step "📤 Fazendo upload dos arquivos..."

# Criar arquivo temporário tar.gz para upload mais eficiente
log "Compactando projeto..."
tar -czf /tmp/portfolio.tar.gz --exclude=node_modules --exclude=.git --exclude=.next --exclude=nginx-cache .

# Upload do arquivo
log "Fazendo upload para o servidor..."
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no /tmp/portfolio.tar.gz "$SERVER_USER@$SERVER_IP:/tmp/"

# Extrair no servidor
run_remote "
cd $PROJECT_REMOTE_PATH
rm -rf portifolio
mkdir -p portifolio
cd portifolio
tar -xzf /tmp/portfolio.tar.gz
rm /tmp/portfolio.tar.gz
sudo chown -R ubuntu:ubuntu $PROJECT_REMOTE_PATH
"

# Limpar arquivo temporário local
rm -f /tmp/portfolio.tar.gz

log_success "Upload concluído"

# ==============================================================================
# CONFIGURAR FIREWALL
# ==============================================================================

log_step "🔥 Configurando firewall..."

run_remote "
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000
sudo ufw --force enable
"

log_success "Firewall configurado"

# ==============================================================================
# BUILD E DEPLOY
# ==============================================================================

log_step "🚀 Executando build e deploy..."

run_remote "
cd $PROJECT_REMOTE_PATH/portifolio

# Entrar no grupo docker (nova sessão)
newgrp docker << DOCKERCOMMANDS

# Ir para o diretório de infraestrutura
cd infra

# Parar containers existentes
docker-compose down --remove-orphans 2>/dev/null || true

# Limpar imagens antigas
docker system prune -f

# Build e start dos containers
docker-compose build --no-cache
docker-compose up -d

# Aguardar containers ficarem prontos
echo 'Aguardando containers ficarem prontos...'
sleep 30

# Verificar status
docker-compose ps

DOCKERCOMMANDS
"

log_success "Deploy executado"

# ==============================================================================
# VERIFICAÇÕES PÓS-DEPLOY
# ==============================================================================

log_step "✅ Verificando deploy..."

# Aguardar um pouco mais para estabilizar
sleep 10

# Verificar se aplicação está respondendo
if run_remote "curl -f http://localhost:3000 >/dev/null 2>&1"; then
    log_success "Aplicação Next.js está respondendo na porta 3000"
else
    log_warning "Aplicação pode ainda estar inicializando..."
fi

# Verificar se Nginx está funcionando
if run_remote "curl -f http://localhost:80 >/dev/null 2>&1"; then
    log_success "Nginx está funcionando na porta 80"
else
    log_warning "Nginx pode ainda estar inicializando..."
fi

# Mostrar status dos containers
log "Status dos containers:"
run_remote "cd $PROJECT_REMOTE_PATH/portifolio/infra && docker-compose ps"

# ==============================================================================
# CONFIGURAR DOMÍNIO (OPCIONAL)
# ==============================================================================

log_step "🌐 Configurações de domínio..."

log "Para configurar o domínio $DOMAIN:"
echo ""
log_warning "1. Configure os registros DNS:"
log_warning "   Tipo A: $DOMAIN → $SERVER_IP"
log_warning "   Tipo A: www.$DOMAIN → $SERVER_IP"
echo ""
log_warning "2. Aguarde a propagação DNS (5-30 minutos)"
echo ""
log_warning "3. Execute o comando para SSL:"
run_remote "echo 'sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN'"

# ==============================================================================
# INSTRUÇÕES FINAIS
# ==============================================================================

log_success "🎉 Deploy concluído!"
echo ""
echo "📋 URLs de Acesso:"
echo "   • Aplicação: http://$SERVER_IP:3000"
echo "   • Nginx: http://$SERVER_IP"
echo "   • Após configurar DNS: http://$DOMAIN"
echo ""
echo "🔧 Comandos úteis para monitoramento:"
echo "   • Conectar SSH: ssh -i \"$SSH_KEY_PATH\" $SERVER_USER@$SERVER_IP"
echo "   • Ver containers: docker-compose ps"
echo "   • Ver logs: docker-compose logs -f"
echo "   • Parar aplicação: docker-compose down"
echo "   • Reiniciar: docker-compose restart"
echo ""
echo "📁 Arquivos no servidor: $PROJECT_REMOTE_PATH/portifolio"
echo ""
log_success "✨ Deploy para Oracle Cloud concluído com sucesso!"
