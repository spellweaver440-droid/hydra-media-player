# HydraPlayer — Real-Time Audio Visualization Engine

A hybrid Electron-based media player combining audio playback, live visual coding (Hydra-style), real-time FFT visualization, and a powerful plugin system for custom visual effects.

## 🎨 Features

- **Audio Playback**: Load and play multiple audio files with seamless playlist management
- **Progress Control**: Visual progress bar with click-to-seek and time display (MM:SS format)
- **30+ Visual Plugins**: Pre-built trippy, elemental, organic, and cyberpunk visualizations
- **Live Code Editor**: Write JavaScript to manipulate canvas with real-time audio data
- **Plugin System**: Drop-in `.js` files that auto-load with hot-reload capability
- **Neon UI**: Ghost-in-the-shell aesthetic with gradient backgrounds and glassmorphic design
- **Volume Control**: Adjustable volume with mute toggle
- **Web Audio API**: Real-time FFT frequency analysis for responsive visuals

## 📥 Installation

### Requirements
- Node.js 14+
- npm or yarn
- Electron (auto-installed via npm)

### Linux / macOS
```bash
git clone https://github.com/spellweaver440-droid/hydroaplayer
cd hydroaplayer
npm install
npm start
```

### Or use provided install script:
```bash
# Linux
bash install-linux.sh && bash launch-linux.sh

# macOS
bash install-macos.sh && bash launch-macos.sh
```

## 🚀 Quick Start

1. **Load Audio**: Click the file input to select audio files (mp3, wav, ogg, flac)
2. **Play**: Press ▶ Play button
3. **Visualize**: Default visualization loads automatically
4. **Seek**: Click the progress bar to jump to any part of the song
5. **Load Plugin**: Select a plugin from the list and click "Load" to inject its code
6. **Edit Code**: Modify the visual code in the editor window and click "Run Code" to apply

## 🎯 Plugin System

### Pre-Built Plugins (30 Total)

#### Core Visualizations (5)
- **waveform.js**: Oscilloscope-style frequency waveform
- **spiral.js**: Rotating spiral with frequency rotation
- **pulse.js**: Pulsing circles responding to bass frequencies
- **particles.js**: Particle system driven by audio energy
- **equalizer.js**: Classic equalizer bars with gradient colors

#### Trippy Effects (12)
- chromatic-trippy.js, fractal-trippy.js, fluid-trippy.js
- glitch-trippy.js, hexagon-trippy.js, kaleidoscope-trippy.js
- mandala-trippy.js, plasma-trippy.js, rings-trippy.js
- strobewave-trippy.js, tunnel-trippy.js
- *Plus original kaleidoscope.js and sample-plugin.js*

#### Elemental Series (4)
- **elemental-fire.js**: Fire particles with heat-map colors
- **elemental-water.js**: Fluid simulation with wave propagation
- **elemental-earth.js**: Rock/terrain patterns with noise
- **elemental-lightning.js**: Electric bolt generation with fractal branching

#### Organic Series (2)
- **organic-cells.js**: Cell membrane growth animations
- **organic-growth.js**: Tree-like root system generation

#### Cyberpunk Series (3)
- **ghost-in-shell.js**: Glitched scan-line matrices
- **glitch-matrix.js**: Corrupted digital effect
- **neon-dreams.js**: Neon street lights with rain streaks

#### Colorful Series (2)
- **colorful-aurora.js**: Aurora borealis effect
- **colorful-rainbow.js**: Spectrum wave animations

#### Legacy/Original (2)
- **alchemy.js**: Complex frequency-domain art
- **sample-plugin.js**: Basic template plugin

### Creating Custom Plugins

Create a new file `plugins/my-effect.js`:

```javascript
module.exports = {
  meta: {
    name: 'My Effect',
    id: 'my-effect',
    version: '1.0.0',
    description: 'A custom visual effect'
  },
  
  getVisualCode() {
    return `
      // canvas, ctx, audioData are provided
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < audioData.length; i++) {
        const x = (i / audioData.length) * canvas.width;
        const y = canvas.height - (audioData[i] / 255) * canvas.height;
        
        ctx.fillStyle = \`hsl(\${i}, 100%, 50%)\`;
        ctx.fillRect(x, y, 2, 2);
      }
    `;
  }
};
```

**Available Variables in Visual Code:**
- `canvas`: HTMLCanvasElement (900x400)
- `ctx`: CanvasRenderingContext2D
- `audioData`: Uint8Array of 128 frequency values (0-255)

**Tips:**
- Use `audioData[i]` for frequency bands (0=bass, 127=treble)
- Apply trails with `ctx.fillRect(0, 0, canvas.width, canvas.height)` with low opacity
- Use HSL color space for easy hue rotation: `hsl(index, 100%, 50%)`
- Request new frames automatically via render loop

## 🏗️ Architecture

```
HydraPlayer
├── main.js              Electron main process, plugin loader, IPC
├── preload.js           Secure IPC bridge (contextBridge)
├── renderer.js          React UI, audio setup, canvas loop
├── styles.css           Neon gradients, layout
└── plugins/             User visual effect modules
```

### Data Flow

1. **Audio Load**: File → HTMLAudioElement
2. **FFT Analysis**: Web Audio API AnalyserNode → Uint8Array (128 bins)
3. **Plugin Loading**: Main process fs.readFileSync → require() → getVisualCode()
4. **Visual Render**: requestAnimationFrame loop executes user code with canvas + audioData
5. **State Management**: React hooks for UI sync

### Technical Stack

| Component | Technology |
|-----------|-----------|
| Desktop App | Electron 24+ |
| UI Framework | React 18 |
| Audio Analysis | Web Audio API (AnalyserNode) |
| Graphics | Canvas 2D |
| Plugin System | Node.js require() + IPC |
| Styling | CSS3 (gradients, glassmorphism) |
| IPC | Electron ipcMain/ipcRenderer |

## 🔧 Development

### Run in Development
```bash
npm start
```

### Build Package
```bash
npm run build  # Creates .AppImage/DMG/MSI
```

### Environment Variables
- `NODE_ENV`: Set to 'development' or 'production'

### Debugging
- Main process logs appear in terminal
- Renderer logs visible in Developer Tools (Ctrl+Shift+I)

## 📊 Performance Notes

- **Canvas Resolution**: 900x400 @ 60fps
- **Audio Buffers**: 128 FFT bins updated on timeupdate events
- **Plugin Count**: Handles 30+ loaded plugins with negligible memory overhead
- **Render Loop**: ~16ms per frame (60fps target)

### Optimization Tips
- Minimize `ctx.fillRect()` calls (batch operations)
- Use `ctx.globalAlpha` instead of rgba() for faster compositing  
- Cache complex calculations outside render loop
- Avoid `ctx.filter` for real-time effects (use canvas tricks instead)

## 🐛 Troubleshooting

**Plugins Not Loading?**
- Check file syntax: `node -c plugins/myplugin.js`
- Verify `module.exports` with both `meta` and `getVisualCode`
- Restart app: `npm start`

**No Audio?**
- Ensure file format is supported (mp3, wav, ogg, flac)
- Check browser console for Web Audio API errors
- Verify volume is not muted

**Visuals Stuttering?**
- Check for console errors in plugin code
- Reduce canvas complexity
- Close other resource-heavy apps

**IPC Errors?**
- Verify preload.js is loaded (check main.js webPreferences)
- Ensure `window.electronAPI` is available in console

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Credits

- **Web Audio API**: Frequency analysis inspiration from Hydra
- **Matrix Background**: Ghost in the Shell aesthetic
- **Plugin Architecture**: Modular design inspired by DAW plugins
- **Neon UI**: Inspired by cyberpunk and vaporwave aesthetics

## 🔗 Related Projects

- [Hydra](https://hydra.computer/) - Live coding environment for visuals
- [FFmpeg.js](https://ffmpegjs.github.io/) - Audio codec support
- [Three.js](https://threejs.org/) - 3D graphics (potential upgrade)
- [Electron](https://www.electronjs.org/) - Desktop app framework

## 📞 Support & Contributing

Found a bug? Have an idea for a plugin?
- Report issues on GitHub
- Submit pull requests with improvements
- Share custom plugins with the community

---

**Last Updated**: 2024
**Status**: Active Development
**Current Version**: 0.1.0
