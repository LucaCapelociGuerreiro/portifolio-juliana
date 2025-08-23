#!/bin/bash

# Script para verificar a estrutura do projeto no servidor

echo "=== Verificação da Estrutura do Projeto ==="
echo ""
echo "Diretório atual: $(pwd)"
echo ""
echo "Conteúdo do diretório atual:"
ls -la
echo ""
echo "Verificando se ../app/package.json existe:"
if [ -f "../app/package.json" ]; then
    echo "✅ ../app/package.json encontrado"
else
    echo "❌ ../app/package.json NÃO encontrado"
fi
echo ""
echo "Verificando se docker-compose.yml existe:"
if [ -f "docker-compose.yml" ]; then
    echo "✅ docker-compose.yml encontrado"
else
    echo "❌ docker-compose.yml NÃO encontrado"
fi
echo ""
echo "Estrutura do projeto:"
find .. -name "package.json" -o -name "docker-compose.yml" -o -name "Dockerfile" 2>/dev/null
echo ""
echo "Diretórios disponíveis:"
ls -la ..
echo ""
echo "=== Fim da Verificação ==="