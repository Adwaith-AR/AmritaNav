#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLOUDFLARED="${SCRIPT_DIR}/tools/cloudflared"

if [ ! -f "$CLOUDFLARED" ]; then
  CLOUDFLARED="cloudflared"
fi

echo "Starting Cloudflare tunnel to http://localhost:8080..."
"$CLOUDFLARED" tunnel --url http://localhost:8080
