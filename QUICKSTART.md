# 🎵✨ HydraPlayer — Quick Start Guide

## 🚀 What Just Happened

You now have a **fully functional hybrid media player** running on Kali Linux with:

- ✅ **Neon UI** (psychedelic, Matrix/Ghost in the Shell aesthetic)
- ✅ **Audio Playback** (Web Audio API)
- ✅ **Live Visual Coding** (Hydra-style editor)
- ✅ **Plugin System** (extensible architecture)
- ✅ **FFT Analysis** (audio-reactive visuals)

## 📂 Project Files

**Core**
- `main.js` — Electron main process, plugin loader, IPC
- `renderer.js` — React UI, audio engine, canvas rendering
- `index.html` — Entry point
- `styles.css` — Neon gradients
- `preload.js` — Secure IPC bridge

**Content**
- `plugins/` — User-defined visual modules
  - `sample-plugin.js` — Basic example
  - `kaleidoscope.js` — Advanced example (NEW!)
- `diagrams/` — Architecture diagrams
- `docs/` — Technical documentation

## 🎹 How to Use It

### 1. Load Audio
- Click file input → select `.mp3`, `.wav`, `.ogg`, etc.
- Click playlist item to play it

### 2. Watch Visuals
- Default visual: animated spectrum bars
- Open DevTools (F12) to debug

### 3. Experiment with Code
Edit the **Live Visual Editor** and watch it update in real-time. Available variables:

```javascript
canvas       // HTMLCanvasElement (900×400)
ctx          // CanvasRenderingContext2D
audioData    // Uint8Array with 128 frequency values (0-255)
```

**Example:**
```javascript
// Animated spiral
ctx.fillStyle = 'rgba(0,0,0,0.05)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

for (let i = 0; i < audioData.length; i++) {
  const v = audioData[i] / 255;
  const angle = (i / audioData.length) * Math.PI * 2;
  const x = canvas.width/2 + Math.cos(angle) * v * 150;
  const y = canvas.height/2 + Math.sin(angle) * v * 150;
  
  ctx.fillStyle = 'hsl(' + (angle * 180/Math.PI) + ', 100%, 50%)';
  ctx.fillRect(x-3, y-3, 6, 6);
}
```

### 4. Load Plugins
- Sidebar shows all plugins from `plugins/` folder
- Click "Load" to inject visual code into editor
- Try the new **Kaleidoscope** plugin!

## 🔌 Create Your Own Plugin

**Easiest: Copy the template**

```bash
cp /home/hons/Desktop/mediaplayer/PLUGIN_TEMPLATE.js \
   /home/hons/Desktop/mediaplayer/plugins/my-visual.js
```

Edit the file, then restart the app:
```bash
npm start
```

**Plugin structure:**

```javascript
module.exports = {
  meta: {
    name: 'My Visual',
    id: 'my-visual',
    version: '0.1.0',
    description: 'Does cool stuff'
  },
  
  getVisualCode: function() {
    return `
      // Your visual code here...
      ctx.fillStyle = '#ff00ff';
      ctx.fillRect(0, 0, 100, 100);
    `;
  }
};
```

**Tips:**
- Use `audioData` to create reactive effects
- HSL colors are great: `hsl(hue, saturation%, lightness%)`
- Gradients, transforms, and patterns all work
- Keep it smooth—avoid heavy loops

## 🎨 Plugin Ideas

- **Waveform**: Oscilloscope-style audio waveform
- **Particles**: Audio-driven particle explosion
- **Text**: Lyric visualization with metadata
- **Mandelbrot**: Zoom fractal with audio sync
- **Strobe**: Reactive strobing lights
- **Tunnel**: 3D tunnel effect (using canvas tricks)
- **Equalizer**: Classic bar-chart style

## 🔧 Advanced: Extend the Engine

### Add 3D Visuals
Replace canvas with **three.js**:

```javascript
// In main.js, add three.js to package.json and use it in renderer
npm install three
```

Then use `THREE.WebGLRenderer` instead of canvas 2D context.

### Add Real-Time Audio DSP
Integrate **PortAudio** or **JACK**:

```cpp
// Native Node module for low-latency audio routing
npm install portaudio.js
```

### Add Network Streaming
Use **WebSockets** for remote visuals or effects (ARPWire-style):

```javascript
// In package.json
npm install ws
```

### Add Sandbox Security
Move eval'd code to **Web Workers**:

```javascript
// Create a worker that runs user code safely
const worker = new Worker('shader-worker.js');
worker.postMessage({ code, audioData });
```

## 📊 Architecture Reference

**Data Flow:**
```
Audio File → Web Audio API → FFT Analysis → audioData
                 ↓
         Canvas 2D Rendering ← User Visual Code
                 ↓
         Display on Screen
```

**IPC Flow (Electron):**
```
Main Process (Loads Plugins)
    ↓ plugins-list (IPC)
Renderer (React UI)
    ↓ user edits code
Canvas Rendering Loop
    ↓ draws audioData
Display
```

## 📚 Files You May Want to Edit

| File | Purpose |
|------|---------|
| `styles.css` | Change neon colors, layout |
| `renderer.js` | Add new audio features |
| `main.js` | Modify plugin loading |
| `plugins/` | Add visual effects |
| `diagrams/` | Reference architecture |

## ⚡ Performance Tips

- Minimize loops in visual code
- Use `requestAnimationFrame` (already built-in)
- Avoid creating new objects every frame
- Profile with DevTools (F12 → Performance)

## 🐛 Debugging

**Open DevTools:**
```
Press: F12
```

**Check Console:**
- Errors in your visual code appear here
- Use `console.log()` to debug

**Common Issues:**

| Problem | Solution |
|---------|----------|
| No audio | Check browser permissions, ALSA setup |
| Visual stuttering | Reduce loop complexity |
| Plugin won't load | Check JavaScript syntax |
| App won't start | Reinstall: `npm install && npm start` |

## 🎯 Next Big Steps

1. **⭐ Create 5 unique plugins** and share them
2. **🎨 Customize the UI** (change colors in styles.css)
3. **🔊 Add EQ controls** (band filtering via Web Audio API)
4. **📡 Network streaming** (WebSockets to send audio to friends)
5. **🖼️ Switch to three.js** for 3D visuals

## 📖 References

- **Electron Docs**: https://www.electronjs.org/docs
- **Web Audio API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **Hydra.js**: https://github.com/hydra-synth/hydra (inspiration)

---

**You're all set! Happy creating! 🎵✨**

Questions? Check the README.md or dive into the code—it's well-commented.
