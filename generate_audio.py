#!/usr/bin/env python3
"""
Script para gerar ficheiros de áudio para o jogo Alfabeto Aprender
Gera todos os ficheiros MP3 necessários usando Google TTS PT-PT
"""

import urllib.request
import urllib.parse
import os
import time
from pathlib import Path

def create_directories():
    """Cria as diretorias necessárias"""
    Path("audio/letters").mkdir(parents=True, exist_ok=True)
    Path("audio/sounds").mkdir(parents=True, exist_ok=True)
    print("✅ Diretorias criadas")

def generate_letter_audio(letter, output_path):
    """Gera áudio para uma letra usando Google TTS PT-PT"""
    
    # Mapeamento especial para pronúncia correta em PT-PT
    pronunciation_map = {
        'A': 'á',      # Som "á" 
        'E': 'é',      # Som "é" 
        'I': 'í',      # Som "í" 
        'O': 'ó',      # Som "ó" 
        'U': 'ú',      # Som "ú" 
        # Consoantes mantêm o nome original
    }
    
    # Usar pronúncia customizada para vogais ou letra original para consoantes
    text_to_speak = pronunciation_map.get(letter, letter)
    
    try:
        # Preparar URL do Google TTS PT-PT
        encoded_text = urllib.parse.quote(text_to_speak)
        google_tts_url = f"https://translate.google.com/translate_tts?ie=UTF-8&tl=pt-PT&client=tw-ob&q={encoded_text}"
        
        # Headers para parecer um browser real
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        # Criar request
        req = urllib.request.Request(google_tts_url, headers=headers)
        
        # Fazer download
        with urllib.request.urlopen(req) as response:
            with open(output_path, 'wb') as f:
                f.write(response.read())
        
        print(f"✅ Letra {letter} → {text_to_speak} → {output_path}")
        return True
        
    except Exception as e:
        print(f"❌ Erro ao gerar {letter}: {e}")
        return False

def generate_sound_effect(text, filename, output_dir):
    """Gera efeito sonoro usando Google TTS PT-PT"""
    try:
        output_path = os.path.join(output_dir, filename)
        encoded_text = urllib.parse.quote(text)
        google_tts_url = f"https://translate.google.com/translate_tts?ie=UTF-8&tl=pt-PT&client=tw-ob&q={encoded_text}"
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        req = urllib.request.Request(google_tts_url, headers=headers)
        
        with urllib.request.urlopen(req) as response:
            with open(output_path, 'wb') as f:
                f.write(response.read())
        
        print(f"✅ Som {filename} → {text} → {output_path}")
        return True
        
    except Exception as e:
        print(f"❌ Erro ao gerar som {filename}: {e}")
        return False

def main():
    print("🎵 Gerador de Áudio - Alfabeto Aprender")
    print("📍 Usando Google TTS PT-PT para uniformidade")
    print()
    
    # Criar diretorias
    create_directories()
    
    # Gerar áudios das letras A-Z
    print("📝 Gerando áudios das letras...")
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    success_count = 0
    for letter in alphabet:
        output_path = f"audio/letters/{letter}.mp3"
        if generate_letter_audio(letter, output_path):
            success_count += 1
        
        # Pequena pausa para não sobrecarregar o serviço
        time.sleep(0.5)
    
    print(f"📊 Letras geradas: {success_count}/{len(alphabet)}")
    print()
    
    # Gerar sons de feedback
    print("🔊 Gerando sons de feedback...")
    
    sound_effects = [
        ("Muito bem", "success.mp3"),
        ("Tenta outra vez", "error.mp3"),
        ("Parabéns, completaste o alfabeto", "victory.mp3"),
        ("Encontra a letra", "find_letter.mp3")
    ]
    
    sound_success_count = 0
    for text, filename in sound_effects:
        if generate_sound_effect(text, filename, "audio/sounds"):
            sound_success_count += 1
        time.sleep(0.5)
    
    print(f"📊 Sons gerados: {sound_success_count}/{len(sound_effects)}")
    print()
    
    # Relatório final
    total_files = success_count + sound_success_count
    total_expected = len(alphabet) + len(sound_effects)
    
    print("🎯 RELATÓRIO FINAL")
    print(f"📁 Total de ficheiros gerados: {total_files}/{total_expected}")
    print(f"📝 Letras: {success_count}/{len(alphabet)}")
    print(f"🔊 Sons: {sound_success_count}/{len(sound_effects)}")
    print()
    
    if total_files == total_expected:
        print("✅ SUCESSO! Todos os ficheiros foram gerados.")
        print("🎵 Todos os áudios usam Google TTS PT-PT para uniformidade.")
        print("🔧 Podes agora atualizar o código JavaScript para usar estes ficheiros.")
    else:
        print("⚠️  ATENÇÃO! Alguns ficheiros não foram gerados.")
        print("🔄 Podes executar o script novamente para tentar gerar os ficheiros em falta.")
    
    print()
    print("📋 Próximos passos:")
    print("1. Verifica se todos os ficheiros estão na pasta 'audio'")
    print("2. Testa alguns ficheiros MP3 manualmente")  
    print("3. Atualiza o código JavaScript para usar estes ficheiros")

if __name__ == "__main__":
    main()
