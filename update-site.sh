#!/bin/bash

# Script de Atualização Rápida - Portfolio Juliana Kaiza
# Uso: ./update-site.sh

echo "🔄 Atualizando site julianakaiza.site..."

ssh -i ssh-key-2025-08-24.key ubuntu@137.131.170.86 "
    cd /home/ubuntu/portfolio-juliana && 
    echo '📥 Baixando atualizações...' &&
    git pull origin main && 
    echo '📦 Instalando dependências...' &&
    npm install && 
    echo '🏗️ Fazendo build...' &&
    npm run build && 
    echo '🔄 Reiniciando aplicação...' &&
    pm2 restart portfolio-juliana &&
    echo '✅ Site atualizado com sucesso!'
"

echo "🌐 Site disponível em: https://julianakaiza.site"
echo "📊 Para ver logs: ssh -i ssh-key-2025-08-24.key ubuntu@137.131.170.86 'pm2 logs portfolio-juliana'"
