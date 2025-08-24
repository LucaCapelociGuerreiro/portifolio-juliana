#!/bin/bash

# Diagnóstico baseado na documentação Oracle Cloud
# Referência: Security Lists mal configurados

SERVER_IP="137.131.170.86"
SSH_KEY_PATH="$HOME/.ssh/oracle-key"

echo "🔍 Diagnóstico baseado na documentação Oracle Cloud..."
echo "Problema: 'Error getting validation data' = Security Lists mal configurados"
echo ""

ssh -i "$SSH_KEY_PATH" ubuntu@$SERVER_IP "
echo '=== 📊 1. Diagnóstico de Porta (Documentação Oracle) ==='
echo 'Verificar se porta está fazendo listening:'
sudo netstat -tlnp | grep ':80 ' || echo 'PROBLEMA: Porta 80 não está em listening'

echo ''
echo 'Verificar com ss:'
sudo ss -tulnp | grep ':80 ' || echo 'PROBLEMA: Porta 80 não detectada com ss'

echo ''
echo '=== 🌐 2. Teste de Curl Local (Conforme Documentação) ==='
echo 'Teste curl local (como sugerido na doc Oracle):'
curl -i http://localhost:80 2>/dev/null | head -3 || echo 'PROBLEMA: Curl local falhou'

echo ''
echo '=== 🔥 3. Verificar Firewall Local ==='
echo 'Regras iptables que podem bloquear:'
sudo iptables -L INPUT | grep -E 'DROP|REJECT' || echo 'Nenhuma regra DROP/REJECT encontrada'

echo 'Status UFW:'
if command -v ufw &> /dev/null; then
    sudo ufw status
else
    echo 'UFW não instalado'
fi

echo ''
echo '=== 🐳 4. Status da Aplicação ==='
cd ~/portifolio-juliana/infra
echo 'Containers Docker:'
docker-compose ps

echo ''
echo 'Processos na porta 80:'
sudo lsof -i :80 2>/dev/null || echo 'Nenhum processo na porta 80'

echo ''
echo '=== 🔧 5. Correções Baseadas na Documentação ==='

# Conforme documentação: limpar firewall local mal configurado
echo 'Aplicando correções de firewall local...'
sudo iptables -F
sudo iptables -X
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -P OUTPUT ACCEPT

# Desabilitar UFW se ativo
sudo ufw --force disable 2>/dev/null || true

echo ''
echo 'Reiniciando aplicação para garantir porta 80 disponível...'
docker-compose down --remove-orphans
sleep 5

# Verificar se porta está livre
if sudo netstat -tlnp | grep -q ':80 '; then
    echo 'Matando processos restantes na porta 80...'
    sudo pkill -f nginx 2>/dev/null || true
    sudo systemctl stop nginx 2>/dev/null || true
    sleep 3
fi

docker-compose up -d

echo ''
echo '=== ✅ 6. Verificação Pós-Correção ==='
sleep 15

echo 'Containers após restart:'
docker-compose ps

echo 'Porta 80 após correções:'
sudo netstat -tlnp | grep ':80 ' || echo 'Porta 80 ainda não está disponível'

echo 'Teste curl pós-correção:'
curl -i http://localhost:80 2>/dev/null | head -1 || echo 'Curl ainda falha'

echo ''
echo '=== 🔒 7. Teste SSL Após Correções ==='
echo 'Tentando SSL com diagnóstico detalhado...'

# Parar aplicação para certbot usar porta 80
docker-compose down
sleep 5

# Tentar certbot com verbose para mais detalhes
sudo certbot certonly --standalone \
  -d julianakaiza.site \
  --non-interactive \
  --agree-tos \
  --email juliana_kaiza@outlook.com \
  --verbose \
  --debug

certbot_result=\$?

echo ''
if [ \$certbot_result -eq 0 ]; then
    echo '🎉 SSL CONFIGURADO COM SUCESSO!'
    sudo ls -la /etc/letsencrypt/live/julianakaiza.site/
    
    echo 'Reiniciando aplicação...'
    docker-compose up -d
    
    echo '✅ Próximo passo: Configurar Nginx com SSL'
else
    echo '❌ SSL ainda falhou.'
    echo '📋 AÇÃO NECESSÁRIA: Verificar Security Lists no Oracle Cloud Console'
    echo '   1. Compute → Instances → julianakaiza_site'
    echo '   2. Clique na Subnet'
    echo '   3. Security Lists → Default Security List'  
    echo '   4. Add Ingress Rule: Source 0.0.0.0/0, Protocol TCP, Port 80'
    
    echo ''
    echo 'Restaurando aplicação...'
    docker-compose up -d
fi
"

echo ""
echo "🎯 Baseado na documentação Oracle:"
echo "Se SSL ainda falhar = Security Lists da instância mal configurados"
echo "Verificar OBRIGATORIAMENTE no Oracle Cloud Console!"
