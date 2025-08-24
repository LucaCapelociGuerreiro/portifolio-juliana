#!/bin/bash

# Script para corrigir problemas de firewall/Security Lists Oracle Cloud
SERVER_IP="137.131.170.86"
SSH_KEY_PATH="$HOME/.ssh/oracle-key"
DOMAIN="julianakaiza.space"

echo "🔧 Diagnosticando e corrigindo problemas de firewall Oracle Cloud..."
echo ""

ssh -i "$SSH_KEY_PATH" ubuntu@$SERVER_IP "
echo '=== 🔍 1. Diagnóstico Completo ==='

echo 'Status dos containers:'
cd ~/portifolio-juliana/infra
docker-compose ps

echo ''
echo 'Teste local porta 80:'
curl -I http://localhost:80 2>/dev/null || echo 'FALHA: Aplicação não responde localmente'

echo ''
echo 'Portas em listening:'
sudo netstat -tlnp | grep ':80 ' || echo 'Porta 80 não está em listening'

echo ''
echo 'Verificar se há firewall local:'
sudo iptables -L INPUT | head -5
if command -v ufw &> /dev/null; then
    sudo ufw status
else
    echo 'UFW não instalado'
fi

echo ''
echo '=== 🛠️ 2. Corrigindo Firewall Local ==='

# Desabilitar firewall local se ativo
if sudo ufw status | grep -q 'Status: active'; then
    echo 'Desabilitando UFW...'
    sudo ufw --force disable
fi

# Limpar regras iptables restritivas
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT  
sudo iptables -P OUTPUT ACCEPT
sudo iptables -F

echo ''
echo '=== 🐳 3. Reiniciando Aplicação ==='

# Parar containers
docker-compose down --remove-orphans

# Aguardar um momento
sleep 5

# Verificar se porta 80 está livre
if sudo netstat -tlnp | grep -q ':80 '; then
    echo 'Porta 80 ainda ocupada, matando processos...'
    sudo pkill -f nginx || true
    sudo systemctl stop nginx || true
    sleep 3
fi

# Subir containers novamente
docker-compose up -d

echo ''
echo '=== ✅ 4. Verificação Final ==='
sleep 15

echo 'Status containers:'
docker-compose ps

echo ''
echo 'Teste local:'
curl -I http://localhost:80

echo ''
echo 'Portas abertas:'
sudo netstat -tlnp | grep ':80 '

echo ''
echo '=== 🌐 5. Teste DNS ==='
nslookup $DOMAIN
nslookup www.$DOMAIN

echo ''
echo '=== 🔒 6. Testando SSL Após Correções ==='
echo 'Aguardando 30 segundos para estabilizar...'
sleep 30

# Tentar SSL novamente
sudo certbot certonly --standalone \
  --non-interactive \
  --agree-tos \
  --email juliana_kaiza@outlook.com \
  --domains $DOMAIN,www.$DOMAIN \
  --verbose

if [ \$? -eq 0 ]; then
    echo '✅ SSL configurado com sucesso!'
    sudo ls -la /etc/letsencrypt/live/$DOMAIN/
else
    echo '❌ SSL ainda falhou. Verificar Security Lists no Oracle Cloud Console!'
fi
"

echo ""
echo "🎯 IMPORTANTE:"
echo "1. Se o SSL ainda falhar, OBRIGATORIAMENTE verifique:"
echo "   - Oracle Cloud Console → Compute → Instances → julianakaiza_site"
echo "   - Clique na Subnet → Security Lists → Add Ingress Rules"
echo "   - Adicione: 0.0.0.0/0 TCP 80, 443, 3000"
echo ""
echo "2. URLs para testar após sucesso:"
echo "   - http://$DOMAIN"
echo "   - https://$DOMAIN"
