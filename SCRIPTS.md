# 🚀 Scripts de Deploy - Portfolio Juliana Kaiza

Este projeto inclui scripts otimizados para deploy e atualizações rápidas.

## 📁 Scripts Disponíveis

### 1. `deploy.sh` - Deploy Completo/Incremental

**Uso:**
```bash
# Deploy rápido (apenas código + build + restart)
./deploy.sh 137.131.170.86 ssh-key-2025-08-24.key

# Deploy completo (inclui configuração de infraestrutura)
./deploy.sh 137.131.170.86 ssh-key-2025-08-24.key --full
```

**Características:**
- ✅ **Detecção automática**: Identifica se é o primeiro deploy
- ✅ **Deploy incremental**: Pula configurações já feitas
- ✅ **Deploy completo**: Configura tudo do zero com `--full`
- ✅ **Verificações**: Testa aplicação, Nginx e acesso externo
- ✅ **Logs coloridos**: Output organizado e fácil de ler

### 2. `update-site.sh` - Atualização Ultra-Rápida

**Uso:**
```bash
# Atualização completa (sync + build + restart)
./update-site.sh

# Apenas rebuild (sem sync de arquivos)
./update-site.sh --build-only
```

**Características:**
- ⚡ **Super rápido**: ~30-60 segundos
- ✅ **Verificação Git**: Avisa sobre mudanças não commitadas
- ✅ **Logs em tempo real**: Mostra logs recentes após deploy
- ✅ **Modo build-only**: Para quando só mudou configuração

## 🔄 Fluxo de Trabalho Recomendado

### Para Mudanças de Código:
```bash
# 1. Desenvolver localmente
npm run dev

# 2. Testar mudanças
npm run build

# 3. Commit
git add .
git commit -m "Suas mudanças"

# 4. Deploy rápido
./update-site.sh
```

### Para Primeiro Deploy:
```bash
./deploy.sh 137.131.170.86 ssh-key-2025-08-24.key --full
```

### Para Mudanças de Infraestrutura:
```bash
./deploy.sh 137.131.170.86 ssh-key-2025-08-24.key --full
```

## 🎯 Quando Usar Cada Script

| Cenário | Script | Comando |
|---------|--------|---------|
| **Primeiro deploy** | `deploy.sh` | `./deploy.sh IP KEY --full` |
| **Mudança no código** | `update-site.sh` | `./update-site.sh` |
| **Nova dependência** | `update-site.sh` | `./update-site.sh` |
| **Mudança de config** | `update-site.sh` | `./update-site.sh --build-only` |
| **Problema na infra** | `deploy.sh` | `./deploy.sh IP KEY --full` |
| **Novo servidor** | `deploy.sh` | `./deploy.sh IP KEY --full` |

## ⚙️ O que Cada Script Faz

### `deploy.sh` (Deploy Rápido)
1. 📁 Copia arquivos (rsync)
2. 📦 Instala dependências (se necessário)
3. 🏗️ Faz build
4. 🔄 Reinicia PM2
5. ✅ Verifica status

### `deploy.sh --full` (Deploy Completo)
1. 📁 Copia arquivos
2. 📦 Instala todas as dependências
3. 🏗️ Faz build
4. ⚙️ Configura PM2 + Nginx + Firewall + SSL
5. 🔄 Reinicia serviços
6. ✅ Testa tudo

### `update-site.sh` (Atualização)
1. 🔍 Verifica Git status
2. 📁 Sync arquivos (rsync)
3. 📦 Verifica dependências
4. 🏗️ Build
5. 🔄 Restart PM2
6. 📋 Mostra logs

## 🛠️ Comandos Úteis

```bash
# Ver logs em tempo real
ssh -i ssh-key-2025-08-24.key ubuntu@137.131.170.86 'pm2 logs portfolio-juliana'

# Status da aplicação
ssh -i ssh-key-2025-08-24.key ubuntu@137.131.170.86 'pm2 status'

# Monitoramento
ssh -i ssh-key-2025-08-24.key ubuntu@137.131.170.86 'pm2 monit'

# Reiniciar manualmente
ssh -i ssh-key-2025-08-24.key ubuntu@137.131.170.86 'pm2 restart portfolio-juliana'

# Verificar Nginx
ssh -i ssh-key-2025-08-24.key ubuntu@137.131.170.86 'sudo systemctl status nginx'
```

## 🚨 Troubleshooting

### Script falha na conexão SSH:
```bash
# Verificar permissões da chave
chmod 600 ssh-key-2025-08-24.key

# Testar conexão
ssh -i ssh-key-2025-08-24.key ubuntu@137.131.170.86 'echo "Conexão OK"'
```

### Aplicação não inicia:
```bash
# Ver logs de erro
ssh -i ssh-key-2025-08-24.key ubuntu@137.131.170.86 'pm2 logs portfolio-juliana --err'

# Rebuild completo
./deploy.sh 137.131.170.86 ssh-key-2025-08-24.key --full
```

### Site não acessível:
```bash
# Verificar firewall
ssh -i ssh-key-2025-08-24.key ubuntu@137.131.170.86 'sudo iptables -L INPUT'

# Verificar Nginx
ssh -i ssh-key-2025-08-24.key ubuntu@137.131.170.86 'sudo nginx -t'
```

## 📊 Performance dos Scripts

| Script | Tempo Médio | Uso |
|--------|-------------|-----|
| `update-site.sh` | ~45s | Mudanças diárias |
| `deploy.sh` | ~2min | Deploy incremental |
| `deploy.sh --full` | ~5min | Setup completo |

## 🔐 Segurança

- ✅ Chaves SSH com permissões corretas (600)
- ✅ Exclusão automática de arquivos sensíveis
- ✅ Verificação de conexão antes de executar
- ✅ Logs sem informações sensíveis
