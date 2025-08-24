#!/bin/bash

# Script para diagnosticar e corrigir problema da porta 80
SERVER_IP="137.131.198.44"
SSH_KEY_PATH="$HOME/.ssh/oracle-key"

echo "🔍 Diagnosticando problema da porta 80..."
echo ""

ssh -i "$SSH_KEY_PATH" ubuntu@$SERVER_IP "
echo '=== 📡 1. Verificando o que está usando a porta 80 ==='
echo 'Processos na porta 80:'
sudo netstat -tlnp | grep :80 || echo 'Nenhum processo encontrado'

echo ''
echo 'Detalhes via lsof:'
sudo lsof -i :80 2>/dev/null || echo 'Nenhum processo encontrado'

echo ''
echo '=== 🌐 2. Verificando Nginx do sistema ==='
echo 'Status do Nginx do sistema:'
sudo systemctl status nginx --no-pager -l 2>/dev/null || echo 'Nginx não instalado no sistema'

echo ''
echo 'Processos nginx:'
ps aux | grep nginx | grep -v grep || echo 'Nenhum processo nginx encontrado'

echo ''
echo '=== 🐳 3. Status dos Containers Docker ==='
docker ps -a

echo ''
echo '=== 🔧 4. Soluções Automáticas ==='

# Verificar se há Nginx do sistema rodando
if sudo systemctl is-active nginx >/dev/null 2>&1; then
    echo 'Parando Nginx do sistema...'
    sudo systemctl stop nginx
    sudo systemctl disable nginx
    echo 'Nginx do sistema parado'
else
    echo 'Nginx do sistema não está rodando'
fi

# Limpar containers antigos
echo 'Limpando containers...'
cd ~/portifolio-juliana/infra
docker-compose down --remove-orphans

echo ''
echo '=== 🚀 5. Reiniciando Serviços ==='
echo 'Iniciando containers novamente...'
docker-compose up -d

echo ''
echo 'Status final:'
docker-compose ps
"

echo ""
echo "🎯 Se ainda houver problemas:"
echo "1. Identifique o processo: sudo netstat -tlnp | grep :80"
echo "2. Mate o processo: sudo kill -9 <PID>"
echo "3. Reinicie containers: docker-compose up -d"
