/*
 * Alfabeto Aprender - Backdoor de Testes
 * Autor: xkyriver
 * Versão: 1.1.0
 * Licença: MIT
 * 
 * Script para página secreta de testes - apenas reprodução de sons das letras
 * 
 * Versão 1.1.0: Implementação de Google TTS para letra O
 */

// Classe simplificada apenas para testes de áudio
class LetterTester {
    constructor() {
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        this.speechSynthesis = window.speechSynthesis;
        this.speechUtterance = null;
        this.selectedVoice = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.createLetterCards();
        this.checkSpeechSupport();
        
        console.log('🔍 Backdoor de testes inicializado');
    }

    initializeElements() {
        this.elements = {
            lettersGrid: document.getElementById('lettersGrid'),
            testInfo: document.getElementById('testInfo'),
            closeButton: document.getElementById('closeButton'),
            lastTested: document.getElementById('lastTested'),
            soundPlayed: document.getElementById('soundPlayed'),
            audioSettings: document.getElementById('audioSettings'),
            selectedVoiceElement: document.getElementById('selectedVoice')
        };
    }

    setupEventListeners() {
        this.elements.closeButton.addEventListener('click', () => {
            window.close();
        });
        
        // Listener para tecla ESC fechar a janela
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                window.close();
            }
        });

        // Listener para síntese de voz
        if (this.speechSynthesis) {
            this.speechSynthesis.addEventListener('voiceschanged', () => {
                this.checkSpeechSupport();
            });
        }
    }

    checkSpeechSupport() {
        if (!this.speechSynthesis) {
            this.updateDebugInfo('selectedVoice', 'Speech synthesis não suportado');
            return false;
        }
        
        const voices = this.speechSynthesis.getVoices();
        console.log('🔍 Vozes disponíveis:', voices.length);
        
        if (voices.length === 0) {
            setTimeout(() => this.checkSpeechSupport(), 100);
            return false;
        }
        
        // Procurar voz portuguesa
        this.selectedVoice = voices.find(voice => 
            voice.lang.startsWith('pt') || voice.lang.includes('pt-PT') || voice.lang.includes('pt-BR')
        ) || voices.find(voice => 
            voice.lang.startsWith('en')
        ) || voices[0];
        
        const voiceInfo = this.selectedVoice ? 
            `${this.selectedVoice.name} (${this.selectedVoice.lang})` : 
            'Nenhuma voz disponível';
        
        this.updateDebugInfo('selectedVoice', voiceInfo);
        console.log('🔍 Voz selecionada:', voiceInfo);
        
        return true;
    }

    createLetterCards() {
        this.elements.lettersGrid.innerHTML = '';
        
        this.alphabet.forEach(letter => {
            const card = document.createElement('div');
            card.className = 'letter-card';
            card.textContent = letter;
            card.dataset.letter = letter;
            
            card.addEventListener('click', () => this.testLetter(letter, card));
            
            // Suporte para touch
            card.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.testLetter(letter, card);
            });
            
            this.elements.lettersGrid.appendChild(card);
        });
        
        this.elements.testInfo.textContent = `${this.alphabet.length} letras prontas para teste`;
    }

    testLetter(letter, cardElement) {
        // Visual feedback
        cardElement.classList.add('testing');
        setTimeout(() => {
            cardElement.classList.remove('testing');
        }, 1000);
        
        // Atualizar informações de debug
        this.updateDebugInfo('lastTested', letter);
        this.elements.testInfo.textContent = `Testando letra: ${letter}`;
        
        // Reproduzir som
        this.speakLetter(letter);
        
        console.log(`🔍 Testando letra: ${letter}`);
    }

    speakLetter(letter) {
        if (!this.speechSynthesis) {
            console.log('🔍 Speech synthesis não disponível');
            this.updateDebugInfo('soundPlayed', 'Erro: Speech synthesis não disponível');
            return;
        }
        
        // Parar qualquer síntese anterior
        this.speechSynthesis.cancel();
        
        setTimeout(() => {
            // Estratégia especial para o U
            if (letter === 'U') {
                this.speakLetterU(letter);
                return;
            }
            
            // Estratégia especial para o O - usar Google TTS PT-PT
            if (letter === 'O') {
                this.speakLetterO(letter);
                return;
            }
            
            // Usar o mesmo mapeamento do jogo principal
            const pronunciationMap = {
                'A': 'á',
                'E': 'é',
                'I': 'í',
                'O': 'ó'
            };
            
            const textToSpeak = pronunciationMap[letter] || letter;
            this.updateDebugInfo('soundPlayed', `"${textToSpeak}"`);
            
            // Criar utterance
            this.speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
            
            if (this.selectedVoice) {
                this.speechUtterance.voice = this.selectedVoice;
            }
            
            // Aplicar as mesmas configurações do jogo principal
            if (pronunciationMap[letter]) {
                if (letter === 'U') {
                    this.speechUtterance.rate = 0.15;
                    this.speechUtterance.pitch = 1.3;
                } else {
                    this.speechUtterance.rate = 0.2;
                    this.speechUtterance.pitch = 1.1;
                }
            } else {
                this.speechUtterance.rate = 0.7;
                this.speechUtterance.pitch = 1.3;
            }
            
            this.speechUtterance.volume = 1.0;
            this.speechUtterance.lang = 'pt-PT';
            
            // Atualizar debug com configurações
            const settings = `Rate: ${this.speechUtterance.rate}, Pitch: ${this.speechUtterance.pitch}, Vol: ${this.speechUtterance.volume}`;
            this.updateDebugInfo('audioSettings', settings);
            
            // Event listeners para debug
            this.speechUtterance.onstart = () => {
                console.log('🔍 Speech iniciado para:', letter);
                this.elements.testInfo.textContent = `🔊 Reproduzindo: ${letter}`;
            };
            
            this.speechUtterance.onend = () => {
                console.log('🔍 Speech terminado para:', letter);
                this.elements.testInfo.textContent = `✅ Concluído: ${letter}`;
            };
            
            this.speechUtterance.onerror = (e) => {
                console.error('🔍 Erro na síntese de voz:', e);
                this.elements.testInfo.textContent = `❌ Erro ao reproduzir: ${letter}`;
                this.updateDebugInfo('soundPlayed', `Erro: ${e.error || 'Desconhecido'}`);
            };
            
            // Reproduzir sem retry automático
            try {
                this.speechSynthesis.speak(this.speechUtterance);
            } catch (error) {
                console.error('🔍 Erro ao tentar reproduzir:', error);
                this.elements.testInfo.textContent = `❌ Falha ao reproduzir: ${letter}`;
                this.updateDebugInfo('soundPlayed', `Exceção: ${error.message}`);
            }
            
        }, 100);
    }
    
    // Método especializado para o O - usando Google TTS PT-PT
    speakLetterO(letter) {
        console.log('🔍🌐 Reproduzindo letra O no backdoor: Google TTS PT-PT (O56)');
        
        // Usar Google TTS configuração O56
        const textToSpeak = 'ó';
        
        this.updateDebugInfo('soundPlayed', 'Google TTS PT-PT ("ó")');
        
        // Criar elemento de áudio para Google TTS
        const audioElement = new Audio();
        const encodedText = encodeURIComponent(textToSpeak);
        const googleTTSUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=pt&client=tw-ob&q=${encodedText}`;
        
        audioElement.src = googleTTSUrl;
        audioElement.volume = 1.0;
        
        // Atualizar debug
        this.updateDebugInfo('audioSettings', 'Google TTS URL, Vol: 1.0 (O56)');
        
        audioElement.onloadstart = () => {
            console.log('🔍🌐 Carregando Google TTS para letra O...');
            this.elements.testInfo.textContent = '🌐 Carregando Google TTS (O)...';
        };
        
        audioElement.onplay = () => {
            console.log('🔍🌐 Google TTS O56 iniciado: "ó" (pt-PT)');
            this.elements.testInfo.textContent = '🌐🔊 Reproduzindo O (Google TTS)';
        };
        
        audioElement.onended = () => {
            console.log('🔍🌐 Google TTS O56 concluído com sucesso no backdoor');
            this.elements.testInfo.textContent = '✅ O concluído (Google TTS)';
        };
        
        audioElement.onerror = (error) => {
            console.error('🔍🌐 Erro Google TTS O56:', error);
            this.elements.testInfo.textContent = '❌ Erro Google TTS - usando fallback';
            // Fallback para síntese local
            this.speakLetterOFallback(letter);
        };
        
        try {
            audioElement.play();
        } catch (error) {
            console.error('🔍🌐 Erro ao reproduzir Google TTS O56:', error);
            this.elements.testInfo.textContent = '❌ Falha Google TTS - usando fallback';
            // Fallback para síntese local
            this.speakLetterOFallback(letter);
        }
    }
    
    // Fallback para letra O usando síntese local
    speakLetterOFallback(letter) {
        console.log('🔍🔄 Usando fallback local para letra O no backdoor');
        
        this.updateDebugInfo('soundPlayed', 'Fallback Local ("ó")');
        
        this.speechUtterance = new SpeechSynthesisUtterance('ó');
        
        if (this.selectedVoice) {
            this.speechUtterance.voice = this.selectedVoice;
        }
        
        // Configurações otimizadas para O
        this.speechUtterance.rate = 0.2;
        this.speechUtterance.pitch = 1.1;
        this.speechUtterance.volume = 1.0;
        this.speechUtterance.lang = 'pt-PT';
        
        // Atualizar debug
        this.updateDebugInfo('audioSettings', 'Rate: 0.2, Pitch: 1.1, Vol: 1.0 (Fallback O)');
        
        this.speechUtterance.onstart = () => {
            console.log('🔍🔄 Fallback local O iniciado no backdoor');
            this.elements.testInfo.textContent = '🔄🔊 Reproduzindo O (fallback)';
        };
        
        this.speechUtterance.onend = () => {
            console.log('🔍🔄 Fallback local O concluído no backdoor');
            this.elements.testInfo.textContent = '✅ O concluído (fallback local)';
        };
        
        this.speechUtterance.onerror = (e) => {
            console.error('🔍🔄 Erro no fallback local O:', e);
            this.elements.testInfo.textContent = `❌ Erro total O: ${e.error || 'Desconhecido'}`;
            this.updateDebugInfo('soundPlayed', `Erro fallback: ${e.error || 'Falhou'}`);
        };
        
        try {
            this.speechSynthesis.speak(this.speechUtterance);
        } catch (error) {
            console.error('🔍🔄 Exceção no fallback local O:', error);
            this.elements.testInfo.textContent = `❌ Falha total O: ${error.message}`;
            this.updateDebugInfo('soundPlayed', `Exceção fallback: ${error.message}`);
        }
    }
    
    // Método especializado para o U - usando configuração escolhida: U4 - Ditongo
    speakLetterU(letter) {
        console.log('🔍🎯 Reproduzindo letra U no backdoor: U4 - Ditongo');
        
        // Usar a configuração testada e aprovada: "ou" (ditongo português)
        const textToSpeak = 'ou';
        
        this.updateDebugInfo('soundPlayed', 'U4 - Ditongo ("ou")');
        
        this.speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
        
        // Usar voz selecionada se disponível
        if (this.selectedVoice) {
            this.speechUtterance.voice = this.selectedVoice;
        }
        
        // Configurações específicas do U4 - Ditongo
        this.speechUtterance.rate = 0.15;  // Velocidade do teste U4
        this.speechUtterance.pitch = 1.1;  // Tom do teste U4
        this.speechUtterance.volume = 1.0; // Volume máximo
        this.speechUtterance.lang = 'pt-PT';
        
        // Atualizar debug com configurações
        const settings = 'Rate: 0.15, Pitch: 1.1, Vol: 1.0 (U4 - Ditongo)';
        this.updateDebugInfo('audioSettings', settings);
        
        // Event handlers (sem fallback para evitar problemas)
        this.speechUtterance.onstart = () => {
            console.log('🔍🎯 Iniciando reprodução: U4 - Ditongo ("ou")');
            this.elements.testInfo.textContent = '🎯🔊 Reproduzindo U (Ditongo)';
        };
        
        this.speechUtterance.onend = () => {
            console.log('🔍🎯 U4 - Ditongo reproduzido com sucesso no backdoor');
            this.elements.testInfo.textContent = '✅ U concluído (U4 - Ditongo)';
        };
        
        this.speechUtterance.onerror = (e) => {
            console.error('🔍🎯 Erro na reprodução do U4 - Ditongo:', e);
            this.elements.testInfo.textContent = `❌ Erro U4: ${e.error || 'Desconhecido'}`;
            // NÃO usar fallback no backdoor para evitar confusão
            this.updateDebugInfo('soundPlayed', `Erro U4: ${e.error || 'Falhou'}`);
        };
        
        // Reproduzir a configuração escolhida (sem fallback)
        try {
            this.speechSynthesis.speak(this.speechUtterance);
        } catch (error) {
            console.error('🔍🎯 Exceção ao reproduzir U4 - Ditongo:', error);
            this.elements.testInfo.textContent = `❌ Falha U4: ${error.message}`;
            this.updateDebugInfo('soundPlayed', `Exceção U4: ${error.message}`);
            // NÃO usar fallback no backdoor
        }
    }
    
    // Fallback usando Web Audio API para criar som do U artificialmente
    speakLetterUWithAudio() {
        console.log('🔍🎵 Criando som do U com Web Audio API no backdoor');
        
        this.elements.testInfo.textContent = '🎵 Gerando áudio sintético para U...';
        this.updateDebugInfo('soundPlayed', 'Web Audio API (som artificial)');
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            // Criar som vowel-like para U (som grave e prolongado)
            const duration = 1.5; // 1.5 segundos
            const startTime = audioContext.currentTime;
            
            // Frequência fundamental para som de U (aproximadamente 300Hz)
            const fundamentalFreq = 300;
            
            // Criar harmônicos para som mais natural
            const harmonics = [
                { freq: fundamentalFreq, gain: 0.8 },      // Fundamental
                { freq: fundamentalFreq * 2, gain: 0.4 },  // 2ª harmônica
                { freq: fundamentalFreq * 3, gain: 0.2 },  // 3ª harmônica
                { freq: fundamentalFreq * 4, gain: 0.1 }   // 4ª harmônica
            ];
            
            harmonics.forEach((harmonic, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                const filter = audioContext.createBiquadFilter();
                
                // Conectar: oscillator → filter → gain → destination
                oscillator.connect(filter);
                filter.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Configurar oscilador
                oscillator.frequency.value = harmonic.freq;
                oscillator.type = 'sine';
                
                // Configurar filtro para som mais natural
                filter.type = 'lowpass';
                filter.frequency.value = 800; // Cortar frequências agudas
                filter.Q.value = 1;
                
                // Envelope de amplitude (fade in/out)
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(harmonic.gain, startTime + 0.1);
                gainNode.gain.linearRampToValueAtTime(harmonic.gain * 0.8, startTime + duration - 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
                
                // Iniciar e parar
                oscillator.start(startTime);
                oscillator.stop(startTime + duration);
            });
            
            // Atualizar debug
            this.updateDebugInfo('audioSettings', 'Web Audio: 300Hz + harmônicos, 1.5s duração');
            
            // Feedback quando terminar
            setTimeout(() => {
                this.elements.testInfo.textContent = '✅ U concluído (áudio sintético)';
            }, duration * 1000);
            
            console.log('🔍🎵 Som do U criado artificialmente no backdoor');
            
        } catch (e) {
            console.error('🔍🎵 Erro ao criar som do U com Web Audio API:', e);
            this.elements.testInfo.textContent = '❌ Falha total ao reproduzir U';
            this.updateDebugInfo('soundPlayed', `Erro Web Audio: ${e.message}`);
        }
    }

    updateDebugInfo(elementId, value) {
        const element = this.elements[elementId];
        if (element) {
            element.textContent = value;
        }
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const tester = new LetterTester();
    
    console.log('🔍 Backdoor carregado com sucesso!');
    console.log('✅ Letra U configurada: U4 - Ditongo ("ou") - Rate: 0.15, Pitch: 1.1');
    console.log('🌐 Letra O configurada: Google TTS PT-PT ("ó") com fallback local');
    console.log('🔑 Instruções:');
    console.log('  - Clica em qualquer letra para testar o som');
    console.log('  - Pressiona ESC ou clica no botão vermelho para fechar');
    console.log('  - Verifica as informações de debug na parte inferior');
});
