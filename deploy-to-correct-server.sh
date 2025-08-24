#!/bin/bash

# Script para deploy no servidor correto (onde DNS aponta)
CORRECT_SERVER_IP="137.131.170.86"  # Servidor onde DNS aponta
SSH_KEY_PATH="$HOME/.ssh/oracle-key"

echo "🚀 Fazendo deploy no servidor correto onde DNS aponta..."
echo "Servidor: $CORRECT_SERVER_IP"

# Upload dos arquivos para o servidor correto
echo "📤 Fazendo upload dos arquivos..."
tar -czf /tmp/portfolio.tar.gz --exclude=node_modules --exclude=.git --exclude=.next --exclude=nginx-cache .
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no /tmp/portfolio.tar.gz ubuntu@$CORRECT_SERVER_IP:/tmp/
rm -f /tmp/portfolio.tar.gz

# Configurar e fazer deploy no servidor correto
ssh -i "$SSH_KEY_PATH" ubuntu@$CORRECT_SERVER_IP "
echo '=== 📦 Extraindo arquivos ==='
sudo mkdir -p /opt/portfolio
sudo chown ubuntu:ubuntu /opt/portfolio
cd /opt/portfolio
rm -rf portifolio
mkdir -p portifolio
cd portifolio
tar -xzf /tmp/portfolio.tar.gz
rm /tmp/portfolio.tar.gz

echo ''
echo '=== 🐳 Instalando Docker se necessário ==='
if ! command -v docker &> /dev/null; then
    echo 'Instalando Docker...'
    sudo apt-get update
    sudo apt-get install -y docker.io docker-compose
    sudo usermod -aG docker ubuntu
    sudo systemctl enable docker
    sudo systemctl start docker
fi

echo ''
echo '=== 🚀 Fazendo deploy ==='
cd infra
sudo systemctl stop nginx 2>/dev/null || true
sudo systemctl disable nginx 2>/dev/null || true

# Build e deploy
docker-compose down --remove-orphans 2>/dev/null || true
docker-compose build --no-cache
docker-compose up -d

echo ''
echo '=== ✅ Verificando deploy ==='
sleep 20
docker-compose ps
curl -I http://localhost:80 2>/dev/null || echo 'Aguardando aplicação...'
"

echo ""
echo "🎯 Deploy concluído no servidor correto!"
echo "Agora você pode tentar SSL novamente no servidor $CORRECT_SERVER_IP"
