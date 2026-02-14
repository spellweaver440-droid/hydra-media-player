const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');

  // Load plugins from the ./plugins folder and send metadata to renderer
  function loadPlugins() {
    const pluginsDir = path.join(__dirname, 'plugins');
    const plugins = [];
    try {
      if (fs.existsSync(pluginsDir)) {
        const files = fs.readdirSync(pluginsDir);
        for (const f of files) {
          if (f.endsWith('.js')) {
            try {
              const p = require(path.join(pluginsDir, f));
              // expect plugin to export metadata under `meta` or export an object
              if (p && (p.meta || p.name)) {
                const meta = p.meta ? { ...p.meta } : p;
                // If plugin has getVisualCode method, call it and include the code
                if (typeof p.getVisualCode === 'function') {
                  try {
                    meta.visualCode = p.getVisualCode();
                  } catch (e) {
                    console.warn('Plugin getVisualCode() failed:', f, e);
                  }
                }
                plugins.push(meta);
              }
            } catch (e) {
              console.error('Error loading plugin', f, e);
            }
          }
        }
      }
    } catch (e) {
      console.error('Failed to scan plugins directory', e);
    }
    return plugins;
  }

  const plugins = loadPlugins();
  win.webContents.once('did-finish-load', () => {
    win.webContents.send('plugins-list', plugins);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
