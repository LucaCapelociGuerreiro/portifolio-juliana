#!/bin/bash

# Script para verificar status do deployment
SERVER_IP="137.131.198.44"
SSH_KEY_PATH="$HOME/.ssh/oracle-key"

echo "🔍 Verificando status do deployment..."
echo ""

ssh -i "$SSH_KEY_PATH" ubuntu@$SERVER_IP "
echo '=== 📊 Status dos Containers ==='
cd ~/portifolio-juliana/infra
docker-compose ps

echo ''
echo '=== 🌐 Testando Aplicação Localmente ==='
echo 'Teste porta 3000 (Next.js):'
curl -s -o /dev/null -w 'Status: %{http_code} | Tempo: %{time_total}s\n' http://localhost:3000 || echo 'Falha na conexão'

echo 'Teste porta 80 (Nginx):'
curl -s -o /dev/null -w 'Status: %{http_code} | Tempo: %{time_total}s\n' http://localhost:80 || echo 'Falha na conexão'

echo ''
echo '=== 💾 Uso de Recursos ==='
echo 'Memória:'
free -h | grep Mem

echo 'Espaço em disco:'
df -h / | tail -1

echo ''
echo '=== 🚀 URLs de Acesso ==='
echo 'Aplicação direta: http://$SERVER_IP:3000'
echo 'Via Nginx: http://$SERVER_IP'
echo 'Após configurar DNS: http://julianakaiza.site'
echo 'HTTPS (após SSL): https://julianakaiza.site'
"

echo ""
echo "🌐 Próximos passos para configurar o domínio:"
echo "1. Configure DNS: julianakaiza.site → $SERVER_IP"
echo "2. Aguarde propagação (5-30 minutos)"
echo "3. Configure SSL com certbot"
echo "4. Teste: https://julianakaiza.site"
