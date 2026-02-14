#!/bin/bash

# HydraPlayer Linux Installer
# Supports: Ubuntu, Debian, Fedora, Kali Linux
# This script installs HydraPlayer to ~/.local/share/applications

set -e

INSTALL_DIR="$HOME/.local/share/HydraPlayer"
APPS_DIR="$HOME/.local/share/applications"
ICONS_DIR="$HOME/.local/share/icons/hicolor/256x256/apps"

echo "🎵✨ HydraPlayer Linux Installer"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo ""
    echo "Install Node.js with:"
    echo ""
    echo "  Ubuntu/Debian:"
    echo "    sudo apt update && sudo apt install -y nodejs npm"
    echo ""
    echo "  Fedora:"
    echo "    sudo dnf install -y nodejs npm"
    echo ""
    echo "  Kali Linux:"
    echo "    sudo apt update && sudo apt install -y nodejs npm"
    echo ""
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Create directories
mkdir -p "$INSTALL_DIR"
mkdir -p "$APPS_DIR"
mkdir -p "$ICONS_DIR"

echo "📁 Creating installation directories..."
cp -r . "$INSTALL_DIR/"

echo "📦 Installing npm dependencies..."
cd "$INSTALL_DIR"
npm install --production

echo "🔗 Creating desktop launcher..."
cat > "$APPS_DIR/hydroaplayer.desktop" << 'EOF'
[Desktop Entry]
Version=1.0
Type=Application
Name=HydraPlayer
Comment=Hybrid media player with live visual coding
Exec=bash ~/.local/share/HydraPlayer/launch-linux.sh
Icon=hydroaplayer
Categories=AudioVideo;Music;
Terminal=false
StartupNotify=true
EOF

echo "✅ Installation complete!"
echo ""
echo "🚀 To launch HydraPlayer:"
echo "   - From applications menu, search 'HydraPlayer'"
echo "   - Or run: ~/.local/share/HydraPlayer/launch-linux.sh"
echo "   - Or from terminal: npm start (in $INSTALL_DIR)"
echo ""
echo "📂 Installation directory: $INSTALL_DIR"
echo ""
