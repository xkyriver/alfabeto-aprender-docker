# Script PowerShell para gerar ficheiros MP3 para o Alfabeto Aprender
# Usa Google TTS PT-PT para uniformidade

Write-Host "Gerador de Audio - Alfabeto Aprender" -ForegroundColor Green
Write-Host "Usando Google TTS PT-PT para uniformidade" -ForegroundColor Yellow
Write-Host ""

# Criar diretorias se nao existirem
if (-not (Test-Path "audio\letters")) {
    New-Item -ItemType Directory -Path "audio\letters" -Force | Out-Null
}
if (-not (Test-Path "audio\sounds")) {
    New-Item -ItemType Directory -Path "audio\sounds" -Force | Out-Null
}
Write-Host "Diretorias criadas" -ForegroundColor Green

# Funcao para gerar audio de uma letra
function Generate-LetterAudio {
    param(
        [string]$Letter,
        [string]$OutputPath
    )
    
    # Mapeamento especial para pronuncia correta em PT-PT
    $pronunciationMap = @{
        'A' = 'á'
        'E' = 'é'
        'I' = 'í'
        'O' = 'ó'
        'U' = 'ú'
    }
    
    # Usar pronuncia customizada para vogais ou letra original para consoantes
    $textToSpeak = if ($pronunciationMap.ContainsKey($Letter)) { $pronunciationMap[$Letter] } else { $Letter }
    
    try {
        # Preparar URL do Google TTS PT-PT
        $encodedText = [System.Web.HttpUtility]::UrlEncode($textToSpeak)
        $googleTTSUrl = "https://translate.google.com/translate_tts?ie=UTF-8&tl=pt-PT&client=tw-ob&q=" + $encodedText
        
        # Fazer download usando Invoke-WebRequest
        $headers = @{
            'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        Invoke-WebRequest -Uri $googleTTSUrl -Headers $headers -OutFile $OutputPath -UseBasicParsing
        
        Write-Host "Letra $Letter -> $textToSpeak -> $OutputPath" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "Erro ao gerar $Letter : $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Funcao para gerar som de efeito
function Generate-SoundEffect {
    param(
        [string]$Text,
        [string]$Filename,
        [string]$OutputDir
    )
    
    try {
        $outputPath = Join-Path $OutputDir $Filename
        $encodedText = [System.Web.HttpUtility]::UrlEncode($Text)
        $googleTTSUrl = "https://translate.google.com/translate_tts?ie=UTF-8&tl=pt-PT&client=tw-ob&q=" + $encodedText
        
        $headers = @{
            'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        Invoke-WebRequest -Uri $googleTTSUrl -Headers $headers -OutFile $outputPath -UseBasicParsing
        
        Write-Host "Som $Filename -> $Text -> $outputPath" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "Erro ao gerar som $Filename : $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Carregar System.Web para UrlEncode
Add-Type -AssemblyName System.Web

# Gerar audios das letras A-Z
Write-Host "Gerando audios das letras..." -ForegroundColor Cyan
$alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray()

$successCount = 0
foreach ($letter in $alphabet) {
    $outputPath = "audio\letters\$letter.mp3"
    if (Generate-LetterAudio -Letter $letter -OutputPath $outputPath) {
        $successCount++
    }
    
    # Pequena pausa para nao sobrecarregar o servico
    Start-Sleep -Milliseconds 500
}

Write-Host "Letras geradas: $successCount/$($alphabet.Length)" -ForegroundColor Yellow
Write-Host ""

# Gerar sons de feedback
Write-Host "Gerando sons de feedback..." -ForegroundColor Cyan

$soundEffects = @(
    @{ Text = "Muito bem"; Filename = "success.mp3" },
    @{ Text = "Tenta outra vez"; Filename = "error.mp3" },
    @{ Text = "Parabens, completaste o alfabeto"; Filename = "victory.mp3" },
    @{ Text = "Encontra a letra"; Filename = "find_letter.mp3" }
)

$soundSuccessCount = 0
foreach ($sound in $soundEffects) {
    if (Generate-SoundEffect -Text $sound.Text -Filename $sound.Filename -OutputDir "audio\sounds") {
        $soundSuccessCount++
    }
    Start-Sleep -Milliseconds 500
}

Write-Host "Sons gerados: $soundSuccessCount/$($soundEffects.Length)" -ForegroundColor Yellow
Write-Host ""

# Relatorio final
$totalFiles = $successCount + $soundSuccessCount
$totalExpected = $alphabet.Length + $soundEffects.Length

Write-Host "RELATORIO FINAL" -ForegroundColor Magenta
Write-Host "Total de ficheiros gerados: $totalFiles/$totalExpected"
Write-Host "Letras: $successCount/$($alphabet.Length)"
Write-Host "Sons: $soundSuccessCount/$($soundEffects.Length)"
Write-Host ""

if ($totalFiles -eq $totalExpected) {
    Write-Host "SUCESSO! Todos os ficheiros foram gerados." -ForegroundColor Green
    Write-Host "Todos os audios usam Google TTS PT-PT para uniformidade." -ForegroundColor Green
    Write-Host "Podes agora atualizar o codigo JavaScript para usar estes ficheiros." -ForegroundColor Green
}
else {
    Write-Host "ATENCAO! Alguns ficheiros nao foram gerados." -ForegroundColor Yellow
    Write-Host "Podes executar o script novamente para tentar gerar os ficheiros em falta." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Cyan
Write-Host "1. Verifica se todos os ficheiros estao na pasta 'audio'"
Write-Host "2. Testa alguns ficheiros MP3 manualmente"  
Write-Host "3. Atualiza o codigo JavaScript para usar estes ficheiros"
