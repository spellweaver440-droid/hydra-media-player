const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Load plugins from the ./plugins folder
function loadPlugins() {
  const pluginsDir = path.join(__dirname, 'plugins');
  const plugins = [];
  
  try {
    if (fs.existsSync(pluginsDir)) {
      const files = fs.readdirSync(pluginsDir);
      
      for (const f of files) {
        if (f.endsWith('.js') && f !== 'PLUGIN_TEMPLATE.js') {
          try {
            const pluginPath = path.join(pluginsDir, f);
            const p = require(pluginPath);
            
            if (p && p.meta) {
              const meta = { ...p.meta };
              
              if (typeof p.getVisualCode === 'function') {
                try {
                  meta.visualCode = p.getVisualCode();
                } catch (e) {
                  console.error('Plugin getVisualCode() error:', f, e.message);
                }
              }
              
              plugins.push(meta);
            }
          } catch (e) {
            console.error('Error loading plugin', f, ':', e.message);
          }
        }
      }
    }
  } catch (e) {
    console.error('Failed to scan plugins directory:', e.message);
  }
  
  console.log('Loaded', plugins.length, 'plugins');
  return plugins;
}

// Store plugins globally so they can be accessed by IPC
const PLUGINS = loadPlugins();

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
}

// Expose plugins via IPC
ipcMain.handle('get-plugins', () => {
  console.log('IPC request: get-plugins, returning', PLUGINS.length, 'plugins');
  return PLUGINS;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
