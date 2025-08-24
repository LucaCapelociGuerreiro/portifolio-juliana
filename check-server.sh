#!/bin/bash

# Script para verificar status do servidor Oracle Cloud

SERVER_IP="137.131.198.44"
SSH_KEY_PATH="$HOME/.ssh/oracle-key"

echo "🔍 Verificando servidor Oracle Cloud..."
echo "IP: $SERVER_IP"
echo ""

echo "1. Testando conectividade básica..."
if ping -c 2 -W 5 $SERVER_IP >/dev/null 2>&1; then
    echo "✅ Ping OK - Servidor está online"
else
    echo "❌ Ping falhou - Servidor pode estar offline"
fi

echo ""
echo "2. Testando porta SSH (22)..."
if timeout 10 bash -c "</dev/tcp/$SERVER_IP/22" 2>/dev/null; then
    echo "✅ Porta SSH está aberta"
else
    echo "❌ Porta SSH não está respondendo"
fi

echo ""
echo "3. Testando autenticação SSH..."
if ssh -i "$SSH_KEY_PATH" -o ConnectTimeout=10 -o StrictHostKeyChecking=no ubuntu@$SERVER_IP "echo 'SSH OK'" 2>/dev/null; then
    echo "✅ SSH funcionando - Pronto para deploy!"
else
    echo "❌ SSH não está funcionando"
fi

echo ""
echo "📋 Próximos passos se houver problemas:"
echo "1. Verifique no console Oracle Cloud: https://cloud.oracle.com/"
echo "2. Inicie a instância se estiver parada"
echo "3. Verifique se o IP mudou e atualize o script"
echo "4. Verifique os Security Groups (permitir porta 22, 80, 443)"
