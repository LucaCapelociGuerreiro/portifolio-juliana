#!/bin/bash

# Script para atualizar código no servidor com versão correta
SERVER_IP="137.131.170.86"
SSH_KEY_PATH="$HOME/.ssh/oracle-key"

echo "🔄 Atualizando código no servidor com versão correta..."
echo ""

# Verificar se estamos no diretório correto
if [ ! -f "app/package.json" ]; then
    echo "❌ Execute este script na raiz do projeto (onde está a pasta 'app')"
    exit 1
fi

echo "📦 Compactando versão atual do projeto..."
tar -czf /tmp/portfolio-update.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=.next \
    --exclude=nginx-cache \
    --exclude=.vercel \
    .

echo "📤 Fazendo upload da versão atualizada..."
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no /tmp/portfolio-update.tar.gz ubuntu@$SERVER_IP:/tmp/

echo "🔄 Atualizando código no servidor..."
ssh -i "$SSH_KEY_PATH" ubuntu@$SERVER_IP "
echo '=== 🛑 Parando containers ==='
cd ~/portifolio-juliana/infra
docker-compose down

echo ''
echo '=== 📁 Fazendo backup da versão atual ==='
cd /opt/portfolio
sudo mv portifolio portifolio-backup-\$(date +%Y%m%d-%H%M%S)

echo ''
echo '=== 📦 Extraindo nova versão ==='
sudo mkdir -p portifolio
sudo chown ubuntu:ubuntu portifolio
cd portifolio
tar -xzf /tmp/portfolio-update.tar.gz
rm /tmp/portfolio-update.tar.gz

echo ''
echo '=== 🐳 Rebuilding containers com nova versão ==='
cd infra
docker-compose build --no-cache

echo ''
echo '=== 🚀 Iniciando com nova versão ==='
docker-compose up -d

echo ''
echo '=== ✅ Verificando deploy ==='
sleep 20
docker-compose ps

echo ''
echo 'Testando aplicação:'
curl -s -I http://localhost:3000 | head -1
curl -s -I http://localhost:80 | head -1
"

# Limpar arquivo temporário
rm -f /tmp/portfolio-update.tar.gz

echo ""
echo "✅ Atualização concluída!"
echo ""
echo "🌐 Teste as URLs:"
echo "  • http://$SERVER_IP:3000 (aplicação direta)"
echo "  • http://$SERVER_IP (via nginx)"
echo ""
echo "🎯 A aplicação agora deve mostrar:"
echo "  • Logo 'Juliana.seo'"
echo "  • Foto de perfil da Juliana"
echo "  • Design moderno com layout correto"
