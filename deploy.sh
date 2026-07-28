#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy.sh — Tarkis ADM Site
# Uso: ./deploy.sh [--first-run]
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

DOMAIN="tarkis.com.br"
EMAIL="contato@tarkis.com.br"
APP_DIR="/opt/tarkis-site"
FIRST_RUN=false

[[ "${1:-}" == "--first-run" ]] && FIRST_RUN=true

echo "🚀 Deploy Tarkis ADM Site"
echo "─────────────────────────"

# ── 1. Atualizar código ────────────────────────────────
echo "📦 Pulling latest code..."
cd "$APP_DIR"
git pull origin main

# ── 2. Primeiro deploy: obter certificado SSL ──────────
if $FIRST_RUN; then
  echo "🔐 Obtendo certificado SSL (Let's Encrypt)..."

  # Subir nginx temporário só na porta 80 para challenge ACME
  docker compose up -d tarkis-site

  # Aguardar nginx iniciar
  sleep 5

  # Emitir certificado
  docker run --rm \
    -v /etc/letsencrypt:/etc/letsencrypt \
    -v /var/www/certbot:/var/www/certbot \
    certbot/certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN" \
    -d "www.$DOMAIN"

  echo "✅ Certificado emitido com sucesso"
fi

# ── 3. Criar diretório de logs ─────────────────────────
mkdir -p "$APP_DIR/logs/nginx"

# ── 4. Build e restart ────────────────────────────────
echo "🔨 Building image..."
docker compose build --no-cache tarkis-site

echo "♻️  Restarting containers..."
docker compose up -d --force-recreate tarkis-site certbot

# ── 5. Verificar saúde ────────────────────────────────
echo "🏥 Aguardando health check..."
sleep 8

STATUS=$(docker inspect --format='{{.State.Health.Status}}' tarkis-site 2>/dev/null || echo "unknown")
if [[ "$STATUS" == "healthy" ]]; then
  echo "✅ Deploy concluído! Site em https://$DOMAIN"
else
  echo "⚠️  Container status: $STATUS"
  echo "   Verifique: docker logs tarkis-site"
fi

# ── 6. Limpar imagens antigas ─────────────────────────
echo "🧹 Limpando imagens antigas..."
docker image prune -f

echo ""
echo "─────────────────────────"
echo "Deploy finalizado em $(date '+%d/%m/%Y %H:%M:%S')"
