#!/bin/bash

# Script final para resolver problema de SSL com DNS inconsistente
SERVER_IP="137.131.170.86"
SSH_KEY_PATH="$HOME/.ssh/oracle-key"

echo "🔧 Corrigindo problema de DNS inconsistente e SSL..."
echo ""

echo "🚨 PROBLEMA IDENTIFICADO:"
echo "- julianakaiza.site → 137.131.170.86 ✅ (correto)"
echo "- www.julianakaiza.site → 137.131.198.44 ❌ (errado)"
echo ""

ssh -i "$SSH_KEY_PATH" ubuntu@$SERVER_IP "
echo '=== 🔍 1. Verificando DNS atual ==='
echo 'DNS julianakaiza.site:'
nslookup julianakaiza.site | grep Address | tail -1

echo 'DNS www.julianakaiza.site:'
nslookup www.julianakaiza.site | grep Address | tail -1

echo ''
echo '=== 🛠️ 2. Corrigindo firewall local ==='
# Limpar regras restritivas
sudo iptables -F
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -P OUTPUT ACCEPT

# Desabilitar UFW se ativo
sudo ufw --force disable 2>/dev/null || true

echo ''
echo '=== 🐳 3. Verificando aplicação ==='
cd ~/portifolio-juliana/infra

echo 'Status containers:'
docker-compose ps

echo 'Teste local porta 80:'
curl -s -I http://localhost:80 | head -1 || echo 'Aplicação não responde'

echo 'Portas em listening:'
sudo netstat -tlnp | grep :80

echo ''
echo '=== 🔒 4. Tentando SSL apenas para domínio principal ==='
echo 'Como www ainda aponta para IP errado, vamos configurar SSL apenas para julianakaiza.site'

# Parar containers para liberar porta 80
docker-compose down

# Aguardar porta ficar livre
sleep 5

# Tentar SSL apenas para domínio principal (que tem DNS correto)
sudo certbot certonly --standalone \
  -d julianakaiza.site \
  --non-interactive \
  --agree-tos \
  --email juliana_kaiza@outlook.com \
  --verbose

if [ \$? -eq 0 ]; then
    echo ''
    echo '✅ SSL configurado com sucesso para julianakaiza.site!'
    
    # Verificar certificados
    sudo ls -la /etc/letsencrypt/live/julianakaiza.site/
    
    echo ''
    echo '=== 🚀 5. Configurando Nginx com SSL ==='
    
    # Backup da configuração original
    cp docker-compose.yml docker-compose.yml.backup
    
    # Criar configuração Nginx com SSL
    cat > nginx-ssl.conf << 'NGINXEOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # HTTP to HTTPS redirect
    server {
        listen 80;
        server_name julianakaiza.site;
        return 301 https://\$server_name\$request_uri;
    }
    
    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name julianakaiza.site;
        
        # SSL Configuration
        ssl_certificate /etc/letsencrypt/live/julianakaiza.site/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/julianakaiza.site/privkey.pem;
        
        # SSL Security
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        
        # Security Headers
        add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;
        add_header X-Frame-Options DENY always;
        add_header X-Content-Type-Options nosniff always;
        
        # Proxy to Next.js
        location / {
            proxy_pass http://app:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
        }
    }
}
NGINXEOF

    # Atualizar docker-compose para incluir certificados SSL
    sed -i '/nginx-cache/a\\      - /etc/letsencrypt:/etc/letsencrypt:ro' docker-compose.yml
    sed -i 's|./nginx.conf|./nginx-ssl.conf|g' docker-compose.yml
    sed -i 's|\"80:80\"|\"80:80\"\\n      - \"443:443\"|g' docker-compose.yml
    
    # Iniciar com SSL
    docker-compose up -d
    
    echo ''
    echo '=== ✅ 6. Verificação final ==='
    sleep 15
    
    echo 'Status containers:'
    docker-compose ps
    
    echo 'Teste HTTPS:'
    curl -k -I https://localhost:443 | head -1 || echo 'HTTPS não responde'
    
    echo ''
    echo '🎉 SSL CONFIGURADO COM SUCESSO!'
    echo '📋 URLs de acesso:'
    echo '   - http://julianakaiza.site (redireciona para HTTPS)'
    echo '   - https://julianakaiza.site'
    echo ''
    echo '⚠️  IMPORTANTE: Atualize o DNS para www.julianakaiza.site → 137.131.170.86'
    echo '   Depois execute: sudo certbot certonly --standalone -d www.julianakaiza.site'
    
else
    echo ''
    echo '❌ SSL falhou. Verificar:'
    echo '1. Security Lists no Oracle Cloud Console'
    echo '2. DNS propagação'
    echo '3. Firewall/iptables'
    
    # Restaurar aplicação
    docker-compose up -d
fi
"

echo ""
echo "🎯 PRÓXIMOS PASSOS:"
echo "1. ✅ Se SSL funcionou, acesse: https://julianakaiza.site"
echo "2. 🔧 Corrija DNS: www.julianakaiza.site → 137.131.170.86"
echo "3. 🔒 Depois adicione SSL para www também"
