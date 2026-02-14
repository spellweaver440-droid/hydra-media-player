# Development Guide

Guide for developers who want to contribute to HydraPlayer or extend it.

## Table of Contents

1. [Development Setup](#development-setup)
2. [Project Architecture](#project-architecture)
3. [Running in Development](#running-in-development)
4. [Creating Plugins](#creating-plugins)
5. [Extending the Engine](#extending-the-engine)
6. [Building & Packaging](#building--packaging)
7. [Code Style](#code-style)
8. [Contributing](#contributing)

## Development Setup

### Prerequisites

- **Node.js**: v16+ (v18+ recommended)
- **npm**: v7+ (comes with Node.js)
- **Git**: For version control
- **Text Editor**: VS Code recommended, with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Prettier
  - ESLint

### Clone the Repository

```bash
git clone https://github.com/spellweaver440-droid/hydroaplayer.git
cd hydroaplayer
```

### Install Development Dependencies

```bash
npm install
```

This installs both production and development dependencies.

### Optional: Install Development Tools

```bash
# Electron CLI for testing
npm install -g electron

# Build tools (for packaging later)
npm install --save-dev electron-builder
npm install --save-dev electron-packager
```

---

## Project Architecture

### File Structure

```
hydroaplayer/
├── main.js                  # Electron main process
├── renderer.js              # React UI + audio/visual engine
├── preload.js               # Secure IPC bridge
├── index.html               # HTML entry point
├── styles.css               # Styling
├── package.json             # Dependencies + scripts
│
├── plugins/                 # User visual modules
│   ├── sample-plugin.js
│   └── kaleidoscope.js
│
├── diagrams/                # Architecture diagrams
│   ├── module-diagram.mmd
│   └── stack-diagram.mmd
│
├── docs/
│   ├── INSTALLATION.md
│   ├── DEVELOPMENT.md       # This file
│   └── stack-recommendation.md
│
├── install-linux.sh         # Linux installer
├── install-macos.sh         # macOS installer
├── launch-linux.sh          # Linux launcher
├── launch-macos.sh          # macOS launcher
│
└── node_modules/            # Dependencies (git ignored)
```

### Key Files Explained

#### `main.js` — Electron Main Process

- Creates the BrowserWindow
- Loads plugins from `plugins/` folder
- Handles IPC communication
- Sends plugin metadata to renderer

**Key Functions:**
- `createWindow()` — Creates app window
- `loadPlugins()` — Scans and loads plugins

#### `renderer.js` — React UI + Audio Engine

- React component tree
- Audio setup (Web Audio API)
- Visual rendering loop
- FFT analysis
- Canvas drawing

**Key Functions:**
- `setupAudio(file)` — Initializes audio playback
- `startRenderLoop()` — Canvas rendering loop
- `togglePlay()` — Play/pause handler
- `skipTrack()` — Next track
- `handleVolumeChange()` — Volume control

#### `preload.js` — IPC Bridge

Exposes safe IPC methods to renderer:
- `electronAPI.send(channel, data)`
- `electronAPI.on(channel, callback)`

#### `index.html` — Entry Point

Loads:
- React (CDN)
- Babel (for JSX transpilation)
- Our `renderer.js`

#### `styles.css` — Neon Styling

- Matrix background
- Neon gradients
- Responsive layout
- Audio-reactive animations

---

## Running in Development

### Start Development Server

```bash
npm start
```

This runs Electron in development mode with hot-reload support (via Babel).

### Open DevTools

Inside the running app:
- **Mac**: `Cmd + Option + I`
- **Linux/Windows**: `Ctrl + Shift + I`

### Debug the Main Process

In `main.js`, add:
```javascript
// Enable dev tools on startup
win.webContents.openDevTools();
```

### Hot Reload (Manual)

To reload the renderer:
1. Make changes to `renderer.js`, `styles.css`, etc.
2. Press `Ctrl+R` (or `Cmd+R` on Mac) in the app window
3. Changes appear immediately

---

## Creating Plugins

### Plugin Anatomy

A plugin is a Node.js module that exports metadata and visual code.

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
      // JavaScript code that runs every frame
      // Has access to: canvas, ctx, audioData
    `;
  }
};
```

### Example: Waveform Plugin

Create `plugins/waveform.js`:

```javascript
module.exports = {
  meta: {
    name: 'Oscilloscope',
    id: 'oscilloscope',
    version: '0.1.0',
    description: 'Classic waveform visualization'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let i = 0; i < audioData.length; i++) {
        const x = (i / audioData.length) * canvas.width;
        const y = canvas.height/2 - (audioData[i] / 255 - 0.5) * canvas.height;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.stroke();
    `;
  }
};
```

### Testing Your Plugin

1. Save to `plugins/my-plugin.js`
2. Restart the app: `npm start`
3. Click "Load" in the plugins panel
4. Edit the code in the editor
5. Check DevTools (F12) for errors

---

## Extending the Engine

### Add New Audio Features

In `renderer.js`, modify `setupAudio()`:

```javascript
// Add frequency range detection
const frequencies = {
  bass: audioData.slice(0, 10),
  mid: audioData.slice(10, 50),
  treble: audioData.slice(50, 128)
};

// Calculate averages
const bassAvg = frequencies.bass.reduce((a,b) => a+b) / frequencies.bass.length;
const midAvg = frequencies.mid.reduce((a,b) => a+b) / frequencies.mid.length;
const trebleAvg = frequencies.treble.reduce((a,b) => a+b) / frequencies.treble.length;

// Expose to visual code
window.frequency = { bass: bassAvg, mid: midAvg, treble: trebleAvg };
```

### Add UI Controls

Modify `renderer.js` to add new buttons/sliders:

```javascript
<button onClick={newFeature}>New Feature</button>
```

Update `styles.css` to style it.

### Integrate 3D Graphics (three.js)

**1. Install three.js:**
```bash
npm install three
```

**2. Update `index.html`:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

**3. In `renderer.js`:**
```javascript
// Replace canvas 2D with three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 900/400);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(900, 400);

// Add objects to scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animate with audioData
function animate() {
  cube.rotation.x += audioData[0] / 255 * 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
```

### Add Network Streaming

**1. Install WebSocket library:**
```bash
npm install ws
```

**2. In `main.js`, add WebSocket server:**
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send audio data to clients
  audioData.forEach(value => {
    ws.send(JSON.stringify({ freq: value }));
  });
});
```

---

## Building & Packaging

### Create Installers

#### Linux AppImage

```bash
npm install --save-dev electron-builder

# In package.json, add:
"build": {
  "appId": "com.hydroaplayer",
  "linux": {
    "target": ["AppImage"],
    "icon": "icon.png"
  }
}

# Build:
npm run build
```

#### macOS DMG

```bash
# In package.json:
"build": {
  "appId": "com.hydroaplayer",
  "mac": {
    "target": ["dmg"],
    "icon": "icon.icns"
  }
}

npm run build
```

#### Windows Installer

```bash
# In package.json:
"build": {
  "appId": "com.hydroaplayer",
  "win": {
    "target": ["nsis"],
    "icon": "icon.ico"
  }
}

npm run build
```

---

## Code Style

### Conventions

- **JavaScript**: ES6+, use `const`/`let` instead of `var`
- **React**: Functional components with hooks
- **Comments**: Explain the "why", not the "what"
- **Naming**: camelCase for functions/variables, PascalCase for components

### Example

```javascript
// ✅ Good
const handlePlayClick = () => {
  // Resume audio playback when user clicks play
  if (audio) audio.play();
};

// ❌ Bad
const hp = () => {
  if (a) a.play();
};
```

### Linting (Optional)

```bash
npm install --save-dev eslint prettier

# Initialize ESLint
npx eslint --init

# Format code
npx prettier --write "**/*.js"

# Lint
npx eslint .
```

---

## Contributing

### Workflow

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/spellweaver440-droid/hydroaplayer.git
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make changes** and test
5. **Commit** with clear messages:
   ```bash
   git commit -m "Add: [feature] description"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** on GitHub

### Commit Messages

Use clear, descriptive messages:

```
Add: New feature description
Fix: Bug fix description
Docs: Documentation updates
Style: Code formatting/style
Refactor: Code restructuring
Perf: Performance improvements
Test: Testing additions
```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Performance improvement

## Testing
How to test these changes:
1. ...
2. ...

## Screenshots (if applicable)
Add before/after screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console errors
- [ ] Tested on Linux/macOS
```

---

## Useful Resources

- [Electron Docs](https://www.electronjs.org/docs)
- [React Docs](https://react.dev/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [three.js Docs](https://threejs.org/docs/)

---

## Questions?

- Open an issue on GitHub
- Check existing discussions
- Ask in GitHub Discussions section

**Happy coding! 🎵✨**

