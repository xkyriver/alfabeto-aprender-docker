# 🎯 Alfabeto Aprender - Jogo Educativo Interativo

![Versão](https://img.shields.io/badge/versão-2.1.0_MP3-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)
![Plataforma](https://img.shields.io/badge/plataforma-Web%2FTablet-orange)
![Qualidade](https://img.shields.io/badge/qualidade_som-MP3_PT--PT-brightgreen)

Uma aplicação web interativa e divertida para ajudar crianças do primeiro ano a aprender o alfabeto português através de jogos com som, animações e feedback visual.

🎵 **Nova Versão 2.1.0 MP3**: Sistema de áudio completamente renovado com ficheiros MP3 uniformes em PT-PT, eliminando conflitos entre speakers/phones e garantindo qualidade profissional.

## 🌟 Funcionalidades

### 🎮 **Mecânica do Jogo**
- **Grid de 26 cartões** com todas as letras do alfabeto (A-Z)
- **Seleção aleatória** de letras sem repetição
- **Cartões desaparecem** quando acertados (feedback visual claro)
- **Barra de progresso** mostrando letras restantes

### 🔊 **Sistema de Áudio MP3 (v2.1.0)**
- **30 ficheiros MP3 uniformes** - 26 letras + 4 sons de feedback
- **100% Google TTS PT-PT** para consistência total
- **Letra A corrigida** com som "á" português correto
- **Zero conflitos de canal** - funciona igual em speakers e phones
- **Pré-carregamento inteligente** para resposta instantânea
- **Compatibilidade universal** - todos os navegadores e dispositivos
- **Botão para repetir** o som da letra atual

### ✨ **Animações e Feedback**
- **Animações suaves** para acertos e erros
- **Feedback visual** com mensagens motivadoras
- **Celebração animada** quando completa o alfabeto
- **Efeitos hover** e transições fluidas

### 📱 **Design Responsivo**
- **Otimizado para tablets** e dispositivos touch
- **Interface amigável para crianças** com cores alegres
- **Botões grandes** adequados para mãos pequenas
- **Layout adaptável** para diferentes tamanhos de ecrã

## 🚀 Como Usar

### **Instalação Simples**
1. Descarrega todos os ficheiros para uma pasta
2. Abre `index.html` num navegador web moderno
3. Pronto para jogar!

### **Como Jogar**
1. 🎯 Clica em "**🚀 Começar Jogo**"
2. 👂 Ouve a letra pronunciada
3. 👆 Toca no cartão correto
4. 📈 Vê o progresso na barra superior
5. 🎉 Celebra quando completares todas as letras!

### **Funcionalidades Avançadas**
- 🧪 **Página de Testes**: Abre `test-audio.html` para testar sons individualmente
- 🔊 **Teste Individual**: Testa cada letra e som de feedback separadamente
- 📊 **Testes Automáticos**: Reproduz todas as letras sequencialmente
- 🎵 **Sistema MP3 Profissional**: Qualidade de estúdio em todos os sons

## 🛠 Estrutura do Projeto

```
alfabeto-aprender/
├── 📄 index.html                 # Estrutura principal da aplicação
├── 🎨 styles.css                 # Estilos e animações
├── ⚙️ script.js                  # Lógica do jogo (v2.1.0 MP3)
├── 🧪 test-audio.html           # Página de testes de áudio
├── 💾 script-original-backup.js # Backup do sistema original
├── 💾 script-mp3.js             # Versão MP3 alternativa
├── 🎵 audio/                   # Pasta de ficheiros MP3
│   ├── letters/               # 26 ficheiros de letras (A.mp3-Z.mp3)
│   └── sounds/                # 4 ficheiros de feedback
├── 🛠️ generate_audio_fixed.ps1   # Gerador completo MP3
├── 📋 README.md                # Documentação (este ficheiro)
├── 📋 README-MP3.md           # Documentação técnica MP3
└── 📋 LETRA-A-CORRIGIDA.md   # Relatório final
```

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos, animações e responsividade
- **JavaScript ES6+** - Lógica interativa e orientada a objectos
- **Web Speech API** - Síntese de voz para português
- **Web Audio API** - Sons personalizados

## 📋 Requisitos

### **Navegadores Suportados**
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

### **Funcionalidades Opcionais**
- 🔊 **Áudio**: Para melhor experiência (funciona sem, mas recomendado)
- 📱 **Touch**: Otimizado para dispositivos touch
- 🌐 **Ligação à internet**: Não necessária (funciona offline)

## 🎯 Público-Alvo

- **Crianças dos 5-7 anos** (primeiro ano de escolaridade)
- **Pais e educadores** que procuram ferramentas educativas
- **Escolas** que usam tecnologia na educação

## 🔄 Versionamento

Este projeto segue **Semantic Versioning** (`MAJOR.MINOR.PATCH`):

### **v2.1.0** (Atual) - MP3 Edition + Letra A Corrigida
- 🎵 **Sistema MP3 completo** - 30 ficheiros uniformes Google TTS PT-PT
- ✅ **Letra A corrigida** - Som "á" português correto
- 🚫 **Backdoor removido** - Versão final limpa e profissional
- 🔊 **Zero conflitos** - Compatibilidade total speakers vs phones
- ⚡ **Performance otimizada** - Pré-carregamento inteligente
- 🧪 **Página de testes** - `test-audio.html` para validação

### **v2.0.0** - Sistema MP3 Revolucionário
- 🎵 **Ficheiros MP3 uniformes** substituíram síntese em tempo real
- 🌐 **Google TTS PT-PT** para todas as letras e sons
- 📊 **Página de testes** com variações da letra A
- 🛠️ **Scripts PowerShell** para geração automática

### **v1.1.0** - Qualidade de Som Melhorada
- ✨ **Google Text-to-Speech** integrado para letra "O"
- ✨ **Sistema de testes** com backdoor para debug
- ✨ **Fallback automático** garante funcionamento offline
- ✨ **Métodos especializados** para letras problemáticas

### **v1.0.1** - Correções de Pronunciação
- 🐛 Pronunciação das vogais melhorada (A, E, I, O, U)
- 🐛 Configurações de fala otimizadas

### **v1.0.0** - Primeira Versão Estável
- ✅ Jogo funcional completo
- ✅ 26 letras do alfabeto
- ✅ Síntese de voz em português
- ✅ Animações e feedback visual
- ✅ Design responsivo para tablets
- ✅ Sons de sucesso/erro/vitória

## 👤 Autor

**xkyriver** - *Desenvolvedor principal*
- 🌐 GitHub: [@xkyriver](https://github.com/xkyriver)
- 📧 Para questões sobre o projeto, usa as Issues do GitHub

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - vê o ficheiro `LICENSE` para detalhes.

## 🙏 Agradecimentos

- **Crianças** que inspiraram este projeto
- **Educadores** que forneceram feedback valioso
- **Web Speech API** pela síntese de voz
- **Comunidade open source** pelas ferramentas utilizadas

---

### 📞 Suporte

Se encontrares algum problema ou tiveres sugestões, abre uma **issue** no GitHub!

**Feito com ❤️ para ajudar crianças a aprender! 🌟**
