// Estado do jogo
class AlphabetGame {
    constructor() {
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        this.remainingLetters = [...this.alphabet];
        this.currentLetter = null;
        this.isGameActive = false;
        this.speechSynthesis = window.speechSynthesis;
        this.speechUtterance = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.createLetterCards();
        this.checkSpeechSupport();
    }

    initializeElements() {
        this.elements = {
            startButton: document.getElementById('startButton'),
            resetButton: document.getElementById('resetButton'),
            speakButton: document.getElementById('speakButton'),
            playAgainButton: document.getElementById('playAgainButton'),
            lettersGrid: document.getElementById('lettersGrid'),
            letterDisplay: document.getElementById('letterDisplay'),
            instructionText: document.getElementById('instructionText'),
            progressFill: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText'),
            celebrationOverlay: document.getElementById('celebrationOverlay'),
            feedback: document.getElementById('feedback')
        };
    }

    setupEventListeners() {
        this.elements.startButton.addEventListener('click', () => this.startGame());
        this.elements.resetButton.addEventListener('click', () => this.resetGame());
        this.elements.speakButton.addEventListener('click', () => this.speakCurrentLetter());
        this.elements.playAgainButton.addEventListener('click', () => this.resetGame());
        
        // Adicionar listener para quando a síntese de voz termina
        if (this.speechSynthesis) {
            this.speechSynthesis.addEventListener('voiceschanged', () => {
                this.checkSpeechSupport();
            });
        }
    }

    checkSpeechSupport() {
        if (!this.speechSynthesis) {
            console.warn('Speech synthesis não suportado neste navegador');
            this.elements.speakButton.style.display = 'none';
            return false;
        }
        
        // Verificar se há vozes disponíveis
        const voices = this.speechSynthesis.getVoices();
        console.log('Vozes disponíveis:', voices.length);
        
        if (voices.length === 0) {
            // Aguardar carregamento das vozes
            setTimeout(() => this.checkSpeechSupport(), 100);
            return false;
        }
        
        // Procurar voz portuguesa
        this.selectedVoice = voices.find(voice => 
            voice.lang.startsWith('pt') || voice.lang.includes('pt-PT') || voice.lang.includes('pt-BR')
        ) || voices.find(voice => 
            voice.lang.startsWith('en') // Fallback para inglês se não houver português
        ) || voices[0]; // Última opção: primeira voz disponível
        
        console.log('Voz selecionada:', this.selectedVoice ? this.selectedVoice.name : 'Nenhuma');
        return true;
    }

    createLetterCards() {
        this.elements.lettersGrid.innerHTML = '';
        
        this.alphabet.forEach(letter => {
            const card = document.createElement('div');
            card.className = 'letter-card';
            card.textContent = letter;
            card.dataset.letter = letter;
            
            card.addEventListener('click', () => this.handleLetterClick(letter, card));
            
            // Adicionar suporte para touch
            card.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevenir zoom em dispositivos touch
                this.handleLetterClick(letter, card);
            });
            
            this.elements.lettersGrid.appendChild(card);
        });
    }

    startGame() {
        this.isGameActive = true;
        this.remainingLetters = [...this.alphabet];
        
        // Mostrar/ocultar botões
        this.elements.startButton.style.display = 'none';
        this.elements.resetButton.style.display = 'inline-block';
        this.elements.speakButton.style.display = 'inline-block';
        
        // Restaurar todos os cartões
        const cards = document.querySelectorAll('.letter-card');
        cards.forEach(card => {
            card.classList.remove('hidden', 'correct', 'wrong');
            card.style.display = 'flex';
        });
        
        // Atualizar progresso
        this.updateProgress();
        
        // Começar primeira rodada
        this.nextRound();
    }

    nextRound() {
        if (this.remainingLetters.length === 0) {
            this.gameComplete();
            return;
        }
        
        // Escolher letra aleatória
        const randomIndex = Math.floor(Math.random() * this.remainingLetters.length);
        this.currentLetter = this.remainingLetters[randomIndex];
        
        // Atualizar display
        this.elements.letterDisplay.textContent = this.currentLetter;
        this.elements.instructionText.textContent = `Encontra a letra "${this.currentLetter}"!`;
        
        // Falar a letra após um pequeno atraso
        setTimeout(() => {
            this.speakCurrentLetter();
        }, 500);
    }

    handleLetterClick(clickedLetter, cardElement) {
        if (!this.isGameActive) return;
        
        if (clickedLetter === this.currentLetter) {
            // Resposta correta
            this.handleCorrectAnswer(cardElement);
        } else {
            // Resposta incorreta
            this.handleWrongAnswer(cardElement);
        }
    }

    handleCorrectAnswer(cardElement) {
        // Animação de sucesso
        cardElement.classList.add('correct');
        
        // Remover letra da lista
        this.remainingLetters = this.remainingLetters.filter(letter => letter !== this.currentLetter);
        
        // Feedback visual
        this.showFeedback('🎉 Muito bem!', 'correct');
        
        // Som de sucesso (usando Web Audio API se disponível)
        this.playSuccessSound();
        
        // Atualizar progresso
        this.updateProgress();
        
        // Ocultar cartão após animação
        setTimeout(() => {
            cardElement.classList.add('hidden');
            cardElement.style.display = 'none';
        }, 600);
        
        // Próxima rodada após delay
        setTimeout(() => {
            this.nextRound();
        }, 1500);
    }

    handleWrongAnswer(cardElement) {
        // Animação de erro
        cardElement.classList.add('wrong');
        
        // Feedback visual
        this.showFeedback('❌ Tenta outra vez!', 'wrong');
        
        // Som de erro
        this.playErrorSound();
        
        // Remover classe após animação
        setTimeout(() => {
            cardElement.classList.remove('wrong');
        }, 500);
        
        // Repetir a letra após erro
        setTimeout(() => {
            this.speakCurrentLetter();
        }, 1000);
    }

    showFeedback(message, type) {
        this.elements.feedback.textContent = message;
        this.elements.feedback.className = `feedback ${type}`;
        
        // Remover feedback após animação
        setTimeout(() => {
            this.elements.feedback.textContent = '';
            this.elements.feedback.className = 'feedback';
        }, 1000);
    }

    updateProgress() {
        const completed = this.alphabet.length - this.remainingLetters.length;
        const percentage = (completed / this.alphabet.length) * 100;
        
        this.elements.progressFill.style.width = `${percentage}%`;
        this.elements.progressText.textContent = `${this.remainingLetters.length} letra${this.remainingLetters.length !== 1 ? 's' : ''} restante${this.remainingLetters.length !== 1 ? 's' : ''}`;
    }

    speakCurrentLetter() {
        if (!this.speechSynthesis || !this.currentLetter) {
            console.log('Speech synthesis não disponível ou letra não definida');
            return;
        }
        
        // Parar qualquer síntese anterior
        this.speechSynthesis.cancel();
        
        // Aguardar um pouco para garantir que parou
        setTimeout(() => {
            // Criar nova utterance
            this.speechUtterance = new SpeechSynthesisUtterance(this.currentLetter);
            
            // Usar voz selecionada se disponível
            if (this.selectedVoice) {
                this.speechUtterance.voice = this.selectedVoice;
                console.log('Usando voz:', this.selectedVoice.name);
            }
            
            // Configurações de fala otimizadas
            this.speechUtterance.rate = 0.7; // Mais lento ainda
            this.speechUtterance.pitch = 1.3; // Tom mais alto
            this.speechUtterance.volume = 1.0; // Volume máximo
            this.speechUtterance.lang = 'pt-PT'; // Forçar idioma português
            
            // Logs para debug
            console.log('Falando letra:', this.currentLetter);
            console.log('Configurações:', {
                rate: this.speechUtterance.rate,
                pitch: this.speechUtterance.pitch,
                volume: this.speechUtterance.volume,
                lang: this.speechUtterance.lang
            });
            
            // Eventos para debug
            this.speechUtterance.onstart = () => console.log('Speech iniciado');
            this.speechUtterance.onend = () => console.log('Speech terminado');
            this.speechUtterance.onerror = (e) => {
                console.error('Erro na síntese de voz:', e);
                // Fallback: mostrar alerta com a letra
                this.showLetterFallback();
            };
            
            // Falar com retry
            try {
                this.speechSynthesis.speak(this.speechUtterance);
                
                // Backup: se não falar em 2 segundos, tentar novamente
                setTimeout(() => {
                    if (this.speechSynthesis.speaking === false && this.speechSynthesis.pending === false) {
                        console.log('Tentando falar novamente...');
                        this.speechSynthesis.speak(this.speechUtterance);
                    }
                }, 2000);
            } catch (error) {
                console.error('Erro ao tentar falar:', error);
                this.showLetterFallback();
            }
        }, 100);
    }
    
    showLetterFallback() {
        // Mostrar letra visualmente como fallback
        this.showFeedback(`📢 Letra: ${this.currentLetter}`, 'correct');
    }

    playSuccessSound() {
        // Criar som usando Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resumir contexto se estiver suspenso (política de autoplay)
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            // Criar sequência de notas alegres
            const notes = [523.25, 659.25, 783.99]; // Dó, Mi, Sol
            
            notes.forEach((frequency, index) => {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.value = frequency;
                    oscillator.type = 'sine';
                    
                    // Volume mais alto
                    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 0.01);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.4);
                }, index * 120);
            });
        } catch (e) {
            console.log('Web Audio API não disponível:', e);
        }
    }

    playErrorSound() {
        // Som simples de erro
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resumir contexto se estiver suspenso
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 200; // Frequência baixa
            oscillator.type = 'sawtooth';
            
            // Volume mais alto
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
        } catch (e) {
            console.log('Web Audio API não disponível:', e);
        }
    }

    gameComplete() {
        this.isGameActive = false;
        
        // Mostrar celebração
        this.elements.celebrationOverlay.style.display = 'flex';
        
        // Tocar som de vitória
        this.playVictorySound();
        
        // Ocultar botões do jogo
        this.elements.speakButton.style.display = 'none';
        this.elements.resetButton.style.display = 'none';
        
        // Atualizar display
        this.elements.letterDisplay.textContent = '🎉';
        this.elements.instructionText.textContent = 'Parabéns! Completaste o alfabeto!';
    }

    playVictorySound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Melodia de vitória
            const melody = [
                { freq: 523.25, duration: 0.2 }, // Dó
                { freq: 659.25, duration: 0.2 }, // Mi
                { freq: 783.99, duration: 0.2 }, // Sol
                { freq: 1046.5, duration: 0.4 }  // Dó oitava
            ];
            
            let startTime = audioContext.currentTime;
            
            melody.forEach((note, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = note.freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);
                
                oscillator.start(startTime);
                oscillator.stop(startTime + note.duration);
                
                startTime += note.duration;
            });
        } catch (e) {
            console.log('Web Audio API não disponível');
        }
    }

    resetGame() {
        this.isGameActive = false;
        this.remainingLetters = [...this.alphabet];
        this.currentLetter = null;
        
        // Ocultar celebração
        this.elements.celebrationOverlay.style.display = 'none';
        
        // Restaurar botões
        this.elements.startButton.style.display = 'inline-block';
        this.elements.resetButton.style.display = 'none';
        this.elements.speakButton.style.display = 'none';
        
        // Restaurar display inicial
        this.elements.letterDisplay.textContent = '?';
        this.elements.instructionText.textContent = 'Clica em "Começar" para iniciares o jogo!';
        
        // Restaurar progresso
        this.elements.progressFill.style.width = '0%';
        this.elements.progressText.textContent = '26 letras restantes';
        
        // Parar síntese de voz
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
        }
        
        // Recrear cartões
        this.createLetterCards();
    }
}

// Inicializar jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const game = new AlphabetGame();
    
    // Adicionar suporte para dispositivos touch
    document.addEventListener('touchstart', function() {}, true);
    
    // Prevenir zoom em dispositivos móveis
    document.addEventListener('touchmove', function(e) {
        if (e.scale !== 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Adicionar indicador de carregamento de vozes
    if ('speechSynthesis' in window) {
        // Aguardar carregamento das vozes
        const checkVoices = () => {
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                console.log('Vozes carregadas:', voices.filter(v => v.lang.includes('pt')).length, 'vozes portuguesas encontradas');
            } else {
                setTimeout(checkVoices, 100);
            }
        };
        checkVoices();
    }
    
    console.log('🎯 Jogo do Alfabeto inicializado com sucesso!');
});
