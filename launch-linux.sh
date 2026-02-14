#!/bin/bash

# HydraPlayer Linux Desktop Launcher
# This script launches HydraPlayer from the desktop

INSTALL_DIR="$HOME/.local/share/HydraPlayer"

if [ ! -d "$INSTALL_DIR" ]; then
    echo "❌ HydraPlayer not installed. Run install-linux.sh first."
    exit 1
fi

cd "$INSTALL_DIR"
exec npm start
