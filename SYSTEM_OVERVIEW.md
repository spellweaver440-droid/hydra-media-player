# HydraPlayer — Complete System Overview

**Everything you need to know about HydraPlayer: How it works, what it does, how to set it up, and how to contribute.**

---

## 📋 Table of Contents

1. [What is HydraPlayer?](#what-is-hydroaplayer)
2. [How Does It Work?](#how-does-it-work)
3. [System Architecture](#system-architecture)
4. [Installation Guide](#installation-guide)
5. [Getting Started](#getting-started)
6. [Creating Plugins](#creating-plugins)
7. [Advanced Usage](#advanced-usage)
8. [Extending the Platform](#extending-the-platform)
9. [Troubleshooting](#troubleshooting)
10. [Contributing Guide](#contributing-guide)

---

## What is HydraPlayer?

### Overview

**HydraPlayer** is a hybrid media player that combines:

1. **Windows Media Player** — Traditional audio/video playback
2. **ARPWire** — Real-time audio manipulation and effects
3. **Hydra.xyz** — Live visual coding environment

The result: A beautiful, extensible platform for creating stunning audio-reactive visuals in real-time with JavaScript.

### Key Use Cases

- 🎨 **Visual Artists** — Create real-time audio-reactive art
- 🎵 **Musicians** — Develop live visual accompaniment for performances
- 💻 **Developers** — Build plugins and extend the platform
- 🎓 **Educators** — Teach Web Audio API and creative coding
- 🔬 **Researchers** — Experiment with audio visualization techniques

### Philosophy

**Write once, visualize everywhere.** No compilation, no setup shenanigans—just code and watch it render in real-time.

---

## How Does It Work?

### User Workflow

```
1. Load Audio File
   ↓
2. Audio Engine Analyzes Frequencies (FFT)
   ↓
3. Frequency Data Available to Visual Code
   ↓
4. User Writes JavaScript
   ↓
5. Code Runs Every Frame with Audio Data
   ↓
6. Canvas Updates in Real-Time
```

### Technical Flow

```
Audio Input (MP3/WAV/OGG)
    ↓
Web Audio API
    ↓
Analyser Node (FFT => frequency bins)
    ↓
Uint8Array (128 frequency values, 0-255)
    ↓
Visual Code (JavaScript)
    ↓
Canvas 2D Context
    ↓
Display on Screen
```

### The Audio Analysis

We use the **Web Audio API's Analyser** to convert audio into frequency data:

```
Frequency Data: [12, 45, 78, 234, 156, ...]
               Bass  ^     ^    ^     ^
               Mid             ^
               Treble              ^
```

Each value is 0-255 representing energy at that frequency.

### The Visual Code

You write JavaScript that has access to:

```javascript
canvas      // HTMLCanvasElement
ctx         // 2D drawing context
audioData   // Uint8Array of 128 frequency values
```

Every frame (60fps), your code runs with the latest audio data.

---

## System Architecture

### Component Diagram

```
┌─────────────────────────────────────────────────┐
│           HydraPlayer (Electron App)             │
├─────────────────────────────────────────────────┤
│                                                   │
│  ┌──────────────────────────────────────────┐   │
│  │    Main Process (Node.js / main.js)      │   │
│  │  - Window management                     │   │
│  │  - Plugin discovery & loading            │   │
│  │  - IPC communication                     │   │
│  └──────────────────────────────────────────┘   │
│                    |                              │
│          IPC Bridge (preload.js)                 │
│                    |                              │
│  ┌──────────────────────────────────────────┐   │
│  │  Renderer Process (Chromium / React)     │   │
│  │  - UI components                         │   │
│  │  - Audio playback control                │   │
│  │  - Visual editor                         │   │
│  │  - Canvas rendering loop                 │   │
│  └──────────────────────────────────────────┘   │
│                    |                              │
│            Web Audio API                         │
│                    |                              │
│  ┌──────────────────────────────────────────┐   │
│  │     Audio Engine (Browser Native)        │   │
│  │  - Frequency analysis (FFT)              │   │
│  │  - Playback control                      │   │
│  └──────────────────────────────────────────┘   │
│                    |                              │
│            ┌───────┴────────┐                    │
│            ↓                ↓                     │
│         Audio Out      FFT Data                  │
│         (Speakers)    (audioData)                │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Data Flow

```
User loads audio file
    ↓
File → Web Audio API → MediaElementAudioSource
    ↓
Analyser Node (FFT analysis)
    ↓
getByteFrequencyData() → Uint8Array
    ↓
Pass to Visual Code
    ↓
User writes: ctx.fillRect(x, y, w, h) using audioData
    ↓
Canvas renders
    ↓
Display updated
```

### Key Technologies

| Layer | Technology |
|-------|-----------|
| **Desktop Shell** | Electron 26 |
| **UI Framework** | React 18 (via CDN) |
| **Audio Engine** | Web Audio API (Browser Native) |
| **Visual Rendering** | Canvas 2D |
| **Code Execution** | JavaScript (Babel transpiler) |
| **Plugin System** | Node.js module loading |
| **IPC** | Electron IPC (contextBridge) |

---

## Installation Guide

### Quick Start

#### Linux (Ubuntu, Debian, Kali, Fedora)

```bash
git clone https://github.com/spellweaver440-droid/hydroaplayer.git
cd hydroaplayer
chmod +x install-linux.sh
./install-linux.sh
```

Find **HydraPlayer** in your applications menu.

#### macOS

```bash
git clone https://github.com/spellweaver440-droid/hydroaplayer.git
cd hydroaplayer
chmod +x install-macos.sh
./install-macos.sh

# Add alias to ~/.zshrc
alias hydroaplayer='~/Applications/HydraPlayer/macos/launch-macos.sh'
```

### Detailed Setup

**See [docs/INSTALLATION.md](docs/INSTALLATION.md) for:**
- System requirements
- Node.js installation
- Troubleshooting
- Platform-specific instructions

---

## Getting Started

### Step 1: Launch the App

```bash
npm start
# or
~/.local/share/HydraPlayer/launch-linux.sh  # Linux
# or
~/Applications/HydraPlayer/macos/launch-macos.sh  # macOS
```

### Step 2: Load Audio

1. Click **file input** → select `.mp3`, `.wav`, `.ogg`
2. Audio appears in **Playlist**
3. Click to play

### Step 3: Use Controls

- **Play/Pause** — Start/stop playback
- **Skip** — Jump to next track
- **Volume Slider** — Adjust volume (0-100%)
- **Mute** — Toggle mute (🔊/🔇)

### Step 4: Experiment with Visuals

The **Live Visual Editor** shows a default spectrum analyzer. Edit the code:

```javascript
// Default code
ctx.fillStyle = 'rgba(0,0,0,0.2)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Add this to draw a center circle
ctx.fillStyle = 'rgba(255,0,255,0.5)';
ctx.beginPath();
ctx.arc(canvas.width/2, canvas.height/2, 50, 0, Math.PI*2);
ctx.fill();
```

Watch it update in real-time!

### Step 5: Load a Plugin

1. **Plugins Panel** (sidebar) shows available plugins
2. Click **Load** on "Kaleidoscope"
3. See the code change in the editor
4. Play music and watch it synchronize!

### Step 6: Create Your Plugin

1. Copy `PLUGIN_TEMPLATE.js` → `plugins/my-visual.js`
2. Edit the visual code
3. Restart the app
4. Click **Load** in plugins panel

---

## Creating Plugins

### Plugin Anatomy

A plugin exports a JavaScript module:

```javascript
module.exports = {
  meta: {
    name: 'Plugin Name',
    id: 'unique-id',
    version: '0.1.0',
    description: 'What it does'
  },
  
  getVisualCode: function() {
    return `
      // Code runs every frame with: canvas, ctx, audioData
    `;
  }
};
```

### Example: Pulsing Circle

Create `plugins/pulse.js`:

```javascript
module.exports = {
  meta: {
    name: 'Pulsing Circle',
    id: 'pulse-circle',
    version: '0.1.0',
    description: 'Simple pulsing circle synchronized to bass'
  },

  getVisualCode: function() {
    return `
      // Clear with fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Get bass frequency (low frequencies)
      const bass = audioData.slice(0, 10);
      const bassEnergy = bass.reduce((a,b) => a+b) / bass.length / 255;
      
      // Draw pulsing circle
      const radius = 50 + bassEnergy * 100;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      // Create gradient
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, 'hsla(280, 100%, 50%, 1)');
      grad.addColorStop(1, 'hsla(280, 100%, 50%, 0)');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    `;
  }
};
```

Save it, restart, and click **Load**.

### Plugin Tips

- **Access audioData**: Array of 128 frequency values (0-255)
- **Split frequencies**:
  ```javascript
  const bass = audioData.slice(0, 10);  // Low frequencies
  const mid = audioData.slice(40, 85);  // Mid frequencies
  const treble = audioData.slice(85, 128);  // High frequencies
  ```
- **Use HSL colors**: `hsl(hue, saturation%, lightness%)` is easier than RGB
- **Smooth animations**: Use `Math.sin()`, `Math.cos()` with `Date.now()`
- **Avoid loops**: Keep code efficient; runs 60x per second

---

## Advanced Usage

### Keyboard Shortcuts

- **F12** — Open DevTools
- **Ctrl+R** (Cmd+R) — Reload app
- **Escape** — (in DevTools) close console

### DevTools Debugging

1. Press **F12** in the app window
2. Check **Console** tab for errors
3. Use `console.log()` in your visual code:
   ```javascript
   console.log('audioData[0]:', audioData[0]);
   console.log('canvas size:', canvas.width, canvas.height);
   ```

### Canvas API Reference

```javascript
// Drawing shapes
ctx.fillStyle = 'red';
ctx.fillRect(x, y, width, height);
ctx.fillText('Hello', x, y);

// Paths
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.arc(x, y, radius, startAngle, endAngle);
ctx.stroke();
ctx.fill();

// Transformations
ctx.translate(x, y);  // Move origin
ctx.rotate(angle);    // Rotate
ctx.scale(sx, sy);    // Scale
ctx.save();           // Save state
ctx.restore();        // Restore state

// Gradients
const grad = ctx.createLinearGradient(x1, y1, x2, y2);
grad.addColorStop(0, 'red');
grad.addColorStop(1, 'blue');
ctx.fillStyle = grad;
```

### Useful Math Functions

```javascript
// Frequency analysis helpers
const avgFreq = audioData.reduce((a,b) => a+b) / audioData.length;
const maxFreq = Math.max(...audioData);
const minFreq = Math.min(...audioData);
const normalized = audioData[i] / 255;  // 0-1

// Trigonometry
const angle = i / audioData.length * Math.PI * 2;
const x = Math.cos(angle);
const y = Math.sin(angle);

// Easing
const time = Date.now() * 0.001;
const wave = Math.sin(time);
const bounce = Math.abs(Math.sin(time));
```

---

## Extending the Platform

### Integration Ideas

#### 3D Graphics (three.js)

```bash
npm install three
```

```javascript
// In visual editor or plugin
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 900/400);
const renderer = new THREE.WebGLRenderer({ canvas });

// Add cubes, spheres, etc.
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
scene.add(cube);

// Animate with audio
function animate() {
  cube.rotation.x = audioData[0] / 255 * 0.01;
  renderer.render(scene, camera);
}
```

#### WebSocket Streaming

Share visuals over network:

```javascript
// Send audio data to other clients
const ws = new WebSocket('ws://localhost:8080');
ws.send(JSON.stringify({ freq: audioData }));
```

#### MIDI Control

```bash
npm install jsmidgen
```

Trigger visuals with MIDI events from musical instruments.

#### Lyric Sync

Parse lyrics from audio metadata and display them over visuals.

---

## Troubleshooting

### App Won't Start

**Error**: `Cannot find module 'electron'`

**Solution**:
```bash
npm install
npm start
```

### No Audio Playing

**Error**: No sound from speakers

**Linux Solution**:
```bash
# Check audio is working
speaker-test -t sine -f 1000

# Restart audio
systemctl --user restart pulseaudio
# or for pipewire
systemctl --user restart wireplumber
```

**macOS Solution**:
- Check System Preferences → Sound
- Ensure correct output device selected

### Visual Code Not Running

**Error**: Black/blank canvas

**Solution**:
1. Open DevTools (F12)
2. Check Console for syntax errors
3. Fix the JavaScript
4. The visual updates in real-time

### Plugin Won't Load

**Error**: Plugin doesn't appear in plugins panel

**Solution**:
1. Check file is in `plugins/` folder
2. Check JavaScript syntax: `node -c plugins/my-plugin.js`
3. Check `meta` object is exported
4. Restart the app

---

## Contributing Guide

### How to Contribute

1. **Report bugs** → Open GitHub issue
2. **Suggest features** → Discuss in GitHub Discussions
3. **Create plugins** → Submit pull request with your plugin
4. **Improve docs** → Update markdown files
5. **Fix bugs** → Submit pull request with fix

### Development Workflow

```bash
# Fork repository
# Clone your fork
git clone https://github.com/spellweaver440-droid/hydroaplayer.git

# Create feature branch
git checkout -b feature/my-feature

# Make changes and test
npm start

# Commit with clear message
git commit -m "Add: my feature description"

# Push to your fork
git push origin feature/my-feature

# Open Pull Request on GitHub
```

### Code Style

```javascript
// ✅ Good: Clear names, comments, arrow functions
const handlePlayClick = () => {
  // Resume playback when user clicks play
  if (audio) audio.play();
};

// ❌ Bad: Unclear, no comments
const h = () => { if (a) a.play(); };
```

### Testing Before PR

- Test on **both Linux and macOS**
- Test with **multiple audio formats**
- Check **console for errors** (F12)
- Verify **plugins load correctly**
- Run **npm start** successfully

---

## File Structure

```
hydroaplayer/
├── main.js                      # Electron main process
├── renderer.js                  # React UI + audio/visuals
├── preload.js                   # IPC bridge
├── index.html                   # HTML entry
├── styles.css                   # Styling
├── package.json                 # Dependencies
│
├── plugins/                     # User plugins
│   ├── sample-plugin.js
│   └── kaleidoscope.js
│
├── diagrams/                    # Architecture docs
│   ├── module-diagram.mmd
│   └── stack-diagram.mmd
│
├── docs/                        # Documentation
│   ├── INSTALLATION.md
│   ├── DEVELOPMENT.md
│   └── stack-recommendation.md
│
├── install-linux.sh             # Linux installer
├── install-macos.sh             # macOS installer
├── launch-linux.sh              # Linux launcher
├── launch-macos.sh              # macOS launcher
│
├── README.md                    # Main documentation
├── QUICKSTART.md                # Quick start guide
├── CONTRIBUTING.md              # Contributing guide
├── PROJECT_MANIFEST.md          # File inventory
├── GITHUB_SETUP.md              # GitHub setup guide
│
└── LICENSE                      # MIT License
```

---

## FAQ

**Q: Can I use HydraPlayer commercially?**  
A: Yes! It's MIT licensed—use it however you want.

**Q: Does it work on Windows?**  
A: Not currently, but it's easy to add. Windows support coming soon.

**Q: Can I save my visuals?**  
A: You can save your `.js` plugin files. Visual code export feature coming soon.

**Q: Is there a web version?**  
A: Not yet, but it's on the roadmap. The code is designed to be web-compatible.

**Q: How do I report a bug?**  
A: Open a GitHub issue with details and reproduction steps.

**Q: Can I contribute?**  
A: Yes! Please see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Resources

- **Web Audio API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **Electron Docs**: https://www.electronjs.org/docs
- **React Docs**: https://react.dev/
- **three.js**: https://threejs.org/

---

## Support

Need help?

1. Check [docs/](docs/) folder
2. Read [QUICKSTART.md](QUICKSTART.md)
3. Open GitHub issue
4. Join GitHub Discussions

---

**HydraPlayer v0.1.0 — Prototype**  
**Made with 🎵 and ✨**

For creators, by creators.

