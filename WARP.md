# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Alfabeto Aprender** is an interactive educational web application for Portuguese children (ages 5-7) to learn the alphabet. The project features a complete Docker deployment setup with Nginx serving static files.

### Key Technologies
- **Frontend**: Vanilla HTML5, CSS3, ES6+ JavaScript
- **Audio System**: Static MP3 files generated via Google TTS PT-PT
- **Containerization**: Docker with multi-stage builds
- **Web Server**: Nginx (Alpine-based)
- **Audio Generation**: Python scripts using Google TTS API

## Architecture

### Core Components

1. **Game Engine** (`script-mp3.js`): ES6 class-based architecture with state management
   - `AlphabetGame` class handles game logic, audio preloading, and user interactions
   - Audio system uses preloaded MP3 files for consistent cross-device performance
   - Touch-optimized for tablet devices

2. **Audio System** (`audio/` directory):
   - **26 letter files** (`audio/letters/A.mp3` to `Z.mp3`) with PT-PT pronunciation
   - **4 feedback sounds** (`audio/sounds/`) for game interactions
   - All audio uniformly generated via Google TTS PT-PT to avoid speaker/phone conflicts

3. **Containerized Deployment**:
   - **Multi-stage Dockerfile** with Alpine Linux base
   - **Custom Nginx configuration** with optimized caching strategies
   - **Docker Compose** setup with health checks and resource limits

### Audio Architecture Details

The project uses a sophisticated audio system:
- **Static MP3 approach**: Eliminates real-time TTS synthesis issues
- **Pronunciation mapping**: Vowels (A,E,I,O,U) use phonetic PT-PT sounds ("á","é","í","ó","ú")
- **Preloading strategy**: All audio files loaded on game initialization
- **Cross-device compatibility**: Resolves speaker vs phone audio channel conflicts

## Development Commands

### Local Development
```bash
# Start local development server
python3 -m http.server 8000
# OR
npx serve .

# Open in browser
open http://localhost:8000
```

### Audio Generation
```bash
# Generate all MP3 files using Python
python3 generate_audio.py

# Generate using PowerShell (Windows alternative)
powershell -ExecutionPolicy Bypass -File generate_audio_fixed.ps1
```

### Docker Commands

```bash
# Build the Docker image
docker build -t alfabeto-aprender .

# Run container locally
docker run -p 8080:80 alfabeto-aprender

# Build and run with Docker Compose
docker-compose up --build

# Run with monitoring service
docker-compose --profile monitoring up

# View logs
docker-compose logs -f alfabeto-aprender

# Stop and cleanup
docker-compose down -v
```

### Testing Commands

```bash
# Test audio files (if test-audio.html exists)
open test-audio.html

# Check container health
docker exec alfabeto-aprender-app curl -f http://localhost/health

# Validate Nginx config
docker exec alfabeto-aprender-app nginx -t

# View container resources
docker stats alfabeto-aprender-app
```

## Project Structure Understanding

### File Organization
- **Main application**: `index.html`, `script-mp3.js` (current active version)
- **Alternative versions**: `script.js`, `script-original-backup.js` (backup versions)
- **Docker setup**: `Dockerfile`, `docker-compose.yml`, `docker/nginx.conf`
- **Audio assets**: `audio/letters/` (26 files), `audio/sounds/` (4 files)
- **Generation tools**: `generate_audio.py`, `generate_audio_fixed.ps1`

### Version System
- **v2.1.0**: Current version with corrected Portuguese "A" pronunciation
- **v2.0.0**: MP3-based system (major architecture change from real-time TTS)
- **v1.x.x**: Earlier versions using browser TTS APIs

### Configuration Files

#### Nginx Configuration (`docker/nginx.conf`)
- **Audio-specific caching**: 7-day cache for MP3 files
- **Security headers**: XSS protection, frame options
- **CORS headers**: Proper audio file access
- **Health check endpoint**: `/health` for container monitoring

#### Docker Compose Features
- **Watchtower service**: Automated container updates (optional profile)
- **Resource limits**: 256MB memory, 0.5 CPU cores
- **Volume management**: Nginx logs persistence
- **Network isolation**: Custom bridge network

## Development Guidelines

### Working with Audio
- Always test audio changes across both desktop speakers and mobile devices
- Use the Python script for consistent MP3 generation
- PT-PT pronunciation requires specific vowel mappings (see `generate_audio.py`)
- Preload all audio on game initialization to prevent loading delays

### Container Development
- Use multi-stage builds to minimize final image size
- Run containers as non-root user (`nginxuser`)
- Health checks are mandatory for production deployments
- Always specify exact version tags for dependencies

### Code Architecture
- Maintain ES6+ class-based structure in JavaScript
- Use event-driven patterns for user interactions
- Implement proper error handling for audio playback failures
- Touch events must prevent default zoom behavior on mobile

### Testing Audio System
- Verify all 30 MP3 files are generated correctly
- Test cross-browser audio compatibility
- Validate touch interactions on actual tablet devices
- Check audio synchronization with visual feedback

## Common Development Tasks

### Adding New Audio Features
1. Update `generate_audio.py` with new sound definitions
2. Regenerate MP3 files: `python3 generate_audio.py`
3. Update `AlphabetGame` class to preload new audio
4. Test audio loading and playback in `script-mp3.js`

### Modifying Container Configuration
1. Edit `docker/nginx.conf` for web server changes
2. Update `docker-compose.yml` for service configuration
3. Rebuild with: `docker-compose up --build`
4. Verify health check: `curl http://localhost:8080/health`

### Debugging Audio Issues
1. Check browser console for audio loading errors
2. Verify MP3 file accessibility: `curl http://localhost:8080/audio/letters/A.mp3`
3. Test individual audio files in `test-audio.html` (if available)
4. Validate Google TTS generation in Python script
