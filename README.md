# 🎯 Alfabeto Aprender - Jogo Educativo Interativo

![Versão](https://img.shields.io/badge/versão-1.1.0-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)
![Plataforma](https://img.shields.io/badge/plataforma-Web%2FTablet-orange)
![Qualidade](https://img.shields.io/badge/qualidade_som-Google_TTS-brightgreen)

Uma aplicação web interativa e divertida para ajudar crianças do primeiro ano a aprender o alfabeto português através de jogos com som, animações e feedback visual.

## 🌟 Funcionalidades

### 🎮 **Mecânica do Jogo**
- **Grid de 26 cartões** com todas as letras do alfabeto (A-Z)
- **Seleção aleatória** de letras sem repetição
- **Cartões desaparecem** quando acertados (feedback visual claro)
- **Barra de progresso** mostrando letras restantes

### 🔊 **Áudio e Síntese de Voz**
- **Pronunciação automática** das letras em português
- **Google Text-to-Speech** para letra "O" com qualidade PT-PT superior
- **Sistema de fallback automático** garante funcionamento offline
- **Botão para repetir** o som da letra atual
- **Vozes portuguesas** quando disponíveis
- **Sons personalizados** de sucesso, erro e vitória
- **Métodos especializados** para letras problemáticas (U, O)

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
- 🔍 **Sistema de Testes**: Durante o jogo, digita `rabbit` para aceder ao backdoor de testes
- 🔊 **Teste Individual**: Testa o som de qualquer letra individualmente
- 🛠️ **Informações Debug**: Vê detalhes técnicos sobre vozes e configurações
- 🌐 **Qualidade Superior**: Letra "O" usa Google TTS para máxima qualidade

## 🛠 Estrutura do Projeto

```
alfabeto-aprender/
├── 📄 index.html      # Estrutura principal da aplicação
├── 🎨 styles.css      # Estilos e animações
├── ⚙️ script.js       # Lógica do jogo e interatividade
├── 🔍 backdoor.html   # Página de testes de som
├── 🔍 backdoor.js     # Sistema de testes debug
├── 🎨 backdoor.css    # Estilos da página de testes
├── 📋 README.md       # Documentação (este ficheiro)
├── 📦 package.json    # Metadados e versionamento
└── 📈 CHANGELOG.md    # Histórico de versões
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

### **v1.1.0** (Atual) - Qualidade de Som Melhorada
- ✨ **Google Text-to-Speech** integrado para letra "O"
- ✨ **Sistema de testes** com backdoor para debug
- ✨ **Fallback automático** garante funcionamento offline
- ✨ **Métodos especializados** para letras problemáticas
- ✨ **Arquitetura robusta** com tratamento de erros
- ✨ **Logs informativos** para monitorização

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
