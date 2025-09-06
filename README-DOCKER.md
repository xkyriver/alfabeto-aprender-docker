# 🐳 Alfabeto Aprender - Dockerizado

Configuração Docker profissional para a aplicação educativa **Alfabeto Aprender**, servindo como template para futuras aplicações web.

## 🏗️ Arquitetura Docker

### **Multi-stage Build**
- **Stage 1** (`builder`): Alpine 3.22.1 para preparação e limpeza
- **Stage 2** (`production`): Nginx 1.28.0-alpine3.21 para servir a aplicação

### **Componentes**
- **Nginx** como servidor web otimizado
- **Utilizador não-root** para segurança
- **Health checks** automáticos
- **Configuração personalizada** para aplicações educativas

## 🚀 Comandos Docker

### **Build da Imagem**
```bash
# Build simples
docker build -t xkyriver/alfabeto-aprender:1.0.1 .

# Build com argumentos personalizados
docker build \
  --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  -t xkyriver/alfabeto-aprender:1.0.1 .
```

### **Executar Container**
```bash
# Execução simples
docker run -d \
  --name alfabeto-aprender \
  -p 8080:80 \
  xkyriver/alfabeto-aprender:1.0.1

# Com variáveis de ambiente personalizadas
docker run -d \
  --name alfabeto-aprender \
  -p 8080:80 \
  -e TZ=Europe/Lisbon \
  -e NGINX_WORKER_PROCESSES=2 \
  xkyriver/alfabeto-aprender:1.0.1
```

## 🎯 Docker Compose

### **Executar com Compose**
```bash
# Subir aplicação
docker compose up -d

# Subir com serviços opcionais (watchtower)
docker compose --profile monitoring up -d

# Ver logs
docker compose logs -f alfabeto-aprender

# Parar aplicação
docker compose down
```

### **Comandos de Manutenção**
```bash
# Rebuild completo
docker compose build --no-cache

# Restart apenas da aplicação
docker compose restart alfabeto-aprender

# Ver status dos serviços
docker compose ps
```

## 🔍 Monitorização

### **Health Checks**
A aplicação inclui health checks automáticos:
- **Endpoint**: `http://localhost:8080/health`
- **Intervalo**: 30 segundos
- **Timeout**: 10 segundos
- **Tentativas**: 3 antes de marcar como unhealthy

### **Logs**
```bash
# Logs do nginx
docker compose exec alfabeto-aprender tail -f /var/log/nginx/access.log
docker compose exec alfabeto-aprender tail -f /var/log/nginx/error.log

# Logs do container
docker compose logs alfabeto-aprender
```

## 🛠️ Configuração Avançada

### **Nginx Personalizado**
A configuração nginx inclui:
- **Compressão gzip** para CSS/JS
- **Cache otimizado** por tipo de ficheiro:
  - HTML: sem cache (atualizações rápidas)
  - CSS/JS: 1 hora
  - MP3/Áudio: 7 dias
  - Imagens: 30 dias
- **Headers de segurança**
- **Proteção de ficheiros sensíveis**

### **Variáveis de Ambiente**
```yaml
environment:
  - NGINX_HOST=localhost          # Host do nginx
  - NGINX_PORT=80                # Porta interna
  - NGINX_WORKER_PROCESSES=2     # Processos worker
  - NGINX_WORKER_CONNECTIONS=1024 # Conexões por worker
  - TZ=Europe/Lisbon             # Timezone
```

## 🔒 Segurança

### **Práticas Implementadas**
- ✅ **Utilizador não-root** (`nginxuser`)
- ✅ **Versões específicas** de todas as imagens
- ✅ **Multi-stage build** (reduz superfície de ataque)
- ✅ **Headers de segurança** HTTP
- ✅ **Bloqueio de ficheiros sensíveis**
- ✅ **Health checks** para deteção de problemas
- ✅ **Resource limits** para prevenir abuse

### **Headers de Segurança**
```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: no-referrer-when-downgrade
```

## 📊 Recursos e Performance

### **Limites de Recursos**
```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'      # Máximo 50% CPU
      memory: 256M     # Máximo 256MB RAM
    reservations:
      cpus: '0.1'      # Mínimo 10% CPU
      memory: 64M      # Mínimo 64MB RAM
```

### **Otimizações**
- **Sendfile** ativado para servir ficheiros estáticos
- **Compressão gzip** para reduzir bandwidth
- **Keep-alive** para reutilizar conexões
- **Multi-accept** para melhor performance

## 🌐 Integração com Proxy Reverso

### **Apache httpd (Proxy Reverso)**
```apache
# Configuração para proxy reverso
<VirtualHost *:80>
    ServerName alfabeto.example.com
    
    ProxyPreserveHost On
    ProxyPass / http://localhost:8080/
    ProxyPassReverse / http://localhost:8080/
    
    # Headers para aplicações web
    ProxyPassReverse / http://localhost:8080/
    ProxyPreserveHost On
    
    # Logs específicos
    ErrorLog ${APACHE_LOG_DIR}/alfabeto_error.log
    CustomLog ${APACHE_LOG_DIR}/alfabeto_access.log combined
</VirtualHost>
```

### **Nginx (Proxy Reverso)**
```nginx
server {
    listen 80;
    server_name alfabeto.example.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🚀 Deploy em Produção

### **Preparar para Produção**
1. **Build da imagem**:
   ```bash
   docker build -t alfabeto-aprender:prod .
   ```

2. **Push para registry** (se aplicável):
   ```bash
   docker tag alfabeto-aprender:prod registry.example.com/alfabeto-aprender:prod
   docker push registry.example.com/alfabeto-aprender:prod
   ```

3. **Deploy com compose**:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

### **Backup e Restore**
```bash
# Backup de volumes
docker run --rm -v alfabeto-nginx-logs:/data -v $(pwd):/backup alpine tar czf /backup/logs-backup.tar.gz /data

# Restore de volumes
docker run --rm -v alfabeto-nginx-logs:/data -v $(pwd):/backup alpine tar xzf /backup/logs-backup.tar.gz -C /
```

## 🎓 Template para Outras Aplicações

Esta configuração serve como **template** para dockerizar outras aplicações web:

1. **Clone a estrutura**:
   ```bash
   cp -r dockerize-app nova-app
   ```

2. **Ajustar metadados**:
   - Labels no `Dockerfile`
   - Nome da imagem no `docker-compose.yml`
   - Configuração nginx conforme necessário

3. **Adaptar configurações**:
   - Portas específicas
   - Variáveis de ambiente
   - Volumes necessários
   - Health checks personalizados

## 📞 Troubleshooting

### **Problemas Comuns**
```bash
# Container não inicia
docker compose logs alfabeto-aprender

# Problemas de permissões
docker compose exec alfabeto-aprender ls -la /usr/share/nginx/html

# Testar health check
curl http://localhost:8080/health

# Verificar configuração nginx
docker compose exec alfabeto-aprender nginx -t
```

### **Debug Mode**
Para desenvolvimento, descomente no `docker-compose.yml`:
```yaml
volumes:
  - .:/usr/share/nginx/html:ro  # Desenvolvimento
```

---

**🎯 Template profissional para dockerização de aplicações web estáticas com nginx e melhores práticas de segurança e performance.**
