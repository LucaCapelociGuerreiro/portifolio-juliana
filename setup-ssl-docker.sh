#!/bin/bash

# Script para configurar SSL com Docker
SERVER_IP="137.131.198.44"
SSH_KEY_PATH="$HOME/.ssh/oracle-key"
DOMAIN="julianakaiza.site"

echo "🔒 Configurando SSL para Docker..."
echo ""

ssh -i "$SSH_KEY_PATH" ubuntu@$SERVER_IP "
echo '=== 🛑 1. Parando containers temporariamente ==='
cd ~/portifolio-juliana/infra
docker-compose down

echo ''
echo '=== 🔒 2. Obtendo certificados SSL ==='
# Usar certbot standalone (sem nginx)
sudo certbot certonly --standalone \
  -d $DOMAIN \
  -d www.$DOMAIN \
  --non-interactive \
  --agree-tos \
  --email juliana_kaiza@outlook.com

echo ''
echo '=== 📋 3. Verificando certificados ==='
sudo ls -la /etc/letsencrypt/live/$DOMAIN/

echo ''
echo '=== 🔧 4. Configurando Docker para SSL ==='
# Criar arquivo de configuração SSL para o Docker
cat > ~/ssl-docker-compose.yml << 'EOF'
version: '2.4'

services:
  app:
    build:
      context: ../app
      dockerfile: Dockerfile
      args:
        - NODE_ENV=production
    container_name: portfolio-app
    mem_limit: 400m
    mem_reservation: 200m
    cpus: 0.5
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
      - NODE_OPTIONS=--max-old-space-size=256
      - PORT=3000
      - HOSTNAME=0.0.0.0
    ports:
      - '3000:3000'
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'wget', '--no-verbose', '--tries=1', '--spider', 'http://127.0.0.1:3000/']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: 'json-file'
      options:
        max-size: '10m'
        max-file: '3'
    networks:
      - portfolio-network

  nginx:
    image: nginx:alpine
    container_name: portfolio-nginx
    mem_limit: 100m
    mem_reservation: 50m
    cpus: 0.2
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx-ssl.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
      - ./nginx-cache:/var/cache/nginx
    depends_on:
      - app
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'wget', '--no-verbose', '--tries=1', '--spider', 'http://localhost:80/']
      interval: 30s
      timeout: 5s
      retries: 3
    logging:
      driver: 'json-file'
      options:
        max-size: '5m'
        max-file: '2'
    networks:
      - portfolio-network

networks:
  portfolio-network:
    driver: bridge

volumes:
  nginx-cache:
    driver: local
  app-cache:
    driver: local
EOF

echo ''
echo '=== ⚙️ 5. Criando configuração Nginx com SSL ==='
cat > ~/nginx-ssl.conf << 'NGINXEOF'
# Nginx configuration with SSL
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
    
    # Redirect HTTP to HTTPS
    server {
        listen 80;
        server_name julianakaiza.site www.julianakaiza.site;
        return 301 https://\$server_name\$request_uri;
    }
    
    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name julianakaiza.site www.julianakaiza.site;
        
        # SSL Configuration
        ssl_certificate /etc/letsencrypt/live/julianakaiza.site/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/julianakaiza.site/privkey.pem;
        
        # SSL Security
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;
        
        # Security Headers
        add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;
        add_header X-Frame-Options DENY always;
        add_header X-Content-Type-Options nosniff always;
        add_header X-XSS-Protection \"1; mode=block\" always;
        
        # Gzip
        gzip on;
        gzip_vary on;
        gzip_min_length 1024;
        gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
        
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
            
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }
        
        # Static files caching
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            proxy_pass http://app:3000;
            proxy_set_header Host \$host;
            expires 1y;
            add_header Cache-Control \"public, immutable\";
        }
    }
}
NGINXEOF

echo ''
echo '=== 🚀 6. Iniciando com SSL ==='
# Mover arquivos para o lugar certo
mv ~/ssl-docker-compose.yml ~/portifolio-juliana/infra/docker-compose-ssl.yml
mv ~/nginx-ssl.conf ~/portifolio-juliana/infra/

# Usar a nova configuração
cd ~/portifolio-juliana/infra
docker-compose -f docker-compose-ssl.yml up -d

echo ''
echo '=== ✅ 7. Verificando SSL ==='
sleep 10
docker-compose -f docker-compose-ssl.yml ps

echo ''
echo '=== 🌐 8. Testando ==='
echo 'HTTP (deve redirecionar):'
curl -I http://localhost:80 2>/dev/null || echo 'Falha'

echo 'HTTPS:'
curl -I -k https://localhost:443 2>/dev/null || echo 'Falha'
"

echo ""
echo "🎯 Após executar:"
echo "1. Teste: https://julianakaiza.site"
echo "2. Verifique redirecionamento: http://julianakaiza.site → https://"
echo "3. Configure renovação automática se necessário"
