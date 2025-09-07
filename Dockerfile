# Multi-stage build para otimização (template para apps mais complexas)
# Usando versões específicas para garantir reprodutibilidade
FROM alpine:3.22.1 as builder

# Metadados das versões utilizadas
LABEL alpine.version="3.22.1"
LABEL nginx.version="1.28.0"
LABEL build.date="2025-01-06"

# Instalar ferramentas de build se necessário (para futuras apps)
RUN apk add --no-cache \
    curl \
    wget

# Copiar código fonte para stage de build
WORKDIR /build
COPY . .

# Aqui poderíamos ter steps de build/minificação para apps complexas
# RUN npm install && npm run build

# Stage final - nginx para servir a aplicação
FROM nginx:1.28.0-alpine3.21

# Metadados do container
LABEL maintainer="xkyriver"
LABEL description="Alfabeto Aprender - Jogo educativo dockerizado"
LABEL version="1.0.1"
LABEL app.name="alfabeto-aprender"
LABEL app.type="static-web"

# Instalar ferramentas úteis para debug/manutenção
RUN apk add --no-cache \
    curl \
    nano

# Copiar aplicação do stage de build
COPY --from=builder /build /usr/share/nginx/html/

# Remover ficheiros desnecessários para produção
RUN rm -f /usr/share/nginx/html/*.md \
    /usr/share/nginx/html/*.ps1 \
    /usr/share/nginx/html/.git* \
    /usr/share/nginx/html/CHANGELOG.md \
    /usr/share/nginx/html/ALTERACOES-FINAIS.md \
    /usr/share/nginx/html/LETRA-A-CORRIGIDA.md \
    /usr/share/nginx/html/README-*.md

# Copiar configuração personalizada do nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Criar utilizador nginx não-root (segurança)
RUN addgroup -g 1001 -S nginxuser && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginxuser -g nginxuser nginxuser

# Ajustar permissões
RUN chown -R nginxuser:nginxuser /usr/share/nginx/html && \
    chown -R nginxuser:nginxuser /var/cache/nginx && \
    chown -R nginxuser:nginxuser /var/log/nginx && \
    chown -R nginxuser:nginxuser /etc/nginx/conf.d

# Criar directórios necessários
RUN mkdir -p /var/run/nginx && \
    chown -R nginxuser:nginxuser /var/run/nginx

# Expor porta (será mapeada pelo proxy reverso)
EXPOSE 80

# Variáveis de ambiente
ENV NGINX_HOST=localhost
ENV NGINX_PORT=80
ENV NGINX_WORKER_PROCESSES=auto
ENV NGINX_WORKER_CONNECTIONS=1024

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Executar como utilizador não-root
USER nginxuser

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
