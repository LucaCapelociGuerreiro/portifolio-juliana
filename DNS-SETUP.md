# Configuração DNS para julianakaiza.site

## 📋 Pré-requisitos

- Servidor Ubuntu 20.04 configurado com o script `cloud-init-script.yml`
- IP público do servidor
- Acesso ao painel de controle do domínio julianakaiza.site

## 🌐 Configuração DNS Necessária

### Registros DNS Obrigatórios

Configure os seguintes registros DNS no painel do seu provedor de domínio:

```
Tipo: A
Nome: @
Valor: SEU_IP_PUBLICO
TTL: 300 (5 minutos)

Tipo: A
Nome: www
Valor: SEU_IP_PUBLICO
TTL: 300 (5 minutos)
```

### Exemplo de Configuração

Se o IP do seu servidor for `203.0.113.10`:

```
A    @      203.0.113.10
A    www    203.0.113.10
```

## ⏱️ Tempo de Propagação

- **Mínimo**: 5-15 minutos
- **Máximo**: 24-48 horas
- **Recomendado**: Aguardar 30 minutos antes do deploy

## 🔍 Verificação DNS

### Comandos para verificar propagação:

```bash
# Verificar registro A principal
nslookup julianakaiza.site

# Verificar registro A www
nslookup www.julianakaiza.site

# Verificar com dig (mais detalhado)
dig julianakaiza.site A
dig www.julianakaiza.site A
```

### Ferramentas Online

- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://www.whatsmydns.net/)
- [DNS Propagation Checker](https://www.dnswatch.info/)

## 🚀 Processo de Deploy

### 1. Verificar DNS
```bash
# No servidor, verificar se o DNS está resolvendo
nslookup julianakaiza.site
```

### 2. Executar Deploy
```bash
sudo -u portfolio /opt/portfolio/deploy.sh
```

### 3. Verificar SSL
```bash
# Verificar certificado SSL
sudo certbot certificates

# Testar renovação
sudo certbot renew --dry-run
```

### 4. Verificar Nginx
```bash
# Status do Nginx
sudo systemctl status nginx

# Testar configuração
sudo nginx -t

# Ver logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🔧 Troubleshooting

### DNS não resolve

1. Verificar configuração no painel do domínio
2. Aguardar mais tempo para propagação
3. Limpar cache DNS local:
   ```bash
   sudo systemd-resolve --flush-caches
   ```

### SSL não funciona

1. Verificar se DNS está resolvendo:
   ```bash
   nslookup julianakaiza.site
   ```

2. Tentar obter certificado manualmente:
   ```bash
   sudo certbot --nginx -d julianakaiza.site -d www.julianakaiza.site
   ```

3. Verificar logs do Certbot:
   ```bash
   sudo tail -f /var/log/letsencrypt/letsencrypt.log
   ```

### Nginx não inicia

1. Verificar configuração:
   ```bash
   sudo nginx -t
   ```

2. Ver logs de erro:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

3. Reiniciar serviço:
   ```bash
   sudo systemctl restart nginx
   ```

## 📊 Monitoramento

### Verificar status dos serviços
```bash
# Portfolio (Next.js)
sudo systemctl status portfolio

# Nginx
sudo systemctl status nginx

# Certbot timer (renovação automática)
sudo systemctl status certbot.timer
```

### Logs importantes
```bash
# Logs da aplicação
sudo journalctl -u portfolio -f

# Logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs do sistema
sudo tail -f /var/log/syslog
```

## 🔒 Segurança

O script configura automaticamente:

- ✅ SSL/TLS com Let's Encrypt
- ✅ Redirecionamento HTTP → HTTPS
- ✅ Headers de segurança (HSTS, X-Frame-Options, etc.)
- ✅ Firewall UFW configurado
- ✅ Renovação automática de certificados

## 📞 Suporte

Em caso de problemas:

1. Verificar logs do sistema
2. Consultar documentação do provedor DNS
3. Verificar status dos serviços
4. Revisar configuração do Nginx

---

**Importante**: Sempre aguarde a propagação DNS antes de executar o deploy para evitar problemas com a obtenção do certificado SSL.