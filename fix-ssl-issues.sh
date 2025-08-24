#!/bin/bash

# Script para diagnosticar e corrigir problemas de SSL
SERVER_IP="137.131.198.44"
SSH_KEY_PATH="$HOME/.ssh/oracle-key"
DOMAIN="julianakaiza.site"

echo "🔍 Diagnosticando problemas de SSL..."
echo ""

ssh -i "$SSH_KEY_PATH" ubuntu@$SERVER_IP "
echo '=== 📊 1. Verificando DNS ==='
echo 'DNS para $DOMAIN:'
nslookup $DOMAIN | grep Address | tail -1

echo 'DNS para www.$DOMAIN:'
nslookup www.$DOMAIN | grep Address | tail -1

echo ''
echo '=== 🌐 2. Testando Conectividade Local ==='
echo 'Porta 80 (Nginx):'
curl -s -o /dev/null -w 'Status: %{http_code}\n' http://localhost:80 || echo 'FALHA'

echo 'Porta 3000 (App):'
curl -s -o /dev/null -w 'Status: %{http_code}\n' http://localhost:3000 || echo 'FALHA'

echo ''
echo '=== 🔥 3. Verificando Firewall Local (Ubuntu) ==='
if command -v ufw &> /dev/null; then
    sudo ufw status
else
    echo 'UFW não instalado (OK para Oracle Cloud)'
fi

echo ''
echo '=== 📡 4. Verificando Portas Abertas ==='
netstat -tlnp | grep ':80 '
netstat -tlnp | grep ':443 '

echo ''
echo '=== 🐳 5. Status dos Containers ==='
cd ~/portifolio-juliana/infra
docker-compose ps

echo ''
echo '=== 📋 6. Configuração Nginx ==='
docker-compose exec nginx nginx -t 2>/dev/null || echo 'Nginx config OK ou container não rodando'

echo ''
echo '=== 🔧 7. Soluções Recomendadas ==='
echo '1. Aguarde DNS propagar completamente (pode demorar até 48h)'
echo '2. Verifique Security Groups no Oracle Cloud Console'
echo '3. Certifique-se que portas 80 e 443 estão liberadas para 0.0.0.0/0'
echo '4. Tente SSL novamente após DNS estar 100% propagado'
"

echo ""
echo "🎯 Próximos passos:"
echo "1. Verifique Security Groups no Oracle Cloud"
echo "2. Aguarde DNS propagar (teste: nslookup $DOMAIN)"
echo "3. Quando DNS estiver correto, execute:"
echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
