# Installation Guide

Complete step-by-step installation instructions for Linux and macOS.

## Table of Contents

1. [Linux Installation](#linux-installation)
2. [macOS Installation](#macos-installation)
3. [Troubleshooting](#troubleshooting)

## Linux Installation

### Supported Distributions

- Ubuntu 20.04 LTS and later
- Debian 11 and later
- Kali Linux 2023 and later
- Fedora 36 and later
- Any systemd-based Linux with Node.js support

### Prerequisites

**Node.js v14+ (v16+ recommended)**

#### Ubuntu / Debian / Kali

```bash
sudo apt update
sudo apt install -y nodejs npm
```

Verify installation:
```bash
node --version  # Should be v14+
npm --version   # Should be v6+
```

#### Fedora

```bash
sudo dnf install -y nodejs npm
```

Verify installation:
```bash
node --version
npm --version
```

#### Using NVM (Node Version Manager)

If you want multiple Node versions:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc  # or ~/.zshrc

# Install Node
nvm install node
nvm use node
```

### Installation Steps

**1. Clone the Repository**

```bash
git clone https://github.com/spellweaver440-droid/hydroaplayer.git
cd hydroaplayer
```

Or download and extract the ZIP file.

**2. Run the Linux Installer**

```bash
chmod +x install-linux.sh
./install-linux.sh
```

The installer will:
- Check for Node.js
- Create installation directory at `~/.local/share/HydraPlayer`
- Install npm dependencies
- Create desktop entry for application menu
- Setup launcher scripts

**3. Launch HydraPlayer**

**Option A: From Applications Menu**
- Open your applications menu (Activities, Applications, etc.)
- Search for "HydraPlayer"
- Click to launch

**Option B: From Terminal**
```bash
~/.local/share/HydraPlayer/launch-linux.sh
```

**Option C: Create an Alias**

Add to `~/.bashrc` or `~/.zshrc`:
```bash
alias hydroaplayer='~/.local/share/HydraPlayer/launch-linux.sh'
```

Then reload:
```bash
source ~/.bashrc  # or source ~/.zshrc
hydroaplayer
```

### File Locations

- **Installation**: `~/.local/share/HydraPlayer`
- **Desktop Entry**: `~/.local/share/applications/hydroaplayer.desktop`
- **Config**: `~/.config/mediaplayer` (Electron data)

### Uninstall

To uninstall HydraPlayer:

```bash
rm -rf ~/.local/share/HydraPlayer
rm ~/.local/share/applications/hydroaplayer.desktop
rm ~/.local/share/icons/hicolor/256x256/apps/hydroaplayer.png  # if icon exists
```

---

## macOS Installation

### Supported Versions

- macOS 10.13 and later
- Intel and Apple Silicon Macs

### Prerequisites

**Node.js v14+ (v16+ recommended)**

#### Option 1: Homebrew (Recommended)

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

Verify:
```bash
node --version
npm --version
```

#### Option 2: Direct Download

Visit [nodejs.org](https://nodejs.org) and download the macOS installer.

Run the installer and follow prompts.

#### Option 3: NVM (Node Version Manager)

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Add to ~/.zshrc (or ~/.bash_profile if using bash)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Reload shell
source ~/.zshrc

# Install Node
nvm install node
nvm use node
```

### Installation Steps

**1. Clone the Repository**

```bash
git clone https://github.com/spellweaver440-droid/hydroaplayer.git
cd hydroaplayer
```

Or download and extract the ZIP file.

**2. Run the macOS Installer**

```bash
chmod +x install-macos.sh
./install-macos.sh
```

The installer will:
- Check for Node.js
- Create installation directory at `~/Applications/HydraPlayer`
- Install npm dependencies
- Setup launcher scripts

**3. Launch HydraPlayer**

**Option A: Direct Command**
```bash
~/Applications/HydraPlayer/macos/launch-macos.sh
```

**Option B: Create an Alias**

Add to `~/.zshrc` or `~/.bash_profile`:
```bash
alias hydroaplayer='~/Applications/HydraPlayer/macos/launch-macos.sh'
```

Reload shell:
```bash
source ~/.zshrc  # or source ~/.bash_profile
```

Then simply type:
```bash
hydroaplayer
```

**Option C: Create a macOS App Bundle (Advanced)**

To make a proper macOS app icon:

```bash
# Create app structure
mkdir -p ~/Applications/HydraPlayer.app/Contents/{MacOS,Resources}

# Create executable
cat > ~/Applications/HydraPlayer.app/Contents/MacOS/HydraPlayer << 'EOF'
#!/bin/bash
cd "$(dirname "$0")/../../"
exec npm start
EOF
chmod +x ~/Applications/HydraPlayer.app/Contents/MacOS/HydraPlayer

# Create Info.plist
cat > ~/Applications/HydraPlayer.app/Contents/Info.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key>
  <string>en</string>
  <key>CFBundleExecutable</key>
  <string>HydraPlayer</string>
  <key>CFBundleIdentifier</key>
  <string>com.hydroaplayer.app</string>
  <key>CFBundleInfoDictionaryVersion</key>
  <string>6.0</string>
  <key>CFBundleName</key>
  <string>HydraPlayer</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleVersion</key>
  <string>0.1.0</string>
  <key>NSHighResolutionCapable</key>
  <true/>
</dict>
</plist>
EOF
```

Then you can find HydraPlayer in Applications folder!

### File Locations

- **Installation**: `~/Applications/HydraPlayer`
- **Launcher Script**: `~/Applications/HydraPlayer/macos/launch-macos.sh`
- **Config**: `~/.config/mediaplayer` (Electron data)

### Uninstall

To uninstall HydraPlayer:

```bash
rm -rf ~/Applications/HydraPlayer
rm -rf ~/Applications/HydraPlayer.app  # if using macOS app bundle
```

---

## Troubleshooting

### Node.js Not Found

**Error**: `command not found: node`

**Solution**:
1. Install Node.js using the steps above
2. Verify: `which node`
3. If still not found, restart terminal or try `hash -r`

### Permission Denied

**Error**: `permission denied: ./install-linux.sh`

**Solution**:
```bash
chmod +x install-linux.sh
./install-linux.sh
```

### npm ERR! code EACCES

**Error**: Permission denied when installing packages

**Solution**:
```bash
# Option 1: Don't use sudo (recommended)
npm install

# Option 2: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Electron crashes on startup

**Error**: `libssl` or missing library errors

**Linux Solution**:
```bash
# Ubuntu/Debian
sudo apt install -y libssl-dev libx11-dev libxss1

# Fedora
sudo dnf install -y openssl-devel libX11-devel mesa-libGL
```

**macOS Solution**:
- Update Xcode: `xcode-select --install`
- Reinstall Node.js using Homebrew: `brew install --cask node`

### No Audio Output

**Linux**:
- Check ALSA: `speaker-test -t sine -f 1000`
- Check Pulseaudio: `pactl info`
- Restart audio: `systemctl --user restart pulseaudio` or `systemctl --user restart wireplumber`

**macOS**:
- Check System Preferences > Sound
- Ensure output device is selected
- Restart audio: `sudo killall -9 coreaudiod`

### App launches but is blank/black screen

**Solution**:
1. Press F12 to open DevTools
2. Check console for errors
3. Restart the app
4. Try updating Electron: `npm update electron`

### Cannot find plugins

**Solution**:
1. Ensure plugin files are in `plugins/` folder
2. Check file syntax with: `node -c plugins/my-plugin.js`
3. Restart the app after adding plugins

---

## Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/spellweaver440-droid/hydroaplayer/issues)
2. Search existing issues for similar problems
3. Open a new issue with:
   - Your OS and version
   - Node.js version
   - Error message (full output)
   - Steps to reproduce

---

**Happy installing! 🎵✨**

