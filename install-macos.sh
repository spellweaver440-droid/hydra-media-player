#!/bin/bash

# HydraPlayer macOS Installer
# This script installs HydraPlayer to ~/Applications/HydraPlayer.app

set -e

INSTALL_DIR="$HOME/Applications/HydraPlayer"

echo "🎵✨ HydraPlayer macOS Installer"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo ""
    echo "Install Node.js with:"
    echo ""
    echo "1. Using Homebrew (recommended):"
    echo "   brew install node"
    echo ""
    echo "2. Or download from: https://nodejs.org"
    echo ""
    echo "3. Or using NVM:"
    echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "   nvm install node"
    echo ""
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Run: npm install -g npm"
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Create install directory
echo "📁 Creating installation directory: $INSTALL_DIR"
mkdir -p "$INSTALL_DIR"

echo "📋 Copying HydraPlayer files..."
cp -r . "$INSTALL_DIR/"

echo "📦 Installing npm dependencies..."
cd "$INSTALL_DIR"
npm install --production

echo "🔗 Creating macOS launcher script..."
mkdir -p "$INSTALL_DIR/macos"
cat > "$INSTALL_DIR/macos/launch-macos.sh" << 'EOF'
#!/bin/bash
cd "$(dirname "$0")/.."
exec npm start
EOF
chmod +x "$INSTALL_DIR/macos/launch-macos.sh"

echo ""
echo "✅ Installation complete!"
echo ""
echo "🚀 To launch HydraPlayer:"
echo "   1. Open Terminal"
echo "   2. Run: $HOME/Applications/HydraPlayer/macos/launch-macos.sh"
echo "   3. Or create an alias: alias hydroaplayer='$HOME/Applications/HydraPlayer/macos/launch-macos.sh'"
echo ""
echo "💡 Tip: Add to your ~/.zshrc or ~/.bash_profile for easy access:"
echo "   alias hydroaplayer='$HOME/Applications/HydraPlayer/macos/launch-macos.sh'"
echo ""
echo "📂 Installation directory: $INSTALL_DIR"
echo ""
