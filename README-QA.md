# Ambiente de QA - Alfabeto Aprender

## Alterações Realizadas

### Problema Identificado
- No ambiente de produção, a fonte estava definida como `'Comic Sans MS', cursive, Arial, sans-serif`
- Em dispositivos móveis, quando 'Comic Sans MS' não está disponível, o browser usa `cursive` que resulta em fontes manuscritas
- Isso causava diferenças visuais entre PC (estilo imprensa) e móvel (estilo manuscrito)

### Solução Implementada
- Alterada a definição da fonte para: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- Esta stack de fontes garante consistência visual em todos os dispositivos:
  - **-apple-system**: Fonte do sistema no macOS/iOS
  - **BlinkMacSystemFont**: Fonte do sistema no Chrome/Edge
  - **'Segoe UI'**: Fonte padrão do Windows
  - **Roboto**: Fonte padrão do Android
  - **'Helvetica Neue'**: Backup para sistemas Apple mais antigos
  - **Arial**: Fonte universal de backup
  - **sans-serif**: Fallback genérico

## Como Testar o Ambiente QA

### 1. Iniciar o Servidor de Teste
```bash
# Navegar para o diretório QA
cd ~/workspace/projects/alfabeto-aprender/QA/

# Iniciar servidor na porta 8080 (padrão)
./start_qa_server.sh

# Ou especificar uma porta diferente
./start_qa_server.sh 8090
```

### 2. Aceder Externamente
- **URL local**: http://localhost:8080
- **URL externa**: http://192.168.1.147:8080
- **Para outros dispositivos na mesma rede**: Use o IP mostrado pelo script

### 3. Testar em Dispositivos Móveis
1. Certifique-se que o dispositivo móvel está na mesma rede
2. Abra o browser no dispositivo móvel
3. Digite o endereço: `http://192.168.1.147:8080`
4. Compare a aparência das fontes com a versão de produção

### 4. Verificar Firewall (se necessário)
Se não conseguir aceder externamente, pode precisar abrir a porta:
```bash
# Para Rocky Linux/CentOS/RHEL com firewalld
sudo firewall-cmd --add-port=8080/tcp --zone=public
sudo firewall-cmd --add-port=8080/tcp --zone=public --permanent
```

## Estrutura do Projeto QA
```
~/workspace/projects/alfabeto-aprender/QA/
├── index.html              # Página principal
├── styles.css              # CSS com fontes corrigidas ✅
├── script.js               # JavaScript da aplicação
├── audio/                  # Ficheiros de áudio
├── start_qa_server.sh      # Script para iniciar servidor de teste ✅
└── README-QA.md            # Este ficheiro
```

## Próximos Passos
1. Testar no ambiente QA em vários dispositivos
2. Se estiver tudo correto, aplicar as mesmas alterações à produção
3. Validar que as fontes agora aparecem consistentemente
