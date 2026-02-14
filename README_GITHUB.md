# HydraPlayer

![HydraPlayer Demo](https://img.shields.io/badge/HydraPlayer-Prototype-blue?style=for-the-badge)
![Electron](https://img.shields.io/badge/Electron-26-blue?logo=electron&style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&style=flat-square)
![Web Audio API](https://img.shields.io/badge/Web%20Audio-API-FF6B6B?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A hybrid media player combining Windows Media Player + ARPWire-style audio + Hydra.xyz visual coding environment.**

Build stunning, real-time audio-reactive visuals with JavaScript. No compilation, no setup—just code and watch it render.

## ✨ Features

- **🎵 Audio Playback** — Drag-and-drop MP3/WAV/OGG support with playlist management
- **📊 Live FFT Analysis** — Real-time frequency data for audio-reactive visuals
- **💻 Live Visual Editor** — Write JavaScript that updates in real-time
- **🟣 Neon Psychedelic UI** — Matrix/Ghost in the Shell inspired dark theme
- **🔌 Plugin System** — Extensible architecture—drop `.js` files in `plugins/` folder
- **🎨 Audio-Reactive Visuals** — Access raw frequency data in your visual code
- **⏭️ Skip / Volume / Mute** — Full playback controls
- **🖥️ Cross-Platform** — Works on Linux (Kali, Ubuntu, Fedora, Debian) and macOS

## 🚀 Quick Start

### Linux (Ubuntu, Debian, Kali, Fedora)

```bash
git clone https://github.com/spellweaver440-droid/hydroaplayer.git
cd hydroaplayer
chmod +x install-linux.sh
./install-linux.sh
```

Then find **HydraPlayer** in your applications menu, or run:
```bash
~/.local/share/HydraPlayer/launch-linux.sh
```

### macOS

```bash
git clone https://github.com/spellweaver440-droid/hydroaplayer.git
cd hydroaplayer
chmod +x install-macos.sh
./install-macos.sh
```

Then run:
```bash
~/Applications/HydraPlayer/macos/launch-macos.sh
```

Or add to your shell profile (`~/.zshrc` or `~/.bash_profile`):
```bash
alias hydroaplayer='~/Applications/HydraPlayer/macos/launch-macos.sh'
```

## 📖 How It Works

### Media Playback
1. Click file input → select audio files (MP3, WAV, OGG, etc.)
2. Use **Play / Pause / Skip** buttons
3. Adjust **Volume** slider or toggle **Mute**
4. Click playlist items to switch tracks

### Live Visual Coding
Write JavaScript that runs every frame with access to:

```javascript
canvas      // HTMLCanvasElement (900×400)
ctx         // CanvasRenderingContext2D (2D drawing context)
audioData   // Uint8Array of 128 FFT frequency values (0-255)
```

**Example: Simple Spectrum Bars**
```javascript
ctx.fillStyle = 'rgba(0,0,0,0.2)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const len = audioData.length;
const barWidth = canvas.width / len;

for (let i = 0; i < len; i++) {
  const height = (audioData[i] / 255) * canvas.height;
  const hue = (i / len) * 360;
  ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
  ctx.fillRect(i * barWidth, canvas.height - height, barWidth, height);
}
```

### Plugin System
Plugins are JavaScript modules that export visual code. Create one:

1. Copy `PLUGIN_TEMPLATE.js` to `plugins/my-visual.js`
2. Edit the visual code
3. Restart the app
4. Click "Load" in the plugins panel

**Plugin Structure:**
```javascript
module.exports = {
  meta: {
    name: 'My Cool Visual',
    id: 'my-visual',
    version: '0.1.0',
    description: 'A awesome effect'
  },
  
  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Your code here...
    `;
  }
};
```

## 📁 Project Structure

```
hydroaplayer/
├── main.js                    # Electron main process
├── renderer.js                # React UI + audio/visual engine
├── preload.js                 # Secure IPC bridge
├── index.html                 # Entry point
├── styles.css                 # Neon styling
├── package.json               # Dependencies
├── install-linux.sh           # Linux installer
├── install-macos.sh           # macOS installer
├── launch-linux.sh            # Linux launcher
├── launch-macos.sh            # macOS launcher
├── plugins/                   # User visual modules
│   ├── sample-plugin.js
│   └── kaleidoscope.js
├── diagrams/                  # Architecture reference
│   ├── module-diagram.mmd
│   └── stack-diagram.mmd
├── docs/
│   ├── stack-recommendation.md
│   ├── INSTALLATION.md
│   └── DEVELOPMENT.md
├── README.md                  # This file
├── QUICKSTART.md              # Quick-start guide
└── PROJECT_MANIFEST.md        # Complete inventory
```

## 🔧 System Requirements

### Minimum
- **OS**: Linux (Ubuntu 20.04+, Debian 11+, Kali 2023+, Fedora 36+) or macOS 10.13+
- **Node.js**: v14+ (v16+ recommended)
- **RAM**: 512MB
- **Audio**: ALSA (Linux) or CoreAudio (macOS)

### Recommended
- **Node.js**: v18+
- **RAM**: 2GB+
- **GPU**: Any modern GPU (for smoother visuals)

## ⚙️ Installation Guide

### Detailed Setup

#### Linux — Full Instructions

**1. Install Node.js**

Ubuntu/Debian/Kali:
```bash
sudo apt update
sudo apt install -y nodejs npm
```

Fedora:
```bash
sudo dnf install -y nodejs npm
```

**2. Clone or Download HydraPlayer**
```bash
git clone https://github.com/spellweaver440-droid/hydroaplayer.git
cd hydroaplayer
```

**3. Run the Installer**
```bash
chmod +x install-linux.sh
./install-linux.sh
```

**4. Launch from Applications Menu**
  - Open your applications menu
  - Search for "HydraPlayer"
  - Click to launch

**5. Or Launch from Terminal**
```bash
~/.local/share/HydraPlayer/launch-linux.sh
```

#### macOS — Full Instructions

**1. Install Node.js**

Option A (Homebrew):
```bash
brew install node
```

Option B (Direct):
Visit [nodejs.org](https://nodejs.org) and download the macOS installer.

Option C (NVM):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.zshrc  # or ~/.bash_profile
nvm install node
```

**2. Clone or Download HydraPlayer**
```bash
git clone https://github.com/spellweaver440-droid/hydroaplayer.git
cd hydroaplayer
```

**3. Run the Installer**
```bash
chmod +x install-macos.sh
./install-macos.sh
```

**4. Create an Alias (Optional)**
Add to `~/.zshrc`:
```bash
alias hydroaplayer='~/Applications/HydraPlayer/macos/launch-macos.sh'
```

Then:
```bash
source ~/.zshrc
hydroaplayer
```

**5. Or Launch Directly**
```bash
~/Applications/HydraPlayer/macos/launch-macos.sh
```

## 🎨 Create Your First Plugin

### Simple Example: Animated Spiral

1. Create `plugins/spiral.js`:
```javascript
module.exports = {
  meta: {
    name: 'Spiral Wave',
    id: 'spiral-wave',
    version: '0.1.0',
    description: 'Rotating spiral synchronized to audio'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const time = Date.now() * 0.001;
      
      for (let i = 0; i < audioData.length; i++) {
        const freq = audioData[i] / 255;
        const angle = (i / audioData.length) * Math.PI * 2 + time;
        const radius = 50 + freq * 100;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        
        ctx.fillStyle = 'hsl(' + (angle * 180 / Math.PI) + ', 100%, 50%)';
        ctx.fillRect(x - 3, y - 3, 6, 6);
      }
    `;
  }
};
```

2. Restart HydraPlayer
3. Click "Load" on the new plugin
4. Play music and watch it spiral!

## 🐛 Troubleshooting

### App won't start
- Ensure Node.js is installed: `node --version && npm --version`
- Reinstall dependencies: `npm install`
- Check Electron logs: look in `~/.config/mediaplayer/`

### No audio playing
- Check system audio permissions
- Test audio: `speaker-test -t sine -f 1000` (Linux) or use System Preferences (macOS)
- ALSA users: ensure pulseaudio/pipewire is running

### Visual code errors
- Press F12 in the app window for DevTools
- Check the console for error messages
- Make sure your JavaScript syntax is valid
- Example: `console.log('test')` to debug

### Plugin won't load
- Check JavaScript syntax
- Ensure file is in `plugins/` folder
- Verify `meta` object is exported
- Restart the app

## 🚀 Next Steps

### Create More Plugins
- Waveform oscilloscope
- Particle effects
- Fractal zoom
- Text visualization
- 3D effects (using canvas tricks)

### Extend the Engine
- Integrate **three.js** for 3D visuals
- Add **PortAudio** / **JACK** for professional audio routing
- Implement **WebSockets** for network streaming
- Add **EQ controls** and real-time audio analysis

### Contribute
- Submit plugins
- Report bugs
- Suggest features
- Improve documentation

## 📚 Documentation

- **[INSTALLATION.md](./docs/INSTALLATION.md)** — Detailed setup guide
- **[QUICKSTART.md](./QUICKSTART.md)** — Getting started quickly
- **[DEVELOPMENT.md](./docs/DEVELOPMENT.md)** — Development guide
- **[PROJECT_MANIFEST.md](./PROJECT_MANIFEST.md)** — Complete file inventory
- **[stack-recommendation.md](./docs/stack-recommendation.md)** — Tech stack details

## 🎯 Roadmap

- [ ] 3D visuals (three.js integration)
- [ ] Network streaming (WebSockets)
- [ ] Advanced DSP (PortAudio/JACK)
- [ ] Plugin sandboxing (Web Workers)
- [ ] Equalizer UI
- [ ] Theme system
- [ ] Lyric sync
- [ ] Web version

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Electron](https://www.electronjs.org/) — Desktop app framework
- [React](https://react.dev/) — UI library
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) — Audio processing
- [Hydra](https://hydra.xyz/) — Inspiration for live visual coding

## 📞 Support

- **Issues**: Report bugs on [GitHub Issues](https://github.com/spellweaver440-droid/hydroaplayer/issues)
- **Discussions**: Join community [GitHub Discussions](https://github.com/spellweaver440-droid/hydroaplayer/discussions)
- **Docs**: Check the [docs](./docs/) folder

---

**Made with 🎵 and ✨ for creative audio-visual artists.**

**HydraPlayer v0.1.0** — Prototype  
**Last Updated**: February 13, 2026

