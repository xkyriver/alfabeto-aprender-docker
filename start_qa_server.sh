#!/bin/bash
# Script para iniciar servidor de QA do Alfabeto Aprender
# Uso: ./start_qa_server.sh [porta]

PORT=${1:-9090}
LOCAL_IP=$(hostname -I | awk '{print $1}')
QA_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Verificar se a porta já está em uso
if netstat -tlnp | grep -q ":$PORT "; then
    echo "❌ Erro: Porta $PORT já está em uso!"
    echo "Use: ./start_qa_server.sh [outra_porta]"
    exit 1
fi

echo "🧪 Iniciando servidor de QA do Alfabeto Aprender..."
echo "📁 Diretório: $QA_DIR"
echo "🌐 Porta: $PORT"
echo "🔗 IP Local: $LOCAL_IP"
echo ""
echo "Para testar no PC:"
echo "  http://localhost:$PORT"
echo ""
echo "Para testar no telemóvel (mesma rede WiFi):"
echo "  http://$LOCAL_IP:$PORT"
echo ""
echo "Pressione Ctrl+C para parar o servidor"
echo ""

cd "$QA_DIR"
python3 -m http.server $PORT --bind 0.0.0.0
