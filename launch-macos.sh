#!/bin/zsh

# HydraPlayer macOS Desktop Launcher
# Creates a proper macOS .app bundle launcher

INSTALL_DIR="$HOME/Applications/HydraPlayer"

if [ ! -d "$INSTALL_DIR" ]; then
    echo "❌ HydraPlayer not installed. Run install-macos.sh first."
    exit 1
fi

cd "$INSTALL_DIR"
exec npm start
