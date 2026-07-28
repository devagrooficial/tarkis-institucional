# ─────────────────────────────────────────────────────────────────────────────
# Dockerfile — Tarkis ADM Site
# Multi-stage: build com Node → serve com nginx
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Builder ──────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependências (cache layer separado)
COPY package*.json ./
RUN npm ci --prefer-offline

# Copiar fonte e build
COPY . .
RUN npm run build

# ── Stage 2: Production ───────────────────────────────
FROM nginx:1.27-alpine AS production

# Remover config padrão
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copiar build
COPY --from=builder /app/dist /var/www/tarkis/dist

# Copiar config nginx (será sobrescrito pelo docker-compose / bind mount no VPS)
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Verificar config
RUN nginx -t

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
