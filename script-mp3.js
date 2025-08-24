/*
 * Alfabeto Aprender - Jogo Educativo Interativo
 * Autor: xkyriver
 * Versão: 2.0.0 - MP3 Edition
 * Licença: MIT
 * 
 * Jogo interativo para crianças aprenderem o alfabeto português
 * com sons uniformes MP3 PT-PT, animações e feedback visual.
 * 
 * Versão 2.0.0: Sistema completamente renovado usando ficheiros MP3
 * - Resolve problemas de conflito de canais de áudio
 * - Uniformidade total em PT-PT via Google TTS
 * - Compatibilidade perfeita speakers vs phones
 */

// Estado do jogo
class AlphabetGame {
    constructor() {
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        this.remainingLetters = [...this.alphabet];
        this.currentLetter = null;
        this.isGameActive = false;
        
        // Sistema de áudio MP3
        this.audioElements = {};
        this.preloadedAudio = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.createLetterCards();
        this.preloadAudioFiles();
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
    }

    preloadAudioFiles() {
        console.log('🎵 Pré-carregando ficheiros MP3...');
        
        // Pré-carregar áudios das letras
        this.alphabet.forEach(letter => {
            const audio = new Audio(`audio/letters/${letter}.mp3`);
            audio.preload = 'auto';
            audio.volume = 1.0;
            this.audioElements[`letter_${letter}`] = audio;
            
            audio.addEventListener('canplaythrough', () => {
                console.log(`✅ Letra ${letter} carregada`);
            });
            
            audio.addEventListener('error', (e) => {
                console.error(`❌ Erro ao carregar letra ${letter}:`, e);
            });
        });
        
        // Pré-carregar sons de feedback
        const soundFiles = {
            success: 'audio/sounds/success.mp3',
            error: 'audio/sounds/error.mp3',
            victory: 'audio/sounds/victory.mp3',
            find_letter: 'audio/sounds/find_letter.mp3'
        };
        
        Object.keys(soundFiles).forEach(key => {
            const audio = new Audio(soundFiles[key]);
            audio.preload = 'auto';
            audio.volume = 1.0;
            this.audioElements[key] = audio;
            
            audio.addEventListener('canplaythrough', () => {
                console.log(`✅ Som ${key} carregado`);
            });
            
            audio.addEventListener('error', (e) => {
                console.error(`❌ Erro ao carregar som ${key}:`, e);
            });
        });
        
        // Verificar se todos os áudios foram carregados
        setTimeout(() => {
            this.preloadedAudio = true;
            console.log('🎵 Sistema de áudio MP3 inicializado');
            console.log('🔧 Todos os sons usam Google TTS PT-PT uniformizado');
        }, 2000);
    }

    playAudio(audioKey) {
        if (!this.audioElements[audioKey]) {
            console.warn(`⚠️ Áudio não encontrado: ${audioKey}`);
            return Promise.reject('Audio not found');
        }

        const audio = this.audioElements[audioKey];
        
        // Reset para permitir reprodução múltipla
        audio.currentTime = 0;
        
        return new Promise((resolve, reject) => {
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log(`🔊 Reproduzindo: ${audioKey}`);
                        resolve();
                    })
                    .catch(error => {
                        console.error(`❌ Erro ao reproduzir ${audioKey}:`, error);
                        reject(error);
                    });
            } else {
                resolve();
            }
            
            audio.addEventListener('ended', () => {
                console.log(`✅ Concluído: ${audioKey}`);
            }, { once: true });
        });
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
        
        // Som de sucesso
        this.playAudio('success');
        
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
        this.playAudio('error');
        
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
        if (!this.currentLetter) {
            console.log('⚠️ Letra não definida');
            return;
        }
        
        console.log(`🔊 Falando letra: ${this.currentLetter}`);
        
        // Reproduzir áudio da letra usando ficheiro MP3
        this.playAudio(`letter_${this.currentLetter}`)
            .catch(error => {
                console.error(`❌ Erro ao falar letra ${this.currentLetter}:`, error);
                // Fallback visual
                this.showFeedback(`📢 Letra: ${this.currentLetter}`, 'correct');
            });
    }

    gameComplete() {
        this.isGameActive = false;
        
        // Mostrar celebração
        this.elements.celebrationOverlay.style.display = 'flex';
        
        // Tocar som de vitória
        this.playAudio('victory');
        
        // Ocultar botões do jogo
        this.elements.speakButton.style.display = 'none';
        this.elements.resetButton.style.display = 'none';
        
        // Atualizar display
        this.elements.letterDisplay.textContent = '🎉';
        this.elements.instructionText.textContent = 'Parabéns! Completaste o alfabeto!';
    }

    resetGame() {
        this.isGameActive = false;
        this.remainingLetters = [...this.alphabet];
        this.currentLetter = null;
        
        // Parar todos os áudios
        Object.values(this.audioElements).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        
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
    
    // Sistema de áudio MP3 inicializado
    
    console.log('🎯 Jogo do Alfabeto inicializado com sucesso! - Versão 2.0.0 MP3 Edition');
    console.log('🎵 Sistema de áudio: Ficheiros MP3 uniformes Google TTS PT-PT');
    console.log('✅ Resolução de conflitos: Speakers vs Phones');
    console.log('🔧 Total de ficheiros: 26 letras + 4 sons de feedback');
    console.log('🧪 Para testes individuais: Abrir test-audio.html');
});
