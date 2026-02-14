# GitHub Setup Checklist

Before uploading to GitHub, ensure you have:

## Pre-GitHub Steps

- [ ] **Replace placeholder URLs** in README_GITHUB.md
  - `https://github.com/spellweaver440-droid/hydroaplayer` → your actual repo URL
- [ ] **Test installers locally**
  - Run `./install-linux.sh` on Linux
  - Run `./install-macos.sh` on macOS
- [ ] **Git initialization** (if needed)
  ```bash
  git init
  git add .
  git commit -m "Initial commit: HydraPlayer prototype"
  ```

## Files Ready for GitHub

✅ **Core Files:**
- `main.js` — Electron main process
- `renderer.js` — React UI + audio/visual engine
- `preload.js` — IPC bridge
- `index.html` — Entry point
- `styles.css` — Styling
- `package.json` — Dependencies

✅ **Installers & Launchers:**
- `install-linux.sh` — Linux installer
- `install-macos.sh` — macOS installer
- `launch-linux.sh` — Linux launcher
- `launch-macos.sh` — macOS launcher

✅ **Plugins & Examples:**
- `plugins/sample-plugin.js` — Basic example
- `plugins/kaleidoscope.js` — Advanced example
- `PLUGIN_TEMPLATE.js` — Plugin template for users

✅ **Documentation:**
- `README_GITHUB.md` — **Main README (rename to README.md before GitHub)**
- `docs/INSTALLATION.md` — Installation guide
- `docs/DEVELOPMENT.md` — Development guide
- `docs/stack-recommendation.md` — Tech stack details

✅ **Project Guides:**
- `QUICKSTART.md` — Quick start guide
- `PROJECT_MANIFEST.md` — Complete file inventory
- `SETUP_COMPLETE.md` — Setup verification

✅ **Architecture:**
- `diagrams/module-diagram.mmd` — Module flow diagram
- `diagrams/stack-diagram.mmd` — Tech stack diagram

✅ **Open Source:**
- `LICENSE` — MIT License
- `.gitignore` — Git ignore rules
- `CONTRIBUTING.md` — Contributing guidelines
- `CODE_OF_CONDUCT.md` (optional) — Community standards

## GitHub Repository Setup

### 1. Create Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `hydroaplayer`
3. **Description**: "A hybrid media player combining audio playback + live visual coding (Hydra-style) + plugin system"
4. **Public** (unless you prefer private)
5. **Initialize with**: Nothing (we'll push our code)
6. Click **Create repository**

### 2. Add Remote and Push

```bash
cd /path/to/hydroaplayer

# Add remote
git remote add origin https://github.com/spellweaver440-droid/hydroaplayer.git

# Rename branch if needed
git branch -M main

# Push code
git push -u origin main
```

### 3. Rename README_GITHUB.md to README.md

GitHub automatically shows README.md on the repository homepage.

```bash
mv README_GITHUB.md README.md
git add README.md
git rm --cached README_GITHUB.md  # Remove old file from git
git commit -m "Rename to README.md for GitHub"
git push
```

### 4. Add GitHub Topics

Go to repository settings and add topics:
- `media-player`
- `audio-visualization`
- `live-coding`
- `electron`
- `react`
- `web-audio-api`
- `visual-coding`
- `hydra`

### 5. Add Repository Description

In Settings → About:
- **Description**: "Hybrid media player with live visual coding"
- **Website**: (optional)
- **Topics**: media-player, audio-visualization, live-coding

### 6. Setup Releases

1. Go to **Releases** tab
2. Click **Create a new release**
3. **Tag version**: `v0.1.0`
4. **Release title**: `HydraPlayer v0.1.0 - Initial Release`
5. **Description**:
   ```markdown
   # HydraPlayer v0.1.0 - Prototype Release

   Initial release of HydraPlayer, a hybrid media player with:
   - Audio playback with FFT analysis
   - Live visual code editor
   - Plugin system for extending visuals
   - Neon psychedelic UI

   ## Installation

   **Linux:**
   ```bash
   git clone https://github.com/spellweaver440-droid/hydroaplayer.git
   cd hydroaplayer
   chmod +x install-linux.sh
   ./install-linux.sh
   ```

   **macOS:**
   ```bash
   git clone https://github.com/spellweaver440-droid/hydroaplayer.git
   cd hydroaplayer
   chmod +x install-macos.sh
   ./install-macos.sh
   ```

   See [INSTALLATION.md](docs/INSTALLATION.md) for detailed instructions.

   ## Features

   - 🎵 Audio playback with playlist management
   - 📊 Real-time FFT frequency analysis
   - 💻 Live JavaScript visual editor
   - 🔌 Plugin system for community visuals
   - 🎨 Audio-reactive canvas rendering
   - ⏭️ Skip / Volume / Mute controls
   - 🖥️ Cross-platform (Linux, macOS)

   ## First Steps

   1. Install using instructions above
   2. Load an audio file
   3. Check out the Kaleidoscope plugin
   4. Edit the visual code in the live editor
   5. Create your own plugin using PLUGIN_TEMPLATE.js

   See [QUICKSTART.md](QUICKSTART.md) for more details.
   ```

6. Click **Publish release**

### 7. Enable Issues and Discussions

- **Settings** → **Features**:
  - ✅ Issues
  - ✅ Discussions (optional but recommended)
  - ✅ Wiki (optional)

## Pre-Push Verification

Run these before pushing:

```bash
# Check files will be tracked
git status

# Verify .gitignore
git check-ignore -v node_modules/*

# Test it still runs
npm install
npm start

# Verify all docs are present
ls -la docs/
ls -la plugins/
```

## File Checklist Before Push

```
hydroaplayer/
├── ✅ main.js
├── ✅ renderer.js
├── ✅ preload.js
├── ✅ index.html
├── ✅ styles.css
├── ✅ package.json
├── ✅ README.md (renamed from README_GITHUB.md)
├── ✅ QUICKSTART.md
├── ✅ PROJECT_MANIFEST.md
├── ✅ SETUP_COMPLETE.md
├── ✅ PLUGIN_TEMPLATE.js
├── ✅ CONTRIBUTING.md
├── ✅ LICENSE
├── ✅ .gitignore
├── ✅ install-linux.sh
├── ✅ install-macos.sh
├── ✅ launch-linux.sh
├── ✅ launch-macos.sh
├── ✅ plugins/
│   ├── ✅ sample-plugin.js
│   └── ✅ kaleidoscope.js
├── ✅ diagrams/
│   ├── ✅ module-diagram.mmd
│   └── ✅ stack-diagram.mmd
└── ✅ docs/
    ├── ✅ INSTALLATION.md
    ├── ✅ DEVELOPMENT.md
    └── ✅ stack-recommendation.md
```

## Post-GitHub Actions

1. **Add to awesome lists** (after some interest):
   - awesome-electron
   - awesome-audio
   - awesome-web-audio-api

2. **Consider promoting on**:
   - Reddit: r/programming, r/webdev, r/musictech
   - Product Hunt
   - Hacker News (Show HN thread)
   - Twitter/X

3. **Write blog post** about the project:
   - Technical deep-dive
   - How to create plugins
   - Visual examples/gifs

4. **Create example videos**:
   - Installation walkthrough
   - Plugin creation tutorial
   - Live visual demos

## Maintenance

- Monitor **Issues** tab for bugs
- Respond to **Pull Requests** promptly
- Update **README.md** with new features
- Maintain **CHANGELOG.md** for versions

---

**Ready to share with the world! 🎵✨**

