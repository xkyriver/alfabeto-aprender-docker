# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste ficheiro.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-08-24

### ✨ Adicionado
- **Google TTS integrado** para letra "O" com qualidade superior
- **Sistema de fallback automático** para garantir funcionamento sempre
- **Métodos especializados** para letras problemáticas (U e O)
- **Logs detalhados** com emojis para debug mais fácil

### 🔄 Mudado
- **Letra O** agora usa Google Text-to-Speech PT-PT como primeira opção
- **Letra U** mantém configuração otimizada "U4 - Ditongo" ("ou")
- **Arquitetura melhorada** com métodos especializados por letra
- **Fallback robusto** com síntese local se serviço online falhar

### 🗑️ Removido
- **Páginas de teste** antigas (`test-u.html`, `test-vowels.html`)
- **Códigos secretos** obsoletos ("testu", "vowels")
- **Scripts de teste** não utilizados

### 🎯 Técnico
- **Método `speakLetterO()`** com integração Google TTS
- **Método `speakLetterOFallback()`** para backup local
- **Audio Element API** para reprodução de TTS online
- **Tratamento de erros** melhorado com logs informativos
- **Código limpo** com remoção de funcionalidades obsoletas

### 🌍 Qualidade de Som
- **Letra O** - Pronunciação PT-PT autêntica via Google TTS
- **Letra U** - Mantém "ou" (ditongo) com rate 0.15 e pitch 1.1
- **Fallbacks automáticos** garantem funcionamento mesmo offline
- **Volume otimizado** (1.0) para máxima clareza

## [1.0.1] - 2025-08-24

### 🐛 Corrigido
- **Pronúncia das vogais** melhorada para português europeu:
  - **A** - Agora pronuncia "á" corretamente (mais arrastado)
  - **E** - Corrigido de "i" para "é"
  - **O** - Som "ó" mais longo e arrastado
  - **U** - Som "ú" mais demorado e percetível
- **Configurações de fala** otimizadas para vogais (velocidade mais lenta, tom ajustado)
- **Mapeamento de pronúncia** customizado para garantir sons corretos

## [1.0.0] - 2023-08-23

### ✨ Adicionado
- **Jogo completo do alfabeto** com 26 letras
- **Síntese de voz** em português para pronunciar letras
- **Interface responsiva** otimizada para tablets
- **Animações suaves** para feedback visual
- **Sons personalizados** para sucesso, erro e vitória
- **Barra de progresso** visual
- **Sistema de celebração** quando completa o alfabeto
- **Suporte touch** para dispositivos móveis
- **Fallback visual** se áudio não estiver disponível

### 🎨 Design
- **Cores alegres** adequadas para crianças
- **Botões grandes** para facilitar interação
- **Tipografia amigável** (Comic Sans MS)
- **Layout centrado** e equilibrado
- **Animações CSS3** fluidas

### 🔧 Técnico
- **HTML5 semântico** estruturado
- **CSS3 moderno** com Flexbox e Grid
- **JavaScript ES6+** orientado a objectos
- **Web Speech API** para síntese de voz
- **Web Audio API** para sons personalizados
- **Sistema de versionamento** configurado

### 📱 Compatibilidade
- ✅ Chrome 60+
- ✅ Firefox 55+  
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Dispositivos touch
- ✅ Funcionamento offline

---

### 🔮 Próximas Versões Planeadas

#### [1.1.0] - Melhorias de UX
- [ ] Modo de dificuldade (fácil/difícil)
- [ ] Configurações de volume
- [ ] Escolha de vozes
- [ ] Modo daltonicismo

#### [1.2.0] - Funcionalidades Educativas  
- [ ] Estatísticas de progresso
- [ ] Sistema de conquistas
- [ ] Modo treino livre

#### [2.0.0] - Expansão do Conteúdo
- [ ] Palavras simples
- [ ] Sílabas
- [ ] Números
- [ ] Modo multi-jogador

---

## Como Ler Este Changelog

### Tipos de Mudanças
- **✨ Adicionado** - para novas funcionalidades
- **🔄 Mudado** - para mudanças em funcionalidades existentes  
- **❌ Depreciado** - para funcionalidades que serão removidas
- **🗑️ Removido** - para funcionalidades removidas
- **🐛 Corrigido** - para correções de bugs
- **🔒 Segurança** - para correções de vulnerabilidades

### Versionamento
- **MAJOR** - mudanças incompatíveis na API
- **MINOR** - funcionalidades adicionadas de forma compatível
- **PATCH** - correções de bugs compatíveis
