# HydraPlayer — prototype

Hybrid media player combining audio playback, live visual coding (Hydra-style), and a plugin system.

## Run Instructions (Kali Linux / Linux)

```bash
cd /home/hons/Desktop/mediaplayer
npm install
npm start
```

This will:
1. Install Electron and dependencies
2. Launch the app with the neon psychedelic UI
3. Load any plugins from the `plugins/` folder

## Features

- **Media Playback**: Drag-and-drop audio files, play/pause controls
- **Live Visual Editor**: Write JavaScript that receives `canvas`, `ctx`, and raw FFT audio data
- **Plugin System**: Drop `.js` files in `plugins/` folder; they load automatically with metadata
- **Neon UI**: Matrix ghost-in-the-shell aesthetic with gradient backgrounds

## Next Steps — Extending the Prototype

### 1. Add More Visuals
- Create new `.js` files in `plugins/` folder
- Export `meta` object with `name`, `description`, `visualCode`
- Click "Load" to inject the visual code into the editor

### 2. Enhance Audio Engine
- Replace Web Audio API with native Node bindings (PortAudio/JACK) for lower latency
- Add real-time DSP effects (reverb, filters, pitch shift)
- Integrate WebSockets for network streaming (ARPWire-style remote control)

### 3. Upgrade Visual Engine
- Replace canvas with three.js or r3f for 3D visuals
- Add GPU-accelerated shaders (GLSL)
- Support WebGL or WebXR for immersive rendering

### 4. Production Hardening
- Sandbox plugin code (eval is unsafe—use Web Workers or iframe)
- Add proper error handling and logging
- Package as distributable .AppImage or .deb for Linux

### 5. Suggested Plugin Ideas
- Oscilloscope waveform
- Kaleidoscope patterns
- Particle systems
- Spectrum waterfall
- Lyric-sync visuals with metadata parsing

## Architecture

- **main.js**: Electron main process, plugin loader, IPC bridge
- **preload.js**: Secure IPC exposure to renderer
- **renderer.js**: React components, audio setup, canvas rendering loop
- **styles.css**: Neon gradients, trippy aesthetic
- **plugins/**: User-defined visual modules

## Notes

- This is a lightweight prototype. For production audio work, integrate JACK or PortAudio.
- Plugin code is currently evaluated with `new Function()`. For security, sandbox in Web Workers or iframe.
- Matrix background uses canvas for the ghost-in-the-shell feel—you can replace with WebGL for better performance.
